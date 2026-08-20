import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './index.module.css';

function HashScrollHandler() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      return undefined;
    }

    const scrollToHash = () => {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    };

    const frame = window.requestAnimationFrame(scrollToHash);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return null;
}

function BookDemoButton({
  className,
  variant = 'primary',
}: {
  className?: string;
  variant?: 'primary' | 'heroPrimary';
}) {
  const buttonClass =
    className ??
    (variant === 'heroPrimary' ? styles.heroPrimary : styles.ctaPrimary);

  return (
    <button
      type="button"
      data-cal-link="coderx/30-min"
      data-cal-config='{"layout":"month_view"}'
      className={buttonClass}
    >
      Book a Demo
    </button>
  );
}

function HomepageHeader() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <Heading as="h1" className={styles.heroTitle}>
            Drug Data,
            <br />
            <span className={styles.highlight}>Simplified</span>
          </Heading>
          <p className={styles.heroDescription}>
            CodeRx makes open drug data easy to use, at a fraction of the
            cost of proprietary drug databases.
          </p>
          <div className={styles.heroActions}>
            <BookDemoButton variant="heroPrimary" />
            <Link className={styles.heroSecondary} to="/pricing">
              View Pricing
            </Link>
          </div>
          <div className={styles.heroBadges}>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>◈</span>
              <span>reproducible weekly snapshots</span>
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>◇</span>
              <span>NDC + RxCUI, no proprietary lock-in</span>
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>○</span>
              <span>built by pharmacists who run the pipelines</span>
            </div>
          </div>
        </div>
        <div className={styles.heroMarkWrap} aria-hidden="true">
          <div className={styles.heroMark}>
            <ThemedImage
              alt=""
              sources={{
                light: useBaseUrl('/img/CodeRx Pill Logo Black.svg'),
                dark: useBaseUrl('/img/CodeRx Pill Logo White.png'),
              }}
              width={420}
              height={420}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

const productJoinPath = [
  'packages',
  'drugs',
  'ingredients',
  'classes',
  'prices',
];

