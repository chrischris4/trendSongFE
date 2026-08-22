import type { TrendingItem, BlogArticle, BlogArticleSummary, StatsData, MusicType, TrackHistory, WeeklyReport, IndexableTrack } from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://trendsongbe-production.up.railway.app';
const TTL = 5 * 60 * 1000;
const memCache = new Map<string, { data: unknown; ts: number }>();

// Porte le code HTTP jusqu'aux pages appelantes. Confondre « n'existe pas »
// et « API injoignable » ferait renvoyer un 404 definitif au premier incident
// Railway, et desindexer des pages parfaitement valides.
export class ApiError extends Error {
  constructor(readonly status: number) {
    super(`HTTP ${status}`);
  }
}

async function apiFetch<T>(path: string): Promise<T> {
  const hit = memCache.get(path);
  if (hit && Date.now() - hit.ts < TTL) return hit.data as T;
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new ApiError(res.status);
  const data = await res.json() as T;
  memCache.set(path, { data, ts: Date.now() });
  return data;
}

export async function fetchTrending(type: MusicType | 'all' = 'all', country = 'US', limit = 100): Promise<TrendingItem[]> {
  return apiFetch(`/trending?type=${type}&country=${country}&limit=${limit}`);
}

export async function fetchTrackHistory(appleId: string): Promise<TrackHistory> {
  return apiFetch(`/trending/history/${appleId}`);
}

export async function fetchBlogArticle(id: number): Promise<BlogArticle> {
  return apiFetch(`/blog/${id}`);
}

export async function fetchStats(): Promise<StatsData> {
  return apiFetch('/trending/stats');
}

export async function fetchBlogArticles(): Promise<BlogArticleSummary[]> {
  return apiFetch('/blog');
}

export async function fetchIndexableTracks(minDays: number, minCountries: number): Promise<IndexableTrack[]> {
  return apiFetch(`/trending/indexable?minDays=${minDays}&minCountries=${minCountries}`);
}

export async function fetchWeeklyReports(): Promise<WeeklyReport[]> {
  return apiFetch('/weekly');
}

export async function fetchWeeklyReport(slug: string): Promise<WeeklyReport> {
  return apiFetch(`/weekly/${slug}`);
}
