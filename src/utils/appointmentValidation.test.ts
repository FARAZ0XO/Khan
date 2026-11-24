import test from 'node:test';
import assert from 'node:assert/strict';
import { PROPERTY_LISTINGS } from '../data/properties';
import {
  buildAppointmentRecord,
  resolveBudgetLabel,
  validateAppointmentInput,
} from './appointmentValidation';
import { AppointmentInput } from '../types/property';

const validBaseInput: AppointmentInput = {
  fullName: 'Tariq Mahmood',
  email: 'tariq@example.com',
  phone: '+92 334 1360110',
  consultationType: 'Buy Property',
  propertyId: 'naseerabad-block7-residence',
  budgetTier: '25m-60m',
  customBudget: '',
  preferredDate: '2026-12-15',
  preferredTime: 'Afternoon (12:00 PM – 4:00 PM)',
  notes: 'Interested in visiting Block 7 Federal B Area home.',
};

test('validateAppointmentInput accepts valid PKR input without errors', () => {
  const errors = validateAppointmentInput(validBaseInput, '2026-11-24');
  assert.deepEqual(errors, {});
});

test('validateAppointmentInput flags missing required fields and invalid custom PKR budget', () => {
  const errors = validateAppointmentInput(
    {
      ...validBaseInput,
      fullName: 'A',
      email: 'not-an-email',
      phone: '123',
      preferredDate: '2026-11-01',
      budgetTier: 'custom',
      customBudget: '10000',
    },
    '2026-11-24'
  );

  assert.ok(errors.fullName);
  assert.ok(errors.email);
  assert.ok(errors.phone);
  assert.ok(errors.preferredDate);
  assert.ok(errors.customBudget);
});

test('resolveBudgetLabel formats PKR tier and custom target budgets cleanly', () => {
  assert.equal(resolveBudgetLabel('25m-60m', ''), 'PKR 25M – 60M');
  assert.equal(resolveBudgetLabel('custom', '45000000'), 'PKR 45,000,000 (Target)');
  assert.equal(
    resolveBudgetLabel('25m-60m', '52000000'),
    'PKR 25M – 60M · Exact: PKR 52,000,000'
  );
});

test('buildAppointmentRecord creates structured FF booking summary with property title', () => {
  const record = buildAppointmentRecord(validBaseInput, PROPERTY_LISTINGS, 7);
  assert.equal(record.referenceId, 'FF-261215-007');
  assert.equal(record.propertyTitle, 'Naseerabad Block 7 Corner House');
  assert.equal(record.budgetLabel, 'PKR 25M – 60M');
  assert.equal(record.fullName, 'Tariq Mahmood');
});
