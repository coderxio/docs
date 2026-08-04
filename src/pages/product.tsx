import React, { useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';

import styles from './product.module.css';

declare global {
  interface Window {
    Cal?: (...args: any[]) => void;
  }
}

interface Mart {
  title: string;
  description: string;
  items: string[];
  /** Only the core marts link out; premium documentation is unlisted */
  href?: string;
}

const coreMarts: Mart[] = [
  {
    title: 'Packages',
    description:
      'Every NDC mapped to its drug product, so you never hand-join an NDC directory again.',
    items: [
      'NDC11, NDC10 and NDC9 formats',
      'Marketing dates & marketing category',
      'Labeler, application number, DEA schedule',
    ],
    href: '/concepts/packages',
  },
  {
    title: 'Drugs',
    description:
      'Brand and clinical products in one table, already linked to each other.',
    items: [
      'RXCUIs & prescribable names',
      'Dose forms and ingredient composition',
      'Brand-to-generic relationships',
    ],
    href: '/concepts/drugs',
  },
  {
    title: 'Ingredients',
    description:
      'Active ingredients with the strength detail you need for clinical logic.',
    items: [
      'Structured ingredient strengths',
      'Precise ingredient classifications',
      'Multi-ingredient product components',
    ],
    href: '/concepts/ingredients',
  },
  {
    title: 'Excipients',
    description:
      'Inactive ingredients, flagged for the questions patients actually ask.',
    items: [
      'Gluten, dye and preservative flags',
      'Standardized UNII identifiers',
      'Allergy and dietary screening',
    ],
    href: '/concepts/excipients',
  },
  {
    title: 'Classes',
    description:
      'Multiple classification systems for rolling products up therapeutically.',
    items: [
      'Class-to-drug mappings',
      'Several classification schemes',
      'Therapeutic and mechanism grouping',
    ],
    href: '/concepts/classes',
  },
  {
    title: 'Synonyms',
    description:
      'Alternative names aggregated from every source, for search that finds things.',
    items: [
      'Multi-source name aggregation',
      'Fuzzy matching & autocomplete',
      'LLM training and retrieval',
    ],
    href: '/concepts/synonyms',
  },
];

const goldMarts: Mart[] = [
  {
    title: 'Pricing',
    description:
      'Acquisition cost and Medicare Part B reimbursement, current and historical.',
    items: [
      'NADAC cost per unit with price-change history',
      'CMS ASP pricing for HCPCS J codes',
      'Quarterly ASP history tracked as SCD2',
    ],
  },
  {
    title: 'Packaging',
    description:
      'Package dimensions derived from FDA packaging components, parsed for you.',
    items: [
      'Outermost and innermost packaging units',
      'Total product quantity across nested components',
      'Raw FDA package description retained',
    ],
  },
  {
    title: 'Label Images',
    description:
      'DailyMed label images mapped to the NDCs they belong to.',
    items: [
      'Direct image URLs by NDC',
      'Links back to the DailyMed SPL',
      'Deduplicated across SPL sources',
    ],
  },
  {
    title: 'REMS',
    description:
      'Active FDA Risk Evaluation and Mitigation Strategy programs, resolved to products.',
    items: [
      'Programs with approved version and goals',
      'Package-level NDC mappings',
      'RxNorm drug mappings per program',
    ],
  },
];

const platinumMarts: Mart[] = [
  {
    title: 'Indications',
    description:
      'What a drug may treat or prevent, coded for analytics.',
    items: [
      'MeSH and ICD-10-CM condition codes',
      'may_treat and may_prevent relationships',
      'Linked to RxNorm clinical products',
    ],
  },
  {
    title: 'E-prescribing',
    description:
      'NCPDP/NCIt crosswalks for interoperability and prescription workflows.',
    items: [
      'One representative NDC per drug product',
      'Dose form and dose unit crosswalks',
      'DEA schedule terminology mappings',
    ],
  },
  {
    title: 'Plans',
    description:
      'Medicare Part D plan data for formulary and reimbursement analysis.',
    items: ['Part D formularies', 'Formulary tiers', 'Reimbursement detail'],
  },
  {
    title: 'Storage and handling',
    description:
      'Handling requirements for products that cannot sit on an ordinary shelf.',
    items: [
      'Cold storage requirements',
      'Special handling requirements',
      'Product-level detail',
    ],
  },
];

const sampleQuery = `-- Every marketed NDC for atorvastatin 10 mg oral tablets,
-- with brand availability and labeler
select
    p.ndc11,
    p.labeler_name,
    d.prescribable_name,
    d.is_brand,
    d.available_brand_names
from packages p
join drugs d
  on d.drug_id = p.drug_id
where d.clinical_drug_id = 617312
  and d.active
  and d.prescribable;`;

function ProductHero() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <span className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          The CodeRx Drug Database
        </span>
        <Heading as="h1" className={styles.heroTitle}>
          Drug data that's{' '}
          <span className={styles.heroTitleAccent}>analytics ready</span>
        </Heading>
        <p className={styles.heroDescription}>
          RxNorm, FDA, DailyMed, NADAC, CMS and NCPDP unified into clean,
          documented data marts you can query with standard SQL. Delivered to
          your own S3 bucket every week as CSV and Parquet — no XML parsing, no
          terminology expertise required.
        </p>
        <div className={styles.heroActions}>
          <button
            data-cal-link="coderx/30-min"
            data-cal-config='{"layout":"month_view"}'
            className={styles.primaryButton}
          >
            Book a Demo
          </button>
          <Link className={styles.secondaryButton} to="#core">
            Explore the data marts
          </Link>
        </div>
        <p className={styles.heroNote}>
          Want to try it first?{' '}
          <Link to="/open">Start free with CodeRx Open</Link>.
        </p>
      </div>
    </header>
  );
}

