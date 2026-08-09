export const runtime = 'edge';

import { notFound } from 'next/navigation';
import GenrePage from '../../../../components/GenrePage';
import { getTrendingItems } from '../../../../services/serverApi';
import { DEFAULT_COUNTRY, MUSIC_GENRES } from '../../../../constants/config';
import { genreInsights } from '../../../../constants/insights';

interface Props { params: Promise<{ genre: string }> }

export async function generateMetadata({ params }: Props) {
  const { genre } = await params;
  const g = MUSIC_GENRES.find(x => x.slug === genre);
  if (!g) return { title: 'Page introuvable', robots: { index: false, follow: false } };
  return {
    title: `Titres ${g.label} en tendance — Classement du moment`,
    description: `Les morceaux ${g.label} les plus écoutés en ce moment sur Apple Music, avec extraits audio. Mis à jour chaque jour.`,
    robots: { index: Boolean(genreInsights[genre]), follow: true },
    alternates: { canonical: `https://trend-songs.com/songs/genre/${genre}` },
  };
}

export default async function SongGenrePage({ params }: Props) {
  const { genre } = await params;
  // Un slug inconnu renvoyait un 200 avec une coquille vide, donc un soft 404.
  if (!MUSIC_GENRES.some(x => x.slug === genre)) notFound();
  const initialItems = await getTrendingItems('songs', DEFAULT_COUNTRY, 100);
  return <GenrePage genre={genre} type="songs" initialItems={initialItems} initialKey={`songs:${DEFAULT_COUNTRY}`} />;
}
