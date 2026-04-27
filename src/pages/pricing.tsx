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
        silver: CHECK,
        gold: CHECK,
        platinum: CHECK,
      },
      {
        name: 'Drugs',
        description: 'All brand and generic drugs with open standard identifiers',
        silver: CHECK,
        gold: CHECK,
        platinum: CHECK,
      },
      {
        name: 'Ingredients',
        description: 'Including structured ingredient strength',
        silver: CHECK,
        gold: CHECK,
        platinum: CHECK,
      },
      {
        name: 'Excipients',
        description: 'Including suggested flags for gluten, dyes, and preservatives',
        silver: CHECK,
        gold: CHECK,
        platinum: CHECK,
      },
      {
        name: 'Classes',
        description: 'Four level classification hierarchy for drugs',
        silver: CHECK,
        gold: CHECK,
        platinum: CHECK,
      },
      {
        name: 'Synonyms',
        description: 'Useful for LLM training / fuzzy matching / search enhancement',
        silver: CHECK,
        gold: CHECK,
        platinum: CHECK,
      },
      {
        name: 'Pricing',
        description: 'ASP / NDC to HCPCS (type 2) mappings / NADAC pricing / 5+ years historical changes',
        silver: DASH,
        gold: CHECK,
        platinum: CHECK,
      },
      {
        name: 'Packaging',
        description: 'Pack size / unit of use / unit dose / inner-outer NDCs',
        silver: DASH,
        gold: CHECK,
        platinum: CHECK,
      },
      {
        name: 'Label Images',
        description: 'NDC-level label image mappings',
        silver: DASH,
        gold: CHECK,
        platinum: CHECK,
      },
      {
        name: 'Indications',
        description: 'ICD-10 codes representing conditions drugs may treat or may prevent',
        silver: DASH,
        gold: DASH,
        platinum: CHECK,
      },
      {
        name: 'Plans',
        description: 'Medicare Part D plan information, including formularies, tiers, and reimbursement',
        silver: DASH,
        gold: DASH,
        platinum: CHECK,
      },
      {
        name: 'E-prescribing',
        description: 'NCI code mappings / representative NDCs — useful for e-prescribing and interoperability',
        silver: DASH,
        gold: DASH,
        platinum: CHECK,
      },
    ],
  },
  {
    title: 'Access & Delivery',
    features: [
      {
        name: 'Weekly Updates',
        description: 'Up-to-date data delivered to an s3 bucket weekly',
        silver: CHECK,
        gold: CHECK,
        platinum: CHECK,
      },
      {
        name: 'AWS S3 Access',
        description: 'Direct S3 bucket access to all data marts in CSV and Parquet formats',
        silver: CHECK,
        gold: CHECK,
        platinum: CHECK,
      },
      {
        name: 'Complete Documentation',
        description: 'Schema docs, tutorials, and data source guides for every data mart',
        silver: CHECK,
        gold: CHECK,
        platinum: CHECK,
      },
    ],
  },
  {
    title: 'Support',
    features: [
      {
        name: 'Email Support',
        description: 'Access to support email and the CodeRx Slack community',
        silver: CHECK,
        gold: CHECK,
        platinum: CHECK,
      },
      {
        name: 'Priority Support',
        description: 'Dedicated response SLA and direct access to the CodeRx team',
        silver: DASH,
        gold: CHECK,
        platinum: CHECK,
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
      title="Pricing"
      description="Choose the CodeRx plan that fits your team. Silver, Gold, or Platinum — all include weekly drug data updates, AWS S3 access, and complete documentation.">
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <Heading as="h1" className={styles.title}>
            Compare CodeRx Plans
          </Heading>
          <p className={styles.subtitle}>
            Explore tiered access to comprehensive drug data marts, documentation,
            support, and advanced feature sets designed for pharmacy analytics workflows.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className={styles.pricingOptions}>

          {/* Silver */}
          <div className={styles.pricingCard}>
            <div className={styles.pricingCardHeader}>
              <h2 className={styles.pricingCardTitle}>Silver</h2>
            </div>
            <p className={styles.pricingCardDescription}>
              Includes the core data marts, weekly updates, and AWS S3 delivery for teams building reliable pharmacy analytics workflows.
            </p>
            <button
              data-cal-link="coderx/30-min"
              data-cal-config={JSON.stringify({
                layout: 'month_view',
                'metadata[plan]': 'Silver',
                notes: 'Interested in: Silver',
              })}
              className={styles.pricingButtonOutline}
            >
              Book a Demo
            </button>
          </div>

          {/* Gold */}
          <div className={`${styles.pricingCard} ${styles.pricingCardFeatured}`}>
            <div className={styles.pricingCardHeader}>
              <h2 className={styles.pricingCardTitle}>Gold</h2>
              <span className={styles.pricingCardBadge}>Most Popular</span>
            </div>
            <p className={styles.pricingCardDescription}>
              Adds Pricing, Packaging, Label Images, and priority support for organizations that need broader coverage and faster operational execution.
            </p>
            <button
              data-cal-link="coderx/30-min"
              data-cal-config={JSON.stringify({
                layout: 'month_view',
                'metadata[plan]': 'Gold',
                notes: 'Interested in: Gold',
              })}
              className={styles.pricingButton}
            >
              Book a Demo
            </button>
          </div>

          {/* Platinum */}
          <div className={styles.pricingCard}>
            <div className={styles.pricingCardHeader}>
              <h2 className={styles.pricingCardTitle}>Platinum</h2>
            </div>
            <p className={styles.pricingCardDescription}>
              Unlocks Indications, Plans, and E-prescribing mappings for advanced clinical use cases and production-grade medication intelligence.
            </p>
            <button
              data-cal-link="coderx/30-min"
              data-cal-config={JSON.stringify({
                layout: 'month_view',
                'metadata[plan]': 'Platinum',
                notes: 'Interested in: Platinum',
              })}
              className={styles.pricingButtonOutline}
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
              <div className={styles.comparisonTierCell}>Silver</div>
              <div className={`${styles.comparisonTierCell} ${styles.comparisonTierCellFeatured}`}>Gold</div>
              <div className={styles.comparisonTierCell}>Platinum</div>
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
                      <span className={feature.silver === CHECK ? styles.checkIcon : styles.dashIcon}>
                        {feature.silver}
                      </span>
                    </div>
                    <div className={`${styles.comparisonTierCell} ${styles.comparisonTierCellFeatured}`}>
                      <span className={feature.gold === CHECK ? styles.checkIcon : styles.dashIcon}>
                        {feature.gold}
                      </span>
                    </div>
                    <div className={styles.comparisonTierCell}>
                      <span className={feature.platinum === CHECK ? styles.checkIcon : styles.dashIcon}>
                        {feature.platinum}
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
