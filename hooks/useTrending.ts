import { useState, useEffect } from 'react';
import { fetchTrending } from '../services/api';
import type { TrendingItem, MusicType } from '../types';

export function useTrending(type: MusicType | 'all' = 'all', country = 'US', limit = 100) {
  const [items, setItems] = useState<TrendingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setItems([]);
    fetchTrending(type, country, limit)
      .then(setItems)
      .catch(() => setError('Impossible de charger les données. Vérifie ta connexion.'))
      .finally(() => setLoading(false));
  }, [type, country, limit]);

  return { items, loading, error };
}
