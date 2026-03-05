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

const CHECK = '✓';
const DASH = '—';

const featureSections = [
  {
    title: 'Data Marts',
    features: [
      {
        name: 'Packages (NDCs)',
        description: 'Mappings from NDC to drug, brand vs generic, available brand names, labeler information',
        basic: CHECK,
        premium: CHECK,
      },
      {
        name: 'Drugs',
        description: 'All brand and generic drugs',
        basic: CHECK,
        premium: CHECK,
      },
      {
        name: 'Ingredients',
        description: 'Including structured ingredient strength',
        basic: CHECK,
        premium: CHECK,
      },
      {
        name: 'Excipients',
        description: 'Including suggested flags for gluten, dyes, and preservatives',
        basic: CHECK,
        premium: CHECK,
      },
      {
        name: 'Synonyms',
        description: 'Useful for LLM training / fuzzy matching / search enhancement',
        basic: CHECK,
        premium: CHECK,
      },
      {
        name: 'ATC Classification',
        description: 'Four level classification hierarchy for drugs',
        basic: CHECK,
        premium: CHECK,
      },
      {
        name: 'Indications',
        description: 'ICD-10 codes representing conditions drugs may treat or may prevent',
        basic: DASH,
        premium: CHECK,
      },
      {
        name: 'CMS Pricing',
        description: 'ASP / NDC to HCPCS (type 2) mappings / NADAC pricing / 5+ years historical changes',
        basic: DASH,
        premium: CHECK,
      },
      {
        name: 'CMS Plans',
        description: 'Medicare Part D plan information, including formularies, tiers, and pricing',
        basic: DASH,
        premium: CHECK,
      },
      {
        name: 'NCPDP Mappings',
        description: 'NCI code mappings / representative NDCs — useful for e-prescribing and interoperability',
        basic: DASH,
        premium: CHECK,
      },
      {
        name: 'Packaging',
        description: 'Pack size / unit of measure / inner-outer NDCs',
        basic: DASH,
        premium: CHECK,
      },
      {
        name: 'Label Images',
        description: 'NDC-level label image mappings',
        basic: DASH,
        premium: CHECK,
      },
    ],
  },
  {
    title: 'Access & Delivery',
    features: [
      {
        name: 'Weekly Updates',
        description: 'Up-to-date data delivered to an s3 bucket weekly',
        basic: CHECK,
        premium: CHECK,
      },
      {
        name: 'AWS S3 Access',
        description: 'Direct S3 bucket access to all data marts in CSV and Parquet formats',
        basic: CHECK,
        premium: CHECK,
      },
      {
        name: 'Complete Documentation',
        description: 'Schema docs, tutorials, and data source guides for every data mart',
        basic: CHECK,
        premium: CHECK,
      },
    ],
  },
  {
    title: 'Support',
    features: [
      {
        name: 'Community Support (Slack)',
        description: 'Access to the CodeRx Slack community and support email',
        basic: CHECK,
        premium: CHECK,
      },
      {
        name: 'Priority Support',
        description: 'Dedicated response SLA and direct access to the CodeRx team',
        basic: DASH,
        premium: CHECK,
      },
    ],
  },
];

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
      title="Pricing - CodeRx"
      description="Choose the CodeRx plan that fits your team. Basic or Premium — both include weekly drug data updates, AWS S3 access, and complete documentation.">
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <Heading as="h1" className={styles.title}>
            Simple, Transparent Pricing
          </Heading>
          <p className={styles.subtitle}>
            Get access to CodeRx's comprehensive drug database with weekly updates,
            complete RxNorm mappings, NADAC pricing, and rich drug knowledge graphs.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className={styles.pricingOptions}>

          {/* Basic */}
          <div className={styles.pricingCard}>
            <div className={styles.pricingCardHeader}>
              <h2 className={styles.pricingCardTitle}>Basic</h2>
            </div>
            <div className={styles.pricingCardPrice}>
              <span className={styles.priceAmount}>$5,500</span>
              <span className={styles.pricePeriod}>/year</span>
            </div>
            <p className={styles.pricingCardDescription}>
              Packages, drugs, ingredients, excipients, synonyms, ATC classification, and DEA schedules — 
              with weekly updates via AWS S3. Everything you need to get started with drug data.
            </p>
            <button
              data-cal-link="coderx/30-min"
              data-cal-config={JSON.stringify({
                layout: 'month_view',
                'metadata[plan]': 'Basic',
                notes: 'Interested in: Basic',
              })}
              className={styles.pricingButtonOutline}
            >
              Book a Demo
            </button>
          </div>

          {/* Premium */}
          <div className={`${styles.pricingCard} ${styles.pricingCardFeatured}`}>
            <div className={styles.pricingCardHeader}>
              <h2 className={styles.pricingCardTitle}>Premium</h2>
              <span className={styles.pricingCardBadge}>Most Popular</span>
            </div>
            <div className={styles.pricingCardPrice}>
              <span className={styles.priceAmount}>$15,000</span>
              <span className={styles.pricePeriod}>/year</span>
            </div>
            <p className={styles.pricingCardDescription}>
              Everything in Basic, plus indications, CMS pricing, CMS plans, NCPDP mappings, 
              packaging, and label images. Includes priority support from the CodeRx team.
            </p>
            <button
              data-cal-link="coderx/30-min"
              data-cal-config={JSON.stringify({
                layout: 'month_view',
                'metadata[plan]': 'Premium',
                notes: 'Interested in: Premium',
              })}
              className={styles.pricingButton}
            >
              Book a Demo
            </button>
          </div>

        </div>

        {/* Feature Comparison Grid */}
        <div className={styles.comparisonSection}>
          <h2 className={styles.comparisonTitle}>Compare Plans</h2>

          <div className={styles.comparisonTable}>

            {/* Table header */}
            <div className={`${styles.comparisonRow} ${styles.comparisonHeader}`}>
              <div className={styles.comparisonFeatureCell}>Feature</div>
              <div className={styles.comparisonTierCell}>Basic</div>
              <div className={`${styles.comparisonTierCell} ${styles.comparisonTierCellFeatured}`}>Premium</div>
            </div>

            {featureSections.map((section) => (
              <React.Fragment key={section.title}>
                {/* Section heading row */}
                <div className={styles.comparisonSectionRow}>
                  <div className={styles.comparisonSectionTitle}>{section.title}</div>
                </div>

                {/* Feature rows */}
                {section.features.map((feature) => (
                  <div key={feature.name} className={styles.comparisonRow}>
                    <div className={styles.comparisonFeatureCell}>
                      <span className={styles.comparisonFeatureName}>{feature.name}</span>
                      <span className={styles.comparisonFeatureDesc}>{feature.description}</span>
                    </div>
                    <div className={styles.comparisonTierCell}>
                      <span className={feature.basic === CHECK ? styles.checkIcon : styles.dashIcon}>
                        {feature.basic}
                      </span>
                    </div>
                    <div className={`${styles.comparisonTierCell} ${styles.comparisonTierCellFeatured}`}>
                      <span className={feature.premium === CHECK ? styles.checkIcon : styles.dashIcon}>
                        {feature.premium}
                      </span>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}

          </div>
        </div>

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
