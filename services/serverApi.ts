import { cache } from 'react';
import { ApiError, fetchBlogArticles, fetchBlogArticle, fetchTrending, fetchTrackHistory, fetchWeeklyReports, fetchWeeklyReport, fetchIndexableTracks } from './api';
import type { BlogArticle, BlogArticleSummary, MusicType, TrackHistory, TrendingItem, WeeklyReport, IndexableTrack } from '../types';

// Rendu serveur : le contenu doit être dans le HTML envoyé au crawler, pas
// chargé après coup côté client. `cache()` déduplique l'appel entre
// generateMetadata et le rendu de la page.

export const getBlogArticles = cache(async (): Promise<BlogArticleSummary[]> => {
  try {
    const articles = await fetchBlogArticles();
    return [...articles].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  } catch {
    // API indisponible : la page se rabat sur le chargement client.
    return [];
  }
});

// null signifie « cet article n'existe pas », et rien d'autre : la page en
// tire un notFound(). Une panne de l'API remonte en 500, que Google reessaie,
// au lieu d'un 404 qu'il tiendrait pour acquis.
export const getBlogArticle = cache(async (id: number): Promise<BlogArticle | null> => {
  try {
    return await fetchBlogArticle(id);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) return null;
    throw e;
  }
});

// Meme regle que getBlogArticle : seul un 404 franc referme la fiche.
export const getTrackHistory = cache(async (appleId: string): Promise<TrackHistory | null> => {
  try {
    return await fetchTrackHistory(appleId);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) return null;
    throw e;
  }
});

export const getTrendingItems = cache(
  async (type: MusicType | 'all', country: string, limit: number): Promise<TrendingItem[]> => {
    try {
      return await fetchTrending(type, country, limit);
    } catch {
      return [];
    }
  },
);

// Volontairement sans filet : un sitemap ampute est pire qu'un sitemap absent.
// En renvoyant [] sur incident, on declarerait 570 URLs de moins d'un coup, ce
// que Google lit comme « ces pages ont disparu ». En laissant remonter l'erreur,
// le sitemap repond 500, Google reessaie et conserve la version precedente.
export const getIndexableTracks = cache(
  async (minDays: number, minCountries: number): Promise<IndexableTrack[]> =>
    fetchIndexableTracks(minDays, minCountries),
);

export const getWeeklyReports = cache(async (): Promise<WeeklyReport[]> => {
  try {
    return await fetchWeeklyReports();
  } catch {
    // Le bilan est un complement : son absence ne doit jamais vider la page.
    return [];
  }
});

export const getWeeklyReport = cache(async (slug: string): Promise<WeeklyReport | null> => {
  try {
    return await fetchWeeklyReport(slug);
  } catch {
    return null;
  }
});
