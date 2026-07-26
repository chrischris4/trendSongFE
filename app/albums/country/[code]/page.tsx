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
    title: `Top albums ${name} ${c?.flag ?? ''} — Classement Apple Music du jour`,
    description: `Les albums les plus écoutés en ce moment · ${name}. Top 100 Apple Music mis à jour chaque jour.`,
    robots: { index: Boolean(c), follow: true },
    alternates: { canonical: `https://trend-songs.com/albums/country/${code.toLowerCase()}` },
  };
}

export default async function AlbumCountryPage({ params }: Props) {
  const { code } = await params;
  const resolved = findCountry(code)?.code ?? 'US';
  const initialItems = await getTrendingItems('albums', resolved, 100);
  return <CountryPage code={code} type="albums" initialItems={initialItems} initialKey={`albums:${resolved}`} />;
}
