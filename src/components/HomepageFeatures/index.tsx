import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Comprehensive Drug Data',
    icon: '💊',
    description: (
      <>
        Access detailed information about pharmaceutical products, including 
        active ingredients, formulations, and regulatory data. Our database 
        covers thousands of drugs with up-to-date information.
      </>
    ),
  },
  {
    title: 'Structured NDC Codes',
    icon: '🔢',
    description: (
      <>
        Work with National Drug Code (NDC) identifiers in a structured format. 
        Easily search, filter, and analyze NDC data with our powerful API and 
        documentation.
      </>
    ),
  },
  {
    title: 'Developer-Friendly API',
    icon: '⚡',
    description: (
      <>
        Built for developers with comprehensive REST APIs, clear documentation, 
        and code examples. Integrate pharmaceutical data into your applications 
        quickly and efficiently.
      </>
    ),
  },
  {
    title: 'Reliable & Accurate',
    icon: '✅',
    description: (
      <>
        Trusted by healthcare professionals and researchers. Our data is 
        regularly updated and validated to ensure accuracy and compliance 
        with industry standards.
      </>
    ),
  },
  {
    title: 'Rich Documentation',
    icon: '📚',
    description: (
      <>
        Comprehensive guides, tutorials, and API references to help you get 
        started quickly. Learn best practices and explore real-world examples.
      </>
    ),
  },
  {
    title: 'Scalable Infrastructure',
    icon: '🚀',
    description: (
      <>
        Built on modern, scalable infrastructure to handle high-volume requests. 
        Fast response times and reliable uptime for mission-critical applications.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.featureCard)}>
      <div className={styles.featureIcon}>{icon}</div>
      <div className={styles.featureContent}>
        <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <Heading as="h2" className={styles.featuresTitle}>
            Powerful Features for Your Data Needs
          </Heading>
          <p className={styles.featuresSubtitle}>
            Everything you need to work with pharmaceutical data effectively
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
