import { ABOUT_STUDIO_IMAGE, BUSINESS_INFO } from '../data/properties';
import { PageId } from '../types/property';
import { SafeImage } from '../components/SafeImage';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

const SERVICES = [
  {
    title: '01. Buying Properties',
    description:
      'Verified residential homes, portions, and apartments across Federal B Area blocks with full KDA lease verification and transparent PKR market pricing.',
  },
  {
    title: '02. Selling Properties',
    description:
      'Accurate neighborhood valuation, vetted buyer matching, and organized transfer documentation so homeowners sell reliably without wasted viewings.',
  },
  {
    title: '03. Renting Properties',
    description:
      'Dependable residential and family rental placements across Naseerabad Block 7, Gulberg Town, and neighboring Federal B Area blocks.',
  },
  {
    title: '04. Residential Home Development',
    description:
      'Turn-key residential construction and structural development in Federal B Area built with documented material standards and clean title handovers.',
  },
];

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
      {/* Intro Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        <div className="lg:col-span-6 flex flex-col justify-center">
          <p className="text-xs font-semibold tracking-wider uppercase text-[#4A5B75]">
            About {BUSINESS_INFO.name}
          </p>
          <h1
            className="mt-2 font-display text-4xl sm:text-5xl font-semibold text-[#0F1F38] tracking-tight leading-[1.08]"
            style={{ textWrap: 'balance' }}
          >
            Dedicated real estate &amp; home development in Federal B Area
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[#243B5E]">
            Located at {BUSINESS_INFO.address}, F&amp;F Real Estate serves families, investors, and
            homeowners across Gulberg Town and Karachi with straightforward, reliable property
            guidance.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#4A5B75]">
            Rated {BUSINESS_INFO.ratingScore} across verified client feedback, our team focuses on
            honest pricing in PKR, clear title verification, and personal follow-through on every
            transaction.
          </p>
        </div>

        <div className="lg:col-span-6">
          <div className="aspect-[4/3] lg:h-full rounded-lg overflow-hidden border border-[#E2DACB] bg-[#F2ECE1]">
            <SafeImage
              src={ABOUT_STUDIO_IMAGE.url}
              alt={ABOUT_STUDIO_IMAGE.alt}
              fallbackTitle="F&F Real Estate Office — Federal B Area"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="pt-12 border-t border-[#E2DACB]">
        <div className="max-w-xl mb-10">
          <p className="text-xs font-semibold tracking-wider uppercase text-[#4A5B75]">
            Our Services
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[#0F1F38] tracking-tight">
            What we handle in Federal B Area
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="bg-[#FDFBF7] border border-[#E2DACB] rounded-lg p-6 sm:p-7"
            >
              <h3 className="font-display text-2xl font-semibold text-[#0F1F38]">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4A5B75]">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Office & Principal Lead */}
      <section className="bg-[#0F1F38] text-[#FAF7F2] rounded-lg p-7 sm:p-10 lg:p-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#FAF7F2]/15">
          <div>
            <p className="text-xs font-semibold tracking-wider uppercase text-[#FAF7F2]/65">
              Direct Office Leadership
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
              Speak directly with our office
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 text-xs font-semibold bg-[#FAF7F2] text-[#0F1F38] rounded-md hover:bg-[#F2ECE1] transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
          >
            Book Office Appointment
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-display text-2xl font-semibold text-[#FAF7F2]">
              {BUSINESS_INFO.contactPerson}
            </h3>
            <p className="mt-1 text-xs font-medium text-[#FAF7F2]/70">
              Property Advisor · Federal B Area
            </p>
            <p className="mt-3 text-[#FAF7F2]/85 tabular-nums">
              Direct: {BUSINESS_INFO.secondaryPhone}
              <br />
              Office: {BUSINESS_INFO.primaryPhone}
            </p>
          </div>

          <div>
            <h3 className="font-display text-2xl font-semibold text-[#FAF7F2]">Office Address</h3>
            <p className="mt-2 leading-relaxed text-[#FAF7F2]/80">{BUSINESS_INFO.address}</p>
          </div>

          <div>
            <h3 className="font-display text-2xl font-semibold text-[#FAF7F2]">Opening Hours</h3>
            <p className="mt-2 leading-relaxed text-[#FAF7F2]/80 tabular-nums">
              <span className="block">{BUSINESS_INFO.hoursWeekday}</span>
              <span className="block">{BUSINESS_INFO.hoursFriday}</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
