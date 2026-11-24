import { BUSINESS_INFO } from '../data/properties';
import { PageId } from '../types/property';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleLink = (e: React.MouseEvent, page: PageId) => {
    e.preventDefault();
    onNavigate(page);
  };

  return (
    <footer className="bg-[#0F1F38] text-[#FAF7F2] border-t border-[#1D3458]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#FAF7F2]/15">
          <div className="md:col-span-4">
            <p className="font-display text-2xl font-semibold tracking-tight text-[#FAF7F2]">
              {BUSINESS_INFO.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#FAF7F2]/75 max-w-sm">
              {BUSINESS_INFO.servicesSummary}
            </p>
            <p className="mt-3 text-xs text-[#FAF7F2]/70 tabular-nums">
              {BUSINESS_INFO.ratingScore} Rating · {BUSINESS_INFO.reviewCount} Verified Reviews
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold tracking-wider text-[#FAF7F2]/60 uppercase mb-4">
              Pages
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleLink(e, 'home')}
                  className="text-[#FAF7F2]/85 hover:text-[#FAF7F2] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/listings"
                  onClick={(e) => handleLink(e, 'listings')}
                  className="text-[#FAF7F2]/85 hover:text-[#FAF7F2] transition-colors"
                >
                  Listings
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleLink(e, 'about')}
                  className="text-[#FAF7F2]/85 hover:text-[#FAF7F2] transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/testimonials"
                  onClick={(e) => handleLink(e, 'testimonials')}
                  className="text-[#FAF7F2]/85 hover:text-[#FAF7F2] transition-colors"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleLink(e, 'contact')}
                  className="text-[#FAF7F2]/85 hover:text-[#FAF7F2] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-5">
            <h3 className="text-xs font-semibold tracking-wider text-[#FAF7F2]/60 uppercase mb-4">
              Office &amp; Hours
            </h3>
            <div className="space-y-3 text-sm text-[#FAF7F2]/85">
              <p>{BUSINESS_INFO.address}</p>
              <p className="tabular-nums">
                <span className="block">{BUSINESS_INFO.primaryPhone}</span>
                <span className="block text-[#FAF7F2]/75">
                  {BUSINESS_INFO.contactPerson}: {BUSINESS_INFO.secondaryPhone}
                </span>
              </p>
              <p className="text-xs text-[#FAF7F2]/70 tabular-nums">
                <span className="block">{BUSINESS_INFO.hoursWeekday}</span>
                <span className="block">{BUSINESS_INFO.hoursFriday}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#FAF7F2]/65">
          <p>© 2026 F&amp;F Real Estate. All rights reserved.</p>
          <p>Federal B Area Naseerabad Block 7, Gulberg Town, Karachi, 75950</p>
        </div>
      </div>
    </footer>
  );
}
