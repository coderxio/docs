import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './pricing.module.css';

export default function Pricing() {
  return (
    <Layout
      title="Pricing - CodeRx"
      description="Subscribe to CodeRx and get access to comprehensive drug data marts with weekly updates. Choose monthly or yearly billing.">
      <div className={styles.container}>
        <div className={styles.header}>
          <Heading as="h1" className={styles.title}>
            Simple, Transparent Pricing
          </Heading>
          <p className={styles.subtitle}>
            Get access to CodeRx's comprehensive drug database with weekly updates, 
            complete RxNorm mappings, and rich drug knowledge graphs.
          </p>
        </div>

        <div className={styles.freeTrialBanner}>
          <span className={styles.freeTrialIcon}>🎉</span>
          <span className={styles.freeTrialText}>
            <strong>30-day free trial</strong> included with both plans
          </span>
        </div>

        <div className={styles.pricingOptions}>
          <div className={styles.pricingCard}>
            <div className={styles.pricingCardHeader}>
              <h2 className={styles.pricingCardTitle}>Monthly</h2>
              <div className={styles.pricingCardBadge}>Flexible</div>
            </div>
            <div className={styles.pricingCardPrice}>
              <span className={styles.priceAmount}>$550</span>
              <span className={styles.pricePeriod}>/month</span>
            </div>
            <div className={styles.freeTrialNote}>
              <span className={styles.freeTrialBadge}>30-day free trial</span>
            </div>
            <p className={styles.pricingCardDescription}>
              Perfect for teams who want to start small and scale as needed.
            </p>
            <Link
              href="https://buy.stripe.com/9B6eVdaRlbr1gNY47GgEg03"
              className={styles.pricingButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              Start Free Trial
            </Link>
          </div>

          <div className={`${styles.pricingCard} ${styles.pricingCardFeatured}`}>
            <div className={styles.pricingCardHeader}>
              <h2 className={styles.pricingCardTitle}>Yearly</h2>
              <div className={styles.pricingCardBadge}>Best Value</div>
            </div>
            <div className={styles.pricingCardPrice}>
              <span className={styles.priceAmount}>$5,500</span>
              <span className={styles.pricePeriod}>/year</span>
            </div>
            <div className={styles.freeTrialNote}>
              <span className={styles.freeTrialBadge}>30-day free trial</span>
            </div>
            <p className={styles.pricingCardDescription}>
              Save more with annual billing. Same great features, better value.
            </p>
            <Link
              href="https://buy.stripe.com/fZu9ATcZt7aLapAdIggEg02"
              className={styles.pricingButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              Start Free Trial
            </Link>
          </div>
        </div>

        <div className={styles.footer}>
          <h2 className={styles.footerTitle}>What's Included</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <div>
                <h3 className={styles.featureTitle}>Weekly Data Updates</h3>
                <p className={styles.featureDescription}>
                  Your data stays current with FDA, RxNorm, and pricing updates every week.
                </p>
              </div>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <div>
                <h3 className={styles.featureTitle}>AWS S3 Access</h3>
                <p className={styles.featureDescription}>
                  Direct access to your data marts hosted on AWS S3 in CSV and Parquet formats.
                </p>
              </div>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <div>
                <h3 className={styles.featureTitle}>Complete Documentation</h3>
                <p className={styles.featureDescription}>
                  Comprehensive guides, tutorials, and references to help you get started.
                </p>
              </div>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <div>
                <h3 className={styles.featureTitle}>Community Support</h3>
                <p className={styles.featureDescription}>
                  Access to our Slack community and support email for help when you need it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
