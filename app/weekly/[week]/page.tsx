import { notFound } from 'next/navigation';
import WeeklyReportPage from '../../../components/WeeklyReportPage';
import { getWeeklyReport } from '../../../services/serverApi';
import { formatWeekRange } from '../../../utils/week';

export const runtime = 'edge';

interface Props {
  params: Promise<{ week: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { week } = await params;
  const report = await getWeeklyReport(week);
  if (!report) return { title: 'Weekly report not found', robots: { index: false, follow: true } };

  const range = formatWeekRange(report.weekStart, report.weekEnd);
  return {
    title: `Chart turnover: week of ${range}`,
    description: report.headline,
    alternates: { canonical: `https://trend-songs.com/weekly/${report.slug}/` },
    openGraph: { type: 'article', publishedTime: report.weekEnd },
  };
}

export default async function WeeklyReportRoute({ params }: Props) {
  const { week } = await params;
  const report = await getWeeklyReport(week);
  // Une semaine sans bilan n'existe pas : mieux vaut un 404 franc qu'une page
  // vide que Google indexerait.
  if (!report) notFound();

  return <WeeklyReportPage report={report} />;
}
