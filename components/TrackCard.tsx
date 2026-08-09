'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import type { TrendingItem } from '../types';
import { artwork } from '../constants/config';
import { slugify } from '../utils/slug';

interface Props { item: TrendingItem }

export default function TrackCard({ item }: Props) {
  const { t } = useTranslation();
  const artworkUrl = artwork(item.artworkUrl, 400);
  const mainGenre = item.genreNames[0] ?? null;

  const href = item.type === 'songs'
    ? `/songs/${slugify(item.name, item.appleId)}`
    : `/albums/${slugify(item.name, item.appleId)}`;

  return (
    <Link href={href} style={{ display: 'block', textDecoration: 'none' }}>
    <div style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 10, overflow: 'hidden', transition: 'border-color 160ms' }}
      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#444'}
      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#2A2A2A'}
    >
      <div style={{ position: 'relative', aspectRatio: '1/1', backgroundColor: '#1A1A1A' }}>
        {artworkUrl ? (
          <img src={artworkUrl} alt={item.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: 32 }}>
            {item.type === 'songs' ? '🎵' : '💿'}
          </div>
        )}
        {/* Rank badge */}
        <div style={{ position: 'absolute', top: 8, left: 8, background: 'linear-gradient(135deg,#7C3AED,#EC4899)', borderRadius: 6, padding: '2px 7px', fontSize: 11, fontWeight: 800, color: '#fff' }}>
          #{item.rank}
        </div>
        {/* Explicit badge */}
        {item.explicit && (
          <div style={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: 6, padding: '2px 7px', fontSize: 10, fontWeight: 700, color: '#AAAAAA', border: '1px solid #333' }}>
            E
          </div>
        )}
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.75) 100%)', pointerEvents: 'none' }} />
        {/* Type badge */}
        <div style={{ position: 'absolute', bottom: 8, left: 8 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
            backgroundColor: item.type === 'songs' ? 'rgba(124,58,237,0.25)' : 'rgba(236,72,153,0.25)',
            color: item.type === 'songs' ? '#C4B5FD' : '#F9A8D4',
            border: `1px solid ${item.type === 'songs' ? 'rgba(124,58,237,0.5)' : 'rgba(236,72,153,0.5)'}`,
          }}>
            {item.type === 'songs' ? t('card.song') : t('card.album')}
          </span>
        </div>
      </div>

      <div style={{ padding: '10px 12px 12px' }}>
        <div style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.3, color: '#fff', marginBottom: 3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }} title={item.name}>
          {item.name}
        </div>
        <div style={{ color: '#AAAAAA', fontSize: 12, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
          {item.artistName}
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 6 }}>
          {mainGenre && <span style={{ color: '#8B5CF6', fontSize: 11, fontWeight: 600 }}>{mainGenre}</span>}
          {item.releaseDate && <span style={{ color: '#555', fontSize: 11 }}>{item.releaseDate.substring(0, 4)}</span>}
          {/* Anciennete au classement : Apple affiche un rang, jamais une duree. */}
          {typeof item.daysOnChart === 'number' && item.daysOnChart > 0 && (
            <span style={{ color: '#777', fontSize: 11 }}>
              {t('card.days_on_chart', { count: item.daysOnChart })}
            </span>
          )}
        </div>
      </div>
    </div>
    </Link>
  );
}
