import type { MetadataRoute } from 'next';
import { MUSIC_GENRES, COUNTRIES } from '../constants/config';

export const dynamic = 'force-static';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://trend-songs.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/songs', '/albums', '/weekly', '/stats', '/blog', '/about', '/contact', '/privacy'].map(route => ({
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

  return [...staticRoutes, ...genreRoutes, ...countryRoutes];
}
