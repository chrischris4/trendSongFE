'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import { COUNTRIES, MUSIC_GENRES, countryLabel } from '../constants/config';
import { countryInsights, genreInsights } from '../constants/insights';

const MARKET_ORDER = ['US', 'GB', 'FR', 'DE', 'ES', 'IT', 'NL', 'SE', 'PL', 'CA', 'MX', 'BR', 'AU', 'JP', 'KR', 'IN'];

const h2: React.CSSProperties = { color: '#fff', fontSize: 20, fontWeight: 800, margin: '40px 0 10px' };
const p: React.CSSProperties = { color: '#AAAAAA', fontSize: 15, lineHeight: 1.8, margin: '0 0 14px' };

export default function MarketsPage() {
  const { i18n } = useTranslation();
  const isFr = i18n.language === 'fr';
  const lang = isFr ? 'fr' : 'en';

  const markets = MARKET_ORDER
    .map(code => {
      const insight = countryInsights[code];
      const country = COUNTRIES.find(c => c.code === code);
      return insight && country ? { code, flag: country.flag, name: countryLabel(country, i18n.language), text: insight[lang] } : null;
    })
    .filter(Boolean) as { code: string; flag: string; name: string; text: string }[];

  const genres = MUSIC_GENRES
    .map(g => (genreInsights[g.slug] ? { slug: g.slug, label: g.label, text: genreInsights[g.slug][lang] } : null))
    .filter(Boolean) as { slug: string; label: string; text: string }[];

  return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '32px 16px 64px' }}>
        <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 800, marginBottom: 14 }}>
          {isFr ? 'Guide des marchés musicaux' : 'Guide to the music markets'}
        </h1>

        <p style={p}>
          {isFr
            ? "Un classement musical ne dit jamais la même chose selon le pays où on le lit. Nous suivons chaque jour les charts Apple Music de 32 marchés, et la première chose que ces relevés révèlent, c'est à quel point l'idée d'un « hit mondial » est trompeuse. Un titre peut occuper la première place dans vingt pays et rester introuvable dans dix autres, non par manque de qualité, mais parce que ces marchés fonctionnent selon des logiques d'écoute totalement différentes."
            : "A music chart never says the same thing depending on the country you read it in. We track the Apple Music charts of 32 markets every day, and the first thing those snapshots reveal is how misleading the idea of a “global hit” really is. A track can hold first place in twenty countries and remain nowhere to be found in ten others, not for lack of quality, but because those markets run on entirely different listening logics."}
        </p>
        <p style={p}>
          {isFr
            ? "Deux grandes familles se dégagent. D'un côté, les marchés perméables, où les sorties internationales s'imposent en quelques jours et où le classement local ressemble beaucoup au classement mondial. De l'autre, les marchés qui produisent et consomment d'abord leur propre musique, au point qu'un hit planétaire y végète loin derrière des artistes inconnus à l'étranger. Le Japon, la France, la Pologne, le Brésil et l'Inde appartiennent tous à cette seconde catégorie, pour des raisons qui n'ont rien à voir entre elles."
            : "Two broad families emerge. On one side, permeable markets, where international releases take hold within days and the local chart closely resembles the global one. On the other, markets that produce and consume their own music first, to the point where a worldwide hit languishes far behind artists unknown abroad. Japan, France, Poland, Brazil and India all belong to that second category, for reasons that have nothing to do with one another."}
        </p>
        <p style={p}>
          {isFr
            ? "Voici ce que nous observons dans les seize marchés les plus significatifs de notre panel, puis dans les grands genres qui les traversent."
            : "Here is what we observe across the sixteen most significant markets in our panel, then across the major genres running through them."}
        </p>

        <h2 style={h2}>{isFr ? 'Les marchés, un par un' : 'The markets, one by one'}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {markets.map(m => (
            <div key={m.code} style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 12, padding: '16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 24, lineHeight: 1 }}>{m.flag}</span>
                <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, margin: 0 }}>{m.name}</h3>
                <span style={{ color: '#555', fontSize: 12, fontWeight: 600, marginLeft: 'auto', backgroundColor: '#1F1F1F', padding: '2px 8px', borderRadius: 4 }}>{m.code}</span>
              </div>
              <p style={{ color: '#AAAAAA', fontSize: 14, lineHeight: 1.8, margin: '0 0 10px' }}>{m.text}</p>
              <Link prefetch={false} href={`/songs/country/${m.code.toLowerCase()}/`} style={{ fontSize: 13, fontWeight: 600, color: '#FF6482', textDecoration: 'none' }}>
                {isFr ? `Voir le classement ${m.name}` : `See the ${m.name} chart`} →
              </Link>
            </div>
          ))}
        </div>

        <h2 style={h2}>{isFr ? 'Les genres qui traversent les frontières' : 'The genres that cross borders'}</h2>
        <p style={p}>
          {isFr
            ? "Tous les genres ne voyagent pas de la même façon. Certains, comme la pop ou la musique latine, apparaissent simultanément partout. D'autres, comme la country ou le rap national, restent solidement ancrés dans une poignée de pays. Cette géographie explique une bonne partie des écarts entre les classements."
            : "Not all genres travel the same way. Some, like pop or Latin music, appear everywhere at once. Others, like country or domestic rap, stay firmly anchored in a handful of countries. That geography explains a good share of the gaps between charts."}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {genres.map(g => (
            <div key={g.slug} style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 12, padding: '16px 20px' }}>
              <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>{g.label}</h3>
              <p style={{ color: '#AAAAAA', fontSize: 14, lineHeight: 1.8, margin: '0 0 10px' }}>{g.text}</p>
              <Link prefetch={false} href={`/songs/genre/${g.slug}/`} style={{ fontSize: 13, fontWeight: 600, color: '#FF6482', textDecoration: 'none' }}>
                {isFr ? `Voir le top ${g.label}` : `See the ${g.label} top`} →
              </Link>
            </div>
          ))}
        </div>

        <h2 style={h2}>{isFr ? 'Comment lire nos classements' : 'How to read our charts'}</h2>
        <p style={p}>
          {isFr
            ? "Deux chiffres méritent d'être distingués, parce qu'ils ne mesurent pas la même chose. Le nombre de pays où un titre est classé décrit sa diffusion : jusqu'où il a voyagé. Son rang moyen décrit son altitude : à quel point il domine là où il est présent. Les deux culminent rarement ensemble. Une collaboration internationale conçue pour plaire partout atteindra souvent trente pays sans jamais monter très haut dans aucun ; à l'inverse, une sortie portée par un public national mobilisé écrasera son marché sans franchir la moindre frontière."
            : "Two numbers deserve to be kept apart, because they do not measure the same thing. The number of countries where a track charts describes its reach: how far it travelled. Its average rank describes its altitude: how thoroughly it dominates where it is present. The two rarely peak together. An international collaboration built to please everyone will often reach thirty countries without ever climbing very high in any of them; conversely, a release carried by a mobilized national audience will crush its home market without crossing a single border."}
        </p>
        <p style={p}>
          {isFr
            ? "Le catalogue complique encore la lecture. Nos relevés montrent régulièrement des titres vieux de plusieurs décennies revenir dans les classements, réactivés par un film, une série ou une tendance vidéo. Ces retours ne relèvent pas de la nostalgie passive : ils occupent de vraies positions, parfois devant des sorties récentes soutenues par de gros budgets promotionnels. C'est l'un des effets les plus durables du passage au streaming, et l'une des raisons pour lesquelles un classement d'aujourd'hui ressemble moins que jamais à une liste de nouveautés."
            : "Catalog complicates the reading further. Our snapshots regularly show tracks decades old returning to the charts, reactivated by a film, a series or a video trend. These comebacks are not passive nostalgia: they occupy real positions, sometimes ahead of recent releases backed by large promotional budgets. It is one of the most lasting effects of the shift to streaming, and one of the reasons a chart today looks less like a list of new releases than ever."}
        </p>
        <p style={p}>
          {isFr
            ? "C'est pour cela que nous publions les classements pays par pays plutôt qu'un top mondial unique. Un agrégat planétaire écrase précisément ce qui rend ces données intéressantes : les écarts."
            : "That is why we publish charts country by country rather than a single global top. A planet-wide aggregate flattens precisely what makes this data interesting: the gaps."}
        </p>
        <p style={{ ...p, marginTop: 18 }}>
          <Link href="/methodology/" style={{ color: '#FF6482', fontWeight: 600, textDecoration: 'none' }}>
            {isFr ? 'Notre méthodologie en détail' : 'Our methodology in detail'} →
          </Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}
