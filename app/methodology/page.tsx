import type { Metadata } from 'next';
import MethodologyPage from '../../components/MethodologyPage';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Methodology and editorial standards',
  description: 'How TrendSongs collects Apple Music charts, calculates its global ranking and reviews editorial analysis.',
  alternates: { canonical: 'https://trend-songs.com/methodology' },
};

export default function Page() {
  return <MethodologyPage />;
}
