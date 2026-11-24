import { useEffect } from 'react';
import { Calendar, X } from 'lucide-react';
import { PropertyListing } from '../types/property';
import { formatCurrency } from '../utils/listingFilters';
import { SafeImage } from './SafeImage';

interface PropertyDetailModalProps {
  listing: PropertyListing | null;
  onClose: () => void;
  onBookViewing: (listing: PropertyListing) => void;
}

export function PropertyDetailModal({
  listing,
  onClose,
  onBookViewing,
}: PropertyDetailModalProps) {
  useEffect(() => {
    if (!listing) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [listing, onClose]);

  if (!listing) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F1F38]/65 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-property-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FAF7F2] border border-[#E2DACB] rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={`Close ${listing.title} details`}
          className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-10 h-10 rounded-md bg-[#FAF7F2]/95 text-[#0F1F38] border border-[#E2DACB] hover:bg-[#0F1F38] hover:text-[#FAF7F2] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="aspect-[16/9] w-full bg-[#F2ECE1]">
          <SafeImage
            src={listing.imageUrl}
            alt={listing.imageAlt}
            fallbackTitle={listing.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#4A5B75]">
            <span>{listing.category}</span>
            <span aria-hidden="true">·</span>
            <span>{listing.neighborhood}</span>
            <span aria-hidden="true">·</span>
            <span>{listing.location}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">Built {listing.yearBuilt}</span>
          </div>

          <div className="mt-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
            <h2
              id="modal-property-title"
              className="font-display text-3xl sm:text-4xl font-semibold text-[#0F1F38] tracking-tight"
            >
              {listing.title}
            </h2>
            <p className="text-2xl font-semibold text-[#0F1F38] tabular-nums">
              {formatCurrency(listing.price)}
            </p>
          </div>

          <div className="mt-4 py-3 border-y border-[#E2DACB] grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="block text-xs text-[#4A5B75]">Bedrooms</span>
              <span className="font-semibold text-[#0F1F38] tabular-nums">{listing.beds}</span>
            </div>
            <div>
              <span className="block text-xs text-[#4A5B75]">Bathrooms</span>
              <span className="font-semibold text-[#0F1F38] tabular-nums">{listing.baths}</span>
            </div>
            <div>
              <span className="block text-xs text-[#4A5B75]">Interior Area</span>
              <span className="font-semibold text-[#0F1F38] tabular-nums">
                {listing.sqft.toLocaleString()} sq ft
              </span>
            </div>
            <div>
              <span className="block text-xs text-[#4A5B75]">Architect</span>
              <span className="font-semibold text-[#0F1F38]">{listing.architect}</span>
            </div>
          </div>

          <p className="mt-5 text-base leading-relaxed text-[#243B5E]">{listing.summary}</p>

          <div className="mt-6">
            <h3 className="text-xs font-semibold tracking-wider text-[#4A5B75] uppercase mb-3">
              Architectural Highlights
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-[#0F1F38]">
              {listing.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2">
                  <span aria-hidden="true" className="text-[#4A5B75]">
                    —
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E2DACB] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <p className="text-xs text-[#4A5B75]">
              Private architectural dossiers and floorplans provided during scheduled viewings.
            </p>
            <button
              type="button"
              onClick={() => onBookViewing(listing)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold bg-[#0F1F38] text-[#FAF7F2] rounded-md hover:bg-[#1D3458] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>Book Private Viewing</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
