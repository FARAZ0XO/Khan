import test from 'node:test';
import assert from 'node:assert/strict';
import { PROPERTY_LISTINGS } from '../data/properties';
import {
  filterAndSortListings,
  formatCompactPrice,
  formatCurrency,
  getBudgetTierForPrice,
  normalizePriceRange,
} from './listingFilters';

test('filterAndSortListings respects PKR min and max price boundaries', () => {
  const result = filterAndSortListings(PROPERTY_LISTINGS, {
    minPrice: 25_000_000,
    maxPrice: 60_000_000,
    category: 'All',
    searchQuery: '',
    sortBy: 'featured',
  });

  assert.equal(result.length, 3);
  assert.ok(result.every((p) => p.price >= 25_000_000 && p.price <= 60_000_000));
});

test('filterAndSortListings returns empty list when PKR price range excludes all properties', () => {
  const result = filterAndSortListings(PROPERTY_LISTINGS, {
    minPrice: 100_000_000,
    maxPrice: 120_000_000,
    category: 'All',
    searchQuery: '',
    sortBy: 'featured',
  });

  assert.equal(result.length, 0);
});

test('filterAndSortListings sorts ascending and descending accurately', () => {
  const asc = filterAndSortListings(PROPERTY_LISTINGS, {
    minPrice: 10_000_000,
    maxPrice: 120_000_000,
    category: 'All',
    searchQuery: '',
    sortBy: 'price-asc',
  });
  for (let i = 1; i < asc.length; i++) {
    assert.ok(asc[i].price >= asc[i - 1].price);
  }

  const desc = filterAndSortListings(PROPERTY_LISTINGS, {
    minPrice: 10_000_000,
    maxPrice: 120_000_000,
    category: 'All',
    searchQuery: '',
    sortBy: 'price-desc',
  });
  for (let i = 1; i < desc.length; i++) {
    assert.ok(desc[i].price <= desc[i - 1].price);
  }
});

test('normalizePriceRange swaps inverted bounds and clamps to PKR range', () => {
  assert.deepEqual(normalizePriceRange(80_000_000, 25_000_000), {
    minPrice: 25_000_000,
    maxPrice: 80_000_000,
  });
  assert.deepEqual(normalizePriceRange(1_000_000, 200_000_000), {
    minPrice: 10_000_000,
    maxPrice: 120_000_000,
  });
});

test('PKR currency formatters and budget tier mapper return expected labels', () => {
  assert.equal(formatCurrency(58_000_000), 'PKR 58,000,000');
  assert.equal(formatCompactPrice(18_500_000), 'PKR 18.5M');
  assert.equal(formatCompactPrice(95_000_000), 'PKR 95M');
  assert.equal(getBudgetTierForPrice(18_500_000), 'under-25m');
  assert.equal(getBudgetTierForPrice(58_000_000), '25m-60m');
  assert.equal(getBudgetTierForPrice(95_000_000), '60m-100m');
});
