'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import TrackCard from './TrackCard';
import { MUSIC_GENRES, DEFAULT_COUNTRY, genreLabel as genreName } from '../constants/config';
import { useTrending } from '../hooks/useTrending';
import { genreInsights } from '../constants/insights';
import type { MusicType, TrendingItem } from '../types';

interface Props {
  genre: string;
  type: MusicType;
  /** Classement rendu par le serveur, pour que le HTML ne soit pas vide au crawl. */
  initialItems?: TrendingItem[];
  initialKey?: string;
}

export default function GenrePage({ genre, type, initialItems, initialKey }: Props) {
  const { t, i18n } = useTranslation();
  const { items: all, loading, error } = useTrending(type, DEFAULT_COUNTRY, 100, initialItems, initialKey);

  const genreDef = MUSIC_GENRES.find(g => g.slug === genre);
  const insight = genreInsights[genre]?.[i18n.language === 'fr' ? 'fr' : 'en'] ?? null;

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
    const isFr = i18n.language === 'fr';
    const unit = type === 'songs' ? (isFr ? 'morceaux' : 'tracks') : (isFr ? 'albums' : 'albums');
    const leader = items[0];
    const artists = new Set(items.map(item => item.artistName)).size;

    // Part des sorties de l'année en cours : distingue un genre porté par
    // l'actualité d'un genre porté par son catalogue.
    const year = new Date().getFullYear();
    const dated = items.filter(item => item.releaseDate);
    const fresh = dated.filter(item => item.releaseDate!.startsWith(String(year))).length;
    const freshPct = dated.length ? Math.round((fresh / dated.length) * 100) : null;

    // Entrée la plus ancienne encore classée.
    const oldest = dated.length
      ? dated.reduce((a, b) => (a.releaseDate! < b.releaseDate! ? a : b))
      : null;
    const oldestYear = oldest?.releaseDate?.slice(0, 4) ?? null;

    // Artiste le plus représenté, quand il place plus d'une entrée.
    const perArtist = items.reduce<Record<string, number>>((acc, item) => {
      acc[item.artistName] = (acc[item.artistName] ?? 0) + 1;
      return acc;
    }, {});
    const [topArtist, topCount] = Object.entries(perArtist).sort((a, b) => b[1] - a[1])[0];

    const parts: string[] = [];

    parts.push(isFr
      ? `${leader.name} de ${leader.artistName} mène actuellement cette sélection ${label}. Le classement compte ${items.length} ${unit} signés par ${artists} artistes différents. Cet écart entre le nombre d’entrées et le nombre d’artistes permet de repérer les sorties qui occupent plusieurs places à la fois, au lieu de confondre volume de catalogue et diversité réelle.`
      : `${leader.name} by ${leader.artistName} currently leads this ${label} selection. The ranking contains ${items.length} ${unit} from ${artists} different artists. Comparing entries with unique artists helps reveal releases occupying several positions at once instead of mistaking catalogue volume for genuine diversity.`);

    if (topCount > 1) {
      parts.push(isFr
        ? `${topArtist} est l’artiste le plus représenté de cette page avec ${topCount} entrées. Une même signature qui revient plusieurs fois dans un genre indique presque toujours une sortie récente écoutée en intégralité, et non plusieurs succès indépendants.`
        : `${topArtist} is the most represented artist on this page with ${topCount} entries. One name recurring several times within a genre almost always signals a recent release being played end to end, rather than several independent hits.`);
    }

    if (freshPct !== null) {
      parts.push(isFr
        ? `${freshPct} % de cette sélection est sortie en ${year}, ce qui situe le genre entre deux régimes : au-dessus de la moitié il vit de son actualité, en dessous il vit de son catalogue.`
        : `${freshPct} % of this selection was released in ${year}, which places the genre between two regimes: above half it lives on new releases, below it lives on its catalogue.`);
    }

    if (oldestYear && Number(oldestYear) < year) {
      parts.push(isFr
        ? `La plus ancienne entrée encore classée ici remonte à ${oldestYear} : ${oldest!.name} de ${oldest!.artistName}. La durée de vie d’un titre dans un classement quotidien est le meilleur indicateur de sa solidité, bien davantage que sa position de départ.`
        : `The oldest entry still charting here dates from ${oldestYear}: ${oldest!.name} by ${oldest!.artistName}. How long a title survives in a daily chart is a far better measure of its strength than the position it opened at.`);
    }

    return parts.join(' ');
  }, [items, type, label, i18n.language]);

  return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 16px 64px' }}>
        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{title}</h1>
        {insight && (
          <p style={{ color: '#AAAAAA', fontSize: 14, margin: '10px 0 18px', lineHeight: 1.8, maxWidth: 780 }}>{insight}</p>
        )}
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
