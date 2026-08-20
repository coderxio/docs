import React, { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './open.module.css';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  useCase: string[];
  problem: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const USE_CASE_OPTIONS = [
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

const emptyForm: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  useCase: [],
  problem: '',
};

function OpenHero() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <span className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          Free · Updated once a year
        </span>
        <Heading as="h1" className={styles.heroTitle}>
          CodeRx <span className={styles.heroTitleAccent}>Open</span>
        </Heading>
        <p className={styles.heroDescription}>
          A free snapshot of the CodeRx Drug Database: every active,
          prescribable drug, its NDCs, and its drug classes—already cleaned,
          joined, and ready to query. No RxNorm expertise, no XML parsing, no
          contract.
        </p>
        <div className={styles.heroActions}>
          <Link className={styles.heroPrimary} to="#request">
            Get CodeRx Open
          </Link>
          <Link className={styles.heroSecondary} to="/pricing">
            Compare plans
          </Link>
        </div>
      </div>
    </header>
  );
}

function RequestForm() {
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
    if (formData.useCase.length === 0) {
      newErrors.useCase = 'Select at least one intended use case';
    }
    if (!formData.problem.trim()) {
      newErrors.problem = 'Please tell us what you are trying to solve';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleUseCaseToggle = (value: string) => {
    setFormData((prev) => {
      const selected = prev.useCase.includes(value)
        ? prev.useCase.filter((item) => item !== value)
        : [...prev.useCase, value];
      return { ...prev, useCase: selected };
    });
    if (errors.useCase) {
      setErrors((prev) => ({ ...prev, useCase: undefined }));
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
      const response = await fetch('/api/open', {
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
    <section id="request" className={styles.request}>
      <div className={styles.requestInner}>
        {submitStatus === 'success' ? (
          <div className={styles.thankYouCard}>
            <Heading as="h2" className={styles.thankYouTitle}>
              Your CodeRx Open dataset is on its way.
            </Heading>
            <p className={styles.thankYouBody}>
              Check your inbox for the download link, documentation, and a few
              notes on how to use the data. If you don’t see it in a few
              minutes, check your spam folder or contact{' '}
              <a href="mailto:joey@coderx.io">joey@coderx.io</a>.
            </p>
          </div>
        ) : (
          <>
            <div className={styles.requestHeader}>
              <Heading as="h2" className={styles.requestTitle}>
                Get CodeRx Open
              </Heading>
              <p className={styles.requestSubtitle}>
                Tell us a little about who you are and what you’re building.
                We’ll email you the CodeRx Open dataset.
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

                <div className={styles.formRow}>
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
                </div>

                <fieldset className={styles.formGroup}>
                  <legend className={styles.label}>
                    Intended use case <span className={styles.required}>*</span>
                  </legend>
                  <div
                    className={clsx(
                      styles.checkboxGrid,
                      errors.useCase && styles.checkboxGridError
                    )}
                  >
                    {USE_CASE_OPTIONS.map((option) => {
                      const checked = formData.useCase.includes(option.value);
                      return (
                        <label
                          key={option.value}
                          className={clsx(
                            styles.checkboxOption,
                            checked && styles.checkboxOptionChecked
                          )}
                        >
                          <input
                            type="checkbox"
                            name="useCase"
                            value={option.value}
                            checked={checked}
                            onChange={() => handleUseCaseToggle(option.value)}
                            disabled={isSubmitting}
                          />
                          {option.label}
                        </label>
                      );
                    })}
                  </div>
                  {errors.useCase && (
                    <span className={styles.error}>{errors.useCase}</span>
                  )}
                </fieldset>

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
                    placeholder="Helps us point you at the right marts — and tells us what to build next."
                    disabled={isSubmitting}
                  />
                  {errors.problem && (
                    <span className={styles.error}>{errors.problem}</span>
                  )}
                </div>

                {submitStatus === 'error' && (
                  <div className={styles.errorMessage}>{submitMessage}</div>
                )}

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Get CodeRx Open'}
                </button>
              </form>
            </div>

            <p className={styles.privacyNote}>
              We'll only use your details to send your download link and
              occasional CodeRx updates. No spam, unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </section>
  );
}

function IncludedSection() {
  const marts = [
    {
      title: 'Drugs',
      description:
        'Unified drug products filtered to what is actively marketed and prescribable.',
      items: [
        'Drug names & RXCUIs',
        'Dose forms & strengths',
        'Brand-to-generic links',
      ],
    },
    {
      title: 'Packages',
      description:
        'National Drug Codes mapped to their drug products, no manual joining required.',
      items: [
        'NDC-to-drug mappings',
        'Package descriptions',
        'Labeler information',
      ],
    },
    {
      title: 'Classes',
      description:
        'Drug classifications so you can aggregate products therapeutically.',
      items: [
        'Class-to-drug mappings',
        'Multiple hierarchy levels',
        'Therapeutic grouping',
      ],
    },
  ];

  return (
    <section id="included" className={clsx(styles.section, styles.sectionMuted)}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            What's Included
          </Heading>
          <p className={styles.sectionSubtitle}>
            Three data marts covering the drug data questions most teams start
            with, delivered as CSV and Parquet files.
          </p>
        </div>
        <div className={styles.includedGrid}>
          {marts.map((mart) => (
            <div key={mart.title} className={styles.includedCard}>
              <h3 className={styles.includedCardTitle}>{mart.title}</h3>
              <p className={styles.includedCardDesc}>{mart.description}</p>
              <ul className={styles.includedList}>
                {mart.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className={styles.includedFootnote}>
          Same schema and documentation as Enterprise—
          <Link to="/concepts">browse the data models</Link> before you request
          access.
        </p>
      </div>
    </section>
  );
}

function OutgrowSection() {
  return (
    <section className={clsx(styles.section, styles.sectionLight)}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            What You'll Outgrow
          </Heading>
          <p className={styles.sectionSubtitle}>
            Open is deliberately limited. These are the walls you will hit, and
            what happens on the other side of them.
          </p>
        </div>
        <div className={styles.comparisonGrid}>
          <div className={styles.comparisonCard}>
            <div className={styles.comparisonCardHeader}>
              <span className={styles.comparisonCardTitle}>CodeRx Open</span>
              <span className={styles.comparisonCardTag}>Free</span>
            </div>
            <ul className={styles.comparisonList}>
              <li className={styles.itemPositive}>Drugs, packages & classes</li>
              <li className={styles.itemPositive}>CSV & Parquet download</li>
              <li className={styles.itemNeutral}>
                Active, prescribable drugs only
              </li>
              <li className={styles.itemNeutral}>
                One refresh per year, then it drifts
              </li>
              <li className={styles.itemLimit}>
                No pricing, ingredients or dose forms
              </li>
              <li className={styles.itemLimit}>Limited columns on every mart</li>
            </ul>
          </div>
          <div
            className={clsx(
              styles.comparisonCard,
              styles.comparisonCardFeatured
            )}
          >
            <div className={styles.comparisonCardHeader}>
              <span className={styles.comparisonCardTitle}>Enterprise</span>
              <span className={styles.comparisonCardTagMuted}>
                Annual subscription
              </span>
            </div>
            <ul className={styles.comparisonList}>
              <li className={styles.itemPositive}>Everything in CodeRx Open</li>
              <li className={styles.itemPositive}>
                Weekly updates & dated snapshots
              </li>
              <li className={styles.itemPositive}>All tables and all columns</li>
              <li className={styles.itemPositive}>
                Pricing, packaging & label images
              </li>
              <li className={styles.itemPositive}>
                Indications, Part D plans & J-codes
              </li>
              <li className={styles.itemPositive}>
                Direct S3 access & dedicated support
              </li>
            </ul>
            <Link className={styles.cardLink} to="/pricing">
              Compare plans →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function AudienceSection() {
  const audiences = [
    {
      title: 'Startups validating an idea',
      description:
        'Prove out your drug data model before committing budget to a subscription.',
    },
    {
      title: 'Researchers & students',
      description:
        'Get a clean, citable drug reference without wrangling RxNorm relationship tables.',
    },
    {
      title: 'Developers prototyping',
      description:
        'Build medication search, autocomplete, or NDC lookup against real data in an afternoon.',
    },
    {
      title: 'Teams evaluating CodeRx',
      description:
        'Query the real schema and documentation before deciding on a plan.',
    },
  ];

  return (
    <section className={clsx(styles.section, styles.sectionMuted)}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            Who It's For
          </Heading>
        </div>
        <div className={styles.audienceGrid}>
          {audiences.map((audience) => (
            <div key={audience.title} className={styles.audienceCard}>
              <h3 className={styles.audienceTitle}>{audience.title}</h3>
              <p className={styles.audienceDesc}>{audience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const faqs = [
    {
      question: 'Is this the same as The CodeRx Drug Database?',
      answer: (
        <>
          Open is the free tier of the CodeRx Drug Database—not the full
          product. Three marts, limited columns, updated once a year. There is
          also an Enterprise tier with weekly updates and every column.{' '}
          <Link to="/pricing">Compare plans</Link>.
        </>
      ),
    },
    {
      question: 'How often is CodeRx Open updated?',
      answer:
        'Once per year. Drug data changes constantly—NDCs are added and retired every week—so a yearly snapshot is best treated as a fixed reference for prototyping. If you need data that keeps pace, Enterprise refreshes weekly.',
    },
    {
      question: 'What format is the data in?',
      answer:
        'CSV and Parquet files, organized by data mart—the same structure and column names documented throughout these docs.',
    },
    {
      question: 'How do I query it once I have the files?',
      answer: (
        <>
          Load the CSV or Parquet files into whatever data warehouse you
          already use, or open them as spreadsheets. Open includes a limited
          set of columns; those that are present match Enterprise, so the{' '}
          <Link to="/tutorials">tutorials</Link> and{' '}
          <Link to="/concepts">data model docs</Link> apply as-is.
        </>
      ),
    },
    {
      question: 'Why do I have to give you my email?',
      answer:
        "So we can send you the download link, and let you know when the annual refresh lands. It also helps us understand who's using the data and what to build next.",
    },
  ];

  return (
    <section className={clsx(styles.section, styles.sectionLight)}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            Common Questions
          </Heading>
        </div>
        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <div key={faq.question} className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>{faq.question}</h3>
              <p className={styles.faqAnswer}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function OpenPage() {
  return (
    <Layout
      title="CodeRx Open — Free Drug Database"
      description="CodeRx Open is a free, annually updated drug database of active, prescribable drugs, their NDCs, and drug classes. Request access and start querying today."
    >
      <main className={styles.main}>
        <OpenHero />
        <IncludedSection />
        <OutgrowSection />
        <AudienceSection />
        <RequestForm />
        <FaqSection />
      </main>
    </Layout>
  );
}
