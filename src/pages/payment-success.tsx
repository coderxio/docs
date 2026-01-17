import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './payment-success.module.css';

export default function PaymentSuccess() {
  return (
    <Layout
      title="Payment Successful - Welcome to CodeRx"
      description="Thank you for your payment. Your welcome email with AWS S3 credentials will arrive within 24 hours."
      noIndex={true}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.iconWrapper}>
              <svg
                className={styles.checkmark}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                <circle
                  className={styles.checkmarkCircle}
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  className={styles.checkmarkCheck}
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            </div>
            <Heading as="h1" className={styles.title}>
              Payment Successful!
            </Heading>
            <p className={styles.subtitle}>
              Thank you for subscribing to CodeRx. Your account is being set up.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.section}>
              <div className={styles.sectionIcon}>📧</div>
              <div className={styles.sectionContent}>
                <h2 className={styles.sectionTitle}>Welcome Email Coming Soon</h2>
                <p className={styles.sectionText}>
                  Within the next <strong>24 hours</strong>, you'll receive a welcome email containing:
                </p>
                <ul className={styles.list}>
                  <li>Your <strong>AWS S3 Access Key</strong></li>
                  <li>Your <strong>AWS S3 Secret Key</strong></li>
                  <li>Connection instructions and documentation</li>
                  <li>Additional setup information</li>
                </ul>
                <p className={styles.sectionText}>
                  Please check your email inbox (and spam folder) for this important message.
                </p>
              </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.section}>
              <div className={styles.sectionIcon}>🚀</div>
              <div className={styles.sectionContent}>
                <h2 className={styles.sectionTitle}>Next Steps</h2>
                <ol className={styles.orderedList}>
                  <li>Wait for your welcome email (within 24 hours)</li>
                  <li>Review the AWS S3 credentials and connection details</li>
                  <li>Set up your connection using the provided documentation</li>
                  <li>Start accessing your drug data!</li>
                </ol>
              </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.section}>
              <div className={styles.sectionIcon}>💡</div>
              <div className={styles.sectionContent}>
                <h2 className={styles.sectionTitle}>Need Help?</h2>
                <p className={styles.sectionText}>
                  If you have any questions or need assistance with your setup, don't hesitate to reach out:
                </p>
                <div className={styles.helpLinks}>
                  <a
                    href="/contact-us"
                    className={styles.helpLink}
                  >
                    Contact Support
                  </a>
                  <a
                    href="https://join.slack.com/t/coderx/shared_invite/zt-5b8e9kr4-PsKAVe4crGmECQyyxDIJgQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.helpLink}
                  >
                    Join our Slack Community
                  </a>
                  <a
                    href="/docs"
                    className={styles.helpLink}
                  >
                    Browse Documentation
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footerNote}>
            <p>
              You can bookmark this page or close this window. Your welcome email will be sent to the email address associated with your Stripe payment.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}