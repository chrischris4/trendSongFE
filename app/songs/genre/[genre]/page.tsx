export const runtime = 'edge';

import ClientOnly from '../../../../components/ClientOnly';
import GenrePage from '../../../../components/GenrePage';
import { MUSIC_GENRES } from '../../../../constants/config';

interface Props { params: Promise<{ genre: string }> }

export async function generateMetadata({ params }: Props) {
  const { genre } = await params;
  const g = MUSIC_GENRES.find(x => x.slug === genre);
  const label = g?.label ?? genre;
  return {
    title: `Titres ${label} en tendance — Classement du moment`,
    description: `Les morceaux ${label} les plus écoutés en ce moment sur Apple Music, avec extraits audio. Mis à jour chaque jour.`,
    robots: { index: Boolean(g), follow: true },
    alternates: { canonical: `https://trend-songs.com/songs/genre/${genre}` },
  };
}

export default async function SongGenrePage({ params }: Props) {
  const { genre } = await params;
  return <ClientOnly><GenrePage genre={genre} type="songs" /></ClientOnly>;
}
