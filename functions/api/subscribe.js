// Cloudflare Pages Function — POST /api/subscribe
// Shared backend: same Airtable base + Resend as shopify-fee-calc
// source tag identifies this site in Airtable

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestPost({ request, env }) {
  try {
    const { email, source } = await request.json();

    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ error: 'Invalid email' }, 400);
    }

    const results = await Promise.allSettled([
      saveToAirtable(email, source, env),
      sendConfirmationEmail(email, source, env),
    ]);

    const failed = results.filter(r => r.status === 'rejected');
    if (failed.length === results.length) {
      console.error('All operations failed:', failed.map(f => f.reason));
      return json({ error: 'Internal error' }, 500);
    }

    return json({ success: true }, 200);
  } catch (err) {
    console.error('subscribe error:', err);
    return json({ error: 'Bad request' }, 400);
  }
}

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

async function saveToAirtable(email, source, env) {
  if (!env.AIRTABLE_API_KEY || !env.AIRTABLE_BASE_ID) return;
  const sourceValue = `${source || 'commission-calc'} | ${new Date().toISOString().slice(0, 10)}`;
  const res = await fetch(
    `https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/Subscribers`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields: { Email: email, Source: sourceValue } }),
    }
  );
  if (!res.ok) throw new Error(`Airtable ${res.status}: ${await res.text()}`);
}

async function sendConfirmationEmail(email, source, env) {
  if (!env.RESEND_API_KEY) return;

  const toolNames = {
    'commission-calculator': 'Commission Calculator',
    'mortgage-calculator': 'Mortgage Calculator',
    'home-affordability': 'Home Affordability Calculator',
    'rent-vs-buy': 'Rent vs Buy Calculator',
  };
  const toolName = toolNames[source] || 'Real Estate Calculator';

  const html = `<!DOCTYPE html><html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111">
<h2 style="margin:0 0 8px;font-size:20px">Your results are saved ✓</h2>
<p style="color:#555;margin:0 0 16px">Thanks for using our <strong>${toolName}</strong>. Bookmark <a href="https://commission-calc.com" style="color:#4f46e5">commission-calc.com</a> to return any time.</p>
<p style="color:#555;margin:0 0 16px">Explore our other free calculators:</p>
<ul style="color:#555;padding-left:20px;margin:0 0 24px">
  <li style="margin-bottom:8px"><a href="https://commission-calc.com/mortgage-calculator/" style="color:#4f46e5">Mortgage Calculator</a> — full PITI with amortization table</li>
  <li style="margin-bottom:8px"><a href="https://commission-calc.com/home-affordability-calculator/" style="color:#4f46e5">Home Affordability</a> — how much house can you afford?</li>
  <li style="margin-bottom:8px"><a href="https://commission-calc.com/rent-vs-buy-calculator/" style="color:#4f46e5">Rent vs Buy</a> — break-even year + 30-year wealth comparison</li>
</ul>
<p style="color:#999;font-size:12px;border-top:1px solid #eee;padding-top:16px;margin:0">
  You submitted your email via ${toolName} at commission-calc.com.
</p>
</body></html>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'CommissionCalc <hello@shopify-fee-calc.com>',
      to: email,
      subject: `Your ${toolName} results — commission-calc.com`,
      html,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}
