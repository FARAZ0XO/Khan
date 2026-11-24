import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageId } from '../types/property';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onBookAppointment: () => void;
}

const NAV_ITEMS: Array<{ id: PageId; label: string; href: string }> = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'listings', label: 'Listings', href: '/listings' },
  { id: 'about', label: 'About Us', href: '/about' },
  { id: 'testimonials', label: 'Testimonials', href: '/testimonials' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

export function Navbar({ activePage, onNavigate, onBookAppointment }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, page: PageId) => {
    e.preventDefault();
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-[#E2DACB]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, 'home')}
          className="font-display text-2xl font-semibold tracking-tight text-[#0F1F38] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F1F38]"
        >
          F&amp;F Real Estate
        </a>

        {/* Zone 2: 5 clean single-line text navigation links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F1F38] ${
                  isActive
                    ? 'text-[#0F1F38]'
                    : 'text-[#4A5B75] hover:text-[#0F1F38]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#0F1F38]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onBookAppointment();
            }}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-wide bg-[#0F1F38] text-[#FAF7F2] rounded-md hover:bg-[#1D3458] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F1F38] cursor-pointer"
          >
            Book Appointment
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-[#0F1F38] hover:bg-[#F2ECE1] transition-colors focus-visible:outline-2 focus-visible:outline-[#0F1F38] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2DACB] bg-[#FAF7F2] px-4 py-4">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-3 text-base font-medium rounded-md transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-[#F2ECE1] text-[#0F1F38] font-semibold'
                      : 'text-[#4A5B75] hover:bg-[#F2ECE1]/60 hover:text-[#0F1F38]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-3 mt-2 border-t border-[#E2DACB]">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookAppointment();
                }}
                className="w-full py-3 px-4 text-sm font-semibold bg-[#0F1F38] text-[#FAF7F2] rounded-md hover:bg-[#1D3458] transition-colors cursor-pointer"
              >
                Book Appointment
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
