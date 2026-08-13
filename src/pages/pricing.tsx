import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import {
  enterprisePlan,
  featureRows,
  openPlan,
  type PlanCell,
} from '../data/plans';
import styles from './pricing.module.css';

declare global {
  interface Window {
    Cal?: (...args: any[]) => void;
  }
}

function initCal() {
  if (typeof window === 'undefined') return;

  const existingScript = document.querySelector(
    'script[src="https://app.cal.com/embed/embed.js"]',
  );
  if (existingScript) return;

  (function (C: any, A: string, L: string) {
    const p = (a: any, ar: any) => {
      a.q.push(ar);
    };
    const d = C.document;
    C.Cal =
      C.Cal ||
      function (...args: any[]) {
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
          const api: any = (...a: any[]) => {
            p(api, a);
          };
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

function PlanCellValue({ cell }: { cell: PlanCell }) {
  if (cell.kind === 'text') {
    return <span className={styles.cellText}>{cell.value}</span>;
  }
  if (cell.kind === 'yes') {
    return (
      <span className={styles.cellYes} aria-label="Included">
        ✓
      </span>
    );
  }
  return (
    <span className={styles.cellNo} aria-label="Not included">
      ✕
    </span>
  );
}

function PlanHeader({
  name,
  badge,
  tag,
  description,
  featured,
  cta,
}: {
  name: string;
  badge?: string;
  tag: string;
  description: string;
  featured?: boolean;
  cta:
    | { kind: 'link'; label: string; to: string }
    | { kind: 'demo'; label: string; plan: string };
}) {
  const buttonClass = featured
    ? styles.pricingButton
    : styles.pricingButtonOutline;

  return (
    <div
      className={clsx(styles.planHeader, featured && styles.planHeaderFeatured)}
    >
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
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  useEffect(() => {
    initCal();
  }, []);

  const toggleRow = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

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

        <div className={styles.table}>
          <div className={styles.tableHead}>
            <div className={styles.featuresLabel}>Features</div>
            <PlanHeader {...openPlan} />
            <PlanHeader {...enterprisePlan} />
          </div>

          {featureRows.map((row) => {
            const isExpanded = expandedIds.includes(row.id);
            return (
              <div
                key={row.id}
                className={clsx(styles.row, isExpanded && styles.rowExpanded)}
              >
                <div className={styles.rowMain}>
                  <button
                    type="button"
                    className={styles.featureToggle}
                    aria-expanded={isExpanded}
                    onClick={() => toggleRow(row.id)}
                  >
                    <span className={styles.featureName}>{row.name}</span>
                    <span
                      className={clsx(
                        styles.chevron,
                        isExpanded && styles.chevronOpen,
                      )}
                      aria-hidden="true"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.5 4.5L6 8L9.5 4.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                  <div className={styles.cell}>
                    <PlanCellValue cell={row.open} />
                  </div>
                  <div className={clsx(styles.cell, styles.cellFeatured)}>
                    <PlanCellValue cell={row.enterprise} />
                  </div>
                </div>
                <div
                  className={clsx(
                    styles.detail,
                    isExpanded && styles.detailOpen,
                  )}
                >
                  <p className={styles.detailText}>{row.detail}</p>
                </div>
              </div>
            );
          })}
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
