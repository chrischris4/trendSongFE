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
  if (!c) return { title: 'Page introuvable', robots: { index: false, follow: false } };
  const name = c.name;
  return {
    title: `Top titres ${name} ${c.flag} — Classement Apple Music du jour`,
    description: `Les titres les plus écoutés en ce moment · ${name}. Top 100 Apple Music mis à jour chaque jour, avec extraits audio et classements par pays.`,
    // Sans texte editorial propre, la page reste accessible mais hors index :
    // on ne soumet pas au crawl des pages purement templatees.
    robots: { index: Boolean(countryInsights[c.code]), follow: true },
    alternates: { canonical: `https://trend-songs.com/songs/country/${c.code.toLowerCase()}` },
  };
}

export default async function SongCountryPage({ params }: Props) {
  const { code } = await params;
  // Un code inconnu servait le classement americain sur une URL arbitraire,
  // donc du duplicate sur un nombre illimite d'adresses.
  const country = findCountry(code);
  if (!country) notFound();
  const initialItems = await getTrendingItems('songs', country.code, 100);
  return <CountryPage code={code} type="songs" initialItems={initialItems} initialKey={`songs:${country.code}`} />;
}
