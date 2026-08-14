import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// Blog bodies contain internal links to root-level article slugs that were never
// published (e.g. /real-estate-commission-calculator), producing "Not found (404)"
// URLs in Search Console. This remark plugin unwraps any link to a single-segment
// root path that is not a real page — the link text stays, the dead href is removed.
// Real pages and multi-segment links (/state/california/, /commission/..., /blog/...)
// are preserved.
const REAL_ROOT_PAGES = new Set([
    '1031-exchange-calculator', 'about', 'agent-commission-split-calculator',
    'agent-net-pay-calculator', 'blog', 'brrrr-calculator', 'capital-gains-home-sale',
    'closing-costs', 'commission', 'commission-calculator-2026', 'contact', 'disclosure',
    'fsbo-vs-agent-calculator', 'home-affordability-calculator', 'ibuyer-offer-calculator',
    'kw-cap-calculator', 'mortgage-calculator', 'privacy', 'rent-vs-buy-calculator',
    'rental-property-calculator', 'seller-net', 'state', 'terms',
  ]);

function remarkStripDeadInternalLinks() {
    const isDead = (url) => {
          const m = /^\/([a-z0-9][a-z0-9-]*)\/?$/.exec(url || '');
          return !!m && !REAL_ROOT_PAGES.has(m[1]);
    };
    const walk = (node) => {
          if (!node || !Array.isArray(node.children)) return;
          const out = [];
          for (const child of node.children) {
                  if (child.type === 'link' && isDead(child.url)) {
                            out.push(...(child.children || []));
                  } else {
                            walk(child);
                            out.push(child);
                  }
          }
          node.children = out;
    };
    return (tree) => walk(tree);
}

export default defineConfig({
    site: 'https://commission-calc.com',
    markdown: {
          remarkPlugins: [remarkStripDeadInternalLinks],
    },
    integrations: [sitemap(), tailwind()],
    output: 'static',
});
