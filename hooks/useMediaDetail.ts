import { useState, useEffect } from 'react';
import { fetchDetail } from '../services/details';
import type { MediaDetail } from '../types/detail';
import type { MusicType } from '../types';

export function useMediaDetail(type: MusicType, id: string, country = 'US') {
  const [detail, setDetail] = useState<MediaDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchDetail(type, id, country)
      .then(setDetail)
      .catch(() => setError('Impossible de charger les détails.'))
      .finally(() => setLoading(false));
  }, [type, id, country]);

  return { detail, loading, error };
}
