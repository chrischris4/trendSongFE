import TrendingPage from '../../components/TrendingPage';

export const metadata = {
  title: 'Titres en tendance',
  description: 'Les morceaux les plus écoutés en ce moment sur Apple Music, pays par pays.',
};

export default function SongsPage() {
  return <TrendingPage type="songs" />;
}
