import TrendingPage from '../../components/TrendingPage';
import { getBlogArticles, getTrendingItems } from '../../services/serverApi';
import { DEFAULT_COUNTRY } from '../../constants/config';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Trending songs',
  description: 'The most played tracks on Apple Music right now, country by country.',
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
