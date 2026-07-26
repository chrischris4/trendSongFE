export const runtime = 'edge';

import CountryPage from '../../../../components/CountryPage';
import { getTrendingItems } from '../../../../services/serverApi';
import { findCountry } from '../../../../constants/config';

interface Props { params: Promise<{ code: string }> }

export async function generateMetadata({ params }: Props) {
  const { code } = await params;
  const c = findCountry(code);
  const name = c ? c.name : code.toUpperCase();
  return {
    title: `Top titres ${name} ${c?.flag ?? ''} — Classement Apple Music du jour`,
    description: `Les titres les plus écoutés en ce moment · ${name}. Top 100 Apple Music mis à jour chaque jour, avec extraits audio et classements par pays.`,
    robots: { index: Boolean(c), follow: true },
    alternates: { canonical: `https://trend-songs.com/songs/country/${code.toLowerCase()}` },
  };
}

export default async function SongCountryPage({ params }: Props) {
  const { code } = await params;
  const resolved = findCountry(code)?.code ?? 'US';
  const initialItems = await getTrendingItems('songs', resolved, 100);
  return <CountryPage code={code} type="songs" initialItems={initialItems} initialKey={`songs:${resolved}`} />;
}
