'use client';
import Link from 'next/link';
import type { MusicType } from '../types';

interface Props {
  selected: MusicType;
  genreSlug: string | null;
  country: string | null;
}

export default function TypeFilter({ selected, genreSlug, country }: Props) {
  const base: React.CSSProperties = { borderRadius: 20, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', textDecoration: 'none', display: 'block', textAlign: 'center', transition: 'background-color 150ms', padding: '8px 20px' };
  const chipActive: React.CSSProperties = { ...base, backgroundColor: '#E8E8E8', color: '#1A1A1A' };
  const chip: React.CSSProperties = { ...base, backgroundColor: '#1A1A1A', color: '#AAAAAA' };

  function buildHref(type: MusicType) {
    const params = new URLSearchParams();
    if (type === 'albums') params.set('type', 'albums');
    if (genreSlug) params.set('genre', genreSlug);
    if (country) params.set('country', country);
    const qs = params.toString();
    return qs ? `/?${qs}` : '/';
  }

  return (
    <div className="type-filter" style={{ display: 'flex', gap: 8, padding: '8px 16px', backgroundColor: '#0F0F0F' }}>
      <Link href={buildHref('songs')} style={selected === 'songs' ? chipActive : chip} className={`type-filter-item ${selected !== 'songs' ? 'tab-hover' : ''}`}>
        Titres
      </Link>
      <Link href={buildHref('albums')} style={selected === 'albums' ? chipActive : chip} className={`type-filter-item ${selected !== 'albums' ? 'tab-hover' : ''}`}>
        Albums
      </Link>
    </div>
  );
}
