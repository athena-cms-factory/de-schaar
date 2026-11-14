// 🔱 Athena v33 Modular Sync Bridge
import { DisplayConfigProvider } from './components/DisplayConfigContext';
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Section from './components/Section';
import Footer from './components/Footer';
import StyleInjector from './components/StyleInjector';

const App = ({ data: initialData }) => {
  const [data, setData] = useState(initialData || {});
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    const handleMessage = (event) => {
      const { type, file, index, key, value, config, section } = event.data;

      if (type === 'DOCK_REQUEST_SYNC') {
        const sourceFile = file || 'site_settings';
        const sourceData = data[sourceFile];
        const row = Array.isArray(sourceData) ? sourceData[index || 0] : sourceData;

        window.parent.postMessage(
          {
            type: 'SITE_SYNC_RESPONSE',
            key,
            value: row ? row[key] : null,
            fullRow: row,
          },
          '*'
        );
      }

      if (type === 'DOCK_UPDATE_TEXT' || type === 'DOCK_UPDATE_COLOR') {
        setData((prev) => {
          const newData = { ...prev };
          const targetFile = file || (key.startsWith('header_') ? 'header_settings' : 'site_settings');

          if (!newData[targetFile]) {
            newData[targetFile] = index !== undefined ? [] : {};
          }

          if (Array.isArray(newData[targetFile])) {
            newData[targetFile] = [...newData[targetFile]];
            newData[targetFile][index || 0] = { ...newData[targetFile][index || 0], [key]: value };
          } else {
            newData[targetFile] = { ...newData[targetFile], [key]: value };
          }
          return newData;
        });
      }

      if (type === 'DOCK_UPDATE_SECTION_CONFIG') {
        setData((prev) => {
          const newData = { ...prev };
          newData.display_config = {
            ...newData.display_config,
            sections: {
              ...(newData.display_config?.sections || {}),
              [file]: config,
            },
          };
          return newData;
        });
      }

      if (type === 'DOCK_UPDATE_SECTION_VISIBILITY') {
        setData((prev) => {
          const newData = { ...prev };
          const settings = [...(newData.section_settings || [])];
          const target = section || file;
          const idx = settings.findIndex((entry) => entry.id === target);
          if (idx !== -1) {
            settings[idx] = { ...settings[idx], visible: value };
            newData.section_settings = settings;
          }
          return newData;
        });
      }

      if (type === 'DOCK_UPDATE_SECTION_PADDING') {
        setData((prev) => {
          const newData = { ...prev };
          const settings = [...(newData.section_settings || [])];
          const target = section || file;
          const idx = settings.findIndex((entry) => entry.id === target);
          if (idx !== -1) {
            settings[idx] = { ...settings[idx], padding: value };
            newData.section_settings = settings;
          }
          return newData;
        });
      }

      if (type === 'DOCK_UPDATE_LAYOUT') {
        setData((prev) => {
          const newData = { ...prev };
          const layouts = { ...(newData.layout_settings || {}) };
          const target = section || file;
          layouts[target] = value;
          newData.layout_settings = layouts;
          return newData;
        });
      }

      if (type === 'DOCK_UPDATE_SECTION_ORDER') {
        setData((prev) => {
          const newData = { ...prev };
          newData.section_order = value;
          return newData;
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [data]);

  // 🔥 [v33 Bridge]: Deel actuele data met de Dock-connector
  useEffect(() => {
    if (window.athenaScan) {
      window.athenaScan(data);
    }
  }, [data]);

  // Scroll-reveal: rustig inkomen van secties, met respect voor reduced-motion.
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.reveal'));
    if (!elements.length) return;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      elements.forEach((element) => element.classList.add('is-in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [data]);

  const primaryTable = data['footer'] || [];

  return (
    <DisplayConfigProvider data={data}>
      <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] transition-colors duration-500">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[2000] focus:rounded-full focus:bg-[var(--color-heading)] focus:px-5 focus:py-3 focus:text-xs focus:font-bold focus:uppercase focus:tracking-[0.2em] focus:text-[var(--color-background)]"
        >
          Naar de inhoud
        </a>

        <StyleInjector data={data} />

        <Header
          primaryTable={primaryTable}
          tableName="footer"
          hero={data['hero']}
          headerSettings={data['header_settings']}
          navData={data['navbar']}
        />

        <main id="main">
          <Hero
            hero={data['hero']}
            headerSettings={data['header_settings']}
            openingData={data['openingsuren']}
            locationData={data['locatie']}
          />
          <Section data={data} />
        </main>

        <Footer
          primaryTable={data['footer']}
          socialData={data['social_media']}
          openingData={data['openingsuren']}
          locationData={data['locatie']}
        />

        {loading ? (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-[var(--color-background)] text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]">
            <span className="font-serif text-2xl normal-case tracking-normal">De Schaar</span>
          </div>
        ) : null}
      </div>
    </DisplayConfigProvider>
  );
};

export default App;