import { useMemo, useState } from 'react';
import { Star } from 'lucide-react';
import { BUSINESS_INFO, TESTIMONIALS } from '../data/properties';
import { PageId } from '../types/property';

interface TestimonialsPageProps {
  onNavigate: (page: PageId) => void;
}

type TestimonialFilter = 'All Reviews' | 'Buying' | 'Selling';

const FILTERS: TestimonialFilter[] = ['All Reviews', 'Buying', 'Selling'];

export function TestimonialsPage({ onNavigate }: TestimonialsPageProps) {
  const [filter, setFilter] = useState<TestimonialFilter>('All Reviews');

  const visibleTestimonials = useMemo(() => {
    if (filter === 'All Reviews') return TESTIMONIALS;
    return TESTIMONIALS.filter((item) => item.engagementType === filter);
  }, [filter]);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E2DACB]">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#4A5B75]">
            <Star className="w-3.5 h-3.5 fill-[#0F1F38] text-[#0F1F38]" aria-hidden="true" />
            <span className="tabular-nums">
              {BUSINESS_INFO.ratingScore} Rating · {BUSINESS_INFO.reviewCount} Verified Reviews
            </span>
          </div>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold text-[#0F1F38] tracking-tight">
            Client Testimonials
          </h1>
          <p className="mt-3 text-base text-[#4A5B75] leading-relaxed">
            Reviewers consistently highlight F&amp;F Real Estate for reliability when buying or
            selling homes in Federal B Area, Gulberg Town, Karachi.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter client testimonials">
          {FILTERS.map((tab) => {
            const active = filter === tab;
            return (
              <button
                key={tab}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[#0F1F38] text-[#FAF7F2]'
                    : 'bg-[#F2ECE1] text-[#4A5B75] hover:text-[#0F1F38]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-7">
        {visibleTestimonials.map((item) => (
          <article
            key={item.id}
            className="bg-[#FDFBF7] border border-[#E2DACB] rounded-lg p-7 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#4A5B75]">
                <span className="font-semibold text-[#0F1F38] tabular-nums">{item.rating}</span>
                <span aria-hidden="true">·</span>
                <span>{item.engagementType}</span>
                <span aria-hidden="true">·</span>
                <span>{item.propertyLabel}</span>
              </div>

              <blockquote className="mt-4 font-display text-2xl leading-snug text-[#0F1F38]">
                “{item.quote}”
              </blockquote>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E2DACB] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-[#0F1F38]">{item.clientName}</p>
                <p className="text-xs text-[#4A5B75]">{item.role}</p>
              </div>
              <p className="text-xs font-semibold text-[#0F1F38] tabular-nums">
                {item.outcomeMetric}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* CTA Footer Banner */}
      <section className="mt-14 bg-[#0F1F38] text-[#FAF7F2] rounded-lg p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold">
            Planning to buy, sell, or rent in Federal B Area?
          </h2>
          <p className="mt-2 text-sm text-[#FAF7F2]/80 max-w-xl">
            Book an appointment with Fahad Iqbal and our Block 7 team with your PKR budget and
            timeline.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('contact')}
          className="px-6 py-3 text-sm font-semibold bg-[#FAF7F2] text-[#0F1F38] rounded-md hover:bg-[#F2ECE1] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Book Private Appointment
        </button>
      </section>
    </div>
  );
}
