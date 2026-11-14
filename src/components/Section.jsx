import React from 'react';
import SectionShell from './sections/SectionShell';
import MissionSection from './sections/MissionSection';
import LocationSection from './sections/LocationSection';
import GradiationSection from './sections/GradiationSection';
import TeamSection from './sections/TeamSection';
import PricesSection from './sections/PricesSection';
import TestimonialsSection from './sections/TestimonialsSection';
import AvedaSection from './sections/AvedaSection';
import { Picture, T, text } from '../lib/ui';

const SECTION_CONFIGS = [
  { table: 'missie', fallbackTitle: 'Onze missie', fallbackSubtitle: 'Waar we voor staan' },
  { table: 'locatie', fallbackTitle: 'Onze locatie', fallbackSubtitle: 'Breng ons een bezoek' },
  { table: 'stylist_gradatie', fallbackTitle: 'Stylist gradaties', fallbackSubtitle: 'Gediplomeerd vakmanschap' },
  { table: 'team', fallbackTitle: 'Ons team', fallbackSubtitle: 'De makers van jouw stijl' },
  { table: 'tarieven', fallbackTitle: 'Diensten & tarieven', fallbackSubtitle: 'Kwaliteit voor een eerlijke prijs' },
  { table: 'testimonials', fallbackTitle: 'Wat klanten zeggen', fallbackSubtitle: 'Echte ervaringen' },
  { table: 'aveda', fallbackTitle: 'Aveda filosofie', fallbackSubtitle: 'Natuurlijke schoonheid' },
  { table: 'diensten_hoofdgroepen', fallbackTitle: 'Behandelingen', fallbackSubtitle: '' },
];

const RENDERERS = {
  missie: MissionSection,
  locatie: LocationSection,
  stylist_gradatie: GradiationSection,
  team: TeamSection,
  tarieven: PricesSection,
  testimonials: TestimonialsSection,
  aveda: AvedaSection,
};

/** Fallback voor tabellen zonder eigen sectie-ontwerp. */
function GenericSection({ id, index, meta, items }) {
  return (
    <SectionShell
      id={id}
      index={index}
      eyebrow={id.replace(/_/g, ' ')}
      title={text(meta.title) || id}
      subtitle={text(meta.subtitle)}
      padding={meta.padding}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const keys = Object.keys(item).filter((key) => !/afbeelding|foto|image|url|id$/i.test(key));
          const titleKey = keys.find((key) => /naam|titel/i.test(key)) || keys[0];
          const descKey = keys.find((key) => /beschrijving|omschrijving|tekst|bio/i.test(key));
          return (
            <article key={`${titleKey}-${i}`} className="card reveal p-6">
              <h3 className="text-xl">{text(item[titleKey])}</h3>
              {descKey ? <p className="mt-2 text-sm text-[var(--color-muted)]">{text(item[descKey])}</p> : null}
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}

export default function Section({ data }) {
  const savedOrder = Array.isArray(data.section_order) ? data.section_order : [];
  const sorted = [...SECTION_CONFIGS].sort((a, b) => {
    const aIndex = savedOrder.indexOf(a.table);
    const bIndex = savedOrder.indexOf(b.table);
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  let visibleIndex = 0;

  return (
    <div className="flex flex-col">
      {sorted.map((config) => {
        if (config.table.includes('hoofdgroepen')) return null;

        const metaEntry =
          (data.section_settings || []).find((entry) => entry && entry.id === config.table) || {};
        if (metaEntry.visible === false) return null;

        const realKey = Object.keys(data).find((key) => key.toLowerCase() === config.table.toLowerCase());
        const items = (realKey ? data[realKey] : []) || [];

        if (!items.length) return null;

        visibleIndex += 1;

        const meta = {
          ...metaEntry,
          title: text(metaEntry.title) || config.fallbackTitle,
          subtitle: text(metaEntry.subtitle) || config.fallbackSubtitle,
          padding: typeof metaEntry.padding === 'number' && metaEntry.padding > 0 ? metaEntry.padding : 40,
        };

        const sectionConfig = data.display_config?.sections?.[config.table] || {};
        const hiddenFields = Array.isArray(sectionConfig.hidden_fields) ? sectionConfig.hidden_fields : [];

        const Renderer = RENDERERS[config.table] || GenericSection;
        const extra =
          config.table === 'tarieven'
            ? { groups: Array.isArray(data.diensten_hoofdgroepen) ? data.diensten_hoofdgroepen : [] }
            : {};

        return (
          <Renderer
            key={config.table}
            id={config.table}
            index={visibleIndex}
            meta={meta}
            items={items}
            hiddenFields={hiddenFields}
            {...extra}
          />
        );
      })}
    </div>
  );
}