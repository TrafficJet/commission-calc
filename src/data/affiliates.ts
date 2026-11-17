// Central affiliate config.
// Paste real tracking links here after each program approves you.
// Empty string = the CTA block for that offer is hidden site-wide.

export const AFFILIATES = {
  // Agent-matching (Clever / HomeLight / UpNest). Used on /commission/[city] + homepage.
  AGENT_MATCH_URL: '',
  AGENT_MATCH_LABEL: 'Compare top local agents',

  // Mortgage / refinance CPL offer. Used on mortgage + affordability calculators.
  MORTGAGE_URL: '',
  MORTGAGE_LABEL: 'Compare mortgage rates',
} as const;

/** Append utm params so GSC/partner dashboards show which page converted. */
export function withUtm(url: string, content: string): string {
  if (!url) return '';
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}utm_source=commission-calc&utm_medium=calculator&utm_content=${encodeURIComponent(content)}`;
}
