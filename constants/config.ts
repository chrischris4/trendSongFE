// Apple artwork URLs come as 100x100 — swap in the size we need.
export function artwork(url: string | null | undefined, size = 400): string | null {
  if (!url) return null;
  return url.replace(/\d+x\d+bb/, `${size}x${size}bb`);
}

export const MUSIC_GENRES = [
  { id: '14', slug: 'pop',         label: 'Pop',           labelEn: 'Pop',         emoji: '🎤' },
  { id: '18', slug: 'hip-hop',     label: 'Hip-Hop/Rap',   labelEn: 'Hip-Hop/Rap', emoji: '🎧' },
  { id: '21', slug: 'rock',        label: 'Rock',          labelEn: 'Rock',        emoji: '🎸' },
  { id: '15', slug: 'rnb-soul',    label: 'R&B/Soul',      labelEn: 'R&B/Soul',    emoji: '💜' },
  { id: '6',  slug: 'country',     label: 'Country',       labelEn: 'Country',     emoji: '🤠' },
  { id: '12', slug: 'latino',      label: 'Latino',        labelEn: 'Latin',       emoji: '💃' },
  { id: '7',  slug: 'electro',     label: 'Électro',       labelEn: 'Electronic',  emoji: '🎛️' },
  { id: '17', slug: 'dance',       label: 'Dance',         labelEn: 'Dance',       emoji: '🪩' },
  { id: '20', slug: 'alternative', label: 'Alternative',   labelEn: 'Alternative', emoji: '🌀' },
  { id: '51', slug: 'k-pop',       label: 'K-Pop',         labelEn: 'K-Pop',       emoji: '⭐' },
  { id: '11', slug: 'jazz',        label: 'Jazz',          labelEn: 'Jazz',        emoji: '🎷' },
  { id: '24', slug: 'reggae',      label: 'Reggae',        labelEn: 'Reggae',      emoji: '🌴' },
] as const;

export type MusicGenre = typeof MUSIC_GENRES[number];

export function genreLabel(g: { label: string; labelEn: string }, lang: string): string {
  return lang === 'fr' ? g.label : g.labelEn;
}

export const COUNTRIES = [
  { code: 'US', name: 'États-Unis',      nameEn: 'United States',        flag: '🇺🇸' },
  { code: 'GB', name: 'Royaume-Uni',     nameEn: 'United Kingdom',       flag: '🇬🇧' },
  { code: 'FR', name: 'France',          nameEn: 'France',               flag: '🇫🇷' },
  { code: 'DE', name: 'Allemagne',       nameEn: 'Germany',              flag: '🇩🇪' },
  { code: 'ES', name: 'Espagne',         nameEn: 'Spain',                flag: '🇪🇸' },
  { code: 'IT', name: 'Italie',          nameEn: 'Italy',                flag: '🇮🇹' },
  { code: 'PT', name: 'Portugal',        nameEn: 'Portugal',             flag: '🇵🇹' },
  { code: 'NL', name: 'Pays-Bas',        nameEn: 'Netherlands',          flag: '🇳🇱' },
  { code: 'BE', name: 'Belgique',        nameEn: 'Belgium',              flag: '🇧🇪' },
  { code: 'CH', name: 'Suisse',          nameEn: 'Switzerland',          flag: '🇨🇭' },
  { code: 'AT', name: 'Autriche',        nameEn: 'Austria',              flag: '🇦🇹' },
  { code: 'IE', name: 'Irlande',         nameEn: 'Ireland',              flag: '🇮🇪' },
  { code: 'SE', name: 'Suède',           nameEn: 'Sweden',               flag: '🇸🇪' },
  { code: 'NO', name: 'Norvège',         nameEn: 'Norway',               flag: '🇳🇴' },
  { code: 'DK', name: 'Danemark',        nameEn: 'Denmark',              flag: '🇩🇰' },
  { code: 'FI', name: 'Finlande',        nameEn: 'Finland',              flag: '🇫🇮' },
  { code: 'PL', name: 'Pologne',         nameEn: 'Poland',               flag: '🇵🇱' },
  { code: 'CA', name: 'Canada',          nameEn: 'Canada',               flag: '🇨🇦' },
  { code: 'MX', name: 'Mexique',         nameEn: 'Mexico',               flag: '🇲🇽' },
  { code: 'BR', name: 'Brésil',          nameEn: 'Brazil',               flag: '🇧🇷' },
  { code: 'AR', name: 'Argentine',       nameEn: 'Argentina',            flag: '🇦🇷' },
  { code: 'CL', name: 'Chili',           nameEn: 'Chile',                flag: '🇨🇱' },
  { code: 'CO', name: 'Colombie',        nameEn: 'Colombia',             flag: '🇨🇴' },
  { code: 'AU', name: 'Australie',       nameEn: 'Australia',            flag: '🇦🇺' },
  { code: 'NZ', name: 'Nouvelle-Zélande', nameEn: 'New Zealand',         flag: '🇳🇿' },
  { code: 'JP', name: 'Japon',           nameEn: 'Japan',                flag: '🇯🇵' },
  { code: 'KR', name: 'Corée du Sud',    nameEn: 'South Korea',          flag: '🇰🇷' },
  { code: 'IN', name: 'Inde',            nameEn: 'India',                flag: '🇮🇳' },
  { code: 'ID', name: 'Indonésie',       nameEn: 'Indonesia',            flag: '🇮🇩' },
  { code: 'TR', name: 'Turquie',         nameEn: 'Turkey',               flag: '🇹🇷' },
  { code: 'SA', name: 'Arabie saoudite', nameEn: 'Saudi Arabia',         flag: '🇸🇦' },
  { code: 'AE', name: 'Émirats arabes unis', nameEn: 'United Arab Emirates', flag: '🇦🇪' },
] as const;

export type CountryDef = typeof COUNTRIES[number];

export const DEFAULT_COUNTRY = 'US';

export function findCountry(code: string | null | undefined): CountryDef | null {
  if (!code) return null;
  return (COUNTRIES as readonly CountryDef[]).find(c => c.code === code.toUpperCase()) ?? null;
}

export function countryLabel(c: CountryDef, lang: string): string {
  return lang === 'fr' ? c.name : c.nameEn;
}
