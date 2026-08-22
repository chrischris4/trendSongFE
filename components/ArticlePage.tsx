'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import { fetchBlogArticle, fetchBlogArticles } from '../services/api';
import { useAppStore } from '../store';
import { artwork } from '../constants/config';
import { slugify } from '../utils/slug';
import type { BlogArticle, BlogArticleSummary } from '../types';
import {
  articleConclusion,
  articleIntro,
  articleTitle,
  formatLabel,
  heroItem,
  itemSectionText,
  itemSectionTitle,
} from '../utils/blog';

function formatStreams(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return `${n}`;
}

export default function ArticlePage({ id, initialArticle, initialOthers = [] }: { id: number; initialArticle?: BlogArticle | null; initialOthers?: BlogArticleSummary[] }) {
  const { t } = useTranslation();
  const { lang } = useAppStore();
  const isFr = lang === 'fr';
  // Le texte integral vient de /blog/:id, la liste n'en transporte plus.
  const [article, setArticle] = useState<BlogArticle | null>(initialArticle ?? null);
  const [others, setOthers] = useState<BlogArticleSummary[]>(initialOthers);
  const [loading, setLoading] = useState(!initialArticle);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialArticle) return;
    Promise.all([fetchBlogArticle(id), fetchBlogArticles()])
      .then(([full, list]) => {
        setArticle(full);
        setOthers(list.filter(a => a.id !== id).slice(0, 3));
      })
      .catch(() => setError('not found'))
      .finally(() => setLoading(false));
  }, [id, initialArticle]);

  if (loading) return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 16px' }}>
        <div className="skeleton" style={{ width: '70%', height: 28, borderRadius: 6, marginBottom: 16 }} />
        <div className="skeleton" style={{ width: 160, height: 160, borderRadius: 10, marginBottom: 20 }} />
        {[1, 2, 3, 4].map(i => <div key={i} className="skeleton" style={{ height: 13, borderRadius: 4, marginBottom: 8, width: `${95 - i * 8}%` }} />)}
      </div>
    </div>
  );

  if (error || !article) return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ padding: 60, textAlign: 'center', color: '#555' }}>
        <p style={{ marginBottom: 16 }}>{error ?? t('blog.no_articles')}</p>
        <Link href="/blog" style={{ color: '#A78BFA', fontWeight: 600, fontSize: 14 }}>← {t('blog.title')}</Link>
      </div>
    </div>
  );

  const title = articleTitle(article);
  const primary = heroItem(article);
  const artworkPath = primary?.artworkUrl ?? article.artworkUrl;
  const artworkUrl = artworkPath ? artwork(artworkPath, 400) : null;
  const artistName = primary?.artistName ?? article.artistName;
  const streamCount = primary?.streamCount ?? article.streamCount;
  const countryCount = primary?.countryCount ?? article.countryCount;
  const articleType = primary?.type ?? article.type;
  const intro = articleIntro(article);
  const conclusion = articleConclusion(article);
  const hasStructuredSections = article.items?.some(item =>
    Boolean(item.sectionTextEn || item.sectionTitleEn),
  ) || article.items?.length > 1;
  const articleUrl = `https://trend-songs.com/blog/${slugify(title, String(article.id))}`;
  const publishedAt = new Date(article.createdAt).toISOString();

  return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AnalysisNewsArticle',
          headline: title,
          datePublished: publishedAt,
          dateModified: publishedAt,
          mainEntityOfPage: articleUrl,
          author: { '@type': 'Organization', name: 'TrendSongs Editorial' },
          publisher: { '@type': 'Organization', name: 'TrendSongs', url: 'https://trend-songs.com' },
          ...(artworkUrl ? { image: artworkUrl } : {}),
        }) }}
      />
      <Header />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 16px 64px' }}>
        <Link href="/blog" style={{ color: '#888', fontSize: 13, textDecoration: 'none' }}>← {t('blog.title')}</Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '20px 0 10px' }}>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, background: 'linear-gradient(90deg,#7C3AED,#EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {formatLabel(article.format ?? 'SIMPLE', isFr)}
          </span>
          <span style={{ color: '#444', fontSize: 11 }}>·</span>
          <span style={{ fontSize: 11, color: '#555', textTransform: 'capitalize' }}>
            {new Date(article.createdAt).toLocaleDateString(isFr ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>

        <h1 style={{ color: '#fff', fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, lineHeight: 1.3, marginBottom: 6 }}>{title}</h1>
        {artistName && <p style={{ color: '#A78BFA', fontSize: 15, fontWeight: 600, marginBottom: 20 }}>{artistName}</p>}
        <p style={{ color: '#888', fontSize: 12, lineHeight: 1.6, margin: '-8px 0 20px' }}>
          {isFr ? 'Par la rédaction TrendSongs, à partir des classements Apple Music par pays.' : 'By the TrendSongs editorial team, using country-level Apple Music charts.'}{' '}
          <Link href="/methodology" style={{ color: '#A78BFA' }}>{isFr ? 'Notre méthodologie' : 'Our methodology'}</Link>
        </p>

        <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap' }}>
          {artworkUrl && !hasStructuredSections && (
            <img src={artworkUrl} alt={title} style={{ width: 160, aspectRatio: '1/1', objectFit: 'cover', borderRadius: 12, border: '1px solid #2A2A2A', flexShrink: 0 }} />
          )}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignContent: 'flex-start', flex: 1, minWidth: 200 }}>
            {streamCount != null && (
              <div style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 20, padding: '4px 14px', fontSize: 12, color: '#ddd', height: 'fit-content' }}>
                <span style={{ color: '#A78BFA', fontWeight: 700 }}>{formatStreams(Number(streamCount))}</span> {t('blog.streams')}
              </div>
            )}
            {countryCount != null && (
              <div style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 20, padding: '4px 14px', fontSize: 12, color: '#ddd', height: 'fit-content' }}>
                {t('blog.trending_in')} <span style={{ color: '#A78BFA', fontWeight: 700 }}>{countryCount}</span> {t('blog.countries')}
              </div>
            )}
            {articleType && (
              <div style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 20, padding: '4px 14px', fontSize: 12, color: '#ddd', height: 'fit-content' }}>
                {articleType === 'songs' ? t('card.song') : t('card.album')}
              </div>
            )}
          </div>
        </div>

        {hasStructuredSections ? (
          <div style={{ marginBottom: 40 }}>
            {intro && <p style={{ color: '#CCCCCC', fontSize: 15, lineHeight: 1.9, marginBottom: 28, whiteSpace: 'pre-line' }}>{intro}</p>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {article.items.map(item => {
                const itemArtwork = item.artworkUrl ? artwork(item.artworkUrl, 400) : null;
                const sectionTitle = itemSectionTitle(item);
                const sectionText = itemSectionText(item);
                return (
                  <section key={item.id ?? `${article.id}-${item.position}`} style={{ display: 'flex', gap: 18, alignItems: 'flex-start', padding: 18, backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 12, flexWrap: 'wrap' }}>
                    {itemArtwork && <img src={itemArtwork} alt={item.title} loading="lazy" style={{ width: 130, height: 130, objectFit: 'cover', borderRadius: 9, flexShrink: 0 }} />}
                    <div style={{ flex: 1, minWidth: 220 }}>
                      <span style={{ color: '#A78BFA', fontSize: 11, fontWeight: 800 }}>{String(item.position).padStart(2, '0')}</span>
                      <h2 style={{ color: '#fff', fontSize: 19, lineHeight: 1.35, margin: '5px 0 4px' }}>{sectionTitle}</h2>
                      {sectionTitle !== item.title && <p style={{ color: '#AAAAAA', fontSize: 13, fontWeight: 600, margin: '0 0 4px' }}>{item.title}</p>}
                      <p style={{ color: '#A78BFA', fontSize: 12, margin: '0 0 12px' }}>{item.artistName}</p>
                      {sectionText && <p style={{ color: '#CCCCCC', fontSize: 14, lineHeight: 1.8, margin: 0, whiteSpace: 'pre-line' }}>{sectionText}</p>}
                    </div>
                  </section>
                );
              })}
            </div>
            {conclusion && <p style={{ color: '#CCCCCC', fontSize: 15, lineHeight: 1.9, margin: '28px 0 0', whiteSpace: 'pre-line' }}>{conclusion}</p>}
          </div>
        ) : (
          <p style={{ color: '#CCCCCC', fontSize: 15, lineHeight: 1.9, marginBottom: 40, whiteSpace: 'pre-line' }}>
            {article.editorialEn}
          </p>
        )}

        {others.length > 0 && (
          <div style={{ borderTop: '1px solid #2A2A2A', paddingTop: 24 }}>
            <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{isFr ? 'Autres analyses' : 'More analyses'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {others.map(a => {
                const otherTitle = articleTitle(a);
                const otherArtwork = a.artworkUrl;
                return (
                  <Link prefetch={false} key={a.id} href={`/blog/${slugify(otherTitle, String(a.id))}`}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 10, padding: '10px 14px', textDecoration: 'none', transition: 'border-color 150ms' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#7C3AED')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A2A2A')}
                  >
                    {otherArtwork && <img src={artwork(otherArtwork, 200) ?? undefined} alt={otherTitle} style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />}
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ display: 'block', color: '#fff', fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{otherTitle}</span>
                      <span style={{ display: 'block', color: '#888', fontSize: 12 }}>{a.artistName}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