function ProductSection() {
  const points = [
    {
      title: 'One unified schema',
      description:
        'Six public sources reconciled into a single model. A package row joins to drugs, ingredients, classes, and prices without a mapping layer you have to maintain.',
    },
    {
      title: 'Purpose-built data marts',
      description:
        'Semantic drug concepts organized around pharmacy questions — not RxNorm RRF tables, not SPL XML, not a proprietary vocabulary you cannot leave.',
    },
    {
      title: 'Open identifiers',
      description:
        'NDC and RxCUI throughout, refreshed weekly, documented before you buy. Load CSV and Parquet into the warehouse you already run.',
    },
  ];

  return (
    <section className={styles.product} id="database">
      <div className={styles.productFrame}>
        <div className={styles.productInner}>
          <div className={styles.productCopy}>
            <Heading as="h2" className={styles.productTitle}>
              The CodeRx Drug Database
            </Heading>
            <p className={styles.productDesc}>
              Six public sources unified into query-ready data marts. Drugs,
              packages, ingredients, classes, and prices — already joined on
              NDC and RxCUI, documented, and refreshed weekly.
            </p>
            <ol
              className={styles.productPath}
              aria-label="Pre-joined tables: packages, drugs, ingredients, classes, prices"
            >
              {productJoinPath.map((table, index) => (
                <li key={table} className={styles.productPathStep}>
                  {index > 0 && (
                    <span className={styles.productPathJoin} aria-hidden="true">
                      →
                    </span>
                  )}
                  <span className={styles.productPathTable}>{table}</span>
                </li>
              ))}
            </ol>
          </div>
          <ol className={styles.productPoints}>
            {points.map((point, index) => (
              <li key={point.title} className={styles.productPoint}>
                <span className={styles.productPointIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className={styles.productPointTitle}>{point.title}</h3>
                  <p className={styles.productPointDesc}>{point.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

const buyerPersonas: {
  id: string;
  title: string;
  tag: string;
  description: string;
  helps: string[];
}[] = [
  {
    id: 'analytics-leaders',
    title: 'Analytics & data leaders',
    tag: 'Claims, utilization, medication analytics',
    description:
      'Stop rebuilding RxNorm joins every time FDA publishes. Marketed NDCs, brand versus generic, therapeutic classes, and NADAC/ASP history arrive on the same identifier — so medication work on claims stays in SQL, not a side pipeline.',
    helps: [
      'NDCs, clinical drugs, and classes pre-joined — no RxNorm RRF detour',
      'Acquisition cost and Part B ASP on the package row your claims already use',
      "Dated weekly snapshots so last quarter's board analysis still reproduces",
    ],
  },
  {
    id: 'health-ai-startups',
    title: 'Healthcare AI & data startups',
    tag: 'Real drug data without the enterprise tax',
    description:
      'You need a drug layer you can ship on — not a three-year contract and a proprietary ID you will spend the Series A extracting yourself out of. Weekly-refreshed marts on open standards, at a price that does not assume you are a health system.',
    helps: [
      'Open-standard IDs (NDC, RxCUI) — no GCN/GPI lock-in to unwind later',
      'Schema and docs you can review before you sign; CSV and Parquet on S3',
      'Pull into Snowflake, DuckDB, Postgres, or whatever your stack already runs',
    ],
  },
];

function PersonasSection() {
  return (
    <section
      className={styles.personas}
      id="who"
      aria-labelledby="personas-heading"
    >
      <div className={styles.personasInner}>
        <div className={styles.personasHeader}>
          <Heading as="h2" id="personas-heading" className={styles.personasTitle}>
            Built for pharmacy analytics
            <br />
            and health tech teams
          </Heading>
          <p className={styles.personasSubtitle}>
            Same weekly-refreshed marts — whether you are joining NDCs on
            claims or shipping a medication feature before the next raise.
          </p>
        </div>
        <div className={styles.personaCards}>
          {buyerPersonas.map((persona) => (
            <article key={persona.id} className={styles.personaCard}>
              <div className={styles.personaCardHeader}>
                <h3 className={styles.personaName}>{persona.title}</h3>
                <p className={styles.personaTag}>{persona.tag}</p>
              </div>
              <p className={styles.personaDesc}>{persona.description}</p>
              <ul className={styles.personaHelps}>
                {persona.helps.map((help) => (
                  <li key={help}>{help}</li>
                ))}
              </ul>
              <div className={styles.personaCardAction}>
                <BookDemoButton />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const sampleQuery = `-- Every marketed NDC for atorvastatin 10 mg oral tablets,
-- with brand and labeler
select
    p.ndc11,
    p.labeler_name,
    d.prescribable_name,
    d.is_brand
from drugs d
join packages p
  on p.drug_id = d.drug_id
where d.clinical_drug_id = '617312'
  and p.active;`;

const sampleResults = [
  {
    ndc11: '551110121090',
    labeler_name: "Dr. Reddy's Laboratories",
    prescribable_name: 'atorvastatin 10 mg oral tablet',
    is_brand: 'false',
  },
  {
    ndc11: '00071015523',
    labeler_name: 'Viatris Specialty LLC',
    prescribable_name: 'Lipitor 10 mg oral tablet',
    is_brand: 'true',
  },
];

function QuerySection() {
  return (
    <section className={styles.query} id="query">
      <div className={styles.queryInner}>
        <div className={styles.queryLayout}>
          <div className={styles.queryCopy}>
            <Heading as="h2" className={styles.queryTitle}>
              With CodeRx, it&apos;s a query
            </Heading>
            <p className={styles.queryDesc}>
              Without CodeRx, this question is a data engineering project:
              RxNorm relationship tables, FDA listings in three NDC formats,
              XML to parse, identifiers that don&apos;t quite join, and a
              cleanup job every time the files refresh. With CodeRx, it&apos;s
              a simple query.
            </p>
            <ul className={styles.queryPoints}>
              <li>No RxNorm RRF tables to reverse-engineer</li>
              <li>No NDC format cleanup across sources</li>
              <li>No weekly pipeline to re-run when FDA publishes</li>
            </ul>
            <div className={styles.queryActions}>
              <BookDemoButton />
            </div>
          </div>
          <div className={styles.queryProof}>
            <div className={styles.queryCode}>
              <CodeBlock language="sql">{sampleQuery}</CodeBlock>
            </div>
            <div className={styles.resultTableWrap}>
              <table className={styles.resultTable}>
                <caption className={styles.resultCaption}>
                  Result · atorvastatin 10 mg oral tablet
                </caption>
                <thead>
                  <tr>
                    <th>ndc11</th>
                    <th>labeler_name</th>
                    <th>prescribable_name</th>
                    <th>is_brand</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleResults.map((row) => (
                    <tr key={row.ndc11}>
                      <td className={styles.resultMono}>{row.ndc11}</td>
                      <td>{row.labeler_name}</td>
                      <td>{row.prescribable_name}</td>
                      <td className={styles.resultMono}>{row.is_brand}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <p className={styles.queryBridge}>
          Most teams start with packages, drugs, and classes — Enterprise adds
          pricing and the full pharmacy marts.{' '}
          <Link className={styles.inlineLink} to="/concepts">
            Full schema documentation →
          </Link>
        </p>
      </div>
    </section>
  );
}

const rawSources = [
  {
    name: 'RxNorm',
    description: 'Clinical and brand terminology with ingredient hierarchies',
  },
  {
    name: 'FDA',
    description:
      'NDC product listings, marketing dates, and UNII substance identifiers',
  },
  {
    name: 'RxClass',
    description: 'Classification systems for therapeutic aggregation',
  },
  {
    name: 'DailyMed',
    description: 'Structured product labeling and inactive ingredients',
  },
  {
    name: 'NADAC',
    description: 'National acquisition cost with historical trends',
  },
  {
    name: 'CMS',
    description:
      'Medicare Part B ASP pricing for HCPCS J-codes, current and historical',
  },
];

function SourcesSection() {
  const diagramRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [streams, setStreams] = useState<
    {d: string; delay: number; width: number}[]
  >([]);
  const [hubCenter, setHubCenter] = useState({x: 0, y: 0, r: 120});

  const leftSources = rawSources.slice(0, 3);
  const rightSources = rawSources.slice(3);

  const measureStreams = useCallback(() => {
    const diagram = diagramRef.current;
    const hub = hubRef.current;
    if (!diagram || !hub) {
      return;
    }

    const dRect = diagram.getBoundingClientRect();
    const hRect = hub.getBoundingClientRect();
    const hubX = hRect.left + hRect.width / 2 - dRect.left;
    const hubY = hRect.top + hRect.height / 2 - dRect.top;
    setHubCenter({
      x: hubX,
      y: hubY,
      // Fade starts in the gap before the wordmark, gone by the center
      r: Math.max(hRect.width, hRect.height) * 1.35,
    });

    const next = nodeRefs.current
      .filter((node): node is HTMLLIElement => node != null)
      .map((node, index) => {
        const nRect = node.getBoundingClientRect();
        const nodeCenterX = nRect.left + nRect.width / 2 - dRect.left;
        const nodeCenterY = nRect.top + nRect.height / 2 - dRect.top;
        const isLeft = nodeCenterX < hubX;
        const x1 = isLeft ? nRect.right - dRect.left : nRect.left - dRect.left;
        const y1 = nodeCenterY;

        const dx = hubX - x1;
        const dy = hubY - y1;
        const c1x = x1 + dx * 0.45;
        const c1y = y1 + dy * 0.12;
        const c2x = hubX - dx * 0.2;
        const c2y = hubY - dy * 0.12;

        return {
          d: `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${hubX} ${hubY}`,
          delay: (index % 3) * 0.14,
          width: 2.4 + (index % 2) * 0.6,
        };
      });

    setStreams(next);
  }, []);

  useLayoutEffect(() => {
    measureStreams();

    const diagram = diagramRef.current;
    if (!diagram || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measureStreams);
      return () => window.removeEventListener('resize', measureStreams);
    }

    const observer = new ResizeObserver(() => measureStreams());
    observer.observe(diagram);
    window.addEventListener('resize', measureStreams);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measureStreams);
    };
  }, [measureStreams]);

  const renderSourceCard = (
    source: (typeof rawSources)[number],
    index: number,
  ) => (
    <li
      key={source.name}
      className={styles.sourceCard}
      title={source.description}
      ref={(el) => {
        nodeRefs.current[index] = el;
      }}
    >
      <span className={styles.sourceName}>{source.name}</span>
      <span className={styles.sourceDesc}>{source.description}</span>
    </li>
  );

  return (
    <section className={styles.sources} id="sources">
      <div className={styles.sourcesInner}>
        <div className={styles.sourcesHeader}>
          <Heading as="h2" className={styles.sourcesTitle}>
            We know open drug data
            <br />
            <span className={styles.sourcesTitleAside}>
              (so you don't have to)
            </span>
          </Heading>
          <p className={styles.sourcesDesc}>
            These marts are largely sourced from public data — then transformed
            into something incredibly easy to work with. Much of it is not
            available from any open source without considerable, specific,
            validated transformation with every refresh. CodeRx coordinates and
            manages all of that for you, and continues to develop new features.
          </p>
        </div>
        <div className={styles.sourcesDiagram} ref={diagramRef}>
          <svg
            className={styles.sourcesLines}
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <radialGradient
                id="sourcesStreamFade"
                gradientUnits="userSpaceOnUse"
                cx={hubCenter.x}
                cy={hubCenter.y}
                r={hubCenter.r}
              >
                <stop offset="0%" stopColor="#000" />
                <stop offset="18%" stopColor="#000" />
                <stop offset="55%" stopColor="#fff" />
                <stop offset="100%" stopColor="#fff" />
              </radialGradient>
              <mask
                id="sourcesStreamMask"
                maskUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="url(#sourcesStreamFade)"
                />
              </mask>
            </defs>
            <g mask="url(#sourcesStreamMask)">
              {streams.map((stream, i) => (
                <path
                  key={rawSources[i]?.name ?? i}
                  className={styles.sourcesStream}
                  d={stream.d}
                  strokeWidth={stream.width}
                  style={{animationDelay: `${stream.delay}s`}}
                />
              ))}
            </g>
          </svg>
          <ul className={styles.sourcesCol}>
            {leftSources.map((source, i) => renderSourceCard(source, i))}
          </ul>
          <div className={styles.sourcesHub} ref={hubRef}>
            <img
              className={styles.sourcesHubLogo}
              src="/img/coderx_text_logo_white.svg"
              alt="CodeRx"
              width={280}
              height={108}
            />
          </div>
          <ul className={styles.sourcesCol}>
            {rightSources.map((source, i) =>
              renderSourceCard(source, i + leftSources.length),
            )}
          </ul>
        </div>
        <div className={styles.sectionCta}>
          <BookDemoButton />
        </div>
      </div>
    </section>
  );
}

const opsGroups = [
  {
    title: 'Drive population health',
    pitch:
      'Brand versus generic, therapeutic class, and indication on the same package row — so cohort definitions and utilization measures do not start with a terminology project.',
    marts: [
      'Brand vs generic',
      'Therapeutic classes',
      'Indications',
      'Marketing status',
    ],
  },
  {
    title: 'Optimize coverage and mix',
    pitch:
      'Formulary, tier, and medical-benefit J-codes on the NDC your claims already use — so coverage and mix analysis does not live in three extracts.',
    marts: ['Part D plans', 'HCPCS to NDC', 'ASP', 'NADAC'],
  },
];

function PharmacyMartsSection() {
  return (
    <section className={styles.ops} id="marts">
      <div className={styles.opsHeader}>
        <Heading as="h2" className={styles.opsHeading}>
          Drug identity for claims, pre-joined
        </Heading>
        <p className={styles.opsSubtitle}>
          A claim NDC does not carry class, indication, or coverage on its own.
          These marts join that context to the same identifier — so population
          health and payer work stays in your warehouse, not a new pipeline
          every refresh.
        </p>
      </div>
      <div className={styles.opsGrid}>
        {opsGroups.map((group) => (
          <div key={group.title} className={styles.opsCard}>
            <h3 className={styles.opsTitle}>{group.title}</h3>
            <p className={styles.opsPitch}>{group.pitch}</p>
            <ul className={styles.opsMarts} aria-label={`${group.title} marts`}>
              {group.marts.map((mart) => (
                <li key={mart}>{mart}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.sectionCta}>
        <BookDemoButton />
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaInner}>
        <Heading as="h2" className={styles.ctaTitle}>
          Ready to simplify
          <br />
          your drug data?
        </Heading>
        <p className={styles.ctaDescription}>
          Book a 30-minute demo and we&apos;ll walk through the marts that
          matter for your claims analytics or product roadmap.
        </p>
        <div className={styles.ctaActions}>
          <button
            data-cal-link="coderx/30-min"
            data-cal-config='{"layout":"month_view"}'
            className={styles.ctaPrimary}
          >
            Book a Demo
          </button>
          <Link className={styles.ctaSecondary} to="/pricing">
            View Pricing
          </Link>
        </div>
        <p className={styles.ctaFootnote}>
          Or feel free to{' '}
          <Link to="/contact-us">contact us</Link> with a question.
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title} — Drug Data, Simplified`}
      description="Query-ready drug data marts for pharmacy analytics teams and health tech startups — weekly refreshed on open identifiers. Book a demo to see the marts that fit your use case."
    >
      <Head>
        <title>{`${siteConfig.title} - Drug Data, Simplified`}</title>
      </Head>
      <HashScrollHandler />
      <main className={styles.main}>
        <HomepageHeader />
        <ProductSection />
        <PharmacyMartsSection />
        <PersonasSection />
        <QuerySection />
        <SourcesSection />
        <CTASection />
      </main>
    </Layout>
  );
}
