import React from 'react';
import { cx } from '../../lib/ui';

/**
 * Merkgebonden sectiekop: nummer, label, titel en optionele ondertitel.
 */
export function SectionHead({ index, eyebrow, title, subtitle, tone = 'paper', align = 'left' }) {
  const isDark = tone === 'dark';
  return (
    <header
      className={cx(
        'reveal mb-12 max-w-3xl md:mb-16',
        align === 'center' && 'mx-auto text-center md:mb-20'
      )}
    >
      <div className={cx('eyebrow', align === 'center' && 'justify-center')}>
        <span className={cx('tabular-nums', isDark ? 'text-[#d98b62]' : 'text-accent')}>
          {String(index).padStart(2, '0')}
        </span>
        <span className={cx('rule', isDark && 'bg-white/25')} aria-hidden="true" />
        <span className={isDark ? 'text-[#f2ece1]/60' : undefined}>{eyebrow}</span>
      </div>

      <h2 className={cx('mt-5 text-[clamp(2.1rem,4.6vw,3.6rem)]', isDark && 'text-[#f4efe5]')}>{title}</h2>

      {subtitle ? (
        <p className={cx('lede mt-5 max-w-xl', align === 'center' && 'mx-auto', isDark && 'text-[#f2ece1]/65')}>
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}

/**
 * Sectie-wrapper met het vaste ritme, de container en de dock-discipline.
 */
export default function SectionShell({
  id,
  index,
  eyebrow,
  title,
  subtitle,
  tone = 'paper',
  padding = 40,
  className,
  headClassName,
  children,
  ...rest
}) {
  const isDark = tone === 'dark';
  return (
    <section
      id={id}
      data-dock-section={id}
      className={cx(
        'section-pad relative',
        tone === 'surface' && 'bg-[var(--color-surface)]',
        tone === 'dark' && 'bg-[#101a15] text-[#f2ece1]',
        className
      )}
      style={{ '--pad': String(padding) }}
      {...rest}
    >
      <div className="shell">
        <div className={headClassName}>
          <SectionHead index={index} eyebrow={eyebrow} title={title} subtitle={subtitle} tone={tone} />
        </div>
        {children}
      </div>
    </section>
  );
}