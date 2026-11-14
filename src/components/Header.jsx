import React, { useEffect, useMemo, useState } from 'react';
import { cx, first, text } from '../lib/ui';

const SECTION_IDS = [
  'hero',
  'missie',
  'locatie',
  'stylist_gradatie',
  'team',
  'tarieven',
  'testimonials',
  'aveda',
  'footer',
];

/**
 * Vaste navigatie: transparant over de hero, daarna effen.
 * Met scrollspy en een volledig scherm-menu op mobiel.
 */
export default function Header({ hero = {}, headerSettings = {}, navData = [], primaryTable = [] }) {
  const settings = first(headerSettings);
  const heroData = first(hero);
  const info = first(primaryTable);

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');

  const brand = text(info.bedrijfsnaam) || text(heroData.titel) || 'De Schaar';
  const tagline = text(heroData.ondertitel) || 'Aveda-kapsalon · Gent';

  const navItems = useMemo(
    () =>
      [...navData]
        .filter((item) => item && item.slug)
        .sort((a, b) => (a.menu_positie || 0) - (b.menu_positie || 0)),
    [navData]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={cx(
          'fixed inset-x-0 top-0 z-[1000] border-b transition-[background-color,color,border-color,box-shadow] duration-500',
          solid
            ? 'border-[var(--color-line)] text-[var(--color-heading)] shadow-[0_10px_30px_-24px_rgba(10,18,14,0.55)]'
            : 'border-transparent text-[#f8f5ee]'
        )}
        style={{
          backgroundColor: solid ? 'color-mix(in srgb, var(--color-background) 88%, transparent)' : 'transparent',
          backdropFilter: solid ? 'blur(18px)' : 'none',
        }}
      >
        <div className="shell flex h-16 items-center justify-between gap-6 md:h-20">
          <a href="#hero" className="group flex items-center gap-3" aria-label={`${brand} — naar boven`}>
            <img
              src={`${import.meta.env.BASE_URL}brand-mark.svg`}
              alt=""
              width="40"
              height="40"
              className="h-9 w-9 shrink-0 md:h-10 md:w-10"
            />
            <span className="flex flex-col leading-none">
              <span className="font-serif text-lg tracking-[-0.02em] md:text-[1.4rem]">{brand}</span>
              <span className="mt-1.5 text-[9.5px] font-bold uppercase tracking-[0.3em] opacity-60 md:text-[10px]">
                Haarstudio · Gent
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Hoofdnavigatie">
            {navItems.map((item) => {
              const label = text(item.titel_navigatie);
              const isActive = active === item.slug;
              if (item.is_call_to_action) {
                return (
                  <a
                    key={`${item.slug}-${item.pagina_id ?? label}`}
                    href={`#${item.slug}`}
                    className={cx('btn', solid ? 'btn-solid' : 'btn-light', 'ml-2 min-h-0 px-6 py-3 text-[11px]')}
                  >
                    {label || 'Afspraak'}
                  </a>
                );
              }
              return (
                <a
                  key={`${item.slug}-${item.pagina_id ?? label}`}
                  href={`#${item.slug}`}
                  className={cx(
                    'relative py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-[color,opacity] duration-300',
                    solid
                      ? isActive
                        ? 'text-[var(--color-accent)]'
                        : 'text-[var(--color-heading)] opacity-70 hover:opacity-100'
                      : isActive
                        ? 'text-white'
                        : 'text-white opacity-70 hover:opacity-100'
                  )}
                >
                  {label}
                  <span
                    className={cx(
                      'absolute -bottom-0.5 left-0 h-px bg-current transition-all duration-300',
                      isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Menu sluiten' : 'Menu openen'}
            className={cx(
              'relative z-[1100] flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden',
              solid ? 'border-[var(--color-line)] text-[var(--color-heading)]' : 'border-white/35 text-white'
            )}
          >
            <span className="sr-only">Menu</span>
            <span className="relative block h-3 w-5">
              <span
                className={cx(
                  'absolute left-0 block h-px w-full bg-current transition-transform duration-300',
                  open ? 'top-1.5 rotate-45' : 'top-0'
                )}
              />
              <span
                className={cx(
                  'absolute left-0 block h-px w-full bg-current transition-transform duration-300',
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                )}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobiel menu */}
      <div
        id="mobile-menu"
        className={cx(
          'fixed inset-0 z-[1050] flex flex-col bg-[#101a15] text-[#f4efe5] transition-[opacity,visibility] duration-300 lg:hidden',
          open ? 'visible opacity-100' : 'invisible opacity-0'
        )}
      >
        <div className="shell flex h-16 items-center justify-between md:h-20">
          <span className="font-serif text-lg">{brand}</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Menu sluiten"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-lg"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <nav className="shell flex flex-1 flex-col justify-center gap-1 py-8" aria-label="Mobiele navigatie">
          {navItems.map((item, index) => (
            <a
              key={`${item.slug}-m-${index}`}
              href={`#${item.slug}`}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-4 border-b border-white/10 py-4"
            >
              <span className="w-6 text-[11px] font-bold tracking-[0.25em] text-[#d98b62]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-serif text-[1.75rem] leading-none tracking-[-0.02em] text-[#f4efe5]">
                {text(item.titel_navigatie)}
              </span>
            </a>
          ))}
        </nav>

        <div className="shell flex flex-col gap-3 pb-10 text-sm text-white/70">
          <a href="tel:+3292229922" className="hover:text-white">
            09 222 99 22
          </a>
          <span>Dok Noord 3 · 9000 Gent</span>
          <span className="text-[11px] uppercase tracking-[0.28em] text-white/40">Aveda salon</span>
        </div>
      </div>
    </>
  );
}