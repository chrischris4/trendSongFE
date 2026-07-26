export const runtime = 'edge';

import GenrePage from '../../../../components/GenrePage';
import { getTrendingItems } from '../../../../services/serverApi';
import { DEFAULT_COUNTRY, MUSIC_GENRES } from '../../../../constants/config';
import { genreInsights } from '../../../../constants/insights';

interface Props { params: Promise<{ genre: string }> }

export async function generateMetadata({ params }: Props) {
  const { genre } = await params;
  const g = MUSIC_GENRES.find(x => x.slug === genre);
  const label = g?.label ?? genre;
  return {
    title: `Titres ${label} en tendance — Classement du moment`,
    description: `Les morceaux ${label} les plus écoutés en ce moment sur Apple Music, avec extraits audio. Mis à jour chaque jour.`,
    robots: { index: Boolean(g && genreInsights[genre]), follow: true },
    alternates: { canonical: `https://trend-songs.com/songs/genre/${genre}` },
  };
}

export default async function SongGenrePage({ params }: Props) {
  const { genre } = await params;
  const initialItems = await getTrendingItems('songs', DEFAULT_COUNTRY, 100);
  return <GenrePage genre={genre} type="songs" initialItems={initialItems} initialKey={`songs:${DEFAULT_COUNTRY}`} />;
}
