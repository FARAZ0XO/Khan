import { PropertyListing, TestimonialItem } from '../types/property';

export const BUSINESS_INFO = {
  name: 'F&F Real Estate',
  shortLocation: 'Federal B Area, Karachi',
  address:
    'Shop # 7, Sadaf Terrace, Block 7th St, near K.K.F General Hospital, Federal B Area Naseerabad Block 7, Gulberg Town, Karachi, 75950',
  primaryPhone: '+92 334 1360110',
  contactPerson: 'Fahad Iqbal',
  secondaryPhone: '0333 3362140',
  hoursWeekday: 'Mon–Thu, Sat–Sun: 12:00 PM – 12:00 AM',
  hoursFriday: 'Fri: 3:00 PM – 12:00 AM',
  servicesSummary:
    'Buying, selling, renting properties, and residential home development in Federal B Area.',
  ratingScore: '5 / 5',
  reviewCount: 2,
} as const;

export const HERO_IMAGE = {
  url: '/src/assets/images/hero_cream_navy_villa_1795514398574.jpg',
  alt: 'Minimalist limestone and cream stucco residence illuminated at dusk against a deep navy twilight sky',
};

export const ABOUT_STUDIO_IMAGE = {
  url: '/src/assets/images/about_studio_interior_1795514399815.jpg',
  alt: 'F&F Real Estate consultation office with warm cream walls, oak table, and deep navy chairs',
};

export const LISTING_PRICE_BOUNDS = {
  MIN: 10_000_000,
  MAX: 120_000_000,
  STEP: 2_500_000,
} as const;

export const PRICE_PRESETS: Array<{
  id: string;
  label: string;
  minPrice: number;
  maxPrice: number;
}> = [
  { id: 'all', label: 'All Prices', minPrice: 10_000_000, maxPrice: 120_000_000 },
  { id: 'under-25m', label: 'Under PKR 25M', minPrice: 10_000_000, maxPrice: 25_000_000 },
  { id: '25m-60m', label: 'PKR 25M – 60M', minPrice: 25_000_000, maxPrice: 60_000_000 },
  { id: '60m-120m', label: 'PKR 60M – 120M', minPrice: 60_000_000, maxPrice: 120_000_000 },
];

