import React from 'react';
import SectionShell from './SectionShell';
import { Picture, T, text } from '../../lib/ui';

const formatPrice = (value) => {
  const numeric = Number.parseFloat(String(value ?? '').replace(',', '.'));
  if (Number.isNaN(numeric)) return text(value);
  return `€ ${numeric.toLocaleString('nl-BE', { maximumFractionDigits: 0 })}`;
};

export default function PricesSection({ items = [], groups = [], meta = {}, index = 5 }) {
  const orderedGroups = [...groups]
    .filter((group) => group && group.groep_id !== undefined)
    .sort((a, b) => (a.volgorde || 0) - (b.volgorde || 0));

  const indexOf = new Map(items.map((item, i) => [item, i]));

  const grouped = orderedGroups
    .map((group) => ({
      ...group,
      items: items.filter((item) => String(item.groep_id) === String(group.groep_id)),
    }))
    .filter((group) => group.items.length > 0);

  const render = (group) => {
    const sourceIndex = indexOf.get(group) ?? 0;
    return (
      <div key={group.groep_id} className="reveal">
        <div className="flex items-center gap-4 border-b border-[var(--color-heading)] pb-5">
          <div className="frame h-14 w-14 shrink-0 rounded-full">
            <Picture
              value={group.afbeelding}
              alt=""
              file="diensten_hoofdgroepen"
              index={sourceIndex}
              field="afbeelding"
              sizes="56px"
            />
          </div>
          <div>
            <h3 className="text-[1.4rem] leading-none">
              <T
                as="span"
                file="diensten_hoofdgroepen"
                index={sourceIndex}
                field="naam"
                value={text(group.naam)}
              />
            </h3>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-muted)]">
              {group.items.length} {group.items.length === 1 ? 'behandeling' : 'behandelingen'}
            </p>
          </div>
        </div>

        <ul className="mt-6 space-y-5">
          {group.items.map((item) => {
            const itemIndex = indexOf.get(item) ?? 0;
            const indication = text(item.prijs_indicatie).toLowerCase();
            const isFrom = indication.startsWith('vanaf');
            return (
              <li key={item.tarief_id ?? item.dienst_naam}>
                <div className="flex items-baseline gap-3">
                  <T
                    as="span"
                    file="tarieven"
                    index={itemIndex}
                    field="dienst_naam"
                    value={text(item.dienst_naam)}
                    className="text-[0.95rem] leading-snug text-[var(--color-text)]"
                  />
                  <span
                    aria-hidden="true"
                    className="mb-1 flex-1 border-b border-dotted border-[var(--color-line)]"
                  />
                  <span className="flex shrink-0 flex-col items-end leading-none">
                    {isFrom ? (
                      <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-muted)]">
                        vanaf
                      </span>
                    ) : null}
                    <T
                      as="span"
                      file="tarieven"
                      index={itemIndex}
                      field="basis_prijs"
                      value={formatPrice(item.basis_prijs)}
                      className="font-serif text-[1.15rem] text-[var(--color-heading)]"
                    />
                    {indication && !isFrom ? (
                      <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-muted)]">
                        {text(item.prijs_indicatie)}
                      </span>
                    ) : null}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <SectionShell
      id="tarieven"
      index={index}
      eyebrow="Diensten"
      title={text(meta.title) || 'Diensten & tarieven'}
      subtitle={text(meta.subtitle) || 'Kwaliteit voor een eerlijke prijs'}
      padding={meta.padding}
    >
      {grouped.length > 0 ? (
        <div className="grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {grouped.map((group) => render(group))}
        </div>
      ) : (
        <div className="grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const itemIndex = indexOf.get(item) ?? i;
            const indication = text(item.prijs_indicatie).toLowerCase();
            return (
              <div key={item.tarief_id ?? i} className="reveal border-b border-[var(--color-line)] pb-4">
                <div className="flex items-baseline gap-3">
                  <T
                    as="span"
                    file="tarieven"
                    index={itemIndex}
                    field="dienst_naam"
                    value={text(item.dienst_naam)}
                    className="text-[0.95rem]"
                  />
                  <span aria-hidden="true" className="mb-1 flex-1 border-b border-dotted border-[var(--color-line)]" />
                  <span className="flex shrink-0 flex-col items-end leading-none">
                    {indication.startsWith('vanaf') ? (
                      <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-muted)]">
                        vanaf
                      </span>
                    ) : null}
                    <T
                      as="span"
                      file="tarieven"
                      index={itemIndex}
                      field="basis_prijs"
                      value={formatPrice(item.basis_prijs)}
                      className="font-serif text-[1.15rem] text-[var(--color-heading)]"
                    />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="reveal mt-16 flex flex-col gap-6 border-t border-[var(--color-line)] pt-8 md:flex-row md:items-center md:justify-between">
        <p className="max-w-xl text-sm leading-relaxed text-[var(--color-muted)]">
          Prijzen zijn richtprijzen per behandeling en kunnen afhangen van haarkleur, lengte en structuur. De prijs
          varieert mee met de gradatie van je stylist.
        </p>
        <a href="#footer" className="btn btn-solid shrink-0">
          Maak een afspraak
        </a>
      </div>
    </SectionShell>
  );
}