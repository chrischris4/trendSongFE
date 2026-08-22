'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
import HScrollWithArrows from './HScrollWithArrows';
import { useMediaDetail } from '../hooks/useMediaDetail';
import { artwork } from '../constants/config';
import type { MiniItem, AlbumTrack } from '../types/detail';
import type { MusicType } from '../types';
import { slugify } from '../utils/slug';

interface Props { type: MusicType; id: string }

function formatDuration(ms: number | null): string | null {
  if (!ms) return null;
  const totalSec = Math.round(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

export default function DetailPage({ type, id }: Props) {
  const { t } = useTranslation();
  const { detail, loading, error } = useMediaDetail(type, id);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);

  if (loading) return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 16px' }}>
        <div className="skeleton" style={{ width: '60%', height: 36, borderRadius: 6, marginBottom: 16 }} />
        <div className="skeleton" style={{ width: 280, height: 280, borderRadius: 12, marginBottom: 24 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 14, borderRadius: 4, width: `${80 - i * 10}%` }} />)}
        </div>
      </div>
    </div>
  );

  if (error || !detail) return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ padding: 60, textAlign: 'center', color: '#555' }}>{error ?? t('detail.not_found')}</div>
    </div>
  );

  const artworkBig = artwork(detail.artworkUrl, 600);
  const duration = formatDuration(detail.durationMs);

  const pill = (text: string, accent = false) => (
    <span key={text} style={{ backgroundColor: accent ? 'rgba(124,58,237,0.15)' : '#1A1A1A', border: `1px solid ${accent ? 'rgba(124,58,237,0.35)' : '#2A2A2A'}`, borderRadius: 20, padding: '4px 14px', fontSize: 12, color: accent ? '#C4B5FD' : '#AAAAAA', fontWeight: accent ? 700 : 400 }}>
      {text}
    </span>
  );

  return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />

      {artworkBig && (
        <div style={{ position: 'relative', width: '100%', height: 320, overflow: 'hidden' }}>
          <img src={artworkBig} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.25, filter: 'blur(30px)', transform: 'scale(1.2)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, #0F0F0F 100%)' }} />
        </div>
      )}

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: artworkBig ? '0 16px 64px' : '32px 16px 64px', marginTop: artworkBig ? -220 : 0, position: 'relative' }}>

        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', marginBottom: 36, flexWrap: 'wrap' }}>
          {artworkBig && (
            <img src={artworkBig} alt={detail.name} className="detail-poster" style={{ width: 240, height: 240, objectFit: 'cover', borderRadius: 12, flexShrink: 0, boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }} />
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
              <span style={{ background: 'linear-gradient(90deg,#7C3AED,#EC4899)', color: '#fff', borderRadius: 20, padding: '3px 12px', fontSize: 11, fontWeight: 700 }}>
                {type === 'songs' ? t('card.song') : t('card.album')}
              </span>
              {detail.explicit && <span style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 20, padding: '3px 12px', fontSize: 11, color: '#AAAAAA' }}>{t('detail.explicit')}</span>}
              {detail.genre && <span style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 20, padding: '3px 12px', fontSize: 11, color: '#AAAAAA' }}>{detail.genre}</span>}
            </div>

            <h1 style={{ color: '#fff', fontSize: 'clamp(22px, 4vw, 38px)', fontWeight: 900, lineHeight: 1.2, marginBottom: 6 }}>{detail.name}</h1>
            <p style={{ color: '#A78BFA', fontSize: 17, fontWeight: 700, marginBottom: 14 }}>{detail.artistName}</p>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18, alignItems: 'center' }}>
              {detail.releaseDate && <span style={{ color: '#AAAAAA', fontSize: 13 }}>{detail.releaseDate.substring(0, 10)}</span>}
              {duration && <><span style={{ color: '#555', fontSize: 13 }}>·</span><span style={{ color: '#AAAAAA', fontSize: 13 }}>{duration}</span></>}
              {detail.albumName && <><span style={{ color: '#555', fontSize: 13 }}>·</span><span style={{ color: '#AAAAAA', fontSize: 13 }}>{detail.albumName}</span></>}
              {detail.trackCount && type === 'albums' && <><span style={{ color: '#555', fontSize: 13 }}>·</span><span style={{ color: '#AAAAAA', fontSize: 13 }}>{detail.trackCount} {t('detail.track_count').toLowerCase()}</span></>}
            </div>

            {detail.previewUrl && (
              <div style={{ marginBottom: 16 }}>
                <p style={{ color: '#888', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{t('detail.preview')}</p>
                <audio controls preload="none" src={detail.previewUrl} style={{ width: '100%', maxWidth: 420 }} />
              </div>
            )}

            {detail.url && (
              <a href={detail.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: 'linear-gradient(90deg,#7C3AED,#EC4899)', color: '#fff', padding: '10px 22px', borderRadius: 24, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                {t('detail.listen_apple')}
              </a>
            )}
          </div>
        </div>

        {/* Album tracklist */}
        {detail.tracks.length > 0 && (
          <div style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 12, padding: '20px 24px', marginBottom: 28 }}>
            <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{t('detail.tracks_title')}</h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {detail.tracks.map((track: AlbumTrack, i: number) => (
                <div key={track.appleId} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0', borderTop: i > 0 ? '1px solid #1F1F1F' : 'none' }}>
                  <span style={{ color: '#555', fontSize: 12, fontWeight: 700, minWidth: 22, textAlign: 'right' }}>{track.trackNumber ?? i + 1}</span>
                  {track.previewUrl && (
                    <button
                      onClick={() => setPlayingTrack(playingTrack === track.appleId ? null : track.appleId)}
                      style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: playingTrack === track.appleId ? '#7C3AED' : '#1A1A1A', border: '1px solid #2A2A2A', color: '#fff', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}
                    >
                      {playingTrack === track.appleId ? '■' : '▶'}
                    </button>
                  )}
                  <span style={{ color: '#ddd', fontSize: 13, fontWeight: 600, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {track.name}
                    {track.explicit && <span style={{ color: '#555', fontSize: 10, marginLeft: 6, border: '1px solid #333', borderRadius: 3, padding: '0 4px' }}>E</span>}
                  </span>
                  <span style={{ color: '#555', fontSize: 12 }}>{formatDuration(track.durationMs)}</span>
                </div>
              ))}
            </div>
            {playingTrack && (
              <audio
                autoPlay
                controls
                src={detail.tracks.find(tr => tr.appleId === playingTrack)?.previewUrl ?? undefined}
                onEnded={() => setPlayingTrack(null)}
                style={{ width: '100%', marginTop: 14 }}
              />
            )}
          </div>
        )}

        {/* Chart positions by country */}
        {detail.chartPositions.length > 0 && (
          <div style={{ marginBottom: 36 }}>
            <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{t('detail.chart_positions')}</h2>
            <p style={{ color: '#555', fontSize: 12, marginBottom: 14 }}>{t('detail.chart_positions_sub')}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 10 }}>
              {detail.chartPositions.map(pos => (
                <Link prefetch={false} key={pos.countryCode} href={`/${type}/country/${pos.countryCode.toLowerCase()}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 8, padding: '10px 12px', textDecoration: 'none', transition: 'border-color 150ms' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#444'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = '#2A2A2A'}
                >
                  <span style={{ fontSize: 18 }}>{pos.flag}</span>
                  <span style={{ color: '#ddd', fontSize: 12, fontWeight: 600, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pos.name}</span>
                  <span style={{ color: '#A78BFA', fontWeight: 800, fontSize: 13 }}>#{pos.rank}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Info cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 36 }}>
          {[
            detail.albumName && type === 'songs' && { label: t('detail.album'), value: detail.albumName },
            detail.genre && { label: t('detail.genre_label'), value: detail.genre },
            detail.releaseDate && { label: t('detail.release'), value: detail.releaseDate.substring(0, 10) },
            duration && { label: t('detail.duration'), value: duration },
            detail.trackCount && type === 'albums' && { label: t('detail.track_count'), value: `${detail.trackCount}` },
            detail.price && detail.currency && { label: t('detail.price'), value: `${detail.price} ${detail.currency}` },
            detail.copyright && { label: t('detail.copyright'), value: detail.copyright },
          ].filter(Boolean).map((item: any) => (
            <div key={item.label} style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 8, padding: '14px 16px' }}>
              <div style={{ color: '#555', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>{item.label}</div>
              <div style={{ color: '#fff', fontSize: 14, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* More from artist */}
        {detail.moreFromArtist.length > 0 && (
          <div>
            <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 14 }}>
              {t('detail.more_from')} {detail.artistName}
            </h2>
            <HScrollWithArrows contentContainerStyle={{ gap: 12, paddingBottom: 8 }}>
              {detail.moreFromArtist.map((item: MiniItem) => (
                <Link prefetch={false} key={item.appleId} href={`/${item.type}/${slugify(item.name, item.appleId)}`} style={{ flexShrink: 0, width: 140, display: 'block' }}>
                  <div style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 8, overflow: 'hidden', transition: 'border-color 160ms' }}
                    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#444'}
                    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#2A2A2A'}
                  >
                    <div style={{ aspectRatio: '1/1', backgroundColor: '#1A1A1A', overflow: 'hidden' }}>
                      {item.artworkUrl
                        ? <img src={artwork(item.artworkUrl, 300) ?? undefined} alt={item.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: 24 }}>🎵</div>
                      }
                    </div>
                    <div style={{ padding: '8px 10px' }}>
                      <p style={{ color: '#fff', fontSize: 11, fontWeight: 600, lineHeight: 1.3, marginBottom: 2, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{item.name}</p>
                      <p style={{ color: '#555', fontSize: 10 }}>{item.artistName}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </HScrollWithArrows>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
