import Link from 'next/link';
import { formatWeekRange, truncate } from '../utils/week';
import type { WeeklyReport } from '../types';

// Composant serveur : l'accroche du bilan doit se trouver dans le HTML envoye
// au crawler, pas etre chargee apres coup comme l'etait l'ancienne page
// /weekly rendue cote client.
export default function WeeklyTeaser({ report }: { report: WeeklyReport | null }) {
  if (!report) return null;

  const trend =
    report.churnPrev === null
      ? null
      : report.churnAvg > report.churnPrev
        ? { label: 'faster', color: '#F472B6' }
        : report.churnAvg < report.churnPrev
          ? { label: 'slower', color: '#4ADE80' }
          : { label: 'steady', color: '#888' };

  const figure: React.CSSProperties = { color: '#fff', fontSize: 22, fontWeight: 800, lineHeight: 1.1 };
  const caption: React.CSSProperties = { color: '#777', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 4 };

  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 16px 0' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <h2 style={{ color: '#fff', fontSize: 18, fontWeight: 800, margin: 0 }}>Last week in the charts</h2>
        <Link href="/weekly/" style={{ color: '#A78BFA', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
          All weekly reports →
        </Link>
      </div>

      <Link
        href={`/weekly/${report.slug}/`}
        style={{ display: 'block', textDecoration: 'none', backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 12, padding: '20px 22px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
          <span style={{ backgroundColor: '#1F1F1F', border: '1px solid #2A2A2A', borderRadius: 20, padding: '3px 12px', fontSize: 11, fontWeight: 700, color: '#A78BFA', letterSpacing: 0.8, textTransform: 'uppercase' }}>
            Week {formatWeekRange(report.weekStart, report.weekEnd)}
          </span>
          {trend && (
            <span style={{ color: trend.color, fontSize: 12, fontWeight: 700 }}>
              turnover {trend.label}
            </span>
          )}
        </div>

        <p style={{ color: '#CCCCCC', fontSize: 15, lineHeight: 1.75, margin: '0 0 18px' }}>
          {truncate(report.headline)}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 16, borderTop: '1px solid #222', paddingTop: 16 }}>
          <div>
            <div style={figure}>{report.churnAvg}%</div>
            <div style={caption}>chart turnover</div>
          </div>
          <div>
            <div style={figure}>{report.newEntries.toLocaleString('en-US')}</div>
            <div style={caption}>new entries</div>
          </div>
          {report.topGainerDelta !== null && (
            <div>
              <div style={figure}>+{report.topGainerDelta}</div>
              <div style={caption}>biggest climb</div>
            </div>
          )}
          {report.topTenureDays !== null && (
            <div>
              <div style={figure}>{report.topTenureDays}d</div>
              <div style={caption}>longest run</div>
            </div>
          )}
        </div>

        <span style={{ display: 'inline-block', marginTop: 16, color: '#A78BFA', fontSize: 13, fontWeight: 600 }}>
          Read the full report →
        </span>
      </Link>
    </section>
  );
}
