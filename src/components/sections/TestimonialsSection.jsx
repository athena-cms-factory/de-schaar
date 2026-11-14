import React from 'react';
import SectionShell from './SectionShell';
import { Picture, T, text } from '../../lib/ui';

const initials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'DS';

export default function TestimonialsSection({ items = [], meta = {}, index = 6 }) {
  return (
    <SectionShell
      id="testimonials"
      index={index}
      eyebrow="Ervaringen"
      title={text(meta.title) || 'Wat klanten zeggen'}
      subtitle={text(meta.subtitle) || 'Echte ervaringen'}
      tone="surface"
      padding={meta.padding}
    >
      <div className="no-scrollbar -mx-[var(--gutter)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-3 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
        {items.map((item, i) => {
          const name = text(item.klant_naam);
          const quote = text(item.beoordeling_tekst);
          return (
            <figure
              key={item.testimonial_id ?? i}
              className="reveal card flex h-full min-w-[86%] snap-start flex-col justify-between gap-8 p-7 sm:min-w-[60%] md:min-w-0 md:p-9"
              style={{ '--reveal-delay': `${(i % 2) * 90}ms` }}
            >
              <div>
                <span
                  aria-hidden="true"
                  className="block font-serif text-5xl leading-[0.6] text-[var(--color-accent)]"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-5 font-serif text-[1.15rem] leading-[1.55] text-[var(--color-heading)] md:text-[1.3rem]">
                  <T
                    as="span"
                    file="testimonials"
                    index={i}
                    field="beoordeling_tekst"
                    value={quote}
                  />
                </blockquote>
              </div>

              <figcaption className="flex items-center gap-3 border-t border-[var(--color-line)] pt-5">
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--color-surface)] text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-heading)]">
                  {text(item.afbeelding) ? (
                    <Picture
                      value={item.afbeelding}
                      alt=""
                      file="testimonials"
                      index={i}
                      field="afbeelding"
                      sizes="44px"
                    />
                  ) : (
                    <span aria-hidden="true">{initials(name)}</span>
                  )}
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold text-[var(--color-heading)]">
                    <T as="span" file="testimonials" index={i} field="klant_naam" value={name} />
                  </span>
                  {text(item.gebruikte_service) ? (
                    <span className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                      <T
                        as="span"
                        file="testimonials"
                        index={i}
                        field="gebruikte_service"
                        value={text(item.gebruikte_service)}
                      />
                    </span>
                  ) : null}
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </SectionShell>
  );
}