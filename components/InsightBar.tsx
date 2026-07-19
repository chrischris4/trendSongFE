'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MUSIC_GENRES, findCountry, countryLabel as countryName, genreLabel } from '../constants/config';
import type { TrendingItem, MusicType } from '../types';

interface Props {
  items: TrendingItem[];
  type: MusicType;
}

const INSIGHTS: Record<MusicType, { fr: string; en: string }> = {
  songs: {
    fr: 'Le classement des titres est actualisé chaque jour à partir des charts officiels Apple Music (« Les plus écoutés »). Il reflète les morceaux réellement en boucle dans chaque pays en ce moment.',
    en: 'The songs ranking is updated daily from the official Apple Music "Most Played" charts. It reflects the tracks actually on repeat in each country right now.',
  },
  albums: {
    fr: 'Le classement des albums est actualisé chaque jour à partir des charts officiels Apple Music. Il vous montre les projets qui dominent réellement les écoutes dans chaque pays.',
    en: 'The albums ranking is updated daily from the official Apple Music charts. It shows you the projects truly dominating plays in each country.',
  },
};

export default function InsightBar({ items, type }: Props) {
  const { i18n } = useTranslation();
  const isFr = i18n.language === 'fr';

  const stats = useMemo(() => {
    if (items.length === 0) return null;

    const top = items[0];
    const country = findCountry(top.countryCode);

    // Top genres
    const genreCounts = new Map<string, { count: number; name: string }>();
    for (const item of items) {
      item.genreIds.forEach((gId, idx) => {
        const entry = genreCounts.get(gId) ?? { count: 0, name: item.genreNames[idx] ?? gId };
        entry.count += 1;
        genreCounts.set(gId, entry);
      });
    }
    const topGenres = [...genreCounts.entries()]
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 3)
      .map(([id, { count, name }]) => {
        const def = MUSIC_GENRES.find(g => g.id === id);
        return { name: def ? genreLabel(def, isFr ? 'fr' : 'en') : name, pct: Math.round((count / items.length) * 100) };
      });

    // Most present artist
    const artistCounts = new Map<string, number>();
    for (const item of items) {
      if (item.artistName) artistCounts.set(item.artistName, (artistCounts.get(item.artistName) ?? 0) + 1);
    }
    const topArtist = [...artistCounts.entries()].sort((a, b) => b[1] - a[1])[0];

    return { top, country, topGenres, topArtist };
  }, [items]);

  if (!stats) return null;

  const hi = (text: string) => <span style={{ color: '#ddd', fontWeight: 500 }}>{text}</span>;
  const num = (text: string) => <span style={{ color: '#A78BFA', fontWeight: 600 }}>{text}</span>;
  const editorial = INSIGHTS[type][isFr ? 'fr' : 'en'];
  const countryLabel = stats.country ? `${stats.country.flag} ${countryName(stats.country, isFr ? 'fr' : 'en')}` : stats.top.countryCode;

  const insightText = isFr
    ? <>{hi(`« ${stats.top.name} »`)} de {hi(stats.top.artistName)} est en tête du classement {num(countryLabel)}.{' '}
        {stats.topArtist && stats.topArtist[1] > 1 && <>Artiste le plus présent : {num(stats.topArtist[0])} ({stats.topArtist[1]} entrées dans le top {items.length}).</>}</>
    : <>{hi(`"${stats.top.name}"`)} by {hi(stats.top.artistName)} leads the {num(countryLabel)} chart.{' '}
        {stats.topArtist && stats.topArtist[1] > 1 && <>Most present artist: {num(stats.topArtist[0])} ({stats.topArtist[1]} entries in the top {items.length}).</>}</>;

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '14px 16px 12px' }}>
      <p style={{ color: '#888', fontSize: 13, marginBottom: 8, lineHeight: 1.6, fontStyle: 'italic' }}>
        {editorial}
      </p>
      <p style={{ color: '#AAAAAA', fontSize: 13, lineHeight: 1.6, marginBottom: 10 }}>
        {insightText}
      </p>
      {stats.topGenres.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
          {stats.topGenres.map((g, i) => (
            <div key={g.name} style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 20, padding: '4px 12px' }}>
              <span style={{ color: '#A78BFA', fontWeight: 700, fontSize: 12 }}>#{i + 1}</span>
              <span style={{ color: '#ddd', fontSize: 12, fontWeight: 600 }}>{g.name}</span>
              <span style={{ color: '#555', fontSize: 11 }}>{g.pct}%</span>
            </div>
          ))}
        </div>
      )}
      <div style={{ height: 1, background: 'linear-gradient(90deg, #7C3AED, #EC4899)' }} />
    </div>
  );
}
