// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

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
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'bookSidebar',
            position: 'left',
            label: '책',
          },
          {
            type: 'search',
            position: 'right',
          },
          {
            href: 'https://lumejs.com',
            label: 'Home',
            position: 'right',
          },
        ],
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
