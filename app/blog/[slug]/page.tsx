export const runtime = 'edge';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticlePage from '../../../components/ArticlePage';
import { parseIdFromSlug, slugify } from '../../../utils/slug';
import { getBlogArticle, getBlogArticles } from '../../../services/serverApi';
import { articleExcerpt, articleTitle, articleWordCount } from '../../../utils/blog';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const id = Number(parseIdFromSlug(slug));
  const article = await getBlogArticle(id);
  const summary = (await getBlogArticles()).find(a => a.id === id);
  const title = article ? articleTitle(article) : 'Music chart analysis';
  const description = article
    ? summary!.excerpt.slice(0, 155)
    : 'Original analysis based on country-level Apple Music charts.';

  return {
    title,
    description,
    robots: { index: (summary?.wordCount ?? 0) >= 350, follow: true },
    // Le slug varie avec la langue du titre : on canonicalise toujours sur la version EN.
    alternates: {
      canonical: article
        ? `https://trend-songs.com/blog/${slugify(title, String(article.id))}`
        : `https://trend-songs.com/blog/${slug}`,
    },
    openGraph: {
      type: 'article',
      title,
      description,
      publishedTime: article?.createdAt,
    },
  };
}

export default async function BlogArticleRoute({ params }: Props) {
  const { slug } = await params;
  const id = Number(parseIdFromSlug(slug));
  const [article, list] = await Promise.all([getBlogArticle(id), getBlogArticles()]);
  // Un slug fantaisiste renvoyait un gabarit vide en 200 : meme surface infinie
  // que les fiches, et exactement le motif reproche par AdSense.
  if (!article) notFound();

  return <ArticlePage id={id} initialArticle={article} initialOthers={list.filter(a => a.id !== id).slice(0, 3)} />;
}
