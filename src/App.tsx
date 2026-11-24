import { useEffect, useState } from 'react';
import { PROPERTY_LISTINGS } from './data/properties';
import {
  AppointmentRecord,
  BudgetTierId,
  PageId,
  PropertyListing,
} from './types/property';
import { getBudgetTierForPrice } from './utils/listingFilters';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { AboutPage } from './pages/AboutPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ContactPage } from './pages/ContactPage';

const APPOINTMENTS_STORAGE_KEY = 'ff_realestate_appointments_v1';

const PATH_TO_PAGE: Record<string, PageId> = {
  '/': 'home',
  '/listings': 'listings',
  '/about': 'about',
  '/testimonials': 'testimonials',
  '/contact': 'contact',
};

const PAGE_TO_PATH: Record<PageId, string> = {
  home: '/',
  listings: '/listings',
  about: '/about',
  testimonials: '/testimonials',
  contact: '/contact',
};

function getInitialPage(): PageId {
  const pathname = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  return PATH_TO_PAGE[pathname] ?? 'home';
}

function loadStoredAppointments(): AppointmentRecord[] {
  try {
    const raw = window.localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>(getInitialPage);
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(null);
  const [bookingPropertyId, setBookingPropertyId] = useState<string>('');
  const [bookingBudgetTier, setBookingBudgetTier] = useState<BudgetTierId>('25m-60m');
  const [appointments, setAppointments] = useState<AppointmentRecord[]>(loadStoredAppointments);

  useEffect(() => {
    const handlePopState = () => {
      setActivePage(getInitialPage());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: PageId) => {
    setActivePage(page);
    const targetPath = PAGE_TO_PATH[page];
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleBookFromModal = (listing: PropertyListing) => {
    setSelectedProperty(null);
    setBookingPropertyId(listing.id);
    setBookingBudgetTier(getBudgetTierForPrice(listing.price));
    navigateTo('contact');
  };

  const handleAppointmentCreated = (record: AppointmentRecord) => {
    setAppointments((prev) => {
      const updated = [record, ...prev];
      try {
        window.localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore storage quota errors gracefully
      }
      return updated;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#0F1F38]">
      <Navbar
        activePage={activePage}
        onNavigate={navigateTo}
        onBookAppointment={() => navigateTo('contact')}
      />

      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            listings={PROPERTY_LISTINGS}
            onNavigate={navigateTo}
            onSelectProperty={setSelectedProperty}
            onAppointmentCreated={handleAppointmentCreated}
            preselectedPropertyId={bookingPropertyId}
            preselectedBudgetTier={bookingBudgetTier}
          />
        )}

        {activePage === 'listings' && (
          <ListingsPage
            listings={PROPERTY_LISTINGS}
            onSelectProperty={setSelectedProperty}
          />
        )}

        {activePage === 'about' && <AboutPage onNavigate={navigateTo} />}

        {activePage === 'testimonials' && <TestimonialsPage onNavigate={navigateTo} />}

        {activePage === 'contact' && (
          <ContactPage
            listings={PROPERTY_LISTINGS}
            preselectedPropertyId={bookingPropertyId}
            preselectedBudgetTier={bookingBudgetTier}
            appointments={appointments}
            onAppointmentCreated={handleAppointmentCreated}
          />
        )}
      </main>

      <Footer onNavigate={navigateTo} />

      <PropertyDetailModal
        listing={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onBookViewing={handleBookFromModal}
      />
    </div>
  );
}
