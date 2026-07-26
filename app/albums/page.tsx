import TrendingPage from '../../components/TrendingPage';
import { getBlogArticles, getTrendingItems } from '../../services/serverApi';
import { DEFAULT_COUNTRY } from '../../constants/config';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Albums en tendance',
  description: 'Les albums les plus écoutés en ce moment sur Apple Music, pays par pays.',
};

export default async function AlbumsPage() {
  const [initialItems, initialArticles] = await Promise.all([
    getTrendingItems('albums', DEFAULT_COUNTRY, 100),
    getBlogArticles(),
  ]);
  return (
    <TrendingPage
      type="albums"
      initialItems={initialItems}
      initialKey={`albums:${DEFAULT_COUNTRY}`}
      initialArticles={initialArticles}
    />
  );
}
