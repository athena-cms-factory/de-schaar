import React from 'react';
import SectionShell from './SectionShell';
import { Picture, T, text } from '../../lib/ui';

export default function LocationSection({ items = [], meta = {}, index = 2 }) {
  const location = items[0] || {};
  const address = [text(location.straat_nummer), [text(location.postcode), text(location.stad)].filter(Boolean).join(' ')]
    .filter(Boolean)
    .join(', ');
  const phone = text(location.telefoonnummer);
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${text(location.naam_locatie)} ${address || 'Dok Noord 3, 9000 Gent'}`
  )}`;

  const rows = [
    { label: 'Adres', value: address },
    { label: 'Ligging', value: text(location.ligging_omschrijving) },
    { label: 'Parking', value: text(location.parking_info) },
    { label: 'Telefoon', value: phone, href: phone ? `tel:${phone.replace(/\s+/g, '')}` : null },
  ].filter((row) => row.value);

  return (
    <SectionShell
      id="locatie"
      index={index}
      eyebrow="Bezoek"
      title={text(meta.title) || 'Onze locatie'}
      subtitle={text(meta.subtitle) || 'Breng ons een bezoek'}
      tone="surface"
      padding={meta.padding}
    >
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="reveal relative order-2 lg:order-1">
          <div className="frame aspect-[4/5] w-full">
            <Picture
              value={location.afbeelding}
              alt={`De buitenkant van ${text(location.naam_locatie) || 'het salon'}`}
              file="locatie"
              index={0}
              field="afbeelding"
              sizes="(min-width: 1024px) 48vw, 90vw"
            />
          </div>
          <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-[#101a15]/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f2ece1] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a24b28]" aria-hidden="true" />
            {text(location.stad) || 'Gent'}
          </div>
        </div>

        <div className="reveal order-1 lg:order-2" style={{ '--reveal-delay': '100ms' }}>
          <h3 className="text-[clamp(1.7rem,3vw,2.4rem)]">
            <T as="span" file="locatie" index={0} field="naam_locatie" value={text(location.naam_locatie)} />
          </h3>

          <dl className="mt-9 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
            {rows.map((row) => (
              <div key={row.label} className="grid gap-1 py-5 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
                <dt className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--color-muted)] sm:pt-1">
                  {row.label}
                </dt>
                <dd className="text-[0.975rem] leading-relaxed text-[var(--color-text)]">
                  {row.href ? (
                    <a href={row.href} className="transition-colors hover:text-[var(--color-accent)]">
                      <T as="span" file="locatie" index={0} field="telefoonnummer" value={row.value} />
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
              Plan je route <span aria-hidden="true">↗</span>
            </a>
            {phone ? (
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="link-quiet">
                Bel het salon
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}