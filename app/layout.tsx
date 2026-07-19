import type { Metadata } from 'next';
import './globals.css';
import ClientRoot from './ClientRoot';

export const metadata: Metadata = {
  title: { default: 'TrendSongs - Top Songs & Albums Charts by Country', template: '%s | TrendSongs' },
  description: 'Discover the most played songs and albums right now in 30+ countries. TrendSongs tracks the official Apple Music charts daily: global top, rankings by country and by genre.',
  keywords: ['trending songs', 'top songs right now', 'music charts', 'top 100 songs', 'most played songs', 'top albums', 'apple music charts', 'top musique', 'chanson du moment', 'TrendSongs'],
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: { url: '/icon.png', type: 'image/png' },
  },
  openGraph: {
    siteName: 'TrendSongs',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrendSongs - Top Songs & Albums Charts by Country',
    description: 'The most played songs and albums right now in 30+ countries. Updated daily.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8982511031951947" crossOrigin="anonymous" />
      </head>
      <body>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
