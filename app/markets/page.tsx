import type { Metadata } from 'next';
import MarketsPage from '../../components/MarketsPage';

export const metadata: Metadata = {
  title: 'Music market guide — TrendSongs',
  description: "What the Apple Music charts of 16 major markets reveal, from the United States to Japan, and how the main genres travel from one country to the next.",
  alternates: { canonical: 'https://trend-songs.com/markets/' },
  openGraph: {
    type: 'article',
    url: 'https://trend-songs.com/markets/',
    title: 'Music market guide — TrendSongs',
    description: "What the Apple Music charts of 16 major markets reveal, and how the main genres travel from one country to the next.",
    siteName: 'TrendSongs',
  },
};

export default function Markets() {
  return <MarketsPage />;
}
