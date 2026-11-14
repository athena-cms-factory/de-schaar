import React from 'react';
import SectionShell from './SectionShell';
import { Picture, T, text } from '../../lib/ui';

export default function MissionSection({ items = [], meta = {}, index = 1 }) {
  const item = items[0] || {};
  const statement = text(item.missie_kern);
  const body = text(item.missie_uitgebreid);

  return (
    <SectionShell
      id="missie"
      index={index}
      eyebrow="Over ons"
      title={text(meta.title) || 'Onze missie'}
      subtitle={text(meta.subtitle) || 'Waar we voor staan'}
      padding={meta.padding}
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div className="reveal">
          {statement ? (
            <p className="display text-[clamp(1.9rem,3.6vw,3.1rem)] text-[var(--color-heading)]">
              <span aria-hidden="true" className="text-accent">
                &ldquo;
              </span>
              <T as="span" file="missie" index={0} field="missie_kern" value={statement} />
              <span aria-hidden="true" className="text-accent">
                &rdquo;
              </span>
            </p>
          ) : null}

          {body ? (
            <p className="lede mt-6 max-w-xl">
              <T as="span" file="missie" index={0} field="missie_uitgebreid" value={body} />
            </p>
          ) : null}

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#team" className="btn btn-solid">
              Maak kennis met het team
            </a>
            <a href="#tarieven" className="link-quiet">
              Bekijk de tarieven <span aria-hidden="true">→</span>
            </a>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-[var(--color-line)] pt-8">
            {[
              ['Aveda', 'producten'],
              ['Dok Noord', 'in Gent'],
              ['Ayurveda', 'filosofie'],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-serif text-2xl text-[var(--color-heading)]">{value}</dt>
                <dd className="mt-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="reveal relative" style={{ '--reveal-delay': '120ms' }}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-3 rounded-[2.25rem] border border-[var(--color-line)]"
          />
          <div className="frame aspect-[4/5] w-full">
            <Picture
              value={item.afbeelding}
              alt="Het salon van De Schaar"
              file="missie"
              index={0}
              field="afbeelding"
              sizes="(min-width: 1024px) 45vw, 90vw"
            />
          </div>

          <div className="card absolute -bottom-6 left-4 flex items-center gap-3 px-5 py-4 md:-left-8">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full text-sm text-[var(--color-accent)]"
              style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 12%, transparent)' }}
              aria-hidden="true"
            >
              ✳
            </span>
            <span className="text-[11px] font-bold uppercase leading-tight tracking-[0.2em] text-[var(--color-heading)]">
              Aveda salon
              <span className="mt-1 block text-[var(--color-muted)]">Dok Noord · Gent</span>
            </span>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}