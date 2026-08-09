import type { MetadataRoute } from 'next';
import { MUSIC_GENRES, COUNTRIES, DEFAULT_COUNTRY } from '../constants/config';
import { slugify } from '../utils/slug';
import { articleTitle, articleWordCount } from '../utils/blog';
import { getBlogArticles, getTrendingItems } from '../services/serverApi';
import { countryInsights, genreInsights } from '../constants/insights';

export const runtime = 'edge';
// Sinon le sitemap est figé au build et n'inclut jamais les articles publiés depuis.
export const dynamic = 'force-dynamic';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://trend-songs.com';

// next.config a trailingSlash: true, donc une URL sans slash final renvoie un 308.
// Sans ca, chaque entree du sitemap serait une redirection pour le crawler.
const url = (path: string) => `${BASE_URL}${path}/`.replace(/\/+$/, '/');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', '/songs', '/albums', '/weekly', '/stats', '/blog', '/markets', '/about', '/methodology', '/contact', '/privacy'].map(route => ({
    url: url(route),
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  })) as MetadataRoute.Sitemap;

  // On ne soumet au crawl que les pages disposant d'un texte éditorial propre
  // ET remontant au moins un titre du jour : sans le second filtre, le sitemap
  // listait des pages vides de 90 mots. Même critère que le `robots.index` des
  // routes correspondantes, sinon sitemap et balise robots se contredisent.
  const [songItems, albumItems] = await Promise.all([
    getTrendingItems('songs', DEFAULT_COUNTRY, 100),
    getTrendingItems('albums', DEFAULT_COUNTRY, 100),
  ]);
  const itemsByBase = { songs: songItems, albums: albumItems };

  const genreRoutes = (['songs', 'albums'] as const).flatMap(base =>
    MUSIC_GENRES
      .filter(g => Boolean(genreInsights[g.slug]))
      .filter(g => itemsByBase[base].some(item => item.genreIds.includes(g.id)))
      .map(g => ({
        url: url(`/${base}/genre/${g.slug}`),
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
  );

  const countryRoutes = (['songs', 'albums'] as const).flatMap(base =>
    COUNTRIES.filter(c => Boolean(countryInsights[c.code])).map(c => ({
      url: url(`/${base}/country/${c.code.toLowerCase()}`),
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
      url: url(`/blog/${slugify(articleTitle(a, false), String(a.id))}`),
      lastModified: new Date(a.createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...genreRoutes, ...countryRoutes, ...blogRoutes];
}
