export const runtime = 'edge';

import ClientOnly from '../../../components/ClientOnly';
import DetailPage from '../../../components/DetailPage';
import TrackTrajectory from '../../../components/TrackTrajectory';
import { isIndexable } from '../../../utils/trajectory';
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
    // Metadonnees en anglais, comme `<html lang="en">` et le corps de la page.
    title: artist ? `${name} — ${artist}: chart trajectory` : `${name} - Audio preview and country rankings`,
    description: history
      ? `${name} by ${artist}: ${history.daysOnChart} days on the charts, ${history.countryCount} countries, best position #${history.peak.rank}. Trajectory recorded day by day from the Apple Music charts.`
      : `Listen to the preview of "${name}" and see which countries currently have this track in the Apple Music Top 100.`,
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
