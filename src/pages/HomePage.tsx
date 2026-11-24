import { ArrowRight } from 'lucide-react';
import { BUSINESS_INFO, HERO_IMAGE, TESTIMONIALS } from '../data/properties';
import {
  AppointmentRecord,
  BudgetTierId,
  PageId,
  PropertyListing,
} from '../types/property';
import { AppointmentForm } from '../components/AppointmentForm';
import { PropertyCard } from '../components/PropertyCard';
import { SafeImage } from '../components/SafeImage';

interface HomePageProps {
  listings: PropertyListing[];
  onNavigate: (page: PageId) => void;
  onSelectProperty: (listing: PropertyListing) => void;
  onAppointmentCreated: (record: AppointmentRecord) => void;
  preselectedPropertyId: string;
  preselectedBudgetTier: BudgetTierId;
}

const ADVISORY_METRICS = [
  {
    value: '5 / 5',
    label: 'Client rating across 2 verified Federal B Area reviews',
  },
  {
    value: '4 Services',
    label: 'Buying, selling, renting & residential development',
  },
  {
    value: '12 PM – 12 AM',
    label: 'Mon–Thu, Sat–Sun (Fri 3:00 PM – 12:00 AM)',
  },
  {
    value: 'Block 7',
    label: 'Sadaf Terrace, Federal B Area, Karachi',
  },
];

export function HomePage({
  listings,
  onNavigate,
  onSelectProperty,
  onAppointmentCreated,
  preselectedPropertyId,
  preselectedBudgetTier,
}: HomePageProps) {
  const featuredListings = listings.filter((item) => item.featured).slice(0, 3);
  const leadTestimonial = TESTIMONIALS[0];

  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase text-[#4A5B75]">
                F&amp;F Real Estate · Federal B Area, Karachi
              </p>
              <h1
                className="mt-4 font-display font-semibold text-[#0F1F38] tracking-tight leading-[1.06]"
                style={{ fontSize: 'clamp(2.35rem, 4vw, 3.65rem)', textWrap: 'balance' }}
              >
                Reliable property advisory in Federal B Area
              </h1>
              <p className="mt-5 text-base leading-relaxed text-[#243B5E] max-w-md">
                {BUSINESS_INFO.servicesSummary} Transparent PKR pricing, verified documentation,
                and dedicated guidance from our Block 7 office.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('listings')}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-[#0F1F38] text-[#FAF7F2] rounded-md hover:bg-[#1D3458] transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Explore PKR Listings</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center px-4 py-3 text-sm font-semibold text-[#0F1F38] border border-[#0F1F38]/25 rounded-md hover:bg-[#F2ECE1] transition-colors whitespace-nowrap cursor-pointer"
              >
                Book Appointment
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="aspect-[16/10] lg:aspect-auto lg:h-full min-h-[280px] rounded-lg overflow-hidden border border-[#E2DACB] bg-[#F2ECE1]">
              <SafeImage
                src={HERO_IMAGE.url}
                alt={HERO_IMAGE.alt}
                fallbackTitle="F&F Real Estate Featured Residence"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Full-width 4-column Advisory Figures Strip below Hero Split */}
        <div className="mt-12 pt-8 border-t border-[#E2DACB] grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {ADVISORY_METRICS.map((metric) => (
            <div key={metric.label}>
              <p className="font-display text-3xl sm:text-4xl font-semibold text-[#0F1F38] tabular-nums">
                {metric.value}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-[#4A5B75] leading-snug">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Residences Section */}
      <section className="bg-[#F2ECE1]/70 border-y border-[#E2DACB] py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase text-[#4A5B75]">
                Gulberg Town &amp; Federal B Area
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[#0F1F38] tracking-tight">
                Featured Properties
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('listings')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F1F38] hover:text-[#1D3458] transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
            >
              <span>Filter all {listings.length} listings by PKR price</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {featuredListings.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} onSelect={onSelectProperty} />
            ))}
          </div>
        </div>
      </section>

      {/* Deep Navy Editorial Philosophy & Adjacent Client Proof */}
      <section className="bg-[#0F1F38] text-[#FAF7F2] py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#FAF7F2]/65">
              Trusted in Federal B Area · 5 / 5 Rating (2 Reviews)
            </p>
            <h2
              className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight leading-tight text-[#FAF7F2]"
              style={{ textWrap: 'balance' }}
            >
              Dependable guidance for buying, selling, renting, and home development
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#FAF7F2]/80 max-w-lg">
              Reviewers highlight F&amp;F Real Estate for steady reliability when buying or selling
              homes in Federal B Area. Visit us at Sadaf Terrace, Block 7, or speak directly with
              Fahad Iqbal.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="px-5 py-2.5 text-xs font-semibold bg-[#FAF7F2] text-[#0F1F38] rounded-md hover:bg-[#F2ECE1] transition-colors whitespace-nowrap cursor-pointer"
              >
                About F&amp;F Real Estate
              </button>
              <button
                type="button"
                onClick={() => onNavigate('testimonials')}
                className="px-5 py-2.5 text-xs font-semibold text-[#FAF7F2] border border-[#FAF7F2]/30 rounded-md hover:bg-[#FAF7F2]/10 transition-colors whitespace-nowrap cursor-pointer"
              >
                View 5/5 Client Reviews
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#162947] border border-[#FAF7F2]/15 rounded-lg p-7 sm:p-8">
            <p className="text-xs font-medium text-[#FAF7F2]/70">
              {leadTestimonial.rating} Rating · {leadTestimonial.engagementType} ·{' '}
              {leadTestimonial.outcomeMetric}
            </p>
            <blockquote className="mt-4 font-display text-xl sm:text-2xl leading-snug text-[#FAF7F2]">
              “{leadTestimonial.quote}”
            </blockquote>
            <div className="mt-5 pt-4 border-t border-[#FAF7F2]/15 text-xs text-[#FAF7F2]/80">
              <span className="font-semibold text-[#FAF7F2]">{leadTestimonial.clientName}</span>
              <span aria-hidden="true"> · </span>
              <span>{leadTestimonial.role}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Appointment Request Strip */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#4A5B75]">
              Private Scheduling
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[#0F1F38] tracking-tight">
              Schedule a viewing or consultation
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#4A5B75]">
              Select your target budget in PKR and preferred hours. Meet us at Shop # 7, Sadaf
              Terrace, Block 7th St, Federal B Area, Karachi.
            </p>
            <dl className="mt-8 space-y-4 border-t border-[#E2DACB] pt-6 text-sm">
              <div>
                <dt className="text-xs text-[#4A5B75]">Office Hours</dt>
                <dd className="mt-0.5 font-medium text-[#0F1F38] tabular-nums">
                  <span className="block">{BUSINESS_INFO.hoursWeekday}</span>
                  <span className="block">{BUSINESS_INFO.hoursFriday}</span>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#4A5B75]">Direct Phone</dt>
                <dd className="mt-0.5 font-medium text-[#0F1F38] tabular-nums">
                  {BUSINESS_INFO.primaryPhone} ({BUSINESS_INFO.contactPerson}:{' '}
                  {BUSINESS_INFO.secondaryPhone})
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <AppointmentForm
              listings={listings}
              preselectedPropertyId={preselectedPropertyId}
              preselectedBudgetTier={preselectedBudgetTier}
              onAppointmentCreated={onAppointmentCreated}
              idPrefix="home-appt"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
