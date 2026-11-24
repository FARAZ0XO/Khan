import { PriceFilterState, PropertyListing } from '../types/property';
import { LISTING_PRICE_BOUNDS } from '../data/properties';

export function formatCurrency(amount: number): string {
  return `PKR ${new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(amount)}`;
}

export function formatCompactPrice(amount: number): string {
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    const formatted = Number.isInteger(millions)
      ? String(millions)
      : millions.toFixed(1).replace(/\.0$/, '');
    return `PKR ${formatted}M`;
  }
  return `PKR ${Math.round(amount / 1_000)}K`;
}

export function normalizePriceRange(
  rawMin: number,
  rawMax: number
): { minPrice: number; maxPrice: number } {
  const safeMin = Number.isFinite(rawMin)
    ? Math.max(LISTING_PRICE_BOUNDS.MIN, Math.min(LISTING_PRICE_BOUNDS.MAX, rawMin))
    : LISTING_PRICE_BOUNDS.MIN;
  const safeMax = Number.isFinite(rawMax)
    ? Math.max(LISTING_PRICE_BOUNDS.MIN, Math.min(LISTING_PRICE_BOUNDS.MAX, rawMax))
    : LISTING_PRICE_BOUNDS.MAX;

  if (safeMin > safeMax) {
    return { minPrice: safeMax, maxPrice: safeMin };
  }
  return { minPrice: safeMin, maxPrice: safeMax };
}

export function filterAndSortListings(
  listings: PropertyListing[],
  filter: PriceFilterState
): PropertyListing[] {
  const query = filter.searchQuery.trim().toLowerCase();
  const min = Number.isFinite(filter.minPrice) ? filter.minPrice : 0;
  const max = Number.isFinite(filter.maxPrice) ? filter.maxPrice : Number.MAX_SAFE_INTEGER;

  const filtered = listings.filter((item) => {
    if (filter.category !== 'All' && item.category !== filter.category) {
      return false;
    }
    if (item.price < min || item.price > max) {
      return false;
    }
    if (query.length > 0) {
      const haystack = `${item.title} ${item.location} ${item.neighborhood} ${item.category}`.toLowerCase();
      if (!haystack.includes(query)) {
        return false;
      }
    }
    return true;
  });

  if (filter.sortBy === 'price-asc') {
    return [...filtered].sort((a, b) => a.price - b.price);
  }
  if (filter.sortBy === 'price-desc') {
    return [...filtered].sort((a, b) => b.price - a.price);
  }
  return filtered;
}

export function getBudgetTierForPrice(
  price: number
): 'under-25m' | '25m-60m' | '60m-100m' | 'over-100m' {
  if (price < 25_000_000) return 'under-25m';
  if (price <= 60_000_000) return '25m-60m';
  if (price <= 100_000_000) return '60m-100m';
  return 'over-100m';
}
