import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
import { formatWeekRange, truncate } from '../utils/week';
import type { WeeklyReport } from '../types';

export default function WeeklyIndexPage({ reports }: { reports: WeeklyReport[] }) {
  return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 16px 80px' }}>

        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'inline-block', backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 20, padding: '4px 14px', fontSize: 11, fontWeight: 700, color: '#A78BFA', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>
            Weekly reports
          </div>
          <h1 style={{ color: '#fff', fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 900, lineHeight: 1.2, marginBottom: 12 }}>
            How the Apple Music charts moved, week by week
          </h1>
          <p style={{ color: '#888', fontSize: 14, lineHeight: 1.8, margin: 0 }}>
            Every Monday we measure how much of each country chart was replaced over the previous seven days,
            which markets moved fastest, and which titles held on. These figures come from our own daily archive —
            Apple publishes the chart of the moment, never its history.
          </p>
          <div style={{ height: 2, background: 'linear-gradient(90deg,#7C3AED,#EC4899)', borderRadius: 1, marginTop: 24 }} />
        </div>

        {reports.length === 0 ? (
          <p style={{ color: '#555', fontSize: 14, textAlign: 'center', padding: '60px 0' }}>
            The first weekly report will be published on the next Monday.
          </p>
        ) : (
          <div style={{ display: 'grid', gap: 12 }}>
            {reports.map(r => (
              <Link
                prefetch={false}
                key={r.slug}
                href={`/weekly/${r.slug}/`}
                style={{ display: 'block', backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 12, padding: '18px 20px', textDecoration: 'none' }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                  <span style={{ color: '#fff', fontSize: 15, fontWeight: 800 }}>
                    {formatWeekRange(r.weekStart, r.weekEnd)}
                  </span>
                  <span style={{ color: '#A78BFA', fontSize: 12, fontWeight: 700 }}>
                    {r.churnAvg}% turnover
                  </span>
                  {r.daysCovered < 7 && (
                    <span style={{ color: '#666', fontSize: 11, fontWeight: 600 }}>
                      {r.daysCovered} days of readings
                    </span>
                  )}
                </div>
                <p style={{ color: '#AAAAAA', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                  {truncate(r.headline, 150)}
                </p>
              </Link>
            ))}
          </div>
        )}

      </div>
      <Footer />
    </div>
  );
}
