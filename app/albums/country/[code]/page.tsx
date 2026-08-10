export const runtime = 'edge';

import { notFound } from 'next/navigation';
import CountryPage from '../../../../components/CountryPage';
import { getTrendingItems } from '../../../../services/serverApi';
import { findCountry } from '../../../../constants/config';
import { countryInsights } from '../../../../constants/insights';

interface Props { params: Promise<{ code: string }> }

export async function generateMetadata({ params }: Props) {
  const { code } = await params;
  const c = findCountry(code);
  if (!c) return { title: 'Page not found', robots: { index: false, follow: false } };
  return {
    // Libelle anglais : la page est servie et indexee en anglais.
    title: `Top albums in ${c.nameEn} ${c.flag} — Today's Apple Music chart`,
    description: `The most played albums right now in ${c.nameEn}. Apple Music Top 100 updated every day.`,
    // Sans texte editorial propre, la page reste accessible mais hors index :
    // on ne soumet pas au crawl des pages purement templatees.
    robots: { index: Boolean(countryInsights[c.code]), follow: true },
    alternates: { canonical: `https://trend-songs.com/albums/country/${c.code.toLowerCase()}` },
  };
}

export default async function AlbumCountryPage({ params }: Props) {
  const { code } = await params;
  // Un code inconnu servait le classement americain sur une URL arbitraire,
  // donc du duplicate sur un nombre illimite d'adresses.
  const country = findCountry(code);
  if (!country) notFound();
  const initialItems = await getTrendingItems('albums', country.code, 100);
  return <CountryPage code={code} type="albums" initialItems={initialItems} initialKey={`albums:${country.code}`} />;
}
