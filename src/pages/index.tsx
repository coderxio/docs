import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

// SVG Icons
import PackageIcon from '../assets/icons/package.svg';
import DrugIcon from '../assets/icons/drug.svg';
import IngredientIcon from '../assets/icons/ingredient.svg';
import ClassIcon from '../assets/icons/class.svg';
import ExcipientIcon from '../assets/icons/excipient.svg';
import SynonymIcon from '../assets/icons/synonym.svg';
import ArrowDownIcon from '../assets/icons/arrow-down.svg';

function DrugDataVisual() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  
  const dataTypes = [
    {
      type: 'Drugs',
      icon: DrugIcon,
      description: 'Unified drug products',
      examples: [
        { label: 'Name', value: 'atorvastatin 10 mg oral tablet' },
        { label: 'ID (RXCUI)', value: '617312' },
        { label: 'Brand Names', value: 'Lipitor' },
      ],
      color: 'var(--ifm-color-primary)',
      gradient: 'linear-gradient(135deg, var(--ifm-color-primary) 0%, var(--ifm-color-primary-dark) 100%)',
    },
    {
      type: 'Packages',
      icon: PackageIcon,
      description: 'NDC packages & pricing',
      examples: [
        { label: 'NDC', value: '55111-121-90' },
        { label: 'Pack Size', value: '90 count bottle' },
        { label: 'COST (NADAC)', value: '$0.02546 / tablet' },
      ],
      color: 'var(--ifm-color-secondary)',
      gradient: 'linear-gradient(135deg, var(--ifm-color-secondary) 0%, var(--ifm-color-secondary-dark) 100%)',
    },
    {
      type: 'Ingredients',
      icon: IngredientIcon,
      description: 'Active & inactive components',
      examples: [
        { label: 'Name', value: 'atorvastatin' },
        { label: 'Strength', value: '10 mg' },
        { label: 'Precise', value: 'atorvastatin calcium' },
      ],
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    },
  ];
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % dataTypes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [dataTypes.length]);
  
  return (
    <div className={styles.dataVisualContainer}>
      <div className={styles.dataCardsWrapper}>
        {dataTypes.map((dataType, index) => {
          const IconComponent = dataType.icon;
          const isActive = index === activeIndex;
          const offset = index - activeIndex;
          
          return (
            <div
              key={dataType.type}
              className={clsx(
                styles.dataCard,
                isActive && styles.dataCardActive
              )}
              onClick={() => !isActive && setActiveIndex(index)}
              style={{
                '--card-color': dataType.color,
                '--card-gradient': dataType.gradient,
                zIndex: dataTypes.length - Math.abs(offset),
                transform: isActive 
                  ? 'scale(1) translateX(0) translateZ(0)'
                  : offset < 0
                  ? `scale(${1 - Math.abs(offset) * 0.15}) translateX(${-180 * Math.abs(offset)}px) translateZ(${-100 * Math.abs(offset)}px)`
                  : `scale(${1 - Math.abs(offset) * 0.15}) translateX(${180 * Math.abs(offset)}px) translateZ(${-100 * Math.abs(offset)}px)`,
                opacity: isActive ? 1 : Math.max(0.2, 1 - Math.abs(offset) * 0.3),
                cursor: isActive ? 'default' : 'pointer',
              } as React.CSSProperties}
            >
              <div className={styles.dataCardHeader}>
                <div className={styles.dataCardIcon} style={{ background: dataType.gradient }}>
                  <IconComponent className={styles.dataCardIconSvg} />
                </div>
                <div className={styles.dataCardTitleWrapper}>
                  <h3 className={styles.dataCardTitle}>{dataType.type}</h3>
                  <p className={styles.dataCardDescription}>{dataType.description}</p>
                </div>
              </div>
              <div className={styles.dataCardExamples}>
                {dataType.examples.map((example, i) => (
                  <div 
                    key={i} 
                    className={clsx(styles.dataExample, isActive && styles.dataExampleActive)} 
                    style={{ 
                      animationDelay: isActive ? `${i * 0.1 + 0.2}s` : '0s',
                    }}
                  >
                    <span className={styles.dataExampleLabel}>{example.label}</span>
                    <span className={styles.dataExampleValue}>{example.value}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Indicator dots */}
      <div className={styles.dataCardIndicators}>
        {dataTypes.map((dataType, index) => (
          <button
            key={index}
            className={clsx(
              styles.dataCardIndicator,
              index === activeIndex && styles.dataCardIndicatorActive
            )}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${dataType.type} data`}
            style={
              index === activeIndex
                ? ({ '--indicator-color': dataType.color } as React.CSSProperties)
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}

function HomepageHeader() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.heroTitle}>
            Drug Data,<br />
            <span className={styles.highlight}>Simplified</span>
          </Heading>
          <p className={styles.heroDescription}>
            Stop choosing between hard-to-use raw government data and 
            expensive proprietary databases. CodeRx transforms RxNorm, FDA, 
            DailyMed, and NADAC into ready-to-query data marts—built by 
            pharmacists, designed for analytics.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} to="/getting-started">
              Get started
            </Link>
            <Link className={styles.secondaryButton} to="/docs">
              View docs
            </Link>
          </div>
          <p className={styles.heroPricing}>
            Starting at <strong>$5,500</strong>/year
          </p>
        </div>
        <DrugDataVisual />
      </div>
      
      <div className={styles.heroBadges}>
        <div className={styles.badge}>
          <span className={styles.badgeIcon}>◈</span>
          <span>weekly updates</span>
        </div>
        <div className={styles.badge}>
          <span className={styles.badgeIcon}>◇</span>
          <span>pharmacy-ready</span>
        </div>
        <div className={styles.badge}>
          <span className={styles.badgeIcon}>○</span>
          <span>open standards</span>
        </div>
      </div>
    </header>
  );
}

function DataSourcesSection() {
  const sources = [
    { name: 'RxNorm', description: 'Clinical & brand terminology with ingredient hierarchies' },
    { name: 'FDA NDC', description: 'Product listings, marketing dates & regulatory info' },
    { name: 'RxClass', description: 'Classification systems for therapeutic aggregation' },
    { name: 'DailyMed', description: 'Structured product labeling & inactive ingredients' },
    { name: 'NADAC', description: 'National pricing with historical trends' },
    { name: 'FDA UNII', description: 'Standardized excipient identifiers' },
  ];

  return (
    <section className={styles.dataSources}>
      <div className={styles.dataSourcesInner}>
        <div className={styles.dataSourcesHeader}>
          <Heading as="h2" className={styles.dataSourcesTitle}>
            Multi-Source Integration
          </Heading>
          <p className={styles.dataSourcesSubtitle}>
            Complex government data sources, unified and queryable
          </p>
        </div>
        <div className={styles.dataSourcesGrid}>
          {sources.map((source) => (
            <div key={source.name} className={styles.dataSourceCard}>
              <span className={styles.dataSourceName}>{source.name}</span>
              <span className={styles.dataSourceDesc}>{source.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DataMartCard({ 
  title, 
  description, 
  features,
  variant,
  icon
}: { 
  title: string; 
  description: string; 
  features: string[];
  variant: 'primary' | 'secondary' | 'tertiary';
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) {
  const IconComponent = icon;
  return (
    <div className={clsx(styles.serviceCard, styles[`serviceCard${variant}`])}>
      <div className={styles.serviceIcon}>
        <IconComponent className={styles.serviceIconSvg} />
      </div>
      <Heading as="h3" className={styles.serviceTitle}>{title}</Heading>
      <p className={styles.serviceDescription}>{description}</p>
      <ul className={styles.serviceFeatures}>
        {features.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
    </div>
  );
}

function ArrowDivider() {
  const ArrowComponent = ArrowDownIcon;
  return (
    <div className={styles.arrowDivider}>
      <div className={styles.arrowDividerInner}>
        <ArrowComponent className={styles.arrowIcon} />
        <ArrowComponent className={styles.arrowIcon} />
        <ArrowComponent className={styles.arrowIcon} />
        <ArrowComponent className={styles.arrowIcon} />
        <ArrowComponent className={styles.arrowIcon} />
      </div>
    </div>
  );
}

function DataMartsSection() {
  return (
    <section className={styles.services}>
      <div className={styles.servicesHeader}>
        <Heading as="h2" className={styles.servicesTitle}>
          Purpose-Built Data Marts
        </Heading>
        <p className={styles.servicesSubtitle}>
          Semantic drug concepts ready for pharmacy analytics—no transformation required
        </p>
      </div>
      <div className={styles.servicesGrid}>
        <DataMartCard
          variant="primary"
          title="Packages"
          description="NDC-to-drug mappings with complete pricing data"
          features={[
            'Weekly NDC updates',
            'Historical price changes',
            'NADAC pricing integration',
          ]}
          icon={PackageIcon}
        />
        <DataMartCard
          variant="secondary"
          title="Drugs"
          description="Unified view of brand and clinical products"
          features={[
            'Dose forms & strengths',
            'Brand-to-generic relationships',
            'Prescribable filtering',
          ]}
          icon={DrugIcon}
        />
        <DataMartCard
          variant="tertiary"
          title="Ingredients"
          description="Detailed active and inactive ingredient data"
          features={[
            'Strength information',
            'Component breakdowns',
            'Precise classifications',
          ]}
          icon={IngredientIcon}
        />
      </div>
      <div className={styles.servicesGridSecondary}>
        <div className={styles.secondaryCard}>
          <div className={styles.secondaryCardIcon}>
            <ClassIcon className={styles.secondaryCardIconSvg} />
          </div>
          <span className={styles.secondaryCardTitle}>Classes</span>
          <span className={styles.secondaryCardDesc}>Multiple classification systems for therapeutic aggregation</span>
        </div>
        <div className={styles.secondaryCard}>
          <div className={styles.secondaryCardIcon}>
            <ExcipientIcon className={styles.secondaryCardIconSvg} />
          </div>
          <span className={styles.secondaryCardTitle}>Excipients</span>
          <span className={styles.secondaryCardDesc}>Inactive ingredient tracking with safety flags</span>
        </div>
        <div className={styles.secondaryCard}>
          <div className={styles.secondaryCardIcon}>
            <SynonymIcon className={styles.secondaryCardIconSvg} />
          </div>
          <span className={styles.secondaryCardTitle}>Synonyms</span>
          <span className={styles.secondaryCardDesc}>Multi-source aggregation for improved matching</span>
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const [activeTab, setActiveTab] = React.useState<'databases' | 'rawdata'>('databases');
  
  const otherDatabasesComparison = (
    <div className={styles.comparisonGrid}>
      <div className={styles.comparisonCard}>
        <div className={styles.comparisonCardHeader}>
          <span className={styles.comparisonCardTitle}>CodeRx Drug Database</span>
          <span className={styles.comparisonCardPrice}>$5,500<span>/year</span></span>
        </div>
        <ul className={styles.comparisonList}>
          <li className={styles.comparisonItemPositive}>Easy to get started</li>
          <li className={styles.comparisonItemPositive}>Ready-to-use analytics data marts</li>
          <li className={styles.comparisonItemPositive}>Weekly data updates</li>
          <li className={styles.comparisonItemPositive}>Web-hosted, searchable docs</li>
          <li className={styles.comparisonItemPositive}>Community-driven innovation</li>
          <li className={styles.comparisonItemPositive}>Open standard drug identifiers</li>
        </ul>
      </div>
      <div className={clsx(styles.comparisonCard, styles.comparisonCardDim)}>
        <div className={styles.comparisonCardHeader}>
          <span className={styles.comparisonCardTitle}>Other Databases</span>
          <span className={styles.comparisonCardPrice}>~$100K<span>/year</span></span>
        </div>
        <ul className={styles.comparisonList}>
          <li className={styles.comparisonItemNegative}>Complex vendor contracting</li>
          <li className={styles.comparisonItemNegative}>Data transformation required</li>
          <li className={styles.comparisonItemNegative}>Terminology only</li>
          <li className={styles.comparisonItemNegative}>PDF documentation</li>
          <li className={styles.comparisonItemNegative}>Slow, vendor-controlled roadmap</li>
          <li className={styles.comparisonItemNegative}>Locked into proprietary drug codes</li>
        </ul>
      </div>
    </div>
  );
  
  const rawDataComparison = (
    <div className={styles.comparisonGrid}>
      <div className={styles.comparisonCard}>
        <div className={styles.comparisonCardHeader}>
          <span className={styles.comparisonCardTitle}>CodeRx Drug Database</span>
          <span className={styles.comparisonCardPrice}>$5,500<span>/year</span></span>
        </div>
        <ul className={styles.comparisonList}>
          <li className={styles.comparisonItemPositive}>Purpose-built data marts, ready to query</li>
          <li className={styles.comparisonItemPositive}>Setup in minutes to hours</li>
          <li className={styles.comparisonItemPositive}>Pre-integrated from multiple sources</li>
          <li className={styles.comparisonItemPositive}>Clear, pharmacy-focused documentation</li>
          <li className={styles.comparisonItemPositive}>Free annual updates included</li>
          <li className={styles.comparisonItemPositive}>Built specifically for pharmacy applications</li>
        </ul>
      </div>
      <div className={clsx(styles.comparisonCard, styles.comparisonCardDim)}>
        <div className={styles.comparisonCardHeader}>
          <span className={styles.comparisonCardTitle}>Raw Open Data</span>
          <span className={styles.comparisonCardPrice}>Free<span></span></span>
        </div>
        <ul className={styles.comparisonList}>
          <li className={styles.comparisonItemNegative}>Requires expertise in SABs, TTYs, XML</li>
          <li className={styles.comparisonItemNegative}>Manual integration across sources</li>
          <li className={styles.comparisonItemNegative}>Weeks to months of learning curve</li>
          <li className={styles.comparisonItemNegative}>Technical docs for data scientists</li>
          <li className={styles.comparisonItemNegative}>Free but significant time investment</li>
          <li className={styles.comparisonItemNegative}>Raw data requires extensive transformation</li>
        </ul>
      </div>
    </div>
  );
  
  return (
    <section id="comparison" className={styles.comparison}>
      <div className={styles.comparisonInner}>
        <div className={styles.comparisonTabs}>
          <button
            className={clsx(styles.comparisonTab, activeTab === 'databases' && styles.comparisonTabActive)}
            onClick={() => setActiveTab('databases')}
          >
            Versus Others
          </button>
          <button
            className={clsx(styles.comparisonTab, activeTab === 'rawdata' && styles.comparisonTabActive)}
            onClick={() => setActiveTab('rawdata')}
          >
            Versus Raw Data
          </button>
        </div>
        <div className={styles.comparisonHeader}>
          <Heading as="h2" className={styles.comparisonTitle}>
            {activeTab === 'databases' ? 'The Affordable Alternative' : 'The Sustainable Alternative'}
          </Heading>
          <p className={styles.comparisonSubtitle}>
            {activeTab === 'databases' 
              ? 'Enterprise-grade drug data without the enterprise price tag'
              : 'Straightforward pharmacy-ready tables without complex data parsing'}
          </p>
        </div>
        {activeTab === 'databases' ? otherDatabasesComparison : rawDataComparison}
      </div>
    </section>
  );
}

function ProcessSection() {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(0);
  
  const steps = [
    {
      number: '01',
      title: 'Subscribe',
      description: 'Get access to weekly-updated drug data marts at a fraction of enterprise database costs.',
    },
    {
      number: '02',
      title: 'Query',
      description: 'Use straightforward SQL on semantic drug concepts—no RxNorm expertise required.',
    },
    {
      number: '03',
      title: 'Analyze',
      description: 'Integrate with your pharmacy claims and medication data for actionable insights.',
    },
  ];

  const toggleStep = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={styles.process}>
      <div className={styles.processInner}>
        <Heading as="h2" className={styles.processTitle}>How It Works</Heading>
        <div className={styles.processSteps}>
          {steps.map((step, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div 
                key={step.number} 
                className={clsx(styles.processStep, isExpanded && styles.processStepExpanded)}
                onClick={() => toggleStep(index)}
              >
                <div className={styles.processStepHeader}>
                  <span className={styles.processNumber}>{step.number}</span>
                  <span className={styles.processStepTitle}>{step.title}</span>
                </div>
                <div className={clsx(styles.processStepContent, isExpanded && styles.processStepContentExpanded)}>
                  <p className={styles.processStepDescription}>{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProductIntroSection() {
  return (
    <section id="product-intro" className={styles.productIntro}>
      <div className={styles.productIntroBorder} />
      <div className={styles.productIntroInner}>
        <div className={styles.productIntroContent}>
          <span className={styles.productLabel}>Introducing</span>
          <Heading as="h2" className={styles.productTitle}>
            The CodeRx Drug Database
          </Heading>
          <p className={styles.productDescription}>
            A comprehensive, analytics-ready drug database that unifies data from 
            RxNorm, FDA NDC, DailyMed, NADAC, and more into clean, queryable data marts. 
            Built by pharmacists who understand the complexities of drug data, designed 
            for developers and analysts who need reliable information without the overhead.
          </p>
          <div className={styles.productHighlightsWrapper}>
            <div className={styles.productHighlights}>
              <div className={styles.productHighlight}>
                <span className={styles.highlightIcon}>◆</span>
                <div>
                  <span className={styles.highlightTitle}>Unified Schema</span>
                  <span className={styles.highlightDesc}>Pre-joined tables with consistent identifiers</span>
                </div>
              </div>
              <div className={styles.productHighlight}>
                <span className={styles.highlightIcon}>◆</span>
                <div>
                  <span className={styles.highlightTitle}>Weekly Refresh</span>
                  <span className={styles.highlightDesc}>Current with FDA, RxNorm, and pricing updates</span>
                </div>
              </div>
              <div className={styles.productHighlight}>
                <span className={styles.highlightIcon}>◆</span>
                <div>
                  <span className={styles.highlightTitle}>Query-Ready</span>
                  <span className={styles.highlightDesc}>Standard SQL on semantic drug concepts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.productVisual}>
          <div className={styles.databaseIcon}>
            <div className={styles.dbLayer}></div>
            <div className={styles.dbLayer}></div>
            <div className={styles.dbLayer}></div>
          </div>
        </div>
      </div>
      <div className={styles.productIntroBorder} />
    </section>
  );
}

function StatsSection() {
  return (
    <section className={styles.stats}>
      <div className={styles.statsInner}>
        <div className={styles.statItem}>
          <div className={styles.statValue}>6</div>
          <div className={styles.statLabel}>Data Sources</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>Weekly</div>
          <div className={styles.statLabel}>Updates</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>95%</div>
          <div className={styles.statLabel}>Cost Savings</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>0</div>
          <div className={styles.statLabel}>XML Parsing</div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaInner}>
        <Heading as="h2" className={styles.ctaTitle}>
          Ready to simplify<br />your drug data?
        </Heading>
        <p className={styles.ctaDescription}>
          Built by pharmacists, designed for analytics. Get comprehensive 
          drug data marts that integrate with your pharmacy applications—starting 
          at $5,500/year.
        </p>
        <div className={styles.ctaActions}>
          <Link className={styles.ctaPrimary} to="/getting-started">
            Get started
          </Link>
          <Link className={styles.ctaSecondary} to="/docs">
            View docs
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} — Drug Data, Simplified`}
      description="CodeRx transforms complex government drug data sources into easy-to-use data marts purpose-built for pharmacy analytics. Built by pharmacists, designed for analytics.">
      <main className={styles.main}>
        <HomepageHeader />
        <ProductIntroSection />
        <StatsSection />
        <DataSourcesSection />
        <ArrowDivider />
        <DataMartsSection />
        <ComparisonSection />
        <ProcessSection />
        <CTASection />
      </main>
    </Layout>
  );
}
