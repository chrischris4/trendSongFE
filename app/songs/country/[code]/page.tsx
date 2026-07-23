export const runtime = 'edge';

import ClientOnly from '../../../../components/ClientOnly';
import CountryPage from '../../../../components/CountryPage';
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
  return <ClientOnly><CountryPage code={code} type="songs" /></ClientOnly>;
}
