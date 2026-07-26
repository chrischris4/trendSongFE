import { Suspense } from 'react';
import HomeContent from '../components/HomeContent';
import { getBlogArticles, getTrendingItems } from '../services/serverApi';
import { DEFAULT_COUNTRY, findCountry } from '../constants/config';

export const runtime = 'edge';
// Le classement change chaque jour et le cron publie un article par jour :
// la page doit être recalculée à chaque requête, pas figée au build.
export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<{ type?: string; country?: string }>;
}

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;
  const mediaType = params.type === 'albums' ? 'albums' : 'songs';
  const country = findCountry(params.country)?.code ?? DEFAULT_COUNTRY;

  const [initialItems, initialArticles] = await Promise.all([
    getTrendingItems(mediaType, country, 100),
    getBlogArticles(),
  ]);

  return (
    <Suspense fallback={<div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }} />}>
      <HomeContent
        initialItems={initialItems}
        initialKey={`${mediaType}:${country}`}
        initialArticles={initialArticles}
      />
    </Suspense>
  );
}
