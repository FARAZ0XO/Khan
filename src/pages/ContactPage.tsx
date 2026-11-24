import { Building2, Clock, MapPin, Phone, Star } from 'lucide-react';
import { BUSINESS_INFO } from '../data/properties';
import {
  AppointmentRecord,
  BudgetTierId,
  PropertyListing,
} from '../types/property';
import { AppointmentForm } from '../components/AppointmentForm';

interface ContactPageProps {
  listings: PropertyListing[];
  preselectedPropertyId: string;
  preselectedBudgetTier: BudgetTierId;
  appointments: AppointmentRecord[];
  onAppointmentCreated: (record: AppointmentRecord) => void;
}

export function ContactPage({
  listings,
  preselectedPropertyId,
  preselectedBudgetTier,
  appointments,
  onAppointmentCreated,
}: ContactPageProps) {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold tracking-wider uppercase text-[#4A5B75]">
          Contact &amp; Scheduling · {BUSINESS_INFO.name}
        </p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold text-[#0F1F38] tracking-tight">
          Book an Appointment
        </h1>
        <p className="mt-3 text-base text-[#4A5B75] leading-relaxed">
          Visit our Sadaf Terrace office in Federal B Area Block 7 or submit your details and PKR
          budget below to schedule a property viewing or development consultation.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Office Contact Details & Recent Session Requests */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0F1F38] text-[#FAF7F2] rounded-lg p-7 space-y-6">
            <div>
              <h2 className="font-display text-2xl font-semibold">{BUSINESS_INFO.name}</h2>
              <p className="mt-1 text-xs text-[#FAF7F2]/75">
                Federal B Area Naseerabad Block 7 · Gulberg Town, Karachi
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FAF7F2]/75 shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <p className="font-semibold">Office Address</p>
                  <p className="text-[#FAF7F2]/80 leading-relaxed">{BUSINESS_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-[#FAF7F2]/15">
                <Phone className="w-4 h-4 text-[#FAF7F2]/75 shrink-0 mt-1" aria-hidden="true" />
                <div className="tabular-nums">
                  <p className="font-semibold">{BUSINESS_INFO.primaryPhone}</p>
                  <p className="text-[#FAF7F2]/80">
                    {BUSINESS_INFO.contactPerson}: {BUSINESS_INFO.secondaryPhone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#FAF7F2]/75 shrink-0 mt-1" aria-hidden="true" />
                <div className="tabular-nums">
                  <p>{BUSINESS_INFO.hoursWeekday}</p>
                  <p className="text-[#FAF7F2]/80">{BUSINESS_INFO.hoursFriday}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-[#FAF7F2]/15">
                <Building2
                  className="w-4 h-4 text-[#FAF7F2]/75 shrink-0 mt-1"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold">Services</p>
                  <p className="text-[#FAF7F2]/80 leading-relaxed">
                    {BUSINESS_INFO.servicesSummary}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Star className="w-4 h-4 text-[#FAF7F2] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="tabular-nums">
                  <p className="font-semibold">
                    {BUSINESS_INFO.ratingScore} Rating ({BUSINESS_INFO.reviewCount} Reviews)
                  </p>
                  <p className="text-xs text-[#FAF7F2]/75">
                    Reviewers highlight reliability for buying or selling homes in Federal B Area.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {appointments.length > 0 && (
            <section
              aria-label="Scheduled appointments"
              className="bg-[#FDFBF7] border border-[#E2DACB] rounded-lg p-6"
            >
              <h2 className="text-xs font-semibold tracking-wider uppercase text-[#4A5B75]">
                Your Requested Appointments ({appointments.length})
              </h2>
              <ul className="mt-4 divide-y divide-[#E2DACB]">
                {appointments.map((appt) => (
                  <li key={appt.referenceId} className="py-3 first:pt-0 last:pb-0 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-[#0F1F38]">{appt.propertyTitle}</span>
                      <span className="text-xs font-medium text-[#4A5B75] tabular-nums">
                        {appt.referenceId}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#4A5B75] tabular-nums">
                      {appt.preferredDate} · {appt.preferredTime}
                    </p>
                    <p className="mt-0.5 text-xs text-[#0F1F38] tabular-nums">
                      Budget: {appt.budgetLabel}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Appointment Form */}
        <div className="lg:col-span-7">
          <AppointmentForm
            listings={listings}
            preselectedPropertyId={preselectedPropertyId}
            preselectedBudgetTier={preselectedBudgetTier}
            onAppointmentCreated={onAppointmentCreated}
            idPrefix="contact-appt"
          />
        </div>
      </div>
    </div>
  );
}
