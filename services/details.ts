import type { MediaDetail } from '../types/detail';
import type { MusicType } from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3002';

export async function fetchDetail(type: MusicType, id: string, country = 'US'): Promise<MediaDetail> {
  const res = await fetch(`${API_BASE}/details/${type}/${id}?country=${country}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
