import React from 'react';
import SectionShell from './SectionShell';
import { Picture, T, text } from '../../lib/ui';

const splitFocusPoints = (value) =>
  text(value)
    .split(/[,;]/)
    .map((part) => part.trim())
    .filter(Boolean);

export default function AvedaSection({ items = [], meta = {}, index = 7 }) {
  const item = items[0] || {};
  const focusPoints = splitFocusPoints(item.focus_punten);

  return (
    <SectionShell
      id="aveda"
      index={index}
      eyebrow="Filosofie"
      title={text(meta.title) || 'Aveda filosofie'}
      subtitle={text(meta.subtitle) || 'Natuurlijke schoonheid'}
      tone="dark"
      padding={meta.padding}
      className="overflow-hidden"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="reveal relative order-2 lg:order-1">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-4 rounded-[2.5rem] border border-white/10"
          />
          <div className="frame relative aspect-square w-full bg-white/5">
            <Picture
              value={item.afbeelding}
              alt="Aveda producten in het salon"
              file="aveda"
              index={0}
              field="afbeelding"
              imgClassName="object-cover"
              sizes="(min-width: 1024px) 40vw, 90vw"
            />
          </div>
        </div>

        <div className="reveal order-1 lg:order-2" style={{ '--reveal-delay': '100ms' }}>
          <h3 className="text-[clamp(1.8rem,3.4vw,2.8rem)] text-[#f4efe5]">
            <T as="span" file="aveda" index={0} field="titel" value={text(item.titel)} />
          </h3>

          <p className="mt-6 max-w-xl text-[0.975rem] leading-[1.75] text-[#f2ece1]/70">
            <T as="span" file="aveda" index={0} field="hoofdtekst_nl" value={text(item.hoofdtekst_nl)} />
          </p>

          {focusPoints.length > 0 ? (
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {focusPoints.map((point) => (
                <li
                  key={point}
                  className="rounded-full border border-white/15 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#f2ece1]/75"
                >
                  {point}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#tarieven" className="btn btn-light">
              Bekijk de behandelingen
            </a>
            <a href="#footer" className="btn btn-on-dark">
              Stel je vraag
            </a>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}