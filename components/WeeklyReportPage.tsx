import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
import { artwork, findCountry } from '../constants/config';
import { formatWeekRange } from '../utils/week';
import { slugify } from '../utils/slug';
import type { WeeklyReport } from '../types';

const sec: React.CSSProperties = { marginBottom: 40 };
const h2: React.CSSProperties = { color: '#fff', fontSize: 18, fontWeight: 800, marginBottom: 12, lineHeight: 1.3 };
const body: React.CSSProperties = { color: '#AAAAAA', fontSize: 14, lineHeight: 1.8, margin: 0 };
const hl: React.CSSProperties = { color: '#fff', fontWeight: 600 };
const accent: React.CSSProperties = { color: '#A78BFA', fontWeight: 700 };

function countryName(code: string | null): string {
  if (!code) return '';
  const c = findCountry(code);
  return c ? `${c.flag} ${c.nameEn}` : code;
}

export default function WeeklyReportPage({ report }: { report: WeeklyReport }) {
  const delta = report.churnPrev === null ? null : report.churnAvg - report.churnPrev;

  return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 16px 80px' }}>

        <div style={{ marginBottom: 40 }}>
          <Link href="/weekly/" style={{ color: '#888', fontSize: 13, textDecoration: 'none' }}>← All weekly reports</Link>
          <h1 style={{ color: '#fff', fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 900, lineHeight: 1.2, margin: '16px 0 14px' }}>
            Chart turnover: week of {formatWeekRange(report.weekStart, report.weekEnd)}
          </h1>
          <p style={{ color: '#CCCCCC', fontSize: 15, lineHeight: 1.8 }}>{report.headline}</p>
          <div style={{ height: 2, background: 'linear-gradient(90deg,#7C3AED,#EC4899)', borderRadius: 1, marginTop: 24 }} />
        </div>

        <div style={sec}>
          <h2 style={h2}>How much the charts changed</h2>
          <p style={body}>
            Across the Apple Music charts we track, <span style={accent}>{report.churnAvg}%</span> of
            entries were replaced during the week — <span style={hl}>{report.newEntries.toLocaleString('en-US')}</span> new
            entries against <span style={hl}>{report.droppedOut.toLocaleString('en-US')}</span> exits.
            {delta !== null && (
              <> That is <span style={hl}>{Math.abs(delta)} points {delta > 0 ? 'above' : delta < 0 ? 'below' : 'level with'}</span> the previous week ({report.churnPrev}%).</>
            )}
            {' '}Each chart carried <span style={hl}>{report.uniqueArtists}</span> distinct artists on average.
          </p>
        </div>

        {report.mostStableCountry && report.mostVolatileCountry && (
          <div style={sec}>
            <h2 style={h2}>Steadiest and fastest markets</h2>
            <p style={body}>
              <span style={hl}>{countryName(report.mostStableCountry)}</span> held the most settled chart
              at <span style={accent}>{report.mostStableChurn}%</span> turnover, while{' '}
              <span style={hl}>{countryName(report.mostVolatileCountry)}</span> renewed{' '}
              <span style={accent}>{report.mostVolatileChurn}%</span> of its entries over the same seven days.
              Comparing markets this way requires a daily archive: a single day&apos;s chart cannot show it.
            </p>
          </div>
        )}

        {report.topGainerName && (
          <div style={sec}>
            <h2 style={h2}>Biggest climb of the week</h2>
            <p style={body}>
              <Link href={`/songs/${slugify(report.topGainerName, report.topGainerId ?? '')}/`} style={{ ...hl, textDecoration: 'none' }}>
                {report.topGainerName}
              </Link>
              {report.topGainerArtist && <> by <span style={hl}>{report.topGainerArtist}</span></>} gained{' '}
              <span style={accent}>{report.topGainerDelta} places</span> in a single day
              {report.topGainerCountry && <> on the {countryName(report.topGainerCountry)} chart</>}.
            </p>
          </div>
        )}

        {report.topTenureName && (
          <div style={sec}>
            <h2 style={h2}>Longest run on the charts</h2>
            <p style={body}>
              <Link href={`/songs/${slugify(report.topTenureName, report.topTenureId ?? '')}/`} style={{ ...hl, textDecoration: 'none' }}>
                {report.topTenureName}
              </Link>
              {report.topTenureArtist && <> by <span style={hl}>{report.topTenureArtist}</span></>} has held its
              place for <span style={accent}>{report.topTenureDays} consecutive days</span> — the most persistent
              entry in our archive this week.
            </p>
          </div>
        )}

        {report.items.length > 0 && (
          <div style={sec}>
            <h2 style={h2}>Charting in the most countries</h2>
            <p style={{ ...body, marginBottom: 16 }}>
              Apple publishes one chart per country and never their overlap. These are the titles that appeared
              in the largest number of them during the week.
            </p>
            <div style={{ display: 'grid', gap: 10 }}>
              {report.items.map(item => {
                const cover = artwork(item.artworkUrl, 120);
                return (
                  <Link
                    prefetch={false}
                    key={item.appleId}
                    href={`/${item.type}/${slugify(item.name, item.appleId)}/`}
                    style={{ display: 'flex', alignItems: 'center', gap: 14, backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 10, padding: 12, textDecoration: 'none' }}
                  >
                    <span style={{ color: '#A78BFA', fontWeight: 800, fontSize: 13, minWidth: 20 }}>#{item.position}</span>
                    {cover && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={cover} alt={item.name} loading="lazy" style={{ width: 52, height: 52, borderRadius: 6, objectFit: 'cover', flexShrink: 0, border: '1px solid #2A2A2A' }} />
                    )}
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ color: '#fff', fontSize: 14, fontWeight: 700, display: 'block' }}>{item.name}</span>
                      <span style={{ color: '#888', fontSize: 12 }}>{item.artistName}</span>
                    </span>
                    <span style={{ textAlign: 'right', flexShrink: 0 }}>
                      <span style={{ color: '#fff', fontSize: 15, fontWeight: 800, display: 'block' }}>{item.countryCount}</span>
                      <span style={{ color: '#666', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>countries</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div style={{ borderTop: '1px solid #222', paddingTop: 20 }}>
          <p style={{ color: '#666', fontSize: 12, lineHeight: 1.8, margin: 0 }}>
            Figures are frozen at publication and never recalculated, so this page always reflects the week it
            describes.
            {report.daysCovered < 7 && (
              <> This report covers <span style={{ color: '#888', fontWeight: 600 }}>{report.daysCovered} days</span> of
              readings rather than a full week — our daily archive started on 10 August 2026.</>
            )}
            {' '}See our <Link href="/methodology/" style={{ color: '#A78BFA' }}>methodology</Link> for how turnover is measured.
          </p>
        </div>

      </div>
      <Footer />
    </div>
  );
}
