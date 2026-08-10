import { findCountry } from '../constants/config';
import type { TrackHistory } from '../types';

/**
 * Rendu serveur volontaire : c'est la seule partie de la fiche que le crawler
 * doit voir, et la seule qui n'existe pas a la source. Le lecteur audio et les
 * classements interactifs restent cote client.
 */
interface Props { history: TrackHistory }

/**
 * En dessous, la trajectoire est trop courte pour justifier une page indexee.
 *
 * La retention a 90 jours n'ayant jamais ete deployee avant le 10/08/2026,
 * l'historique repart d'environ une semaine et se reconstitue au fil des
 * synchronisations. Le seuil de 14 jours fait donc office de minuterie : les
 * fiches s'ouvrent d'elles-memes quand l'archive devient assez profonde, et
 * rien ne part au crawl tant qu'elle ne l'est pas.
 */
export const MIN_DAYS_TO_INDEX = 14;
export const MIN_COUNTRIES_TO_INDEX = 3;

export function isIndexable(history: TrackHistory | null): boolean {
  if (!history) return false;
  return history.daysOnChart >= MIN_DAYS_TO_INDEX && history.countryCount >= MIN_COUNTRIES_TO_INDEX;
}

const countryName = (code: string) => findCountry(code)?.name ?? code;
// « la 1re place », mais « la 2e place » : le rang 1 s'accorde au feminin.
const ordinal = (rank: number) => (rank === 1 ? '1re' : `${rank}e`);
const frenchDate = (day: string) => new Date(day + 'T00:00:00Z').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function TrackTrajectory({ history }: Props) {
  const unit = history.type === 'songs' ? 'titre' : 'album';
  const stillCharting = history.countries.filter(c => c.currentRank !== null);
  const gone = history.countries.length - stillCharting.length;
  const best = history.countries[0];

  // Meilleur jour de la trajectoire, pour situer le pic dans le temps.
  const strongestDay = history.timeline.reduce(
    (a, b) => (b.countryCount > a.countryCount ? b : a),
    history.timeline[0],
  );

  return (
    <section style={{ maxWidth: 820, margin: '32px auto 0', padding: '0 16px 8px' }}>
      <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
        Parcours de ce {unit} dans les classements
      </h2>

      <p style={{ color: '#AAAAAA', fontSize: 15, lineHeight: 1.8, marginBottom: 14 }}>
        Depuis le {frenchDate(history.firstSeen)}, ce {unit} a figuré{' '}
        <strong style={{ color: '#fff' }}>{history.daysOnChart} jour{history.daysOnChart > 1 ? 's' : ''}</strong> dans nos
        relevés, sur <strong style={{ color: '#fff' }}>{history.countryCount} pays</strong>. Sa meilleure position est la{' '}
        <strong style={{ color: '#fff' }}>{ordinal(history.peak.rank)}</strong> place, atteinte en{' '}
        {countryName(history.peak.countryCode)} le {frenchDate(history.peak.day)}. Apple Music publie le classement du
        moment : ni le pic atteint, ni la durée de présence, ni les pays traversés. Ces trois chiffres viennent de la
        comparaison de nos relevés successifs.
      </p>

      <p style={{ color: '#AAAAAA', fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>
        {stillCharting.length > 0
          ? `Au dernier relevé du ${frenchDate(history.lastSeen)}, il est encore classé dans ${stillCharting.length} pays`
          : `Il ne figure plus dans aucun classement au relevé du ${frenchDate(history.lastSeen)}`}
        {gone > 0 && stillCharting.length > 0 ? `, et il est sorti de ${gone} autre${gone > 1 ? 's' : ''}` : ''}.
        {strongestDay && ` Son jour le plus large reste le ${frenchDate(strongestDay.day)}, avec une présence simultanée dans ${strongestDay.countryCount} pays.`}
        {best && ` Le pays où il s'est le mieux installé est ${countryName(best.countryCode)}, avec ${best.days} jour${best.days > 1 ? 's' : ''} de présence.`}
      </p>

      <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Détail par pays</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ color: '#777', textAlign: 'left' }}>
              <th style={{ padding: '8px 10px 8px 0', fontWeight: 600 }}>Pays</th>
              <th style={{ padding: '8px 10px', fontWeight: 600 }}>Meilleure place</th>
              <th style={{ padding: '8px 10px', fontWeight: 600 }}>Jours</th>
              <th style={{ padding: '8px 0 8px 10px', fontWeight: 600 }}>Actuellement</th>
            </tr>
          </thead>
          <tbody>
            {history.countries.slice(0, 15).map(c => (
              <tr key={c.countryCode} style={{ borderTop: '1px solid #2A2A2A', color: '#CCCCCC' }}>
                <td style={{ padding: '8px 10px 8px 0' }}>{countryName(c.countryCode)}</td>
                <td style={{ padding: '8px 10px' }}>{ordinal(c.bestRank)}</td>
                <td style={{ padding: '8px 10px' }}>{c.days}</td>
                <td style={{ padding: '8px 0 8px 10px', color: c.currentRank ? '#A78BFA' : '#666' }}>
                  {c.currentRank ? ordinal(c.currentRank) : 'sorti'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {history.countries.length > 15 && (
        <p style={{ color: '#666', fontSize: 13, marginTop: 8 }}>
          et {history.countries.length - 15} autre{history.countries.length - 15 > 1 ? 's' : ''} pays.
        </p>
      )}
    </section>
  );
}
