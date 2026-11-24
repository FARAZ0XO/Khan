import {
  AppointmentInput,
  AppointmentRecord,
  BudgetTierId,
  PropertyListing,
} from '../types/property';
import { formatCurrency } from './listingFilters';

export const BUDGET_TIERS: Array<{ id: BudgetTierId; label: string }> = [
  { id: 'under-25m', label: 'Under PKR 25M' },
  { id: '25m-60m', label: 'PKR 25M – 60M' },
  { id: '60m-100m', label: 'PKR 60M – 100M' },
  { id: 'over-100m', label: 'PKR 100M+' },
  { id: 'custom', label: 'Custom PKR' },
];

export const TIME_WINDOWS = [
  'Afternoon (12:00 PM – 4:00 PM)',
  'Evening (4:00 PM – 8:00 PM)',
  'Night (8:00 PM – 12:00 AM)',
  'Friday Post-Jummah (3:00 PM – 7:00 PM)',
] as const;

export type AppointmentValidationErrors = Partial<
  Record<
    'fullName' | 'email' | 'phone' | 'preferredDate' | 'preferredTime' | 'budgetTier' | 'customBudget',
    string
  >
>;

export function validateAppointmentInput(
  input: AppointmentInput,
  todayIso: string = new Date().toISOString().slice(0, 10)
): AppointmentValidationErrors {
  const errors: AppointmentValidationErrors = {};

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!input.email || !emailPattern.test(input.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  const digitCount = (input.phone || '').replace(/\D/g, '').length;
  if (digitCount < 7) {
    errors.phone = 'Please enter a valid phone number (at least 7 digits).';
  }

  if (!input.preferredDate || !/^\d{4}-\d{2}-\d{2}$/.test(input.preferredDate)) {
    errors.preferredDate = 'Please select a preferred appointment date.';
  } else if (input.preferredDate < todayIso) {
    errors.preferredDate = 'Please select today or a future date.';
  }

  if (!input.preferredTime || input.preferredTime.trim().length === 0) {
    errors.preferredTime = 'Please choose a preferred time window.';
  }

  if (!input.budgetTier) {
    errors.budgetTier = 'Please select an estimated budget range in PKR.';
  }

  if (input.budgetTier === 'custom') {
    const numericBudget = Number(input.customBudget.replace(/[^0-9.]/g, ''));
    if (!input.customBudget.trim() || !Number.isFinite(numericBudget) || numericBudget < 50_000) {
      errors.customBudget = 'Please enter a target budget of at least PKR 50,000.';
    }
  } else if (input.customBudget.trim().length > 0) {
    const numericBudget = Number(input.customBudget.replace(/[^0-9.]/g, ''));
    if (!Number.isFinite(numericBudget) || numericBudget < 50_000) {
      errors.customBudget = 'Optional exact budget must be at least PKR 50,000.';
    }
  }

  return errors;
}

export function resolveBudgetLabel(budgetTier: BudgetTierId, customBudget: string): string {
  const cleanedNumeric = Number(customBudget.replace(/[^0-9.]/g, ''));
  if (budgetTier === 'custom' && Number.isFinite(cleanedNumeric) && cleanedNumeric >= 50_000) {
    return `${formatCurrency(cleanedNumeric)} (Target)`;
  }
  const tierLabel = BUDGET_TIERS.find((t) => t.id === budgetTier)?.label ?? 'PKR 25M – 60M';
  if (customBudget.trim().length > 0 && Number.isFinite(cleanedNumeric) && cleanedNumeric >= 50_000) {
    return `${tierLabel} · Exact: ${formatCurrency(cleanedNumeric)}`;
  }
  return tierLabel;
}

export function buildAppointmentRecord(
  input: AppointmentInput,
  listings: PropertyListing[],
  sequenceNumber = 1
): AppointmentRecord {
  const matchedProperty = listings.find((p) => p.id === input.propertyId);
  const propertyTitle = matchedProperty
    ? matchedProperty.title
    : `${input.consultationType} — Federal B Area`;
  const paddedSeq = String(sequenceNumber).padStart(3, '0');
  const dateCompact = input.preferredDate.replace(/-/g, '').slice(2);

  return {
    referenceId: `FF-${dateCompact}-${paddedSeq}`,
    fullName: input.fullName.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    consultationType: input.consultationType,
    propertyTitle,
    budgetLabel: resolveBudgetLabel(input.budgetTier, input.customBudget),
    preferredDate: input.preferredDate,
    preferredTime: input.preferredTime,
    notes: input.notes.trim(),
    createdAt: new Date().toISOString(),
  };
}
