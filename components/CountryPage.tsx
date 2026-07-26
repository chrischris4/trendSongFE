'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import TrackCard from './TrackCard';
import { COUNTRIES, findCountry, countryLabel } from '../constants/config';
import { useTrending } from '../hooks/useTrending';
import { countryInsights } from '../constants/insights';
import type { MusicType, TrendingItem } from '../types';

interface Props {
  code: string;
  type: MusicType;
  /** Classement rendu par le serveur, pour que le HTML ne soit pas vide au crawl. */
  initialItems?: TrendingItem[];
  initialKey?: string;
}

export default function CountryPage({ code, type, initialItems, initialKey }: Props) {
  const { t, i18n } = useTranslation();
  const country = findCountry(code);
  const { items, loading, error } = useTrending(type, country?.code ?? 'US', 100, initialItems, initialKey);

  const insight = country ? (countryInsights[country.code]?.[i18n.language === 'fr' ? 'fr' : 'en'] ?? null) : null;
  const label = country ? `${country.flag} ${countryLabel(country, i18n.language)}` : code.toUpperCase();
  const title = type === 'songs'
    ? t('country.songs_title', { country: label })
    : t('country.albums_title', { country: label });
  const artists = new Set(items.map(item => item.artistName)).size;
  const leader = items[0];

  const chip: React.CSSProperties = { padding: '6px 14px', borderRadius: 20, backgroundColor: '#1A1A1A', color: '#AAAAAA', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', textDecoration: 'none', display: 'inline-block', border: '1px solid #2A2A2A' };

  return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 16px 64px' }}>
        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{title}</h1>
        <p style={{ color: '#888', fontSize: 13, marginBottom: insight ? 12 : 28, lineHeight: 1.6 }}>{t('country.subtitle')}</p>
        {insight && (
          <p style={{ color: '#AAAAAA', fontSize: 14, marginBottom: 28, lineHeight: 1.8, maxWidth: 780 }}>{insight}</p>
        )}

        {error && <p style={{ color: '#A78BFA', fontSize: 14, marginBottom: 20 }}>{error}</p>}

        {loading ? (
          <div className="grid-cards">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i}>
                <div className="skeleton" style={{ aspectRatio: '1/1', borderRadius: 10, marginBottom: 8 }} />
                <div className="skeleton" style={{ height: 13, borderRadius: 4, marginBottom: 6, width: '80%' }} />
                <div className="skeleton" style={{ height: 11, borderRadius: 4, width: '40%' }} />
              </div>
            ))}
          </div>
        ) : items.length === 0 && !error ? (
          <div style={{ color: '#555', textAlign: 'center', paddingTop: 80 }}>{t('trending.empty')}</div>
        ) : (
          <div className="grid-cards">
            {items.map(item => <TrackCard key={item.id} item={item} />)}
          </div>
        )}

        {leader && (
          <section style={{ maxWidth: 800, marginTop: 48, paddingTop: 28, borderTop: '1px solid #2A2A2A' }}>
            <h2 style={{ color: '#fff', fontSize: 19, marginBottom: 10 }}>
              {i18n.language === 'fr' ? `Lecture du classement en ${label}` : `Reading the chart in ${label}`}
            </h2>
            <p style={{ color: '#AAAAAA', fontSize: 15, lineHeight: 1.8 }}>
              {i18n.language === 'fr'
                ? `${leader.name} de ${leader.artistName} occupe la première place de ce relevé. Le top rassemble ${items.length} ${type === 'songs' ? 'morceaux' : 'albums'} et ${artists} artistes différents. Comparer cette concentration avec les autres pays permet de voir si le marché récompense une sortie dominante ou un catalogue plus dispersé.`
                : `${leader.name} by ${leader.artistName} holds the top position in this snapshot. The chart contains ${items.length} ${type === 'songs' ? 'tracks' : 'albums'} and ${artists} different artists. Comparing that concentration with other countries shows whether the market is rewarding one dominant release or a more dispersed catalogue.`}
            </p>
            <Link href="/methodology" style={{ color: '#A78BFA', fontSize: 13 }}>
              {i18n.language === 'fr' ? 'Comprendre notre méthodologie' : 'Read our methodology'}
            </Link>
          </section>
        )}

        {/* SEO interlinking between country charts */}
        <div style={{ marginTop: 48 }}>
          <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{t('country.other_countries')}</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {COUNTRIES.filter(c => c.code !== country?.code).map(c => (
              <Link key={c.code} href={`/${type}/country/${c.code.toLowerCase()}`} style={chip}>
                {c.flag} {countryLabel(c, i18n.language)}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
