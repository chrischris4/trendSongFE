export const runtime = 'edge';

import ClientOnly from '../../../components/ClientOnly';
import DetailPage from '../../../components/DetailPage';
import TrackTrajectory, { isIndexable } from '../../../components/TrackTrajectory';
import { getTrackHistory } from '../../../services/serverApi';
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
  const history = await getTrackHistory(parseIdFromSlug(slug));
  // Le nom reconstruit depuis le slug est approximatif : on prefere celui de l'API.
  const name = history?.name ?? nameFromSlug(slug);
  const artist = history?.artistName;

  return {
    title: artist ? `${name} — ${artist} : parcours dans les classements` : `${name} - Extrait audio et classements par pays`,
    description: history
      ? `${name} de ${artist} : ${history.daysOnChart} jours de présence, ${history.countryCount} pays, meilleure place ${history.peak.rank}e. Trajectoire relevée jour par jour sur les classements Apple Music.`
      : `Écoutez l'extrait de « ${name} » et découvrez dans quels pays ce titre est classé au Top 100 Apple Music en ce moment.`,
    // Une fiche n'entre dans l'index que si sa trajectoire est assez fournie pour
    // apporter quelque chose : sinon elle n'est qu'un gabarit de plus.
    robots: { index: isIndexable(history), follow: true },
    alternates: { canonical: `https://trend-songs.com/songs/${slug}` },
  };
}

export default async function SongDetailPage({ params }: Props) {
  const { slug } = await params;
  const appleId = parseIdFromSlug(slug);
  const history = await getTrackHistory(appleId);

  return (
    <>
      <ClientOnly><DetailPage type="songs" id={appleId} /></ClientOnly>
      {/* Hors ClientOnly : c'est la partie que le crawler doit voir. */}
      {history && <TrackTrajectory history={history} />}
    </>
  );
}
