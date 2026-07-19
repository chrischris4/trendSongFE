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
    title: `Top albums ${name} ${c?.flag ?? ''} — Classement Apple Music du jour`,
    description: `Les albums les plus écoutés en ce moment · ${name}. Top 100 Apple Music mis à jour chaque jour.`,
  };
}

export default async function AlbumCountryPage({ params }: Props) {
  const { code } = await params;
  return <ClientOnly><CountryPage code={code} type="albums" /></ClientOnly>;
}
