import React from 'react';
import SectionShell from './SectionShell';
import { Picture, T, text } from '../../lib/ui';

export default function TeamSection({ items = [], meta = {}, index = 4 }) {
  return (
    <SectionShell
      id="team"
      index={index}
      eyebrow="Het team"
      title={text(meta.title) || 'Ons team'}
      subtitle={text(meta.subtitle) || 'De makers van jouw stijl'}
      tone="surface"
      padding={meta.padding}
    >
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-y-12">
        {items.map((item, i) => (
          <article
            key={text(item.naam) + i}
            className="reveal group"
            style={{ '--reveal-delay': `${i * 80}ms` }}
          >
            <div className="frame aspect-square w-full">
              <Picture
                value={item.foto_url}
                alt={text(item.naam) ? `Portret van ${text(item.naam)}` : ''}
                file="team"
                index={i}
                field="foto_url"
                imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
              />
            </div>

            <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-t border-[var(--color-line)] pt-4">
              <h3 className="text-[1.1rem] leading-tight sm:text-[1.35rem]">
                <T as="span" file="team" index={i} field="naam" value={text(item.naam)} />
              </h3>
              <span className="text-right text-[11px] font-bold uppercase leading-tight tracking-[0.16em] text-[var(--color-muted)]">
                <T as="span" file="team" index={i} field="functie" value={text(item.functie)} />
              </span>
            </div>

            {text(item.bio_tekst) ? (
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                <T as="span" file="team" index={i} field="bio_tekst" value={text(item.bio_tekst)} />
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </SectionShell>
  );
}