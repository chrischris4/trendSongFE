import type { TrackHistory } from '../types';

/**
 * Module volontairement neutre : `generateMetadata` s'execute cote serveur et
 * ne peut pas importer depuis un fichier marque 'use client'. Les seuils vivent
 * donc ici, partages entre la page serveur et le composant client.
 *
 * En dessous, la trajectoire est trop courte pour justifier une page indexee.
 * La retention a 90 jours n'ayant ete deployee que le 10/08/2026, l'historique
 * repart d'environ une semaine : le seuil de 14 jours fait office de minuterie,
 * les fiches s'ouvrant d'elles-memes quand l'archive devient assez profonde.
 */
export const MIN_DAYS_TO_INDEX = 14;
export const MIN_COUNTRIES_TO_INDEX = 3;

export function isIndexable(history: TrackHistory | null): boolean {
  if (!history) return false;
  return history.daysOnChart >= MIN_DAYS_TO_INDEX && history.countryCount >= MIN_COUNTRIES_TO_INDEX;
}
