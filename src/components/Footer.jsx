import React from 'react';
import { cx, first, text } from '../lib/ui';

const iconMap = {
  fa: 'fa-brands fa-facebook-f',
  fb: 'fa-brands fa-facebook-f',
  in: 'fa-brands fa-instagram',
  ig: 'fa-brands fa-instagram',
  tw: 'fa-brands fa-x-twitter',
  li: 'fa-brands fa-linkedin-in',
  yt: 'fa-brands fa-youtube',
  wa: 'fa-brands fa-whatsapp',
  tk: 'fa-brands fa-tiktok',
};

const DAY_INDEX = {
  zondag: 0,
  maandag: 1,
  dinsdag: 2,
  woensdag: 3,
  donderdag: 4,
  vrijdag: 5,
  zaterdag: 6,
};

export default function Footer({ primaryTable = [], socialData = [], openingData = [], locationData = [] }) {
  const info = first(primaryTable);
  const location = first(locationData);
  const today = new Date().getDay();

  const brand = text(info.bedrijfsnaam) || 'De Schaar';
  const address = [text(location.straat_nummer), [text(location.postcode), text(location.stad)].filter(Boolean).join(' ')]
    .filter(Boolean)
    .join(', ');
  const phone = text(info.telefoonnummer) || text(location.telefoonnummer);
  const email = text(info.email) || text(location.email);
  const copyright = text(info.copyright_tekst);

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${brand} ${address || 'Dok Noord 3, 9000 Gent'}`
  )}`;

  return (
    <footer id="footer" className="relative overflow-hidden bg-[#101a15] text-[#f2ece1]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d98b62]/60 to-transparent"
      />

      <div className="shell relative z-10 pt-20 pb-10 md:pt-24">
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.15fr] lg:gap-10">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={`${import.meta.env.BASE_URL}brand-mark.svg`}
                alt=""
                width="48"
                height="48"
                className="h-11 w-11"
                loading="lazy"
              />
              <div className="leading-none">
                <p className="font-serif text-3xl tracking-[-0.02em] md:text-4xl">{brand}</p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.32em] text-[#f2ece1]/60">
                  Aveda salon · Dok Noord
                </p>
              </div>
            </div>

            <p className="mt-8 max-w-sm text-sm leading-relaxed text-[#f2ece1]/60">
              Kapsalon in het hart van de Gentse dokken. Knippen, kleuren en verzorgen met aandacht voor haar, hoofd
              en huid.
            </p>

            <div className="mt-8 flex gap-3">
              {socialData.map((social, index) => {
                const icon = iconMap[text(social.icoon_klasse)] || 'fa-solid fa-globe';
                return (
                  <a
                    key={`${text(social.naam)}-${index}`}
                    href={text(social.url) || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={text(social.naam)}
                    title={text(social.naam)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-sm text-[#f2ece1]/80 transition-colors duration-300 hover:border-[#d98b62] hover:bg-[#d98b62] hover:text-white"
                  >
                    <i className={icon} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d98b62]">Bezoek</h2>
            <address className="mt-6 space-y-1 text-sm not-italic leading-relaxed text-[#f2ece1]/75">
              {address ? <p>{address}</p> : null}
              <p className="text-[#f2ece1]/60">{text(location.ligging_omschrijving)}</p>
            </address>
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#f2ece1] underline decoration-white/25 decoration-1 underline-offset-8 transition-colors hover:text-[#d98b62] hover:decoration-[#d98b62]"
            >
              Plan je route
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d98b62]">Contact</h2>
            <ul className="mt-6 space-y-4 text-sm text-[#f2ece1]/75">
              {phone ? (
                <li>
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="transition-colors hover:text-white">
                    {phone}
                  </a>
                </li>
              ) : null}
              {email ? (
                <li className="break-all">
                  <a href={`mailto:${email}`} className="transition-colors hover:text-white">
                    {email}
                  </a>
                </li>
              ) : null}
              {text(info.kvk_nummer) ? (
                <li className="text-xs text-[#f2ece1]/40">BTW {text(info.kvk_nummer)}</li>
              ) : null}
            </ul>
          </div>

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d98b62]">Openingsuren</h2>
            <ul className="mt-6 space-y-2 text-sm">
              {openingData.map((item, index) => {
                const day = text(item.dag);
                const isToday = DAY_INDEX[day.toLowerCase()] === today;
                return (
                  <li
                    key={`${day}-${index}`}
                    className={cx(
                      'flex items-baseline justify-between gap-4 border-b border-white/10 pb-2',
                      isToday ? 'text-[#f2ece1]' : 'text-[#f2ece1]/60'
                    )}
                  >
                    <span className={cx('flex items-center gap-2', isToday && 'font-semibold')}>
                      {isToday ? <span className="h-1 w-1 rounded-full bg-[#a24b28]" aria-hidden="true" /> : null}
                      <span data-dock-type="text" data-dock-bind={`openingsuren.${index}.dag`}>
                        {day}
                      </span>
                    </span>
                    <span
                      className={cx('tabular-nums', isToday ? 'text-[#f2ece1]' : 'text-[#f2ece1]/60')}
                      data-dock-type="text"
                      data-dock-bind={`openingsuren.${index}.uren`}
                    >
                      {text(item.uren)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-[11px] uppercase tracking-[0.22em] text-[#f2ece1]/55 md:flex-row md:items-center md:justify-between">
          <p>
            {copyright || `© ${new Date().getFullYear()} ${brand}`}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={text(info.privacy_beleid_link) || '#'}
              className="transition-colors hover:text-[#f2ece1]"
              data-dock-type="text"
              data-dock-bind="footer.0.privacy_beleid_link"
            >
              Privacybeleid
            </a>
            <a
              href={text(info.cookies_beleid_link) || '#'}
              className="transition-colors hover:text-[#f2ece1]"
              data-dock-type="text"
              data-dock-bind="footer.0.cookies_beleid_link"
            >
              Cookiebeleid
            </a>
            <span className="text-[#f2ece1]/20">Athena CMS</span>
          </div>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-serif text-[22vw] leading-none text-white/[0.03]"
      >
        {brand}
      </span>
    </footer>
  );
}