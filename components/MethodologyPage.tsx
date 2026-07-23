'use client';

import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';

const copy = {
  fr: {
    title: 'Méthodologie et ligne éditoriale',
    intro: 'TrendSongs compare les classements Apple Music dans plus de trente pays. Apple ne publie pas de classement mondial unique, nous calculons donc notre propre indicateur à partir de la présence internationale et du rang moyen.',
    sections: [
      ['Collecte des données', 'Les tops morceaux et albums sont relevés chaque jour pays par pays. Nous conservons le rang, l’artiste, le genre, la date de sortie et le territoire du relevé lorsque ces informations sont disponibles.'],
      ['Calcul du top mondial', 'Le nombre de pays est le premier signal. À présence égale, le meilleur rang moyen départage les titres. Cette méthode valorise une diffusion réellement internationale plutôt qu’un succès isolé sur un seul marché.'],
      ['Contrôle éditorial', 'Chaque article est relu avant publication. Les chiffres doivent correspondre aux relevés archivés, les données manquantes ne sont pas estimées et le contexte extérieur doit pouvoir être vérifié.'],
      ['Indépendance et corrections', 'TrendSongs n’est ni affilié ni approuvé par Apple. Une erreur factuelle peut être signalée depuis la page Contact. Les classements historiques restent datés de leur collecte.'],
    ],
    source: 'Source principale : Apple Music',
  },
  en: {
    title: 'Methodology and editorial standards',
    intro: 'TrendSongs compares Apple Music charts in more than thirty countries. Apple does not publish one unified worldwide chart, so we calculate our own indicator from international reach and average rank.',
    sections: [
      ['Data collection', 'Song and album charts are collected daily, country by country. We retain rank, artist, genre, release date and market whenever those fields are available.'],
      ['Global ranking calculation', 'Country count is the first signal. When reach is equal, the stronger average rank breaks the tie. This method rewards genuinely international traction rather than an isolated hit in one market.'],
      ['Editorial review', 'Every article is reviewed before publication. Figures must match archived snapshots, missing data is never estimated, and outside context must remain verifiable.'],
      ['Independence and corrections', 'TrendSongs is not affiliated with or endorsed by Apple. Readers can report factual errors through the Contact page, while historical rankings remain dated to their original collection.'],
    ],
    source: 'Primary source: Apple Music',
  },
};

export default function MethodologyPage() {
  const { i18n } = useTranslation();
  const text = copy[i18n.language === 'fr' ? 'fr' : 'en'];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0F0F0F' }}>
      <Header />
      <main style={{ maxWidth: 820, margin: '0 auto', padding: '40px 20px 72px' }}>
        <h1 style={{ color: '#fff', fontSize: 30, marginBottom: 14 }}>{text.title}</h1>
        <p style={{ color: '#CCCCCC', fontSize: 16, lineHeight: 1.8 }}>{text.intro}</p>
        {text.sections.map(([title, body]) => (
          <section key={title} style={{ marginTop: 30 }}>
            <h2 style={{ color: '#fff', fontSize: 19, marginBottom: 8 }}>{title}</h2>
            <p style={{ color: '#AAAAAA', fontSize: 15, lineHeight: 1.8 }}>{body}</p>
          </section>
        ))}
        <a href="https://music.apple.com/" target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: 28, color: '#A78BFA' }}>
          {text.source}
        </a>
      </main>
      <Footer />
    </div>
  );
}