function MartCard({ mart }: { mart: Mart }) {
  return (
    <div className={styles.martCard}>
      <h3 className={styles.martTitle}>{mart.title}</h3>
      <p className={styles.martDesc}>{mart.description}</p>
      <ul className={styles.martList}>
        {mart.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {mart.href && (
        <Link className={styles.martLink} to={mart.href}>
          View documentation →
        </Link>
      )}
    </div>
  );
}

function CoreSection() {
  return (
    <section id="core" className={clsx(styles.section, styles.sectionLight)}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Included in every plan</span>
          <Heading as="h2" className={styles.sectionTitle}>
            The Core Data Marts
          </Heading>
          <p className={styles.sectionSubtitle}>
            Six foundational marts that answer the drug data questions most
            teams start with. Every subscription includes all of them, refreshed
            weekly and fully documented.
          </p>
        </div>
        <div className={styles.martGrid}>
          {coreMarts.map((mart) => (
            <MartCard key={mart.title} mart={mart} />
          ))}
        </div>
      </div>
    </section>
  );
}

function QuerySection() {
  return (
    <section className={clsx(styles.section, styles.sectionMuted)}>
      <div className={styles.sectionInner}>
        <div className={styles.queryLayout}>
          <div className={styles.queryCopy}>
            <Heading as="h2" className={styles.sectionTitle}>
              Answers in One Query
            </Heading>
            <p className={styles.queryDesc}>
              The hard part of drug data isn't finding it — it's reconciling
              RxNorm term types, FDA listings, and NDC formats into something
              you can trust. CodeRx does that work upstream, so a question that
              normally takes a week of modeling becomes a single query.
            </p>
            <ul className={styles.queryPoints}>
              <li>Consistent identifiers across every mart</li>
              <li>Pre-joined tables with documented columns</li>
              <li>Tested for uniqueness and referential integrity</li>
            </ul>
            <Link className={styles.inlineLink} to="/concepts">
              Browse the full schema documentation →
            </Link>
          </div>
          <div className={styles.queryCode}>
            <CodeBlock language="sql">{sampleQuery}</CodeBlock>
          </div>
        </div>
      </div>
    </section>
  );
}

function PremiumSection() {
  return (
    <section
      id="premium"
      className={clsx(styles.section, styles.sectionLight)}
    >
      <div className={styles.sectionInner}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Gold & Platinum</span>
          <Heading as="h2" className={styles.sectionTitle}>
            Premium Data Marts
          </Heading>
          <p className={styles.sectionSubtitle}>
            When the core marts aren't enough, higher plans add pricing,
            packaging, safety programs, and clinical mappings — built the same
            way, documented the same way.
          </p>
        </div>

        <div className={styles.tierBlock}>
          <div className={styles.tierHeader}>
            <span className={clsx(styles.tierBadge, styles.tierBadgeGold)}>
              Gold
            </span>
            <span className={styles.tierHeaderText}>
              Everything in Silver, plus commercial and operational data
            </span>
          </div>
          <div className={styles.martGrid}>
            {goldMarts.map((mart) => (
              <MartCard key={mart.title} mart={mart} />
            ))}
          </div>
        </div>

        <div className={styles.tierBlock}>
          <div className={styles.tierHeader}>
            <span className={clsx(styles.tierBadge, styles.tierBadgePlatinum)}>
              Platinum
            </span>
            <span className={styles.tierHeaderText}>
              Everything in Gold, plus clinical and interoperability data
            </span>
          </div>
          <div className={styles.martGrid}>
            {platinumMarts.map((mart) => (
              <MartCard key={mart.title} mart={mart} />
            ))}
          </div>
        </div>

        <p className={styles.premiumFootnote}>
          Documentation for the premium marts is shared with customers.{' '}
          <Link to="/pricing">Compare what each plan includes</Link> or{' '}
          <Link to="/contact-us">ask us for a walkthrough</Link>.
        </p>
      </div>
    </section>
  );
}

function DeliverySection() {
  const facts = [
    {
      title: 'Weekly refresh',
      description:
        'New data every week as upstream sources publish, with dated snapshots so you can reproduce past results.',
    },
    {
      title: 'Your own S3 bucket',
      description:
        'Direct access to every mart in CSV and Parquet. Load it into Snowflake, DuckDB, Postgres, or whatever you already run.',
    },
    {
      title: 'Documented columns',
      description:
        'Every mart ships with schema docs, source lineage, and tutorials — the same documentation you can read before you buy.',
    },
    {
      title: 'Built by pharmacists',
      description:
        'Modeling decisions are made by people who have worked with these data sources in practice, not just in a warehouse.',
    },
  ];

  return (
    <section className={clsx(styles.section, styles.sectionMuted)}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            How It's Delivered
          </Heading>
        </div>
        <div className={styles.deliveryGrid}>
          {facts.map((fact) => (
            <div key={fact.title} className={styles.deliveryCard}>
              <h3 className={styles.deliveryTitle}>{fact.title}</h3>
              <p className={styles.deliveryDesc}>{fact.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCta() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaInner}>
        <Heading as="h2" className={styles.ctaTitle}>
          See it against your use case
        </Heading>
        <p className={styles.ctaSubtitle}>
          Book a 30-minute demo and we'll walk through the marts that matter for
          what you're building.
        </p>
        <div className={styles.ctaActions}>
          <button
            data-cal-link="coderx/30-min"
            data-cal-config='{"layout":"month_view"}'
            className={styles.primaryButton}
          >
            Book a Demo
          </button>
          <Link className={styles.secondaryButton} to="/pricing">
            Compare plans
          </Link>
        </div>
        <p className={styles.ctaFootnote}>
          Not ready for a subscription?{' '}
          <Link to="/open">CodeRx Open is free</Link> and includes drugs, NDCs,
          and classes.
        </p>
      </div>
    </section>
  );
}

export default function ProductPage() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const existingScript = document.querySelector(
      'script[src="https://app.cal.com/embed/embed.js"]'
    );
    if (!existingScript) {
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
  }, []);

  return (
    <Layout
      title="Product — The CodeRx Drug Database"
      description="The CodeRx Drug Database unifies RxNorm, FDA, DailyMed, NADAC, CMS and NCPDP into documented, query-ready data marts. Explore the core marts plus premium pricing, packaging, REMS, indications, and e-prescribing data."
    >
      <main className={styles.main}>
        <ProductHero />
        <CoreSection />
        <QuerySection />
        <PremiumSection />
        <DeliverySection />
        <ProductCta />
      </main>
    </Layout>
  );
}
