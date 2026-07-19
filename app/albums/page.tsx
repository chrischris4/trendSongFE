import TrendingPage from '../../components/TrendingPage';

export const metadata = {
  title: 'Albums en tendance',
  description: 'Les albums les plus écoutés en ce moment sur Apple Music, pays par pays.',
};

export default function AlbumsPage() {
  return <TrendingPage type="albums" />;
}
