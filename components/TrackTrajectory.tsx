'use client';

import { useTranslation } from 'react-i18next';
import { findCountry } from '../constants/config';
import type { TrackHistory } from '../types';

/**
 * Composant client, mais rendu cote serveur au premier passage : i18n s'initialise
 * en anglais, qui est la langue declaree par `<html lang="en">` et celle que Google
 * indexe. Les visiteurs francophones basculent apres le montage, comme partout
 * ailleurs. C'est la seule partie de la fiche que le crawler voit, le lecteur audio
 * et les classements interactifs restant sous ClientOnly.
 */
interface Props { history: TrackHistory }

// « la 1re place », mais « la 2e place » : le rang 1 s'accorde au feminin.
const ordinal = (rank: number, lang: string) =>
  lang === 'fr' ? (rank === 1 ? '1re' : `${rank}e`) : `#${rank}`;

export default function TrackTrajectory({ history }: Props) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'fr' ? 'fr' : 'en';
  const locale = lang === 'fr' ? 'fr-FR' : 'en-GB';

  const countryName = (code: string) => findCountry(code)?.name ?? code;
  const date = (day: string) =>
    new Date(day + 'T00:00:00Z').toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

  const stillCharting = history.countries.filter(c => c.currentRank !== null);
  const gone = history.countries.length - stillCharting.length;
  const best = history.countries[0];

  // Meilleur jour de la trajectoire, pour situer le pic dans le temps.
  const strongestDay = history.timeline.reduce(
    (a, b) => (b.countryCount > a.countryCount ? b : a),
    history.timeline[0],
  );

  const status = stillCharting.length > 0
    ? t('trajectory.still_charting', { date: date(history.lastSeen), count: stillCharting.length })
      + (gone > 0 ? t('trajectory.also_left', { count: gone }) : '')
      + '.'
    : t('trajectory.gone_all', { date: date(history.lastSeen) });

  return (
    <section style={{ maxWidth: 820, margin: '32px auto 0', padding: '0 16px 8px' }}>
      <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
        {t('trajectory.title')}
      </h2>

      <p style={{ color: '#AAAAAA', fontSize: 15, lineHeight: 1.8, marginBottom: 14 }}>
        {t(history.type === 'songs' ? 'trajectory.intro_songs' : 'trajectory.intro_albums', {
          firstSeen: date(history.firstSeen),
          days: history.daysOnChart,
          countries: history.countryCount,
          rank: ordinal(history.peak.rank, lang),
          country: countryName(history.peak.countryCode),
          peakDate: date(history.peak.day),
        })}{' '}
        {t('trajectory.source_note')}
      </p>

      <p style={{ color: '#AAAAAA', fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>
        {status}
        {strongestDay && t('trajectory.strongest_day', { date: date(strongestDay.day), count: strongestDay.countryCount })}
        {best && t('trajectory.best_country', { country: countryName(best.countryCode), days: best.days })}
      </p>

      <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{t('trajectory.table_title')}</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ color: '#777', textAlign: 'left' }}>
              <th style={{ padding: '8px 10px 8px 0', fontWeight: 600 }}>{t('trajectory.th_country')}</th>
              <th style={{ padding: '8px 10px', fontWeight: 600 }}>{t('trajectory.th_best')}</th>
              <th style={{ padding: '8px 10px', fontWeight: 600 }}>{t('trajectory.th_days')}</th>
              <th style={{ padding: '8px 0 8px 10px', fontWeight: 600 }}>{t('trajectory.th_current')}</th>
            </tr>
          </thead>
          <tbody>
            {history.countries.slice(0, 15).map(c => (
              <tr key={c.countryCode} style={{ borderTop: '1px solid #2A2A2A', color: '#CCCCCC' }}>
                <td style={{ padding: '8px 10px 8px 0' }}>{countryName(c.countryCode)}</td>
                <td style={{ padding: '8px 10px' }}>{ordinal(c.bestRank, lang)}</td>
                <td style={{ padding: '8px 10px' }}>{c.days}</td>
                <td style={{ padding: '8px 0 8px 10px', color: c.currentRank ? '#A78BFA' : '#666' }}>
                  {c.currentRank ? ordinal(c.currentRank, lang) : t('trajectory.out')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {history.countries.length > 15 && (
        <p style={{ color: '#666', fontSize: 13, marginTop: 8 }}>
          {t('trajectory.more_countries', { count: history.countries.length - 15 })}
        </p>
      )}
    </section>
  );
}
