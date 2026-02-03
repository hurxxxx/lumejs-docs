// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  bookSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: '책 소개',
    },
    {
      type: 'category',
      label: 'Part 1. 기초 이해',
      items: [
        'book/why-ai',
        'book/ai-foundations',
        'book/ai-literacy-safety',
      ],
    },
    {
      type: 'category',
      label: 'Part 2. 실무 적용',
      items: [
        'book/tools-setup',
        'book/prompting',
        'book/document-work',
        'book/data-thinking',
        'book/workflow-design',
      ],
    },
    {
      type: 'category',
      label: 'Part 3. 확장과 운영',
      items: [
        'book/knowledge-rag',
        'book/governance',
        'book/capstone',
      ],
    },
  ],
};

export default sidebars;
