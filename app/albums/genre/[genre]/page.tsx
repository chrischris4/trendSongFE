export const runtime = 'edge';

import GenrePage from '../../../../components/GenrePage';
import { getTrendingItems } from '../../../../services/serverApi';
import { DEFAULT_COUNTRY, MUSIC_GENRES } from '../../../../constants/config';

interface Props { params: Promise<{ genre: string }> }

export async function generateMetadata({ params }: Props) {
  const { genre } = await params;
  const g = MUSIC_GENRES.find(x => x.slug === genre);
  const label = g?.label ?? genre;
  return {
    title: `Albums ${label} en tendance — Classement du moment`,
    description: `Les albums ${label} les plus écoutés en ce moment sur Apple Music. Mis à jour chaque jour.`,
    robots: { index: Boolean(g), follow: true },
    alternates: { canonical: `https://trend-songs.com/albums/genre/${genre}` },
  };
}

export default async function AlbumGenrePage({ params }: Props) {
  const { genre } = await params;
  const initialItems = await getTrendingItems('albums', DEFAULT_COUNTRY, 100);
  return <GenrePage genre={genre} type="albums" initialItems={initialItems} initialKey={`albums:${DEFAULT_COUNTRY}`} />;
}
