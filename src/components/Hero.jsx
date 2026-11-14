import React from 'react';
import { Picture, first, text } from '../lib/ui';

const DAY_NAMES = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];

function useTodayHours(openingData = []) {
  const today = DAY_NAMES[new Date().getDay()];
  const row = openingData.find((item) => text(item.dag).toLowerCase() === today);
  const hours = text(row?.uren);
  if (!hours) return 'Bekijk de openingsuren';
  return /gesloten/i.test(hours) ? 'Vandaag gesloten' : `Vandaag ${hours}`;
}

export default function Hero({ hero = {}, headerSettings = {}, openingData = [], locationData = [] }) {
  const heroData = first(hero);
  const location = first(locationData);
  const settings = first(headerSettings);

  const title = text(heroData.titel) || 'De Schaar';
  const tagline = text(heroData.ondertitel);
  const address = [text(location.straat_nummer), [text(location.postcode), text(location.stad)].filter(Boolean).join(' ')]
    .filter(Boolean)
    .join(' · ');
  const phone = text(location.telefoonnummer) || '09 222 99 22';
  const hours = useTodayHours(openingData);
  const showImage = settings.hero_image_visible !== false;

  return (
    <section
      id="hero"
      data-dock-section="hero"
      className="relative isolate flex min-h-[620px] flex-col justify-end overflow-hidden bg-[#0d1712] text-[#f7f3ea] md:min-h-[720px] lg:min-h-[min(100svh,940px)]"
    >
      <div className="absolute inset-0 -z-10">
        {showImage ? (
          <Picture
            value={heroData.hero_afbeelding || heroData.hero_image}
            alt="Sfeerbeeld van het salon"
            file="hero"
            index={0}
            field="hero_afbeelding"
            priority
            className="hero-media h-full w-full"
            imgClassName="object-cover object-[center_42%]"
            sizes="100vw"
          />
        ) : null}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(9,16,12,0.86) 0%, rgba(9,16,12,0.42) 34%, rgba(9,16,12,0.55) 66%, rgba(9,16,12,0.92) 100%)',
          }}
        />
      </div>

      <div className="shell w-full pt-32 pb-12 md:pb-16">
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.28em] text-[#e2c7b4]">
            <span className="h-px w-10 bg-[#a24b28]" aria-hidden="true" />
            Kapsalon aan de Dampoort
          </div>

          <h1
            className="display mt-6 text-[clamp(3.1rem,9vw,7.4rem)] text-[#f8f4ec]"
            data-dock-type="text"
            data-dock-bind="hero.0.titel"
          >
            {title}
          </h1>

          {tagline ? (
            <p
              className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-[#f2ece1]/75 md:text-[1.1875rem]"
              data-dock-type="text"
              data-dock-bind="hero.0.ondertitel"
            >
              {tagline}
            </p>
          ) : null}

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#tarieven" className="btn btn-light">
              Onze diensten
            </a>
            <a href="#footer" className="btn btn-on-dark">
              Maak een afspraak
            </a>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/12">
        <div className="shell flex flex-col gap-3 py-5 text-[11px] font-bold uppercase tracking-[0.22em] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[#a24b28]" aria-hidden="true" />
            {address || 'Dok Noord 3 · 9000 Gent'}
          </span>
          <span className="hidden sm:inline">{hours}</span>
          <div className="flex items-center gap-6">
            <a href={`tel:${phone.replace(/\s+/g, '')}`} className="transition-colors hover:text-white">
              {phone}
            </a>
            <a href="#missie" className="flex items-center gap-2 transition-colors hover:text-white">
              Scroll
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}