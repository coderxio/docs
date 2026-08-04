import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './pricing.module.css';

declare global {
  interface Window {
    Cal?: (...args: any[]) => void;
  }
}

interface PlanFeature {
  name: string;
  description: string;
}

interface Plan {
  name: string;
  badge?: string;
  tag: string;
  description: string;
  /** Name of the plan this one builds on, rendered as "Everything in X, plus:" */
  inherits?: string;
  features: PlanFeature[];
  featured?: boolean;
  cta:
    | { kind: 'link'; label: string; to: string }
    | { kind: 'demo'; label: string; plan: string };
}

const plans: Plan[] = [
  {
    name: 'Open',
    badge: 'Free',
    tag: 'Free forever',
    description:
      'A yearly snapshot of the essentials, so you can prototype and evaluate the data before you talk to us.',
    features: [
      {
        name: 'Yearly updates',
        description: 'One data refresh per year',
      },
      {
        name: 'Drugs',
        description: 'Active, prescribable products only, at time of snapshot',
      },
      {
        name: 'NDCs',
        description: 'National Drug Codes mapped to their drug products',
      },
      {
        name: 'Classes',
        description: 'Classification hierarchy for therapeutic grouping',
      },
      {
        name: 'CSV & Parquet',
        description: 'Download and query with the tools you already use',
      },
    ],
    cta: { kind: 'link', label: 'Get it Free', to: '/open' },
  },
  {
    name: 'Silver',
    tag: 'Annual subscription',
    description:
      'The core data marts, weekly updates, and AWS S3 delivery for teams building reliable pharmacy analytics workflows.',
    inherits: 'Open',
    features: [
      {
        name: 'Weekly updates',
        description: 'Fresh data every week, delivered to a version-controlled S3 bucket',
      },
      {
        name: 'Complete drug history',
        description: 'Not just the products marketed today',
      },
      {
        name: 'All NDCs',
        description: 'Including NDC10, marketing dates, labeler info, and more',
      },
      {
        name: 'Ingredients and dose forms',
        description: 'Including structured ingredient strength and excipients',
      },
      {
        name: 'Email support',
        description: 'Support email plus the CodeRx Slack community',
      },
    ],
    cta: { kind: 'demo', label: 'Book a Demo', plan: 'Silver' },
  },
  {
    name: 'Gold',
    badge: 'Most Popular',
    tag: 'Annual subscription',
    description:
      'Broader coverage for organizations that need drug pricing, packaging detail, and faster operational execution.',
    inherits: 'Silver',
    featured: true,
    features: [
      {
        name: 'Pricing',
        description: 'ASP, NADAC, HCPCS mappings, and 5+ years of history',
      },
      {
        name: 'Packaging',
        description: 'Pack size, unit of use, unit dose, inner-outer NDCs',
      },
      {
        name: 'Label Images',
        description: 'NDC-level label image mappings',
      },
      {
        name: 'REMS',
        description: 'FDA Risk Evaluation and Mitigation Strategy programs by drug',
      },
      {
        name: 'Priority support',
        description: 'Dedicated response SLA and direct access to our team',
      },
    ],
    cta: { kind: 'demo', label: 'Book a Demo', plan: 'Gold' },
  },
  {
    name: 'Platinum',
    tag: 'Annual subscription',
    description:
      'Advanced clinical use cases and production-grade medication intelligence.',
    inherits: 'Gold',
    features: [
      {
        name: 'Indications',
        description: 'ICD-10 codes for conditions drugs may treat or prevent',
      },
      {
        name: 'Plans',
        description: 'Medicare Part D formularies, tiers, and reimbursement',
      },
      {
        name: 'E-prescribing',
        description: 'NCI code mappings and representative NDCs',
      },
      {
        name: 'Storage and handling',
        description: 'Cold storage and special handling requirements by product',
      },
    ],
    cta: { kind: 'demo', label: 'Book a Demo', plan: 'Platinum' },
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  const buttonClass = plan.featured
    ? styles.pricingButton
    : styles.pricingButtonOutline;

  return (
    <div
      className={`${styles.pricingCard} ${plan.featured ? styles.pricingCardFeatured : ''}`}
    >
      <div className={styles.pricingCardHeader}>
        <h2 className={styles.pricingCardTitle}>{plan.name}</h2>
        {plan.badge && (
          <span
            className={`${styles.pricingCardBadge} ${plan.featured ? '' : styles.pricingCardBadgeNeutral}`}
          >
            {plan.badge}
          </span>
        )}
      </div>

      <span className={styles.pricingCardTag}>{plan.tag}</span>

      <p className={styles.pricingCardDescription}>{plan.description}</p>

      <div className={styles.featureBlock}>
        <span className={styles.featureBlockTitle}>
          {plan.inherits ? (
            <>
              Everything in <strong>{plan.inherits}</strong>, plus:
            </>
          ) : (
            'Includes:'
          )}
        </span>
        <ul className={styles.featureList}>
          {plan.features.map((feature) => (
            <li key={feature.name} className={styles.featureItem}>
              <span className={styles.featureName}>{feature.name}</span>
              <span className={styles.featureDesc}>{feature.description}</span>
            </li>
          ))}
        </ul>
      </div>

      {plan.cta.kind === 'link' ? (
        <Link to={plan.cta.to} className={buttonClass}>
          {plan.cta.label}
        </Link>
      ) : (
        <button
          data-cal-link="coderx/30-min"
          data-cal-config={JSON.stringify({
            layout: 'month_view',
            'metadata[plan]': plan.cta.plan,
            notes: `Interested in: ${plan.cta.plan}`,
          })}
          className={buttonClass}
        >
          {plan.cta.label}
        </button>
      )}
    </div>
  );
}

export default function Pricing() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Load Cal.com embed script
    const existingScript = document.querySelector('script[src="https://app.cal.com/embed/embed.js"]');
    if (!existingScript) {
      // Inline Cal.com init snippet
      (function (C: any, A: string, L: string) {
        const p = (a: any, ar: any) => { a.q.push(ar); };
        const d = C.document;
        C.Cal = C.Cal || function (...args: any[]) {
          const cal = C.Cal;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            const s = d.createElement('script');
            s.src = A;
            s.async = true;
            d.head.appendChild(s);
            cal.loaded = true;
          }
          if (args[0] === L) {
            const api: any = (...a: any[]) => { p(api, a); };
            const namespace = args[1];
            api.q = api.q || [];
            typeof namespace === 'string'
              ? (cal.ns[namespace] = api) && p(api, args)
              : p(cal, args);
            return;
          }
          p(cal, args);
        };
      })(window, 'https://app.cal.com/embed/embed.js', 'init');

      window.Cal!('init', { origin: 'https://cal.com' });
      window.Cal!('ui', {
        styles: { branding: { brandColor: '#d52d34' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    }
  }, []);

  return (
    <Layout
      title="Pricing"
      description="Compare CodeRx plans. Start free with CodeRx Open, then move up through Silver, Gold, and Platinum — each plan includes everything in the one before it.">
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <Heading as="h1" className={styles.title}>
            Compare CodeRx Plans
          </Heading>
          <p className={styles.subtitle}>
            Start free and move up as your needs grow. Each plan includes
            everything in the plan before it, so you never lose access to data
            you already rely on.
          </p>
        </div>

        {/* Plan cards, ordered left to right by what each one adds */}
        <div className={styles.pricingOptions}>
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        <p className={styles.progressionNote}>
          Every plan is cumulative — Platinum includes all of Gold, Silver, and
          Open. <strong>CodeRx Open is refreshed once a year</strong>, so it will
          drift out of date between releases;{' '}
          <strong>every paid plan is refreshed weekly</strong> and delivered to
          AWS S3 in CSV and Parquet with complete documentation.
        </p>

        {/* Bottom CTA */}
        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Not sure which plan is right for you?</h2>
          <p className={styles.ctaSubtitle}>
            Book a 30-minute demo and we'll walk you through the data and help you choose.
          </p>
          <div className={styles.ctaButtons}>
            <button
              data-cal-link="coderx/30-min"
              data-cal-config='{"layout":"month_view"}'
              className={styles.ctaButton}
            >
              Book a Demo
            </button>
            <Link to="/contact-us" className={styles.ctaButtonSecondary}>
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </Layout>
  );
}
