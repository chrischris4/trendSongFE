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
  if (!g) return { title: 'Page not found', robots: { index: false, follow: false } };

  // Le classement filtre le top 100 de DEFAULT_COUNTRY : un genre absent de ce
  // top rend une page vide, qui ne doit pas partir au crawl.
  const items = await getTrendingItems('songs', DEFAULT_COUNTRY, 100);
  const hasResults = items.some(item => item.genreIds.includes(g.id));

  return {
    // Libelle anglais : la page est servie et indexee en anglais.
    title: `Trending ${g.labelEn} songs — Today's chart`,
    description: `The most played ${g.labelEn} tracks on Apple Music right now, with audio previews. Updated every day.`,
    robots: { index: hasResults && Boolean(genreInsights[genre]), follow: true },
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
