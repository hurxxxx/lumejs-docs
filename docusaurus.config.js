// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import remarkGlossaryTooltip from './plugins/remark-glossary-tooltip.mjs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'AX 컨설팅 - 기업용 AI 도입 상담 및 AI 전환 가이드',
  tagline: '실무자 중심 기업 AI 내재화 커리큘럼',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://lumejs.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/hurxxxx/lumejs-docs/edit/main/',
          editCurrentVersion: true,
          editLocalizedFiles: true,
          remarkPlugins: [remarkGlossaryTooltip],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en', 'ko'],
        docsRouteBasePath: '/',
      },
    ],
  ],
  headTags: [
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `
        var _paq = window._paq = window._paq || [];
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
          var u="//matomo.lumejs.com/";
          _paq.push(['setTrackerUrl', u+'matomo.php']);
          _paq.push(['setSiteId', '2']);
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
        })();
      `,
    },
  ],
  stylesheets: [
    {
      href:
        'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;700&family=Source+Serif+4:wght@400;600;700&display=swap',
      type: 'text/css',
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      announcementBar: {
        id: 'consultation_cta',
        content:
          '💡 AI 컨설팅 서비스가 궁금하신가요? <a target="_self" href="https://lumejs.com"><strong>메인 사이트에서 자세히 알아보기 →</strong></a>',
        backgroundColor: '#FF6B35',
        textColor: '#ffffff',
        isCloseable: true,
      },
      metadata: [
        {name: 'keywords', content: 'AX 컨설팅, 기업용 AI, AI 도입 상담, AI 전환 가이드, 기업 AI 내재화, AI 교육, 실무자 AI 교육, AI 컨설팅'},
        {name: 'description', content: 'AX 컨설팅 - 실무자 중심 기업 AI 내재화 커리큘럼. 기업용 AI 도입 상담부터 AI 전환 가이드까지 체계적인 AI 교육 프로그램을 제공합니다.'},
        {property: 'og:type', content: 'website'},
        {property: 'og:title', content: 'AX 컨설팅 - 기업용 AI 도입 상담 및 AI 전환 가이드'},
        {property: 'og:description', content: '실무자 중심 기업 AI 내재화 커리큘럼. 기업용 AI 도입 상담부터 AI 전환 가이드까지'},
        {property: 'og:site_name', content: 'AX Consulting'},
      ],
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'LumeJS Docs',
        logo: {
          alt: 'LumeJS Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            href: 'https://lumejs.com',
            label: '🏠 메인 사이트',
            position: 'left',
          },
          {
            type: 'search',
            position: 'right',
          },
        ],
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} LumeJS. 허건우 대표 저작권자. All rights reserved.`,
      },
    }),
};

export default config;
