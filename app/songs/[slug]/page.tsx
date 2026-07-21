export const runtime = 'edge';

import ClientOnly from '../../../components/ClientOnly';
import DetailPage from '../../../components/DetailPage';
import { parseIdFromSlug } from '../../../utils/slug';

interface Props { params: Promise<{ slug: string }> }

function nameFromSlug(slug: string): string {
  return slug
    .replace(/-\d+$/, '')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const name = nameFromSlug(slug);
  return {
    title: `${name} - Extrait audio et classements par pays`,
    description: `Écoutez l'extrait de « ${name} » et découvrez dans quels pays ce titre est classé au Top 100 Apple Music en ce moment.`,
    // Fiches titre : métadonnées Apple non enrichies, exclues de l'index pour
    // concentrer le crawl sur les classements et le contenu éditorial.
    robots: { index: false, follow: true },
  };
}

export default async function SongDetailPage({ params }: Props) {
  const { slug } = await params;
  return <ClientOnly><DetailPage type="songs" id={parseIdFromSlug(slug)} /></ClientOnly>;
}
