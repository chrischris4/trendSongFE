'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
import { useStats } from '../hooks/useStats';
import { MUSIC_GENRES, genreLabel } from '../constants/config';
import { slugify } from '../utils/slug';
import type { GenreStat } from '../types';

function Bar({ pct, color = 'linear-gradient(90deg,#7C3AED,#EC4899)' }: { pct: number; color?: string }) {
  return (
    <div style={{ height: 5, backgroundColor: '#1A1A1A', borderRadius: 3, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 3, transition: 'width 600ms ease' }} />
    </div>
  );
}

function GenreBar({ count, pct, label }: Pick<GenreStat, 'count' | 'pct'> & { label: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12 }}>
        <span style={{ color: '#ddd', fontWeight: 600 }}>{label}</span>
        <span style={{ color: '#888' }}>{count} · {pct}%</span>
      </div>
      <Bar pct={pct} />
    </div>
  );
}

function StatCard({ value, label, sub }: { value: string | number; label: string; sub?: string }) {
  return (
    <div style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 10, padding: '20px 18px', textAlign: 'center' }}>
      <div style={{ fontSize: 28, fontWeight: 900, background: 'linear-gradient(90deg,#7C3AED,#EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 4 }}>
        {value}
      </div>
      <div style={{ fontSize: 12, color: '#AAAAAA' }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: '#555', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

export default function StatsPage() {
  const { t, i18n } = useTranslation();
  const { stats, loading, error } = useStats();

  const resolveGenre = (genreId: string, fallback: string) => {
    const def = MUSIC_GENRES.find(g => g.id === genreId);
    return def ? genreLabel(def, i18n.language) : fallback;
  };

  const cardStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 12,
    backgroundColor: '#141414', border: '1px solid #2A2A2A',
    borderRadius: 8, padding: '10px 14px', textDecoration: 'none', transition: 'border-color 150ms',
  };

  return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 16px 64px' }}>
        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{t('stats.title')}</h1>
        <p style={{ color: '#888', fontSize: 13, marginBottom: 32, lineHeight: 1.6 }}>{t('stats.subtitle')}</p>

        {error && <p style={{ color: '#A78BFA', fontSize: 14 }}>{error}</p>}

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 40 }}>
            {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton" style={{ height: 100, borderRadius: 10 }} />)}
          </div>
        ) : stats ? (
          <>
            {/* Counters */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 40 }}>
              <StatCard value={stats.songs} label={t('stats.total_songs')} />
              <StatCard value={stats.albums} label={t('stats.total_albums')} />
              <StatCard value={stats.countries} label={t('stats.countries_label')} />
              <StatCard value={`+${stats.newToday}`} label={t('stats.new_today')} sub={t('stats.vs_yesterday')} />
            </div>

            {/* Global top songs & albums */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 24, marginBottom: 40 }}>
              {[
                { title: `🎵 ${t('stats.top_songs')}`, items: stats.topSongs, base: 'songs' },
                { title: `💿 ${t('stats.top_albums')}`,  items: stats.topAlbums,  base: 'albums' },
              ].map(({ title, items, base }) => (
                <div key={title}>
                  <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{title}</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {items.map((item, i) => (
                      <Link key={item.appleId} href={`/${base}/${slugify(item.name, item.appleId)}`} style={cardStyle}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#444'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = '#2A2A2A'}
                      >
                        <span style={{ fontWeight: 800, color: '#A78BFA', minWidth: 22, fontSize: 13 }}>#{i + 1}</span>
                        <span style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ display: 'block', fontWeight: 600, fontSize: 13, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</span>
                          <span style={{ display: 'block', fontSize: 11, color: '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.artistName}</span>
                        </span>
                        <span style={{ color: '#EC4899', fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap' }}>{item.countryCount} {t('stats.in_countries')}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Top genres */}
            {stats.topGenres?.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ color: '#fff', fontSize: 16, fontWeight: 800, marginBottom: 6 }}>{t('stats.top_genres')}</h2>
                <p style={{ color: '#555', fontSize: 12, marginBottom: 20 }}>{t('stats.top_genres_sub')}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {stats.topGenres.map(g => <GenreBar key={g.genreId} count={g.count} pct={g.pct} label={resolveGenre(g.genreId, g.name)} />)}
                </div>
              </div>
            )}

            {/* Top artists */}
            {stats.topArtists?.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ color: '#fff', fontSize: 16, fontWeight: 800, marginBottom: 6 }}>{t('stats.top_artists')}</h2>
                <p style={{ color: '#555', fontSize: 12, marginBottom: 20 }}>{t('stats.top_artists_sub')}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {stats.topArtists.map(({ artist, count, pct }) => (
                    <div key={artist}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12 }}>
                        <span style={{ color: '#ddd', fontWeight: 600 }}>{artist}</span>
                        <span style={{ color: '#888' }}>{count} {t('stats.entries')} · {pct}%</span>
                      </div>
                      <Bar pct={Math.min(100, pct * 4)} color="linear-gradient(90deg,#1d6fa4,#3ab0e8)" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Year distribution */}
            {stats.yearDistribution?.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ color: '#fff', fontSize: 16, fontWeight: 800, marginBottom: 6 }}>{t('stats.years_title')}</h2>
                <p style={{ color: '#555', fontSize: 12, marginBottom: 20 }}>{t('stats.years_sub')}</p>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 120, paddingTop: 20 }}>
                  {stats.yearDistribution.map(({ year, count, pct }) => (
                    <div key={year} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <span style={{ color: '#888', fontSize: 10 }}>{count}</span>
                      <div style={{ width: '100%', background: 'linear-gradient(180deg,#7C3AED,#EC4899)', borderRadius: '4px 4px 0 0', height: `${Math.max(8, pct * 1.8)}px`, transition: 'height 600ms ease' }} />
                      <span style={{ color: '#555', fontSize: 10, fontWeight: 600 }}>{year}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Last updated */}
            <p style={{ color: '#333', fontSize: 11, textAlign: 'center' }}>
              {t('stats.last_updated')} : {new Date(stats.lastUpdated).toLocaleDateString(i18n.language === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </>
        ) : null}
      </div>
      <Footer />
    </div>
  );
}
