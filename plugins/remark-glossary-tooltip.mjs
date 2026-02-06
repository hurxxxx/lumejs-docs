/**
 * remark plugin: 본문 텍스트에서 용어사전 키워드를 찾아
 * <GlossaryTooltip> 컴포넌트로 래핑한다.
 *
 * 규칙:
 *  - 같은 페이지에서 같은 용어는 첫 번째 등장만 래핑
 *  - heading / code / inlineCode / link / JSX 내부는 건너뜀
 *  - docs/glossary/ 내 파일에서는 적용하지 않음
 *  - 긴 키워드부터 먼저 매칭 (greedy, 중복 방지)
 */

import fs from 'node:fs';
import path from 'node:path';

/* ── 용어 데이터 로드 ─────────────────────────────── */

function loadGlossaryData(glossaryDir) {
  if (!fs.existsSync(glossaryDir)) return [];

  const files = fs.readdirSync(glossaryDir).filter(f => f.endsWith('.md'));
  const entries = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(glossaryDir, file), 'utf-8');
    const slug = file.replace('.md', '');

    // frontmatter 파싱
    const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---/m);
    if (!fmMatch) continue;
    const fm = fmMatch[1];

    const titleMatch = fm.match(/^title:\s*["']?(.+?)["']?\s*$/m);
    if (!titleMatch) continue;
    const title = titleMatch[1].trim();

    // aliases (쉼표 구분)
    const aliasMatch = fm.match(/^aliases:\s*(.+)$/m);
    const aliases = aliasMatch
      ? aliasMatch[1].split(',').map(a => a.trim()).filter(a => a.length >= 2)
      : [];

    // 한 줄 정의
    const defMatch = content.match(/## 한 줄 정의\s*\n(.+)/);
    const definition = defMatch ? defMatch[1].trim() : title;

    const matchTerms = [...parseTitle(title), ...aliases];

    entries.push({ slug, title, definition, matchTerms });
  }

  return entries;
}

/**
 * title 문자열에서 매칭 가능한 개별 용어를 추출한다.
 *
 * 예)
 *  "임베딩(Embedding)"           → ["임베딩", "Embedding"]
 *  "Transformer / Attention"     → ["Transformer", "Attention"]
 *  "KPI/ROI"                     → ["KPI/ROI", "KPI", "ROI"]
 *  "토큰(Token) / 토크나이저(Tokenization)"
 *                                → ["토큰", "Token", "토크나이저", "Tokenization"]
 */
function parseTitle(title) {
  const terms = new Set();

  // " / " 로 분리 (공백 포함 슬래시)
  const parts = title.split(' / ');

  for (const part of parts) {
    const trimmed = part.trim();

    // 괄호 안 용어 분리: "메인(English)"
    const parenMatch = trimmed.match(/^(.+?)\s*\((.+?)\)$/);
    if (parenMatch) {
      const main = parenMatch[1].trim();
      const paren = parenMatch[2].trim();
      if (main.length >= 2) terms.add(main);
      if (paren.length >= 2) terms.add(paren);
    } else {
      if (trimmed.length >= 2) terms.add(trimmed);
    }

    // "KPI/ROI" 같은 약어 콤보 추가 분리
    if (trimmed.includes('/') && !trimmed.includes(' ')) {
      for (const sub of trimmed.split('/')) {
        if (sub.trim().length >= 2) terms.add(sub.trim());
      }
    }
  }

  return [...terms];
}

/* ── 텍스트 노드에서 용어 치환 ───────────────────── */

/**
 * 순수 텍스트를 스캔하여 용어가 등장하면
 * [textNode, jsxNode, textNode, ...] 배열로 분리한다.
 */
function replaceTermsInText(text, sortedLookup, matchedSlugs) {
  const nodes = [];
  let remaining = text;

  while (remaining.length > 0) {
    let bestMatch = null;
    let bestIndex = Infinity;

    for (const item of sortedLookup) {
      const idx = remaining.indexOf(item.term);
      if (idx === -1) continue;

      // 더 앞에 있는 매칭 우선, 같으면 더 긴 매칭 우선
      if (idx < bestIndex || (idx === bestIndex && item.term.length > (bestMatch?.term.length ?? 0))) {
        bestIndex = idx;
        bestMatch = item;
      }
    }

    if (!bestMatch) {
      if (remaining) nodes.push({ type: 'text', value: remaining });
      break;
    }

    // 매칭 앞부분 텍스트
    if (bestIndex > 0) {
      nodes.push({ type: 'text', value: remaining.slice(0, bestIndex) });
    }

    // GlossaryTooltip JSX 노드
    nodes.push({
      type: 'mdxJsxTextElement',
      name: 'GlossaryTooltip',
      attributes: [
        { type: 'mdxJsxAttribute', name: 'term', value: bestMatch.entry.title },
        { type: 'mdxJsxAttribute', name: 'definition', value: bestMatch.entry.definition },
        { type: 'mdxJsxAttribute', name: 'slug', value: bestMatch.entry.slug },
      ],
      children: [{ type: 'text', value: bestMatch.term }],
    });

    remaining = remaining.slice(bestIndex + bestMatch.term.length);
  }

  return nodes;
}

/* ── AST 트리 순회 ────────────────────────────────── */

const SKIP_PARENT_TYPES = new Set([
  'heading',
  'code',
  'inlineCode',
  'link',
  'linkReference',
  'mdxJsxTextElement',
  'mdxJsxFlowElement',
  'mdxFlowExpression',
  'mdxTextExpression',
]);

function transformTree(tree, sortedLookup) {
  const matchedSlugs = new Set();

  function walk(node) {
    if (!node.children) return;
    if (SKIP_PARENT_TYPES.has(node.type)) return;

    const newChildren = [];

    for (const child of node.children) {
      if (child.type === 'text') {
        const replaced = replaceTermsInText(child.value, sortedLookup, matchedSlugs);
        newChildren.push(...replaced);
      } else {
        walk(child);
        newChildren.push(child);
      }
    }

    node.children = newChildren;
  }

  walk(tree);
}

/* ── 플러그인 엔트리 ─────────────────────────────── */

export default function remarkGlossaryTooltip(options = {}) {
  const glossaryDir =
    options.glossaryDir || path.join(process.cwd(), 'docs/glossary');
  const glossaryData = loadGlossaryData(glossaryDir);

  // 조회용 flat 배열: 긴 키워드 우선
  const sortedLookup = glossaryData
    .flatMap(entry =>
      entry.matchTerms.map(term => ({ term, slug: entry.slug, entry })),
    )
    .sort((a, b) => b.term.length - a.term.length);

  return function transformer(tree, file) {
    // glossary 디렉토리 파일은 건너뜀
    const filePath = file.history?.[0] || file.path || '';
    if (
      filePath.includes('/glossary/') ||
      filePath.includes('\\glossary\\') ||
      filePath.endsWith('glossary.md')
    ) {
      return;
    }

    transformTree(tree, sortedLookup);
  };
}
