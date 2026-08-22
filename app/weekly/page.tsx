import type { Metadata } from 'next';
import WeeklyIndexPage from '../../components/WeeklyIndexPage';
import { getWeeklyReports } from '../../services/serverApi';

export const runtime = 'edge';
// Un nouveau bilan parait chaque lundi : l'index doit le voir sans attendre un
// build. Les pages de bilan, elles, sont figees et ne bougent plus.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Weekly chart reports',
  description:
    'Every Monday: how much of the Apple Music charts was replaced over the past week, which markets moved fastest, and which titles held their place. Measured from our own daily archive.',
  alternates: { canonical: 'https://trend-songs.com/weekly/' },
};

export default async function WeeklyPage() {
  const reports = await getWeeklyReports();
  return <WeeklyIndexPage reports={reports} />;
}
