import { useMemo, useState } from 'react';
import { RotateCcw, Search } from 'lucide-react';
import { LISTING_PRICE_BOUNDS, PRICE_PRESETS } from '../data/properties';
import { PropertyCategory, PropertyListing, SortOption } from '../types/property';
import {
  filterAndSortListings,
  formatCompactPrice,
  formatCurrency,
  normalizePriceRange,
} from '../utils/listingFilters';
import { PropertyCard } from '../components/PropertyCard';

interface ListingsPageProps {
  listings: PropertyListing[];
  onSelectProperty: (listing: PropertyListing) => void;
}

const CATEGORIES: PropertyCategory[] = ['All', 'House', 'Apartment', 'Townhouse', 'Development'];

const MIN_SELECT_STEPS = [
  10_000_000,
  15_000_000,
  20_000_000,
  25_000_000,
  40_000_000,
  60_000_000,
  80_000_000,
  100_000_000,
];

const MAX_SELECT_STEPS = [
  20_000_000,
  25_000_000,
  35_000_000,
  50_000_000,
  60_000_000,
  80_000_000,
  100_000_000,
  120_000_000,
];

export function ListingsPage({ listings, onSelectProperty }: ListingsPageProps) {
  const [minPrice, setMinPrice] = useState<number>(LISTING_PRICE_BOUNDS.MIN);
  const [maxPrice, setMaxPrice] = useState<number>(LISTING_PRICE_BOUNDS.MAX);
  const [category, setCategory] = useState<PropertyCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const filteredListings = useMemo(
    () =>
      filterAndSortListings(listings, {
        minPrice,
        maxPrice,
        category,
        searchQuery,
        sortBy,
      }),
    [listings, minPrice, maxPrice, category, searchQuery, sortBy]
  );

  const handleMinSliderChange = (nextMin: number) => {
    const normalized = normalizePriceRange(nextMin, Math.max(nextMin, maxPrice));
    setMinPrice(normalized.minPrice);
    setMaxPrice(normalized.maxPrice);
  };

  const handleMaxSliderChange = (nextMax: number) => {
    const normalized = normalizePriceRange(Math.min(minPrice, nextMax), nextMax);
    setMinPrice(normalized.minPrice);
    setMaxPrice(normalized.maxPrice);
  };

  const handleResetFilters = () => {
    setMinPrice(LISTING_PRICE_BOUNDS.MIN);
    setMaxPrice(LISTING_PRICE_BOUNDS.MAX);
    setCategory('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  const isPresetActive = (presetMin: number, presetMax: number) =>
    minPrice === presetMin && maxPrice === presetMax;

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold tracking-wider uppercase text-[#4A5B75]">
          Federal B Area &amp; Gulberg Town, Karachi
        </p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold text-[#0F1F38] tracking-tight">
          Property Listings
        </h1>
        <p className="mt-3 text-base text-[#4A5B75] leading-relaxed">
          Filter available residential properties across Federal B Area by PKR price range,
          property type, or block.
        </p>
      </div>

      {/* Price Range & Category Filter Panel */}
      <section
        aria-label="Property filters"
        className="mt-8 bg-[#FDFBF7] border border-[#E2DACB] rounded-lg p-5 sm:p-6 space-y-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
          {/* Search Input */}
          <div className="lg:col-span-5">
            <label
              htmlFor="listing-search"
              className="block text-xs font-semibold text-[#0F1F38] mb-1.5"
            >
              Search Block, Neighborhood, or Property
            </label>
            <div className="relative">
              <Search
                className="w-4 h-4 text-[#4A5B75] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="listing-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Block 7, Sadaf Terrace, Gulberg"
                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-[#FAF7F2] text-[#0F1F38] border border-[#D8CFC0] rounded-md focus:outline-none focus:border-[#0F1F38] focus:ring-1 focus:ring-[#0F1F38]"
              />
            </div>
          </div>

          {/* Sort Select */}
          <div className="lg:col-span-4">
            <label
              htmlFor="listing-sort"
              className="block text-xs font-semibold text-[#0F1F38] mb-1.5"
            >
              Sort Order
            </label>
            <select
              id="listing-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] text-[#0F1F38] border border-[#D8CFC0] rounded-md focus:outline-none focus:border-[#0F1F38] focus:ring-1 focus:ring-[#0F1F38]"
            >
              <option value="featured">Featured Properties</option>
              <option value="price-asc">Price: Low to High (PKR)</option>
              <option value="price-desc">Price: High to Low (PKR)</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="lg:col-span-3 flex lg:justify-end">
            <button
              type="button"
              onClick={handleResetFilters}
              className="w-full lg:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#0F1F38] border border-[#D8CFC0] rounded-md hover:bg-[#F2ECE1] transition-colors whitespace-nowrap cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>

        {/* Dedicated Price Range Filter Controls (PKR) */}
        <div className="pt-5 border-t border-[#E2DACB] grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold text-[#0F1F38] mb-2">Quick PKR Price Range</p>
            <div className="flex flex-wrap gap-2">
              {PRICE_PRESETS.map((preset) => {
                const active = isPresetActive(preset.minPrice, preset.maxPrice);
                return (
                  <button
                    key={preset.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setMinPrice(preset.minPrice);
                      setMaxPrice(preset.maxPrice);
                    }}
                    className={`px-3 py-2 text-xs font-medium rounded-md border transition-colors whitespace-nowrap cursor-pointer ${
                      active
                        ? 'bg-[#0F1F38] text-[#FAF7F2] border-[#0F1F38]'
                        : 'bg-[#FAF7F2] text-[#0F1F38] border-[#D8CFC0] hover:border-[#0F1F38]/50'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <label htmlFor="min-price-slider" className="font-semibold text-[#0F1F38]">
                  Minimum Price
                </label>
                <span className="font-semibold text-[#0F1F38] tabular-nums">
                  {formatCurrency(minPrice)}
                </span>
              </div>
              <input
                id="min-price-slider"
                type="range"
                min={LISTING_PRICE_BOUNDS.MIN}
                max={LISTING_PRICE_BOUNDS.MAX}
                step={LISTING_PRICE_BOUNDS.STEP}
                value={minPrice}
                onChange={(e) => handleMinSliderChange(Number(e.target.value))}
                className="w-full navy-range"
              />
              <div className="mt-2">
                <label htmlFor="min-price-select" className="sr-only">
                  Select minimum price in PKR
                </label>
                <select
                  id="min-price-select"
                  value={minPrice}
                  onChange={(e) => handleMinSliderChange(Number(e.target.value))}
                  className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] text-[#0F1F38] border border-[#D8CFC0] rounded-md tabular-nums"
                >
                  {Array.from(new Set([...MIN_SELECT_STEPS, minPrice]))
                    .sort((a, b) => a - b)
                    .map((val) => (
                      <option key={val} value={val}>
                        Min: {formatCurrency(val)}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <label htmlFor="max-price-slider" className="font-semibold text-[#0F1F38]">
                  Maximum Price
                </label>
                <span className="font-semibold text-[#0F1F38] tabular-nums">
                  {formatCurrency(maxPrice)}
                </span>
              </div>
              <input
                id="max-price-slider"
                type="range"
                min={LISTING_PRICE_BOUNDS.MIN}
                max={LISTING_PRICE_BOUNDS.MAX}
                step={LISTING_PRICE_BOUNDS.STEP}
                value={maxPrice}
                onChange={(e) => handleMaxSliderChange(Number(e.target.value))}
                className="w-full navy-range"
              />
              <div className="mt-2">
                <label htmlFor="max-price-select" className="sr-only">
                  Select maximum price in PKR
                </label>
                <select
                  id="max-price-select"
                  value={maxPrice}
                  onChange={(e) => handleMaxSliderChange(Number(e.target.value))}
                  className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] text-[#0F1F38] border border-[#D8CFC0] rounded-md tabular-nums"
                >
                  {Array.from(new Set([...MAX_SELECT_STEPS, maxPrice]))
                    .sort((a, b) => a - b)
                    .map((val) => (
                      <option key={val} value={val}>
                        Max: {formatCurrency(val)}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs + Result Count */}
        <div className="pt-5 border-t border-[#E2DACB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Property category">
            {CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#0F1F38] text-[#FAF7F2]'
                      : 'bg-[#F2ECE1] text-[#4A5B75] hover:text-[#0F1F38]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-[#4A5B75] tabular-nums" data-testid="listing-result-count">
            Showing <strong className="text-[#0F1F38]">{filteredListings.length}</strong> of{' '}
            {listings.length} properties · {formatCompactPrice(minPrice)} –{' '}
            {formatCompactPrice(maxPrice)}
          </p>
        </div>
      </section>

      {/* Listings Grid or Empty State */}
      {filteredListings.length > 0 ? (
        <div
          data-testid="listings-grid"
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {filteredListings.map((listing) => (
            <PropertyCard key={listing.id} listing={listing} onSelect={onSelectProperty} />
          ))}
        </div>
      ) : (
        <div
          data-testid="listings-empty"
          className="mt-10 bg-[#FDFBF7] border border-[#E2DACB] rounded-lg p-10 text-center max-w-xl mx-auto"
        >
          <h2 className="font-display text-2xl font-semibold text-[#0F1F38]">
            No properties match this PKR price range
          </h2>
          <p className="mt-2 text-sm text-[#4A5B75]">
            Adjust your minimum and maximum PKR price sliders or reset filters to view all active
            Federal B Area listings.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold bg-[#0F1F38] text-[#FAF7F2] rounded-md hover:bg-[#1D3458] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
