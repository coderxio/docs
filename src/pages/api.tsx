import React, { useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './open.module.css';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  companyWebsite: string;
  role: string;
  companyType: string;
  companySize: string;
  useCase: string;
  problem: string;
  currentVendor: string;
  currentDataSources: string;
  needsApiAccess: string;
  timeline: string;
  openToFollowUp: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const COMPANY_TYPE_OPTIONS = [
  { value: '', label: 'Select company type' },
  { value: 'Digital health startup', label: 'Digital health startup' },
  { value: 'Pharmacy or pharmacy tech', label: 'Pharmacy or pharmacy tech' },
  { value: 'PBM, benefits, or navigation', label: 'PBM, benefits, or navigation' },
  { value: 'EHR or clinical software', label: 'EHR or clinical software' },
  { value: 'Research or academic', label: 'Research or academic' },
  { value: 'Consulting', label: 'Consulting' },
  { value: 'Data platform', label: 'Data platform' },
  { value: 'Payer or employer health', label: 'Payer or employer health' },
  { value: 'Other', label: 'Other' },
];

const COMPANY_SIZE_OPTIONS = [
  { value: '', label: 'Select company size' },
  { value: '1-10', label: '1–10 employees' },
  { value: '11-50', label: '11–50 employees' },
  { value: '51-200', label: '51–200 employees' },
  { value: '201-1000', label: '201–1,000 employees' },
  { value: '1000+', label: '1,000+ employees' },
];

const USE_CASE_OPTIONS = [
  { value: '', label: 'Select intended use case' },
  { value: 'Population health and utilization', label: 'Population health and utilization' },
  { value: 'Payer coverage and mix', label: 'Payer coverage and mix' },
  { value: 'Claims analytics', label: 'Claims analytics' },
  { value: 'Medication feature in a product', label: 'Medication feature in a product' },
  { value: 'Replace a proprietary drug database', label: 'Replace a proprietary drug database' },
  { value: 'Formulary and benefit design', label: 'Formulary and benefit design' },
  { value: 'Healthcare AI or data product', label: 'Healthcare AI or data product' },
  { value: 'Academic or clinical research', label: 'Academic or clinical research' },
  { value: 'Other', label: 'Other' },
];

const VENDOR_OPTIONS = [
  { value: '', label: 'Select an option' },
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
];

const API_ACCESS_OPTIONS = [
  { value: '', label: 'Select an option' },
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
  { value: 'Not sure', label: 'Not sure' },
];

const TIMELINE_OPTIONS = [
  { value: '', label: 'Select a timeline' },
  { value: 'Just exploring', label: 'Just exploring' },
  { value: 'Immediately', label: 'Immediately' },
  { value: '1–3 months', label: '1–3 months' },
  { value: '3–6 months', label: '3–6 months' },
  { value: '6+ months', label: '6+ months' },
];

const FOLLOW_UP_OPTIONS = [
  { value: '', label: 'Select an option' },
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
];

const emptyForm: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  companyWebsite: '',
  role: '',
  companyType: '',
  companySize: '',
  useCase: '',
  problem: '',
  currentVendor: '',
  currentDataSources: '',
  needsApiAccess: '',
  timeline: '',
  openToFollowUp: '',
};

function isValidWebsite(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) {
    return false;
  }
  try {
    const url = new URL(trimmed.includes('://') ? trimmed : `https://${trimmed}`);
    return Boolean(url.hostname.includes('.'));
  } catch {
    return false;
  }
}

function ApiHero() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <span className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          Coming soon
        </span>
        <Heading as="h1" className={styles.heroTitle}>
          CodeRx <span className={styles.heroTitleAccent}>API</span>
        </Heading>
        <p className={styles.heroDescription}>
          Query the CodeRx Drug Database over HTTP—NDC lookup, drug search,
          classes, and more—without downloading files or running your own
          warehouse. The API is not ready yet.
        </p>
        <p className={styles.heroCaveat}>
          <strong>Join the waitlist.</strong> Tell us a little about who you
          are and what you&apos;re building. We&apos;ll add you to the list and
          email you when API access is available.
        </p>
      </div>
    </header>
  );
}

