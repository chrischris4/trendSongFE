'use client';

import { Suspense, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import TrackCard from './TrackCard';
import EditorialSection from './EditorialSection';
import { useTrending } from '../hooks/useTrending';
import { useBlog } from '../hooks/useBlog';
import { useAppStore } from '../store';
import { artwork, DEFAULT_COUNTRY, findCountry, countryLabel } from '../constants/config';
import { articleExcerpt, articleTitle, heroItem } from '../utils/blog';
import type { BlogArticle, MusicType, TrendingItem } from '../types';

interface Props {
  type: MusicType;
  /** Contenu rendu par le serveur, pour que le HTML ne soit pas vide au crawl. */
  initialItems?: TrendingItem[];
  initialKey?: string;
  initialArticles?: BlogArticle[];
}

function TrendingContent({ type, initialItems, initialKey, initialArticles }: Props) {
  const { t, i18n } = useTranslation();
  const searchParams = useSearchParams();
  const country = findCountry(searchParams.get('country'))?.code ?? DEFAULT_COUNTRY;

  const { items, loading, error } = useTrending(type, country, 100, initialItems, initialKey);
  const { articles } = useBlog(initialArticles);
  const lang = useAppStore(s => s.lang);
  const isFr = lang === 'fr';

  const featuredArticle = useMemo(() => {
    const filtered = articles.filter(a => a.type === type);
    if (filtered.length === 0) return null;
    return filtered[Math.floor(Math.random() * filtered.length)];
  }, [articles, type]);
  const featuredHero = featuredArticle ? heroItem(featuredArticle) : null;
  const featuredArtwork = featuredHero?.artworkUrl ?? featuredArticle?.artworkUrl;
  const featuredTitle = featuredArticle ? articleTitle(featuredArticle, isFr) : '';

  const title      = type === 'songs' ? t('songs.title')       : t('albums.title');
  const subtitle   = type === 'songs' ? t('songs.subtitle')    : t('albums.subtitle');
  const countLabel = type === 'songs' ? t('songs.count_label') : t('albums.count_label');
  const countryDef = findCountry(country);

  return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 16px 64px' }}>
        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>
          {title}{countryDef ? ` — ${countryDef.flag} ${countryLabel(countryDef, i18n.language)}` : ''}
        </h1>
        <p style={{ color: '#888', fontSize: 13, marginBottom: 28, lineHeight: 1.6 }}>{subtitle}</p>

        {!loading && !error && (
          <div style={{ marginBottom: 20 }}>
            <span style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 20, padding: '4px 14px', fontSize: 12, color: '#AAAAAA' }}>
              {items.length} {countLabel}
            </span>
          </div>
        )}

        {featuredArticle && (
          <a href="/blog" style={{ display: 'block', textDecoration: 'none', marginBottom: 24 }}>
            <div
              style={{ display: 'flex', gap: 14, alignItems: 'center', backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 12, padding: '12px 14px', transition: 'border-color 150ms' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#7C3AED')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A2A2A')}
            >
              {featuredArtwork && (
                <img
                  src={artwork(featuredArtwork, 200) ?? undefined}
                  alt={featuredTitle}
                  style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }}
                />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, background: 'linear-gradient(90deg,#7C3AED,#EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {lang === 'fr' ? 'Article du blog' : 'Blog post'}
                </span>
                <p style={{ color: '#fff', fontSize: 13, fontWeight: 600, margin: '3px 0 4px', lineHeight: 1.3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
                  {featuredTitle}
                </p>
                <p style={{ color: '#888', fontSize: 12, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: 1.5 }}>
                  {articleExcerpt(featuredArticle, isFr)}
                </p>
              </div>
            </div>
          </a>
        )}

        {error && (
          <div style={{ color: '#A78BFA', fontSize: 14, padding: '20px 0' }}>{error}</div>
        )}

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
      </div>
      <EditorialSection page={type === 'songs' ? 'songs' : 'albums'} />
      <Footer />
    </div>
  );
}

export default function TrendingPage({ type, initialItems, initialKey, initialArticles }: Props) {
  return (
    <Suspense fallback={<div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }} />}>
      <TrendingContent type={type} initialItems={initialItems} initialKey={initialKey} initialArticles={initialArticles} />
    </Suspense>
  );
}
