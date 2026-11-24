import { useEffect, useState } from 'react';
import { AlertCircle, CalendarCheck2, CheckCircle2 } from 'lucide-react';
import {
  AppointmentInput,
  AppointmentRecord,
  BudgetTierId,
  ConsultationType,
  PropertyListing,
} from '../types/property';
import {
  AppointmentValidationErrors,
  BUDGET_TIERS,
  TIME_WINDOWS,
  buildAppointmentRecord,
  validateAppointmentInput,
} from '../utils/appointmentValidation';

interface AppointmentFormProps {
  listings: PropertyListing[];
  preselectedPropertyId?: string;
  preselectedBudgetTier?: BudgetTierId;
  onAppointmentCreated: (record: AppointmentRecord) => void;
  idPrefix?: string;
}

const CONSULTATION_TYPES: ConsultationType[] = [
  'Buy Property',
  'Sell Property',
  'Rent Property',
  'Residential Development',
  'Private Property Viewing',
];

function getDefaultFutureDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date.toISOString().slice(0, 10);
}

export function AppointmentForm({
  listings,
  preselectedPropertyId = '',
  preselectedBudgetTier = '25m-60m',
  onAppointmentCreated,
  idPrefix = 'appt',
}: AppointmentFormProps) {
  const [formState, setFormState] = useState<AppointmentInput>({
    fullName: '',
    email: '',
    phone: '',
    consultationType: preselectedPropertyId ? 'Private Property Viewing' : 'Buy Property',
    propertyId: preselectedPropertyId,
    budgetTier: preselectedBudgetTier,
    customBudget: '',
    preferredDate: getDefaultFutureDate(),
    preferredTime: TIME_WINDOWS[0],
    notes: '',
  });

  const [errors, setErrors] = useState<AppointmentValidationErrors>({});
  const [confirmedRecord, setConfirmedRecord] = useState<AppointmentRecord | null>(null);
  const [submissionCount, setSubmissionCount] = useState(1);

  useEffect(() => {
    if (preselectedPropertyId) {
      setFormState((prev) => ({
        ...prev,
        propertyId: preselectedPropertyId,
        consultationType: 'Private Property Viewing',
        budgetTier: preselectedBudgetTier,
      }));
      setConfirmedRecord(null);
    }
  }, [preselectedPropertyId, preselectedBudgetTier]);

  const updateField = <K extends keyof AppointmentInput>(field: K, value: AppointmentInput[K]) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (field in errors) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof AppointmentValidationErrors];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateAppointmentInput(formState);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const record = buildAppointmentRecord(formState, listings, submissionCount);
    setSubmissionCount((c) => c + 1);
    setConfirmedRecord(record);
    setErrors({});
    onAppointmentCreated(record);
  };

  const handleBookAnother = () => {
    setConfirmedRecord(null);
    setFormState((prev) => ({
      ...prev,
      fullName: '',
      email: '',
      phone: '',
      customBudget: '',
      notes: '',
    }));
  };

  if (confirmedRecord) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-[#FDFBF7] border border-[#E2DACB] rounded-lg p-6 sm:p-8"
      >
        <div className="flex items-start gap-3 text-[#1E4D3B]">
          <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider">
              Appointment Request Confirmed
            </p>
            <h3 className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-[#0F1F38]">
              We look forward to meeting you, {confirmedRecord.fullName}
            </h3>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 border-y border-[#E2DACB] text-sm">
          <div>
            <dt className="text-xs text-[#4A5B75]">Reference ID</dt>
            <dd className="mt-0.5 font-semibold text-[#0F1F38] tabular-nums">
              {confirmedRecord.referenceId}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[#4A5B75]">Service / Consultation</dt>
            <dd className="mt-0.5 font-semibold text-[#0F1F38]">
              {confirmedRecord.consultationType}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[#4A5B75]">Property / Scope</dt>
            <dd className="mt-0.5 font-semibold text-[#0F1F38]">
              {confirmedRecord.propertyTitle}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[#4A5B75]">Allocated Budget (PKR)</dt>
            <dd className="mt-0.5 font-semibold text-[#0F1F38] tabular-nums">
              {confirmedRecord.budgetLabel}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[#4A5B75]">Preferred Date &amp; Time</dt>
            <dd className="mt-0.5 font-semibold text-[#0F1F38] tabular-nums">
              {confirmedRecord.preferredDate} · {confirmedRecord.preferredTime}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[#4A5B75]">Contact Confirmation</dt>
            <dd className="mt-0.5 font-semibold text-[#0F1F38]">{confirmedRecord.email}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-[#4A5B75]">
            Fahad Iqbal or an F&amp;F Real Estate advisor will confirm your visit shortly.
          </p>
          <button
            type="button"
            onClick={handleBookAnother}
            className="px-4 py-2.5 text-xs font-semibold bg-[#0F1F38] text-[#FAF7F2] rounded-md hover:bg-[#1D3458] transition-colors whitespace-nowrap cursor-pointer"
          >
            Schedule Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-[#FDFBF7] border border-[#E2DACB] rounded-lg p-6 sm:p-8 space-y-6"
    >
      <div>
        <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#0F1F38] tracking-tight">
          Request a Private Appointment
        </h3>
        <p className="mt-1.5 text-sm text-[#4A5B75]">
          Share your preferred schedule and target budget in PKR so we can prepare tailored Federal
          B Area options.
        </p>
      </div>

      {/* Contact identity fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label
            htmlFor={`${idPrefix}-full-name`}
            className="block text-xs font-semibold text-[#0F1F38] mb-1.5"
          >
            Full Name <span className="text-[#9B2C2C]">*</span>
          </label>
          <input
            id={`${idPrefix}-full-name`}
            type="text"
            required
            value={formState.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            placeholder="e.g. Tariq Mahmood"
            aria-invalid={Boolean(errors.fullName)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] text-[#0F1F38] border border-[#D8CFC0] rounded-md focus:outline-none focus:border-[#0F1F38] focus:ring-1 focus:ring-[#0F1F38]"
          />
          {errors.fullName && (
            <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-[#9B2C2C]">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-email`}
            className="block text-xs font-semibold text-[#0F1F38] mb-1.5"
          >
            Email Address <span className="text-[#9B2C2C]">*</span>
          </label>
          <input
            id={`${idPrefix}-email`}
            type="email"
            required
            value={formState.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="name@domain.com"
            aria-invalid={Boolean(errors.email)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] text-[#0F1F38] border border-[#D8CFC0] rounded-md focus:outline-none focus:border-[#0F1F38] focus:ring-1 focus:ring-[#0F1F38]"
          />
          {errors.email && (
            <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-[#9B2C2C]">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-phone`}
            className="block text-xs font-semibold text-[#0F1F38] mb-1.5"
          >
            Phone Number <span className="text-[#9B2C2C]">*</span>
          </label>
          <input
            id={`${idPrefix}-phone`}
            type="tel"
            required
            value={formState.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="+92 334 1360110"
            aria-invalid={Boolean(errors.phone)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] text-[#0F1F38] border border-[#D8CFC0] rounded-md focus:outline-none focus:border-[#0F1F38] focus:ring-1 focus:ring-[#0F1F38]"
          />
          {errors.phone && (
            <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-[#9B2C2C]">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>
      </div>

      {/* Consultation scope & property */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={`${idPrefix}-consultation-type`}
            className="block text-xs font-semibold text-[#0F1F38] mb-1.5"
          >
            Service Needed
          </label>
          <select
            id={`${idPrefix}-consultation-type`}
            value={formState.consultationType}
            onChange={(e) =>
              updateField('consultationType', e.target.value as ConsultationType)
            }
            className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] text-[#0F1F38] border border-[#D8CFC0] rounded-md focus:outline-none focus:border-[#0F1F38] focus:ring-1 focus:ring-[#0F1F38]"
          >
            {CONSULTATION_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-property`}
            className="block text-xs font-semibold text-[#0F1F38] mb-1.5"
          >
            Property of Interest
          </label>
          <select
            id={`${idPrefix}-property`}
            value={formState.propertyId}
            onChange={(e) => updateField('propertyId', e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] text-[#0F1F38] border border-[#D8CFC0] rounded-md focus:outline-none focus:border-[#0F1F38] focus:ring-1 focus:ring-[#0F1F38]"
          >
            <option value="">General Federal B Area Inquiry</option>
            {listings.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title} ({item.neighborhood})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Budget Selection */}
      <fieldset className="space-y-2.5">
        <legend className="text-xs font-semibold text-[#0F1F38]">
          Target Budget Range (PKR) <span className="text-[#9B2C2C]">*</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {BUDGET_TIERS.map((tier) => {
            const active = formState.budgetTier === tier.id;
            return (
              <button
                key={tier.id}
                type="button"
                aria-pressed={active}
                onClick={() => updateField('budgetTier', tier.id)}
                className={`px-3.5 py-2.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[#0F1F38] text-[#FAF7F2] border-[#0F1F38]'
                    : 'bg-[#FAF7F2] text-[#0F1F38] border-[#D8CFC0] hover:border-[#0F1F38]/50'
                }`}
              >
                {tier.label}
              </button>
            );
          })}
        </div>

        <div className="pt-1">
          <label
            htmlFor={`${idPrefix}-custom-budget`}
            className="block text-xs text-[#4A5B75] mb-1.5"
          >
            {formState.budgetTier === 'custom'
              ? 'Exact Target Budget (PKR) *'
              : 'Optional Exact Target Budget (PKR)'}
          </label>
          <input
            id={`${idPrefix}-custom-budget`}
            type="text"
            inputMode="numeric"
            value={formState.customBudget}
            onChange={(e) => updateField('customBudget', e.target.value)}
            placeholder="e.g. 45000000"
            aria-invalid={Boolean(errors.customBudget)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] text-[#0F1F38] border border-[#D8CFC0] rounded-md tabular-nums focus:outline-none focus:border-[#0F1F38] focus:ring-1 focus:ring-[#0F1F38]"
          />
          {errors.customBudget && (
            <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-[#9B2C2C]">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.customBudget}</span>
            </p>
          )}
        </div>
      </fieldset>

      {/* Date and Time Window */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={`${idPrefix}-date`}
            className="block text-xs font-semibold text-[#0F1F38] mb-1.5"
          >
            Preferred Date <span className="text-[#9B2C2C]">*</span>
          </label>
          <input
            id={`${idPrefix}-date`}
            type="date"
            required
            value={formState.preferredDate}
            onChange={(e) => updateField('preferredDate', e.target.value)}
            aria-invalid={Boolean(errors.preferredDate)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] text-[#0F1F38] border border-[#D8CFC0] rounded-md tabular-nums focus:outline-none focus:border-[#0F1F38] focus:ring-1 focus:ring-[#0F1F38]"
          />
          {errors.preferredDate && (
            <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-[#9B2C2C]">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.preferredDate}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-time`}
            className="block text-xs font-semibold text-[#0F1F38] mb-1.5"
          >
            Preferred Time Window <span className="text-[#9B2C2C]">*</span>
          </label>
          <select
            id={`${idPrefix}-time`}
            value={formState.preferredTime}
            onChange={(e) => updateField('preferredTime', e.target.value)}
            aria-invalid={Boolean(errors.preferredTime)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] text-[#0F1F38] border border-[#D8CFC0] rounded-md focus:outline-none focus:border-[#0F1F38] focus:ring-1 focus:ring-[#0F1F38]"
          >
            {TIME_WINDOWS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.preferredTime && (
            <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-[#9B2C2C]">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.preferredTime}</span>
            </p>
          )}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label
          htmlFor={`${idPrefix}-notes`}
          className="block text-xs font-semibold text-[#0F1F38] mb-1.5"
        >
          Architectural Preferences or Notes
        </label>
        <textarea
          id={`${idPrefix}-notes`}
          rows={3}
          value={formState.notes}
          onChange={(e) => updateField('notes', e.target.value)}
          placeholder="Tell us about neighborhood priorities, timeline, or specific architectural features..."
          className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] text-[#0F1F38] border border-[#D8CFC0] rounded-md focus:outline-none focus:border-[#0F1F38] focus:ring-1 focus:ring-[#0F1F38]"
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-[#0F1F38] text-[#FAF7F2] rounded-md hover:bg-[#1D3458] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F1F38] cursor-pointer"
      >
        <CalendarCheck2 className="w-4 h-4" aria-hidden="true" />
        <span>Confirm Appointment Request</span>
      </button>
    </form>
  );
}
