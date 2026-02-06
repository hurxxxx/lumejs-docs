import React, {useState, useRef, useEffect, useCallback} from 'react';
import Link from '@docusaurus/Link';

interface GlossaryTooltipProps {
  term: string;
  definition: string;
  slug: string;
  children: React.ReactNode;
}

export default function GlossaryTooltip({
  term,
  definition,
  slug,
  children,
}: GlossaryTooltipProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  /* 외부 클릭 시 닫기 */
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        close();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, close]);

  /* ESC 키로 닫기 */
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, close]);

  return (
    <span
      ref={wrapperRef}
      className="glossary-term-wrapper">
      <span
        className="glossary-term"
        role="button"
        tabIndex={0}
        onClick={() => setOpen(v => !v)}
        onKeyDown={e => e.key === 'Enter' && setOpen(v => !v)}>
        {children}
      </span>

      {open && (
        <span ref={popoverRef} className="glossary-popover">
          <strong className="glossary-popover__title">{term}</strong>
          <span className="glossary-popover__definition">{definition}</span>
          <Link to={`/glossary/${slug}`} className="glossary-popover__link" target="_blank">
            자세히 보기 →
          </Link>
        </span>
      )}
    </span>
  );
}
