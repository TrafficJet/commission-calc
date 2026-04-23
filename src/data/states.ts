import { cities, getStateName } from './cities';

export interface StateData {
  abbr: string;
  name: string;
  slug: string;
  medianPrice: number;
  avgCommission: number;
  cityCount: number;
  topCities: { city: string; slug: string; medianPrice: number; avgCommission: number }[];
}

function buildStates(): StateData[] {
  const map: Record<string, { abbr: string; prices: number[]; commissions: number[]; topCities: StateData['topCities'] }> = {};

  for (const c of cities) {
    if (!map[c.state]) {
      map[c.state] = { abbr: c.state, prices: [], commissions: [], topCities: [] };
    }
    map[c.state].prices.push(c.medianPrice);
    map[c.state].commissions.push(c.avgCommission);
    if (map[c.state].topCities.length < 6) {
      map[c.state].topCities.push({ city: c.city, slug: c.slug, medianPrice: c.medianPrice, avgCommission: c.avgCommission });
    }
  }

  return Object.values(map).map(s => {
    const medianPrice = Math.round(s.prices.reduce((a, b) => a + b, 0) / s.prices.length);
    const avgCommission = Math.round(s.commissions.reduce((a, b) => a + b, 0) / s.commissions.length * 10) / 10;
    const name = getStateName(s.abbr);
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return { abbr: s.abbr, name, slug, medianPrice, avgCommission, cityCount: s.prices.length, topCities: s.topCities };
  });
}

export const states: StateData[] = buildStates();
