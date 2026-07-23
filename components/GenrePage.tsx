'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import TrackCard from './TrackCard';
import { MUSIC_GENRES, DEFAULT_COUNTRY, genreLabel as genreName } from '../constants/config';
import { useTrending } from '../hooks/useTrending';
import type { MusicType } from '../types';

interface Props { genre: string; type: MusicType }

export default function GenrePage({ genre, type }: Props) {
  const { t, i18n } = useTranslation();
  const { items: all, loading, error } = useTrending(type, DEFAULT_COUNTRY, 100);

  const genreDef = MUSIC_GENRES.find(g => g.slug === genre);

  const items = useMemo(() => {
    if (!genreDef) return [];
    return all.filter(item => item.genreIds.includes(genreDef.id));
  }, [all, genreDef]);

  const label = genreDef ? `${genreDef.emoji} ${genreName(genreDef, i18n.language)}` : genre;
  const title = type === 'songs'
    ? t('genre.songs_title', { genre: label })
    : t('genre.albums_title', { genre: label });
  const analysis = useMemo(() => {
    if (!items.length) return null;
    const artists = new Set(items.map(item => item.artistName)).size;
    const leader = items[0];
    const isFr = i18n.language === 'fr';
    return isFr
      ? `${leader.name} de ${leader.artistName} mène actuellement cette sélection ${label}. Le classement compte ${items.length} ${type === 'songs' ? 'morceaux' : 'albums'} signés par ${artists} artistes différents. Cet écart entre le nombre d’entrées et le nombre d’artistes permet de repérer les sorties qui occupent plusieurs places à la fois, au lieu de confondre volume de catalogue et diversité réelle.`
      : `${leader.name} by ${leader.artistName} currently leads this ${label} selection. The ranking contains ${items.length} ${type === 'songs' ? 'tracks' : 'albums'} from ${artists} different artists. Comparing entries with unique artists helps reveal releases occupying several positions at once instead of mistaking catalogue volume for genuine diversity.`;
  }, [items, type, label, i18n.language]);

  return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 16px 64px' }}>
        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{title}</h1>
        {!loading && !error && <p style={{ color: '#888', fontSize: 13, marginBottom: 28 }}>{t('genre.results', { count: items.length })}</p>}

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
          <div style={{ color: '#555', textAlign: 'center', paddingTop: 80 }}>{t('genre.empty')}</div>
        ) : (
          <div className="grid-cards">
            {items.map(item => <TrackCard key={item.id} item={item} />)}
          </div>
        )}

        {analysis && (
          <section style={{ maxWidth: 800, marginTop: 48, paddingTop: 28, borderTop: '1px solid #2A2A2A' }}>
            <h2 style={{ color: '#fff', fontSize: 19, marginBottom: 10 }}>
              {i18n.language === 'fr' ? `Ce que révèle le classement ${label}` : `What the ${label} ranking reveals`}
            </h2>
            <p style={{ color: '#AAAAAA', fontSize: 15, lineHeight: 1.8 }}>{analysis}</p>
            <a href="/methodology" style={{ color: '#A78BFA', fontSize: 13 }}>
              {i18n.language === 'fr' ? 'Comprendre notre méthodologie' : 'Read our methodology'}
            </a>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
}
