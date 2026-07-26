import type { MetadataRoute } from 'next';
import { MUSIC_GENRES, COUNTRIES } from '../constants/config';
import { slugify } from '../utils/slug';
import { articleTitle, articleWordCount } from '../utils/blog';
import { getBlogArticles } from '../services/serverApi';

export const runtime = 'edge';
// Sinon le sitemap est figé au build et n'inclut jamais les articles publiés depuis.
export const dynamic = 'force-dynamic';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://trend-songs.com';

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

  // Articles publiés : une URL par article, ajoutée au fil des publications du cron.
  // Même seuil et même slug que la page article, pour ne pas soumettre au crawl
  // des URLs marquées noindex ou différentes des liens internes.
  const blogRoutes: MetadataRoute.Sitemap = (await getBlogArticles())
    .filter(article => articleWordCount(article) >= 350)
    .map(a => ({
      url: `${BASE_URL}/blog/${slugify(articleTitle(a, false), String(a.id))}`,
      lastModified: new Date(a.createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...genreRoutes, ...countryRoutes, ...blogRoutes];
}
