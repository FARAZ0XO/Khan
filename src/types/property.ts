export type PageId = 'home' | 'listings' | 'about' | 'testimonials' | 'contact';

export type PropertyCategory = 'All' | 'House' | 'Apartment' | 'Townhouse' | 'Development';

export type SortOption = 'featured' | 'price-asc' | 'price-desc';

export interface PropertyListing {
  id: string;
  title: string;
  location: string;
  neighborhood: string;
  category: Exclude<PropertyCategory, 'All'>;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
  architect: string;
  imageUrl: string;
  imageAlt: string;
  summary: string;
  highlights: string[];
  featured?: boolean;
}

export interface PriceFilterState {
  minPrice: number;
  maxPrice: number;
  category: PropertyCategory;
  searchQuery: string;
  sortBy: SortOption;
}

export type BudgetTierId = 'under-25m' | '25m-60m' | '60m-100m' | 'over-100m' | 'custom';

export type ConsultationType =
  | 'Buy Property'
  | 'Sell Property'
  | 'Rent Property'
  | 'Residential Development'
  | 'Private Property Viewing';

export interface AppointmentInput {
  fullName: string;
  email: string;
  phone: string;
  consultationType: ConsultationType;
  propertyId: string;
  budgetTier: BudgetTierId;
  customBudget: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

export interface AppointmentRecord {
  referenceId: string;
  fullName: string;
  email: string;
  phone: string;
  consultationType: ConsultationType;
  propertyTitle: string;
  budgetLabel: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  createdAt: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  location: string;
  engagementType: 'Buying' | 'Selling';
  rating: string;
  outcomeMetric: string;
  propertyLabel: string;
  quote: string;
}
