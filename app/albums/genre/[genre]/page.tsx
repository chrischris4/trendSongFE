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
    title: `Albums ${label} en tendance — Classement du moment`,
    description: `Les albums ${label} les plus écoutés en ce moment sur Apple Music. Mis à jour chaque jour.`,
  };
}

export default async function AlbumGenrePage({ params }: Props) {
  const { genre } = await params;
  return <ClientOnly><GenrePage genre={genre} type="albums" /></ClientOnly>;
}
