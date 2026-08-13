import React, { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './open.module.css';

interface FormData {
  name: string;
  email: string;
  company: string;
  companySize: string;
  useCase: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const COMPANY_SIZE_OPTIONS = [
  { value: '', label: 'Select company size' },
  { value: '1-10', label: '1–10 employees' },
  { value: '11-50', label: '11–50 employees' },
  { value: '51-200', label: '51–200 employees' },
  { value: '201-1000', label: '201–1,000 employees' },
  { value: '1000+', label: '1,000+ employees' },
];

const emptyForm: FormData = {
  name: '',
  email: '',
  company: '',
  companySize: '',
  useCase: '',
};

function OpenHero() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <span className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          Free · Updated annually
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
          <Link className={styles.primaryButton} to="#request">
            Request free access
          </Link>
          <Link className={styles.secondaryButton} to="#included">
            See what's included
          </Link>
        </div>
        <p className={styles.heroNote}>
          Tell us a bit about your use case and we'll send you the download
          link.
        </p>
      </div>
    </header>
  );
}

function IncludedSection() {
  const marts = [
    {
      title: 'Drugs',
      description:
        'Unified drug products filtered to what is actively marketed and prescribable.',
      items: ['Drug names & RXCUIs', 'Dose forms & strengths', 'Brand-to-generic links'],
    },
    {
      title: 'Packages',
      description:
        'National Drug Codes mapped to their drug products, no manual joining required.',
      items: ['NDC-to-drug mappings', 'Package descriptions', 'Labeler information'],
    },
    {
      title: 'Classes',
      description:
        'Drug classifications so you can aggregate products therapeutically.',
      items: ['Class-to-drug mappings', 'Multiple hierarchy levels', 'Therapeutic grouping'],
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

function OpenVsPaidSection() {
  return (
    <section className={clsx(styles.section, styles.sectionLight)}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            Open vs. Enterprise
          </Heading>
          <p className={styles.sectionSubtitle}>
            CodeRx Open is a yearly snapshot of a subset of the data. When you
            need current data or the full picture, Enterprise picks up where it
            leaves off.
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
              <li className={styles.itemPositive}>Active, prescribable products</li>
              <li className={styles.itemPositive}>CSV & Parquet downloads</li>
              <li className={styles.itemPositive}>Full public documentation</li>
              <li className={styles.itemNeutral}>Updated once per year</li>
              <li className={styles.itemNeutral}>Limited columns; no advanced marts</li>
            </ul>
            <Link className={styles.cardLink} to="#request">
              Request free access →
            </Link>
          </div>
          <div className={clsx(styles.comparisonCard, styles.comparisonCardFeatured)}>
            <div className={styles.comparisonCardHeader}>
              <span className={styles.comparisonCardTitle}>
                Enterprise
              </span>
              <span className={styles.comparisonCardTagMuted}>
                Annual subscription
              </span>
            </div>
            <ul className={styles.comparisonList}>
              <li className={styles.itemPositive}>Everything in CodeRx Open</li>
              <li className={styles.itemPositive}>Weekly updates & dated snapshots</li>
              <li className={styles.itemPositive}>All tables and all columns</li>
              <li className={styles.itemPositive}>Pricing, packaging & label images</li>
              <li className={styles.itemPositive}>Indications, Part D plans & J-codes</li>
              <li className={styles.itemPositive}>Direct S3 access & support</li>
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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }

    if (!formData.companySize) {
      newErrors.companySize = 'Company size is required';
    }

    if (!formData.useCase.trim()) {
      newErrors.useCase = 'Use case is required';
    } else if (formData.useCase.trim().length < 10) {
      newErrors.useCase = 'Please tell us a bit more about your use case';
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
        setSubmitMessage(
          "Thanks! We'll email you the CodeRx Open download link shortly."
        );
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
        <div className={styles.requestHeader}>
          <Heading as="h2" className={styles.requestTitle}>
            Request Free Access
          </Heading>
          <p className={styles.requestSubtitle}>
            Tell us who you are and what you're building. We'll send the
            download link to your email.
          </p>
        </div>

        <div className={styles.formCard}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Name <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={clsx(styles.input, errors.name && styles.fieldError)}
                placeholder="Your name"
                disabled={isSubmitting}
                autoComplete="name"
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={clsx(styles.input, errors.email && styles.fieldError)}
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
                className={clsx(styles.input, errors.company && styles.fieldError)}
                placeholder="Your company or organization"
                disabled={isSubmitting}
                autoComplete="organization"
              />
              {errors.company && (
                <span className={styles.error}>{errors.company}</span>
              )}
            </div>

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
                  <option key={option.value || 'placeholder'} value={option.value}>
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
                Use case <span className={styles.required}>*</span>
              </label>
              <textarea
                id="useCase"
                name="useCase"
                value={formData.useCase}
                onChange={handleChange}
                rows={5}
                className={clsx(styles.textarea, errors.useCase && styles.fieldError)}
                placeholder="What are you building or researching? How would you use the data?"
                disabled={isSubmitting}
              />
              {errors.useCase && (
                <span className={styles.error}>{errors.useCase}</span>
              )}
            </div>

            {submitStatus === 'success' && (
              <div className={styles.successMessage}>{submitMessage}</div>
            )}

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
          We'll only use your details to send your download link and occasional
          CodeRx updates. No spam, unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

function FaqSection() {
  const faqs = [
    {
      question: 'How often is CodeRx Open updated?',
      answer:
        'Once per year. If you need data that keeps pace with FDA, RxNorm, and pricing changes, Enterprise refreshes weekly.',
    },
    {
      question: 'What format is the data in?',
      answer:
        'CSV and Parquet files, organized by data mart—the same structure and column names documented throughout these docs.',
    },
    {
      question: 'Can I use it commercially?',
      answer:
        "Yes. CodeRx Open is built from public data sources. Tell us about your use case in the form and we'll flag anything you should know.",
    },
    {
      question: 'Why do I have to fill out a form?',
      answer:
        "It helps us understand who's using the data and what to build next. It also means we can let you know when the annual refresh lands.",
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
        <OpenVsPaidSection />
        <AudienceSection />
        <RequestForm />
        <FaqSection />
      </main>
    </Layout>
  );
}