export const PROPERTY_LISTINGS: PropertyListing[] = [
  {
    id: 'naseerabad-block7-residence',
    title: 'Naseerabad Block 7 Corner House',
    location: 'Federal B Area, Karachi',
    neighborhood: 'Naseerabad Block 7',
    category: 'House',
    price: 58_000_000,
    beds: 5,
    baths: 5,
    sqft: 3_600,
    yearBuilt: 2024,
    architect: 'F&F Residential Development',
    imageUrl: '/src/assets/images/hero_cream_navy_villa_1795514398574.jpg',
    imageAlt: 'Modern cream stone and glass residential house in Federal B Area illuminated at dusk',
    summary:
      'Newly built 400 sq. yd. corner residence near K.K.F General Hospital in Block 7, featuring double-unit living, wide car porch, and solid tile work.',
    highlights: [
      'Corner 400 sq. yd. plot on wide Block 7 street',
      'Separate entrance for ground & upper unit',
      'Underground water tank & backup solar wiring',
      'Walking distance to Sadaf Terrace & main road',
    ],
    featured: true,
  },
  {
    id: 'sadaf-terrace-apartment',
    title: 'Sadaf Terrace Executive Apartment',
    location: 'Federal B Area, Karachi',
    neighborhood: 'Block 7, Gulberg Town',
    category: 'Apartment',
    price: 18_500_000,
    beds: 3,
    baths: 3,
    sqft: 1_850,
    yearBuilt: 2022,
    architect: 'Gulberg Civic Builders',
    imageUrl: '/src/assets/images/listing_penthouse_suite_1795514399227.jpg',
    imageAlt: 'Sunlit apartment living room with cream plaster walls and navy upholstered seating',
    summary:
      'Well-ventilated 3-bedroom apartment in the heart of Block 7, offering clear leased documentation, lift access, and dedicated covered parking.',
    highlights: [
      'Clean KDA lease & verified transfer record',
      'Standby generator & 24-hour building security',
      'West-open balcony with clear cross-ventilation',
      'Immediate proximity to schools & hospitals',
    ],
    featured: true,
  },
  {
    id: 'gulberg-block10-villa',
    title: 'Gulberg Block 10 Architect Villa',
    location: 'Gulberg Town, Karachi',
    neighborhood: 'Block 10, Federal B Area',
    category: 'House',
    price: 95_000_000,
    beds: 6,
    baths: 6,
    sqft: 5_400,
    yearBuilt: 2025,
    architect: 'F&F Residential Development',
    imageUrl: '/src/assets/images/listing_country_estate_1795514400528.jpg',
    imageAlt: 'Spacious cream limestone residential villa with landscaped courtyard and large windows',
    summary:
      'Flagship 600 sq. yd. custom-developed family residence combining imported stone elevation, formal drawing/dining suites, and landscaped front lawn.',
    highlights: [
      '600 sq. yd. leased plot in quiet cul-de-sac',
      'Basement lounge & rooftop entertainment deck',
      'Concealed inverter climate control across all floors',
      'Custom ashwood kitchen & servant quarters',
    ],
    featured: true,
  },
  {
    id: 'karimabad-heritage-townhouse',
    title: 'Karimabad Block 3 Townhouse',
    location: 'Federal B Area, Karachi',
    neighborhood: 'Block 3, Karimabad',
    category: 'Townhouse',
    price: 42_000_000,
    beds: 4,
    baths: 4,
    sqft: 2_400,
    yearBuilt: 2021,
    architect: 'Karachi Urban Restorations',
    imageUrl: '/src/assets/images/listing_townhouse_atelier_1795514399031.jpg',
    imageAlt: 'Restored cream stone urban townhouse with deep navy entrance door and tall windows',
    summary:
      'Renovated 240 sq. yd. residential house with crisp limestone facade, deep navy main entrance, and dual-family flexibility near Shahrah-e-Pakistan.',
    highlights: [
      '240 sq. yd. fully renovated double-storey house',
      'Two-car tiled porch with motorized gate',
      'Direct access to Shahrah-e-Pakistan & metro links',
      'Zero pending utility or municipal dues',
    ],
  },
  {
    id: 'water-pump-sky-suite',
    title: 'Water Pump Block 16 Penthouse',
    location: 'Federal B Area, Karachi',
    neighborhood: 'Block 16, Water Pump',
    category: 'Apartment',
    price: 31_500_000,
    beds: 4,
    baths: 4,
    sqft: 2_650,
    yearBuilt: 2023,
    architect: 'Sato Urban Associates',
    imageUrl: '/src/assets/images/listing_penthouse_suite_1795514399227.jpg',
    imageAlt: 'Minimalist cream and navy penthouse living space with floor-to-ceiling windows',
    summary:
      'Top-floor family suite featuring wrap-around terrace views, formal lounge, and strong rental yield potential in a prime commercial-residential hub.',
    highlights: [
      'Private terrace with shaded seating area',
      'Strong long-term rental demand in Block 16',
      'Dual passenger and cargo elevators',
      'Ready for immediate possession',
    ],
  },
  {
    id: 'ayesha-manzil-development',
    title: 'Block 9 Turn-Key Development Home',
    location: 'Federal B Area, Karachi',
    neighborhood: 'Block 9, Dastagir',
    category: 'Development',
    price: 23_500_000,
    beds: 3,
    baths: 3,
    sqft: 1_620,
    yearBuilt: 2025,
    architect: 'F&F Residential Development',
    imageUrl: '/src/assets/images/hero_cream_navy_villa_1795514398574.jpg',
    imageAlt: 'Newly developed cream residential home with modern glass windows and evening lighting',
    summary:
      'Freshly developed 120 sq. yd. contemporary residence built by our residential development team with transparent structural material specifications.',
    highlights: [
      'Brand-new 2025 construction with 1-year structural warranty',
      'DG Khan cement & Amreli steel construction log',
      'Clean title & immediate KDA transfer readiness',
      'Ideal for both end-users and rental income',
    ],
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    clientName: 'Tariq & Sadia Mahmood',
    role: 'Homeowners · Federal B Area Block 7',
    location: 'Federal B Area, Karachi',
    engagementType: 'Buying',
    rating: '5 / 5',
    outcomeMetric: 'Verified lease & smooth transfer in 18 days',
    propertyLabel: 'Residential Home Purchase · Block 7',
    quote:
      'F&F Real Estate proved completely reliable when we were buying our family home in Federal B Area. Fahad Iqbal walked us through every title paper, arranged clean inspections near Block 7, and kept pricing transparent from day one.',
  },
  {
    id: 't-2',
    clientName: 'Kamran Siddiqui',
    role: 'Property Owner · Gulberg Town',
    location: 'Federal B Area, Karachi',
    engagementType: 'Selling',
    rating: '5 / 5',
    outcomeMetric: 'Sold at full asking valuation in 3 weeks',
    propertyLabel: 'House Sale · Naseerabad Block 7',
    quote:
      'Selling a house in Federal B Area can be stressful, but F&F Real Estate handled buyer verification, fair market valuation, and closing paperwork with remarkable reliability and zero wasted visits.',
  },
];
