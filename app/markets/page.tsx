import type { Metadata } from 'next';
import MarketsPage from '../../components/MarketsPage';

export const metadata: Metadata = {
  title: 'Guide des marchés musicaux — TrendSongs',
  description: "Ce que révèlent les charts Apple Music de 16 marchés majeurs, des États-Unis au Japon, et comment les grands genres circulent d'un pays à l'autre.",
  alternates: { canonical: 'https://trend-songs.com/markets/' },
  openGraph: {
    type: 'article',
    url: 'https://trend-songs.com/markets/',
    title: 'Guide des marchés musicaux — TrendSongs',
    description: "Ce que révèlent les charts Apple Music de 16 marchés majeurs, et comment les grands genres circulent d'un pays à l'autre.",
    siteName: 'TrendSongs',
  },
};

export default function Markets() {
  return <MarketsPage />;
}
