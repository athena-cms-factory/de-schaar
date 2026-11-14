import React from 'react';
import SectionShell from './SectionShell';
import { Picture, T, text } from '../../lib/ui';

export default function GradiationSection({ items = [], meta = {}, index = 3, hiddenFields = [] }) {
  return (
    <SectionShell
      id="stylist_gradatie"
      index={index}
      eyebrow="Vakmanschap"
      title={text(meta.title) || 'Stylist gradaties'}
      subtitle={text(meta.subtitle) || 'Gediplomeerd vakmanschap'}
      padding={meta.padding}
    >
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-y-12">
        {items.map((item, i) => (
          <article
            key={text(item.titel) + i}
            className="reveal group"
            style={{ '--reveal-delay': `${i * 80}ms` }}
          >
            <div className="frame aspect-[3/4] w-full">
              <Picture
                value={item.afbeelding}
                alt={text(item.afbeelding) ? `Sfeerbeeld ${text(item.titel)}` : ''}
                file="stylist_gradatie"
                index={i}
                field="afbeelding"
                imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
              />
              <span className="absolute left-4 top-4 flex h-8 min-w-8 items-center justify-center rounded-full bg-[#101a15]/70 px-2 text-[11px] font-bold tracking-[0.18em] text-[#f2ece1] backdrop-blur">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h3 className="text-[1.1rem] leading-tight sm:text-[1.45rem]">
                <T
                  as="span"
                  file="stylist_gradatie"
                  index={i}
                  field="titel"
                  value={text(item.titel)}
                />
              </h3>
              {!hiddenFields.includes('min_ervaring_jaren') && text(item.min_ervaring_jaren) ? (
                <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                  {text(item.min_ervaring_jaren)} jaar+
                </span>
              ) : null}
            </div>

            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
              <T
                as="span"
                file="stylist_gradatie"
                index={i}
                field="omschrijving_criteria"
                value={text(item.omschrijving_criteria)}
              />
            </p>
          </article>
        ))}
      </div>

      <p className="reveal mt-14 max-w-2xl border-t border-[var(--color-line)] pt-6 text-sm text-[var(--color-muted)]">
        De prijs van een behandeling hangt af van de gradatie van je stylist. Twijfel je welke stylist bij je past?{' '}
        <a href="#tarieven" className="font-semibold text-[var(--color-heading)] underline decoration-[var(--color-accent)] decoration-1 underline-offset-4">
          Bekijk de tarieven
        </a>{' '}
        of bel het salon.
      </p>
    </SectionShell>
  );
}