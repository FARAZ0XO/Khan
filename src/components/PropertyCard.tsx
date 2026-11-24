import { ArrowUpRight } from 'lucide-react';
import { PropertyListing } from '../types/property';
import { formatCurrency } from '../utils/listingFilters';
import { SafeImage } from './SafeImage';

interface PropertyCardProps {
  listing: PropertyListing;
  onSelect: (listing: PropertyListing) => void;
}

export function PropertyCard({ listing, onSelect }: PropertyCardProps) {
  return (
    <article className="group bg-[#FDFBF7] border border-[#E2DACB] rounded-lg overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-12px_rgba(15,31,56,0.16)]">
      <div className="aspect-[4/3] w-full overflow-hidden bg-[#F2ECE1]">
        <SafeImage
          src={listing.imageUrl}
          alt={listing.imageAlt}
          fallbackTitle={listing.title}
          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
        />
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Zero-pill clean metadata with middot separator */}
        <div className="flex items-center gap-2 text-xs text-[#4A5B75]">
          <span>{listing.category}</span>
          <span aria-hidden="true">·</span>
          <span>{listing.location}</span>
        </div>

        <h3 className="mt-2 font-display text-2xl font-semibold text-[#0F1F38] tracking-tight leading-snug">
          {listing.title}
        </h3>

        <p className="mt-2 text-sm text-[#4A5B75] leading-relaxed line-clamp-2 flex-1">
          {listing.summary}
        </p>

        <div className="mt-5 pt-4 border-t border-[#E2DACB] flex items-end justify-between gap-4">
          <div>
            <p className="text-lg font-semibold text-[#0F1F38] tabular-nums">
              {formatCurrency(listing.price)}
            </p>
            <p className="mt-0.5 text-xs text-[#4A5B75] tabular-nums">
              {listing.beds} Beds · {listing.baths} Baths · {listing.sqft.toLocaleString()} sq ft
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelect(listing)}
            aria-label={`View details for ${listing.title}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0F1F38] border border-[#0F1F38]/25 rounded-md hover:bg-[#0F1F38] hover:text-[#FAF7F2] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F1F38] cursor-pointer"
          >
            <span>View Residence</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
