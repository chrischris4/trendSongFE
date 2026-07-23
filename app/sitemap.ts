import type { MetadataRoute } from 'next';
import { MUSIC_GENRES, COUNTRIES } from '../constants/config';
import { slugify } from '../utils/slug';

export const runtime = 'edge';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://trend-songs.com';
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://trendsongbe-production.up.railway.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', '/songs', '/albums', '/weekly', '/stats', '/blog', '/about', '/methodology', '/contact', '/privacy'].map(route => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  })) as MetadataRoute.Sitemap;

  const genreRoutes = (['songs', 'albums'] as const).flatMap(base =>
    MUSIC_GENRES.map(g => ({
      url: `${BASE_URL}/${base}/genre/${g.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  );

  const countryRoutes = (['songs', 'albums'] as const).flatMap(base =>
    COUNTRIES.map(c => ({
      url: `${BASE_URL}/${base}/country/${c.code.toLowerCase()}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    })),
  );

  // Articles publiés : une URL par article, ajoutée au fil des publications du cron
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_BASE}/blog`, { cache: 'no-store' });
    if (res.ok) {
      const articles: { id: number; title: string; editorialEn: string; createdAt: string }[] = await res.json();
      blogRoutes = articles
      .filter(article => article.editorialEn.trim().split(/\s+/).filter(Boolean).length >= 350)
      .map(a => ({
        url: `${BASE_URL}/blog/${slugify(a.title, String(a.id))}`,
        lastModified: new Date(a.createdAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
    }
  } catch {
    // API indisponible : le sitemap reste valide sans les articles
  }

  return [...staticRoutes, ...genreRoutes, ...countryRoutes, ...blogRoutes];
}
