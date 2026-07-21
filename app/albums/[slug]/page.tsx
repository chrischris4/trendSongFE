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
    title: `${name} - Album en tendance, titres et classements`,
    description: `Tracklist, extraits audio et classements par pays de l'album « ${name} », actuellement dans les charts Apple Music.`,
    // Fiches album : métadonnées Apple non enrichies, exclues de l'index pour
    // concentrer le crawl sur les classements et le contenu éditorial.
    robots: { index: false, follow: true },
  };
}

export default async function AlbumDetailPage({ params }: Props) {
  const { slug } = await params;
  return <ClientOnly><DetailPage type="albums" id={parseIdFromSlug(slug)} /></ClientOnly>;
}
