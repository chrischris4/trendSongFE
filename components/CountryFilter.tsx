'use client';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import HScrollWithArrows from './HScrollWithArrows';
import { COUNTRIES, DEFAULT_COUNTRY, countryLabel } from '../constants/config';
import type { MusicType } from '../types';

interface Props {
  mediaType: MusicType;
  genreSlug: string | null;
  selected: string; // country code
}

export default function CountryFilter({ mediaType, genreSlug, selected }: Props) {
  const { i18n } = useTranslation();
  function countryHref(code: string) {
    const params = new URLSearchParams();
    if (mediaType === 'albums') params.set('type', 'albums');
    if (genreSlug) params.set('genre', genreSlug);
    if (code !== DEFAULT_COUNTRY) params.set('country', code);
    const qs = params.toString();
    return qs ? `/?${qs}` : '/';
  }

  const chipActive: React.CSSProperties = { padding: '6px 14px', borderRadius: 20, backgroundColor: '#E8E8E8', color: '#1A1A1A', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', textDecoration: 'none', display: 'inline-block' };
  const chip: React.CSSProperties = { padding: '6px 14px', borderRadius: 20, backgroundColor: '#1A1A1A', color: '#AAAAAA', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', textDecoration: 'none', display: 'inline-block', transition: 'background-color 150ms' };
  const contentStyle: React.CSSProperties = { display: 'flex', gap: 8, padding: '8px 10px', alignItems: 'center' };

  const selectedCountry = COUNTRIES.find(c => c.code === selected) ?? COUNTRIES[0];
  const others = COUNTRIES.filter(c => c.code !== selectedCountry.code);

  return (
    <div className="country-filter" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#0F0F0F' }}>
      <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 12, flexShrink: 0 }}>
        <span style={chipActive}>{selectedCountry.flag} {countryLabel(selectedCountry, i18n.language)}</span>
        <div style={{ width: 1, height: 24, backgroundColor: '#2A2A2A', marginLeft: 10, flexShrink: 0 }} />
      </div>
      <HScrollWithArrows contentContainerStyle={contentStyle}>
        {others.map(c => (
          <Link prefetch={false} key={c.code} href={countryHref(c.code)} style={chip} className="tab-hover">
            {c.flag} {countryLabel(c, i18n.language)}
          </Link>
        ))}
      </HScrollWithArrows>
    </div>
  );
}
