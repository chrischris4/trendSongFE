import { useState, useEffect } from 'react';
import { fetchTrending } from '../services/api';
import type { TrendingItem, MusicType } from '../types';

// `initialItems` vient du rendu serveur et ne vaut que pour le couple
// type/pays rendu là-bas : dès que l'utilisateur change de filtre, on repasse
// par le fetch client.
export function useTrending(
  type: MusicType | 'all' = 'all',
  country = 'US',
  limit = 100,
  initialItems?: TrendingItem[],
  initialKey?: string,
) {
  const useSeed = Boolean(initialItems?.length) && `${type}:${country}` === initialKey;
  const [items, setItems] = useState<TrendingItem[]>(useSeed ? initialItems! : []);
  const [loading, setLoading] = useState(!useSeed);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (useSeed) {
      setItems(initialItems!);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    setItems([]);
    fetchTrending(type, country, limit)
      .then(setItems)
      .catch(() => setError('Impossible de charger les données. Vérifie ta connexion.'))
      .finally(() => setLoading(false));
  }, [type, country, limit, useSeed]);

  return { items, loading, error };
}
