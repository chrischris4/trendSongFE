import { cache } from 'react';
import { fetchBlogArticles, fetchBlogArticle, fetchTrending, fetchTrackHistory } from './api';
import type { BlogArticle, BlogArticleSummary, MusicType, TrackHistory, TrendingItem } from '../types';

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

export const getBlogArticle = cache(async (id: number): Promise<BlogArticle | null> => {
  try {
    return await fetchBlogArticle(id);
  } catch {
    return null;
  }
});

export const getTrackHistory = cache(async (appleId: string): Promise<TrackHistory | null> => {
  try {
    return await fetchTrackHistory(appleId);
  } catch {
    // Titre inconnu ou API indisponible : la fiche reste servie sans trajectoire.
    return null;
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
