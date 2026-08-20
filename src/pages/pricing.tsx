import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import {
  enterprisePlan,
  featureGroups,
  openPlan,
  type PlanCell,
} from '../data/plans';
import styles from './pricing.module.css';

function PlanCellValue({ cell }: { cell: PlanCell }) {
  if (cell.kind === 'yes') {
    return (
      <span className={styles.cellYes} aria-label="Included">
        ✓
      </span>
    );
  }
  if (cell.kind === 'text') {
    return <span className={styles.cellText}>{cell.value}</span>;
  }
  return (
    <span className={styles.cellNo} aria-label="Not included">
      ✕
    </span>
  );
}

function PlanCard({
  name,
  badge,
  tag,
  description,
  highlights,
  featured,
  cta,
}: {
  name: string;
  badge?: string;
  tag: string;
  description: string;
  highlights: string[];
  featured?: boolean;
  cta:
    | { kind: 'link'; label: string; to: string }
    | { kind: 'demo'; label: string; plan: string };
}) {
  const buttonClass = featured
    ? styles.pricingButton
    : styles.pricingButtonOutline;

  return (
    <div className={clsx(styles.planCard, featured && styles.planCardFeatured)}>
      <div className={styles.planHeaderTop}>
        <h2 className={styles.planName}>{name}</h2>
        {badge && (
          <span
            className={clsx(
              styles.planBadge,
              featured ? styles.planBadgeFeatured : styles.planBadgeNeutral,
            )}
          >
            {badge}
          </span>
        )}
      </div>
      <span className={styles.planTag}>{tag}</span>
      <p className={styles.planDescription}>{description}</p>
      <ul className={styles.planHighlights}>
        {highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {cta.kind === 'link' ? (
        <Link to={cta.to} className={buttonClass}>
          {cta.label}
        </Link>
      ) : (
        <button
          data-cal-link="coderx/30-min"
          data-cal-config={JSON.stringify({
            layout: 'month_view',
            'metadata[plan]': cta.plan,
            notes: `Interested in: ${cta.plan}`,
          })}
          className={buttonClass}
        >
          {cta.label}
        </button>
      )}
    </div>
  );
}

export default function Pricing() {
  return (
    <Layout
      title="Pricing"
      description="Compare CodeRx Open and Enterprise. Start free with a yearly snapshot, or get the full drug database with weekly updates."
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <Heading as="h1" className={styles.title}>
            Compare CodeRx Plans
          </Heading>
          <p className={styles.subtitle}>
            Start free with CodeRx Open, then move to Enterprise when you need
            the full database, weekly updates, and advanced analytics.
          </p>
        </div>

        <div className={styles.planCards}>
          <PlanCard {...openPlan} />
          <PlanCard {...enterprisePlan} />
        </div>

        <div className={styles.table} role="table" aria-label="Plan features">
          <div className={styles.tableHead} role="row">
            <div className={styles.featuresLabel} role="columnheader">
              Features
            </div>
            <div className={styles.planColLabel} role="columnheader">
              Open
            </div>
            <div
              className={clsx(styles.planColLabel, styles.planColLabelFeatured)}
              role="columnheader"
            >
              Enterprise
            </div>
          </div>

          {featureGroups.map((group) => (
            <div
              key={group.id}
              className={styles.group}
            >
              {group.label && (
                <div className={styles.groupHeader} role="rowheader">
                  {group.label}
                </div>
              )}
              {group.rows.map((row) => (
                <div key={row.id} className={styles.row} role="row">
                  <div className={styles.feature} role="cell">
                    <span className={styles.featureName}>{row.name}</span>
                    <p className={styles.featureDetail}>{row.detail}</p>
                  </div>
                  <div className={styles.cell} role="cell">
                    <PlanCellValue cell={row.open} />
                  </div>
                  <div
                    className={clsx(styles.cell, styles.cellFeatured)}
                    role="cell"
                  >
                    <PlanCellValue cell={row.enterprise} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <p className={styles.progressionNote}>
          <strong>CodeRx Open is refreshed once a year</strong>, so it will
          drift out of date between releases.{' '}
          <strong>Enterprise is refreshed weekly</strong> and delivered to AWS
          S3 in CSV and Parquet with complete documentation.
        </p>

        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Not sure which plan is right for you?</h2>
          <p className={styles.ctaSubtitle}>
            Book a 30-minute demo and we'll walk you through the data and help
            you choose.
          </p>
          <div className={styles.ctaButtons}>
            <button
              data-cal-link="coderx/30-min"
              data-cal-config='{"layout":"month_view","metadata[plan]":"Enterprise","notes":"Interested in: Enterprise"}'
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
