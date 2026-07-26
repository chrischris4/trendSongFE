import TrendingPage from '../../components/TrendingPage';
import { getBlogArticles, getTrendingItems } from '../../services/serverApi';
import { DEFAULT_COUNTRY } from '../../constants/config';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Titres en tendance',
  description: 'Les morceaux les plus écoutés en ce moment sur Apple Music, pays par pays.',
};

export default async function SongsPage() {
  const [initialItems, initialArticles] = await Promise.all([
    getTrendingItems('songs', DEFAULT_COUNTRY, 100),
    getBlogArticles(),
  ]);
  return (
    <TrendingPage
      type="songs"
      initialItems={initialItems}
      initialKey={`songs:${DEFAULT_COUNTRY}`}
      initialArticles={initialArticles}
    />
  );
}
