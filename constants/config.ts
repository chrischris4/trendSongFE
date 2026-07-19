// Apple artwork URLs come as 100x100 — swap in the size we need.
export function artwork(url: string | null | undefined, size = 400): string | null {
  if (!url) return null;
  return url.replace(/\d+x\d+bb/, `${size}x${size}bb`);
}

export const MUSIC_GENRES = [
  { id: '14', slug: 'pop',         label: 'Pop',           emoji: '🎤' },
  { id: '18', slug: 'hip-hop',     label: 'Hip-Hop/Rap',   emoji: '🎧' },
  { id: '21', slug: 'rock',        label: 'Rock',          emoji: '🎸' },
  { id: '15', slug: 'rnb-soul',    label: 'R&B/Soul',      emoji: '💜' },
  { id: '6',  slug: 'country',     label: 'Country',       emoji: '🤠' },
  { id: '12', slug: 'latino',      label: 'Latino',        emoji: '💃' },
  { id: '7',  slug: 'electro',     label: 'Électro',       emoji: '🎛️' },
  { id: '17', slug: 'dance',       label: 'Dance',         emoji: '🪩' },
  { id: '20', slug: 'alternative', label: 'Alternative',   emoji: '🌀' },
  { id: '51', slug: 'k-pop',       label: 'K-Pop',         emoji: '⭐' },
  { id: '11', slug: 'jazz',        label: 'Jazz',          emoji: '🎷' },
  { id: '24', slug: 'reggae',      label: 'Reggae',        emoji: '🌴' },
] as const;

export type MusicGenre = typeof MUSIC_GENRES[number];

export const COUNTRIES = [
  { code: 'US', name: 'États-Unis',      flag: '🇺🇸' },
  { code: 'GB', name: 'Royaume-Uni',     flag: '🇬🇧' },
  { code: 'FR', name: 'France',          flag: '🇫🇷' },
  { code: 'DE', name: 'Allemagne',       flag: '🇩🇪' },
  { code: 'ES', name: 'Espagne',         flag: '🇪🇸' },
  { code: 'IT', name: 'Italie',          flag: '🇮🇹' },
  { code: 'PT', name: 'Portugal',        flag: '🇵🇹' },
  { code: 'NL', name: 'Pays-Bas',        flag: '🇳🇱' },
  { code: 'BE', name: 'Belgique',        flag: '🇧🇪' },
  { code: 'CH', name: 'Suisse',          flag: '🇨🇭' },
  { code: 'AT', name: 'Autriche',        flag: '🇦🇹' },
  { code: 'IE', name: 'Irlande',         flag: '🇮🇪' },
  { code: 'SE', name: 'Suède',           flag: '🇸🇪' },
  { code: 'NO', name: 'Norvège',         flag: '🇳🇴' },
  { code: 'DK', name: 'Danemark',        flag: '🇩🇰' },
  { code: 'FI', name: 'Finlande',        flag: '🇫🇮' },
  { code: 'PL', name: 'Pologne',         flag: '🇵🇱' },
  { code: 'CA', name: 'Canada',          flag: '🇨🇦' },
  { code: 'MX', name: 'Mexique',         flag: '🇲🇽' },
  { code: 'BR', name: 'Brésil',          flag: '🇧🇷' },
  { code: 'AR', name: 'Argentine',       flag: '🇦🇷' },
  { code: 'CL', name: 'Chili',           flag: '🇨🇱' },
  { code: 'CO', name: 'Colombie',        flag: '🇨🇴' },
  { code: 'AU', name: 'Australie',       flag: '🇦🇺' },
  { code: 'NZ', name: 'Nouvelle-Zélande', flag: '🇳🇿' },
  { code: 'JP', name: 'Japon',           flag: '🇯🇵' },
  { code: 'KR', name: 'Corée du Sud',    flag: '🇰🇷' },
  { code: 'IN', name: 'Inde',            flag: '🇮🇳' },
  { code: 'ID', name: 'Indonésie',       flag: '🇮🇩' },
  { code: 'TR', name: 'Turquie',         flag: '🇹🇷' },
  { code: 'SA', name: 'Arabie saoudite', flag: '🇸🇦' },
  { code: 'AE', name: 'Émirats arabes unis', flag: '🇦🇪' },
] as const;

export type CountryDef = typeof COUNTRIES[number];

export const DEFAULT_COUNTRY = 'US';

export function findCountry(code: string | null | undefined): CountryDef | null {
  if (!code) return null;
  return (COUNTRIES as readonly CountryDef[]).find(c => c.code === code.toUpperCase()) ?? null;
}
