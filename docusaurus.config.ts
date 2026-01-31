import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// Google Analytics configuration
// Set GOOGLE_ANALYTICS_ID environment variable or replace with your tracking ID
// For GA4, use format: G-XXXXXXXXXX
// For Universal Analytics, use format: UA-XXXXXXXXXX
const googleAnalyticsId = process.env.GOOGLE_ANALYTICS_ID;

// Determine if it's GA4 (starts with G-) or Universal Analytics (starts with UA-)
const isGA4 = googleAnalyticsId?.startsWith('G-');

const config: Config = {
  title: 'CodeRx',
  tagline: 'Pharmacists engineering pharmacy',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.coderx.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'CodeRx', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'ignore',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        // Options for the search plugin
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/data-catalog',
            to: '/concepts/',
          },
          {
            from: '/data-marts',
            to: '/concepts/',
          },
          {
            from: '/source-data',
            to: '/concepts/',
          },
        ],
      },
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],

  markdown: {
    mermaid: true,
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/', // Serve docs at the root URL instead of /docs
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    // Google Analytics configuration (optional - only added if GOOGLE_ANALYTICS_ID is set)
    ...(googleAnalyticsId && {
      analytics: isGA4
        ? {
            // GA4 uses gtag
            gtag: {
              trackingID: googleAnalyticsId,
              anonymizeIP: true, // Anonymize IP addresses for privacy compliance
            },
          }
        : {
            // Universal Analytics uses googleAnalytics
            googleAnalytics: {
              trackingID: googleAnalyticsId,
              anonymizeIP: true, // Anonymize IP addresses for privacy compliance
            },
          },
    }),
    navbar: {
      logo: {
        alt: 'CodeRx Logo',
        src: 'img/coderx_text_logo_black.svg',
        srcDark: 'img/coderx_text_logo_white.svg',
      },
      items: [
        {
          href: '/#product-intro',
          label: 'Product',
          position: 'left',
        },
        {
          to: '/pricing',
          label: 'Pricing',
          position: 'left',
        },
        {
          to: '/contact-us',
          label: 'Contact',
          position: 'left',
        },
        {
          to: '/docs',
          label: 'Docs',
          position: 'right',
          activeBaseRegex: '^/(concepts|tutorials|getting-started|docs)(/|$)',
        },
        {to: '/blog', label: 'Blog', position: 'right'},
        {
          href: 'https://github.com/coderxio',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/getting-started',
            },
            {
              label: 'Concepts',
              to: '/concepts',
            },
            {
              label: 'Tutorials',
              to: '/tutorials',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Slack',
              href: 'https://join.slack.com/t/coderx/shared_invite/zt-5b8e9kr4-PsKAVe4crGmECQyyxDIJgQ',
            },
            {
              label: 'Substack',
              href: 'https://coderxio.substack.com/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/coderxio',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CodeRx LLC`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
