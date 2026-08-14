'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import TrackCard from './TrackCard';
import TypeFilter from './TypeFilter';
import GenreFilter from './GenreFilter';
import CountryFilter from './CountryFilter';
import InsightBar from './InsightBar';
import EditorialSection from './EditorialSection';
import LatestArticles from './LatestArticles';
import { useTrending } from '../hooks/useTrending';
import { useBlog } from '../hooks/useBlog';
import { useAppStore } from '../store';
import { MUSIC_GENRES, DEFAULT_COUNTRY, artwork, findCountry } from '../constants/config';
import { articleExcerpt, articleTitle, formatLabel, heroItem } from '../utils/blog';
import { slugify } from '../utils/slug';
import type { BlogArticle, BlogArticleSummary, MusicType, TrendingItem } from '../types';

interface Props {
  initialItems: TrendingItem[];
  /** Couple type/pays rendu par le serveur, au format "songs:US". */
  initialKey: string;
  initialArticles: BlogArticleSummary[];
}

export default function HomeContent({ initialItems, initialKey, initialArticles }: Props) {
  const { t } = useTranslation();
  const searchParams = useSearchParams();

  const mediaType: MusicType = searchParams.get('type') === 'albums' ? 'albums' : 'songs';
  const genreSlug = searchParams.get('genre');
  const country = findCountry(searchParams.get('country'))?.code ?? DEFAULT_COUNTRY;
  const genreDef = genreSlug ? (MUSIC_GENRES.find(g => g.slug === genreSlug) ?? null) : null;
  const genreId = genreDef?.id ?? null;

  const { items, loading, error } = useTrending(mediaType, country, 100, initialItems, initialKey);
  const { articles } = useBlog(initialArticles);
  const lang = useAppStore(s => s.lang);
  const isFr = lang === 'fr';

  const featuredArticles = useMemo(() => {
    const filtered = articles.filter(a => a.type === mediaType);
    return [
      filtered.find(article => (article.format ?? 'SIMPLE') === 'SIMPLE'),
      filtered.find(article => (article.format ?? 'SIMPLE') !== 'SIMPLE'),
    ].filter((article): article is BlogArticleSummary => article !== undefined);
  }, [articles, mediaType]);

  const filtered = useMemo(() => {
    if (genreId === null) return items;
    return items.filter(item => item.genreIds.includes(genreId));
  }, [items, genreId]);

  return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <Header />
        <div className="filter-bar">
          <TypeFilter selected={mediaType} genreSlug={genreSlug} country={country !== DEFAULT_COUNTRY ? country : null} />
          <GenreFilter mediaType={mediaType} selected={genreSlug} country={country !== DEFAULT_COUNTRY ? country : null} />
        </div>
        <CountryFilter mediaType={mediaType} genreSlug={genreSlug} selected={country} />
      </div>

      {/* Ordre de la home : accroche, puis les deux articles mis en avant, puis l'insight du jour. */}
      {!loading && !error && items.length > 0 && (
        <div className="home-title-block">
          <h1 className="home-title">{t('home.discover_title')}</h1>
        </div>
      )}

      {featuredArticles.length > 0 && (
        <div className="home-articles">
          {featuredArticles.map(article => {
            const structured = (article.format ?? 'SIMPLE') !== 'SIMPLE';
            const title = articleTitle(article);
            // La liste porte deja la pochette et le nombre d'elements.
            const featuredArtwork = article.artworkUrl;
            const itemCount = article.itemCount;

            return (
              <a
                key={article.id}
                href={`/blog/${slugify(title, String(article.id))}`}
                style={{ display: 'block', textDecoration: 'none', height: '100%' }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: 14,
                    alignItems: 'center',
                    height: '100%',
                    backgroundColor: structured ? '#17131F' : '#141414',
                    border: `1px solid ${structured ? '#3F2A62' : '#2A2A2A'}`,
                    borderRadius: 12,
                    padding: '12px 14px',
                    transition: 'border-color 150ms',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#7C3AED')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = structured ? '#3F2A62' : '#2A2A2A')}
                >
                  {featuredArtwork && (
                    <img
                      src={artwork(featuredArtwork, 200) ?? undefined}
                      alt={title}
                      style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }}
                    />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, background: 'linear-gradient(90deg,#7C3AED,#EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {structured
                          ? formatLabel(article.format, isFr)
                          : (lang === 'fr' ? 'Article du blog' : 'Blog post')}
                      </span>
                      {structured && itemCount > 1 && (
                        <span style={{ color: '#777', fontSize: 10 }}>
                          {itemCount} {isFr ? 'titres analysés' : 'titles covered'}
                        </span>
                      )}
                    </div>
                    <p style={{ color: '#fff', fontSize: 13, fontWeight: 600, margin: '3px 0 4px', lineHeight: 1.3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
                      {title}
                    </p>
                    <p style={{ color: '#888', fontSize: 12, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: 1.5 }}>
                      {articleExcerpt(article)}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
          <div className="home-divider" />
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <InsightBar items={items} type={mediaType} genre={genreDef} />
      )}

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 16px 64px' }}>
        {error && <p style={{ color: '#A78BFA', fontSize: 14, marginBottom: 20 }}>{error}</p>}

        {loading ? (
          <div className="grid-cards">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i}>
                <div className="skeleton" style={{ aspectRatio: '1/1', borderRadius: 10, marginBottom: 8 }} />
                <div className="skeleton" style={{ height: 13, borderRadius: 4, marginBottom: 6, width: '80%' }} />
                <div className="skeleton" style={{ height: 11, borderRadius: 4, width: '40%' }} />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 && !error ? (
          <div style={{ color: '#555', textAlign: 'center', paddingTop: 80, fontSize: 14 }}>{t('trending.empty')}</div>
        ) : (
          <div className="grid-cards">
            {filtered.map(item => <TrackCard key={item.id} item={item} />)}
          </div>
        )}
      </div>

      <LatestArticles initialArticles={initialArticles} />

      <EditorialSection page="home" />

      <Footer />
    </div>
  );
}

