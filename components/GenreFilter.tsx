'use client';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import HScrollWithArrows from './HScrollWithArrows';
import { MUSIC_GENRES, genreLabel } from '../constants/config';
import type { MusicType } from '../types';

interface Props {
  mediaType: MusicType;
  selected: string | null;
  country: string | null;
}

export default function GenreFilter({ mediaType, selected, country }: Props) {
  const { t, i18n } = useTranslation();
  function genreHref(slug: string | null) {
    const params = new URLSearchParams();
    if (mediaType === 'albums') params.set('type', 'albums');
    if (slug) params.set('genre', slug);
    if (country) params.set('country', country);
    const qs = params.toString();
    return qs ? `/?${qs}` : '/';
  }

  const chipActive: React.CSSProperties = { padding: '6px 14px', borderRadius: 20, backgroundColor: '#E8E8E8', color: '#1A1A1A', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', textDecoration: 'none', display: 'inline-block' };
  const chip: React.CSSProperties = { padding: '6px 14px', borderRadius: 20, backgroundColor: '#1A1A1A', color: '#AAAAAA', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', textDecoration: 'none', display: 'inline-block', transition: 'background-color 150ms' };
  const sep: React.CSSProperties = { width: 1, height: 24, backgroundColor: '#2A2A2A', marginLeft: 10, flexShrink: 0 };
  const contentStyle: React.CSSProperties = { display: 'flex', gap: 8, padding: '8px 10px', alignItems: 'center' };
  const root: React.CSSProperties = { display: 'flex', alignItems: 'center', backgroundColor: '#0F0F0F' };

  const selectedGenre = selected ? MUSIC_GENRES.find(g => g.slug === selected) : null;
  const others = MUSIC_GENRES.filter(g => g.slug !== selected);

  return (
    <div className="genre-filter" style={root}>
      <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 12, flexShrink: 0 }}>
        {!selected ? (
          <span style={chipActive}>{t('filters.all')}</span>
        ) : (
          <Link href={genreHref(null)} style={chip} className="tab-hover">{t('filters.all')}</Link>
        )}
        <div style={sep} />
      </div>
      {selectedGenre && (
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <span style={{ ...chipActive, marginLeft: 8 }}>{genreLabel(selectedGenre, i18n.language)}</span>
          <div style={sep} />
        </div>
      )}
      <HScrollWithArrows contentContainerStyle={contentStyle}>
        {others.map(g => (
          <Link key={g.id} href={genreHref(g.slug)} style={chip} className="tab-hover">{genreLabel(g, i18n.language)}</Link>
        ))}
      </HScrollWithArrows>
    </div>
  );
}
