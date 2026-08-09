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

  // Le classement filtre le top 100 de DEFAULT_COUNTRY : un genre absent de ce
  // top rend une page vide, qui ne doit pas partir au crawl.
  const items = await getTrendingItems('albums', DEFAULT_COUNTRY, 100);
  const hasResults = items.some(item => item.genreIds.includes(g.id));

  return {
    title: `Albums ${g.label} en tendance — Classement du moment`,
    description: `Les albums ${g.label} les plus écoutés en ce moment sur Apple Music. Mis à jour chaque jour.`,
    robots: { index: hasResults && Boolean(genreInsights[genre]), follow: true },
    alternates: { canonical: `https://trend-songs.com/albums/genre/${genre}` },
  };
}

export default async function AlbumGenrePage({ params }: Props) {
  const { genre } = await params;
  // Un slug inconnu renvoyait un 200 avec une coquille vide, donc un soft 404.
  if (!MUSIC_GENRES.some(x => x.slug === genre)) notFound();
  const initialItems = await getTrendingItems('albums', DEFAULT_COUNTRY, 100);
  return <GenrePage genre={genre} type="albums" initialItems={initialItems} initialKey={`albums:${DEFAULT_COUNTRY}`} />;
}