function WaitlistForm() {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>(
    'idle'
  );
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }
    if (!formData.companyWebsite.trim()) {
      newErrors.companyWebsite = 'Company website is required';
    } else if (!isValidWebsite(formData.companyWebsite)) {
      newErrors.companyWebsite = 'Please enter a valid website';
    }
    if (!formData.role.trim()) {
      newErrors.role = 'Role or title is required';
    }
    if (!formData.companyType) {
      newErrors.companyType = 'Company type is required';
    }
    if (!formData.companySize) {
      newErrors.companySize = 'Company size is required';
    }
    if (!formData.useCase) {
      newErrors.useCase = 'Intended use case is required';
    }
    if (!formData.problem.trim()) {
      newErrors.problem = 'Please tell us what you are trying to solve';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData(emptyForm);
      } else {
        setSubmitStatus('error');
        setSubmitMessage(
          data.error || 'Something went wrong. Please try again later.'
        );
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMessage(
        'Failed to submit. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="waitlist" className={styles.request}>
      <div className={styles.requestInner}>
        {submitStatus === 'success' ? (
          <div className={styles.thankYouCard}>
            <Heading as="h2" className={styles.thankYouTitle}>
              You&apos;re on the API waitlist.
            </Heading>
            <p className={styles.thankYouBody}>
              Thanks for your interest. We&apos;ll add you to the waitlist and
              email you when the CodeRx API is ready. Questions in the meantime?{' '}
              <a href="mailto:api@coderx.io">api@coderx.io</a>.
            </p>
          </div>
        ) : (
          <>
            <div className={styles.requestHeader}>
              <Heading as="h2" className={styles.requestTitle}>
                Join the API waitlist
              </Heading>
              <p className={styles.requestSubtitle}>
                Tell us a little about who you are and what you&apos;re
                building. We&apos;ll notify you when API access is available.
              </p>
            </div>

            <div className={styles.formCard}>
              <form onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="firstName" className={styles.label}>
                      First name <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={clsx(
                        styles.input,
                        errors.firstName && styles.fieldError
                      )}
                      placeholder="Jane"
                      disabled={isSubmitting}
                      autoComplete="given-name"
                    />
                    {errors.firstName && (
                      <span className={styles.error}>{errors.firstName}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="lastName" className={styles.label}>
                      Last name <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={clsx(
                        styles.input,
                        errors.lastName && styles.fieldError
                      )}
                      placeholder="Doe"
                      disabled={isSubmitting}
                      autoComplete="family-name"
                    />
                    {errors.lastName && (
                      <span className={styles.error}>{errors.lastName}</span>
                    )}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Work email <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={clsx(
                      styles.input,
                      errors.email && styles.fieldError
                    )}
                    placeholder="you@company.com"
                    disabled={isSubmitting}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <span className={styles.error}>{errors.email}</span>
                  )}
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="company" className={styles.label}>
                      Company <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={clsx(
                        styles.input,
                        errors.company && styles.fieldError
                      )}
                      placeholder="Your company or organization"
                      disabled={isSubmitting}
                      autoComplete="organization"
                    />
                    {errors.company && (
                      <span className={styles.error}>{errors.company}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="companyWebsite" className={styles.label}>
                      Company website <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      id="companyWebsite"
                      name="companyWebsite"
                      value={formData.companyWebsite}
                      onChange={handleChange}
                      className={clsx(
                        styles.input,
                        errors.companyWebsite && styles.fieldError
                      )}
                      placeholder="https://yourcompany.com"
                      disabled={isSubmitting}
                      autoComplete="url"
                      inputMode="url"
                    />
                    {errors.companyWebsite && (
                      <span className={styles.error}>
                        {errors.companyWebsite}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="role" className={styles.label}>
                      Role or title <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className={clsx(
                        styles.input,
                        errors.role && styles.fieldError
                      )}
                      placeholder="Head of Engineering"
                      disabled={isSubmitting}
                      autoComplete="organization-title"
                    />
                    {errors.role && (
                      <span className={styles.error}>{errors.role}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="companyType" className={styles.label}>
                      Company type <span className={styles.required}>*</span>
                    </label>
                    <select
                      id="companyType"
                      name="companyType"
                      value={formData.companyType}
                      onChange={handleChange}
                      className={clsx(
                        styles.input,
                        styles.select,
                        errors.companyType && styles.fieldError
                      )}
                      disabled={isSubmitting}
                    >
                      {COMPANY_TYPE_OPTIONS.map((option) => (
                        <option
                          key={option.value || 'placeholder'}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.companyType && (
                      <span className={styles.error}>{errors.companyType}</span>
                    )}
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="companySize" className={styles.label}>
                      Company size <span className={styles.required}>*</span>
                    </label>
                    <select
                      id="companySize"
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleChange}
                      className={clsx(
                        styles.input,
                        styles.select,
                        errors.companySize && styles.fieldError
                      )}
                      disabled={isSubmitting}
                    >
                      {COMPANY_SIZE_OPTIONS.map((option) => (
                        <option
                          key={option.value || 'placeholder'}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.companySize && (
                      <span className={styles.error}>{errors.companySize}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="useCase" className={styles.label}>
                      Intended use case{' '}
                      <span className={styles.required}>*</span>
                    </label>
                    <select
                      id="useCase"
                      name="useCase"
                      value={formData.useCase}
                      onChange={handleChange}
                      className={clsx(
                        styles.input,
                        styles.select,
                        errors.useCase && styles.fieldError
                      )}
                      disabled={isSubmitting}
                    >
                      {USE_CASE_OPTIONS.map((option) => (
                        <option
                          key={option.value || 'placeholder'}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.useCase && (
                      <span className={styles.error}>{errors.useCase}</span>
                    )}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="problem" className={styles.label}>
                    What drug data problem are you trying to solve?{' '}
                    <span className={styles.required}>*</span>
                  </label>
                  <textarea
                    id="problem"
                    name="problem"
                    value={formData.problem}
                    onChange={handleChange}
                    rows={3}
                    className={clsx(
                      styles.textarea,
                      errors.problem && styles.fieldError
                    )}
                    placeholder="Helps us understand how you'd use the API — and what to build first."
                    disabled={isSubmitting}
                  />
                  {errors.problem && (
                    <span className={styles.error}>{errors.problem}</span>
                  )}
                </div>

                <div className={styles.formSection}>
                  <p className={styles.formSectionTitle}>Optional</p>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="currentVendor" className={styles.label}>
                        Are you currently using a drug database vendor?
                      </label>
                      <select
                        id="currentVendor"
                        name="currentVendor"
                        value={formData.currentVendor}
                        onChange={handleChange}
                        className={clsx(styles.input, styles.select)}
                        disabled={isSubmitting}
                      >
                        {VENDOR_OPTIONS.map((option) => (
                          <option
                            key={option.value || 'placeholder'}
                            value={option.value}
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="needsApiAccess" className={styles.label}>
                        Do you need API access?
                      </label>
                      <select
                        id="needsApiAccess"
                        name="needsApiAccess"
                        value={formData.needsApiAccess}
                        onChange={handleChange}
                        className={clsx(styles.input, styles.select)}
                        disabled={isSubmitting}
                      >
                        {API_ACCESS_OPTIONS.map((option) => (
                          <option
                            key={option.value || 'placeholder'}
                            value={option.value}
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="currentDataSources" className={styles.label}>
                      Which data sources are you currently using?
                    </label>
                    <input
                      type="text"
                      id="currentDataSources"
                      name="currentDataSources"
                      value={formData.currentDataSources}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="RxNorm, First Databank, Medi-Span…"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="timeline" className={styles.label}>
                        When do you need a solution?
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className={clsx(styles.input, styles.select)}
                        disabled={isSubmitting}
                      >
                        {TIMELINE_OPTIONS.map((option) => (
                          <option
                            key={option.value || 'placeholder'}
                            value={option.value}
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="openToFollowUp" className={styles.label}>
                        Are you open to a short follow-up conversation?
                      </label>
                      <select
                        id="openToFollowUp"
                        name="openToFollowUp"
                        value={formData.openToFollowUp}
                        onChange={handleChange}
                        className={clsx(styles.input, styles.select)}
                        disabled={isSubmitting}
                      >
                        {FOLLOW_UP_OPTIONS.map((option) => (
                          <option
                            key={option.value || 'placeholder'}
                            value={option.value}
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {submitStatus === 'error' && (
                  <div className={styles.errorMessage}>{submitMessage}</div>
                )}

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Join the API waitlist'}
                </button>
              </form>
            </div>

            <p className={styles.privacyNote}>
              We&apos;ll only use your details to add you to the waitlist and
              notify you when the API is ready. No spam, unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export default function ApiPage() {
  return (
    <Layout
      title="CodeRx API — Waitlist"
      description="Join the CodeRx API waitlist. Query drug data over HTTP when it launches—we'll notify you when API access is ready."
    >
      <main className={styles.main}>
        <ApiHero />
        <WaitlistForm />
      </main>
    </Layout>
  );
}
