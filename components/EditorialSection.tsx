'use client';

import { useTranslation } from 'react-i18next';

type PageKey = 'home' | 'songs' | 'albums';

interface Block {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
}

const CONTENT: Record<PageKey, { fr: Block; en: Block }> = {
  home: {
    fr: {
      title: 'Comment lire les charts TrendSongs',
      intro: "La plupart des classements musicaux que l'on croise en ligne se contentent d'afficher un top national, généralement américain, comme s'il représentait le goût du monde entier. TrendSongs part du principe inverse : la musique se vit localement, et c'est en comparant trente-trois pays qu'on comprend vraiment ce qui se passe.",
      sections: [
        {
          heading: 'D\'où viennent nos données',
          body: "Nous interrogeons chaque nuit les classements officiels Apple Music, catégorie « Les plus écoutés », pour chacun des trente-trois pays que nous suivons. Ces flux reflètent les écoutes réelles sur la plateforme, pays par pays, et non des estimations ou des projections de ventes. Nous récupérons les cent premières positions en titres et en albums, nous historisons chaque relevé, puis nous croisons l'ensemble pour construire nos propres indicateurs. Le classement local que vous consultez est donc le reflet direct de ce que les auditeurs d'un pays donné ont réellement écouté ces dernières vingt-quatre heures.",
        },
        {
          heading: 'Notre top mondial n\'est pas une simple addition',
          body: "Apple ne publie pas de classement mondial unifié, nous en construisons donc un. Notre méthode combine deux critères : le nombre de pays où un titre est classé, et sa position moyenne dans ces classements. Un morceau présent dans vingt-cinq pays avec une position moyenne de quatre passe devant un titre numéro un dans un seul marché. C'est un choix éditorial assumé, qui privilégie la portée réelle sur la performance locale. Il explique pourquoi vous verrez parfois en tête de notre classement mondial un titre que vous ne connaissez pas encore : il est en train de conquérir la planète en silence, pendant que les hits nationaux dominent bruyamment leur seul territoire.",
        },
        {
          heading: 'Ce que révèle la comparaison entre pays',
          body: "C'est là que le site devient réellement intéressant. Le Japon écoute presque exclusivement des productions japonaises, la France place systématiquement son rap local devant la pop internationale, le Mexique fait triompher la musique régionale, et la Corée du Sud n'écoute quasiment pas les groupes qu'elle exporte. Ces écarts ne sont pas des anecdotes, ils dessinent une carte culturelle que les classements globaux effacent complètement. Notre page Statistiques agrège ces observations, notre rapport hebdomadaire les commente, et notre blog publie chaque jour une analyse consacrée à un artiste, un titre ou un phénomène de chart en particulier.",
        },
      ],
    },
    en: {
      title: 'How to read the TrendSongs charts',
      intro: "Most music rankings you come across online simply display one national top, usually the American one, as though it represented the taste of the entire world. TrendSongs starts from the opposite premise: music is lived locally, and only by comparing thirty-three countries do you really understand what is happening.",
      sections: [
        {
          heading: 'Where our data comes from',
          body: "Every night we query the official Apple Music charts, the Most Played category, for each of the thirty-three countries we track. These feeds reflect actual listening on the platform, country by country, rather than estimates or sales projections. We pull the top hundred positions for both songs and albums, we archive every reading, then we cross-reference the whole set to build our own indicators. The local ranking you are looking at is therefore a direct reflection of what listeners in that country actually played over the last twenty-four hours.",
        },
        {
          heading: 'Our global top is not a simple sum',
          body: "Apple publishes no unified worldwide ranking, so we build one. Our method combines two criteria: the number of countries where a track is charting, and its average position across those charts. A song present in twenty-five countries with an average position of four ranks ahead of a number one in a single market. That is a deliberate editorial choice, favoring real reach over local performance. It explains why you will sometimes find a track you have never heard of at the top of our global ranking: it is quietly conquering the planet while national hits loudly dominate their single territory.",
        },
        {
          heading: 'What comparing countries reveals',
          body: "This is where the site becomes genuinely interesting. Japan listens almost exclusively to Japanese productions, France systematically places its local rap ahead of international pop, Mexico crowns regional music, and South Korea barely listens to the groups it exports. These gaps are not anecdotes, they draw a cultural map that global rankings erase completely. Our Statistics page aggregates those observations, our weekly report comments on them, and our blog publishes a daily analysis devoted to one artist, one track or one specific chart phenomenon.",
        },
      ],
    },
  },
  songs: {
    fr: {
      title: 'Les titres en tendance, mode d\'emploi',
      intro: "Cette page affiche les cent morceaux les plus écoutés du pays sélectionné, dans l'ordre exact du classement Apple Music du jour. Changez de pays dans la barre de filtres et vous verrez le classement se reconstruire entièrement, parfois sans qu'aucun titre ne soit commun entre deux marchés voisins.",
      sections: [
        {
          heading: 'Comment un titre entre et se maintient dans un chart',
          body: "Nos relevés quotidiens font apparaître trois trajectoires bien distinctes. L'entrée directe au sommet concerne les sorties des grandes stars, portées par des fanbases organisées qui streament massivement dès la première heure, avec souvent une redescente rapide les jours suivants. La progression lente est le signe d'un titre porté par les playlists, la radio ou un son devenu viral, et c'est généralement celle qui produit les succès les plus durables. Enfin la remontée de catalogue, spectaculaire quand elle survient, ramène dans le top des morceaux vieux de dix, vingt ou quarante ans, réactivés par un film, une série, une publicité ou une chorégraphie sur les réseaux.",
        },
        {
          heading: 'Écouter avant de décider',
          body: "Chaque fiche titre propose l'extrait officiel de trente secondes fourni par Apple, ce qui permet de se faire une idée immédiate sans quitter le site, ainsi qu'un lien direct pour écouter le morceau complet sur Apple Music. Nous affichons aussi la liste des pays où ce titre est actuellement classé, avec sa position dans chacun. C'est un angle qu'aucun autre classement ne propose et qui change complètement la lecture : on voit d'un coup d'œil si l'on a affaire à un phénomène régional ou à un hit véritablement planétaire.",
        },
      ],
    },
    en: {
      title: 'Trending songs, how to use this page',
      intro: "This page displays the hundred most played tracks in the selected country, in the exact order of today's Apple Music chart. Switch countries in the filter bar and you will watch the ranking rebuild entirely, sometimes without a single shared title between two neighboring markets.",
      sections: [
        {
          heading: 'How a track enters and holds a chart',
          body: "Our daily readings reveal three distinct trajectories. The straight-to-the-top entry belongs to major star releases, carried by organized fanbases streaming massively from the first hour, often followed by a rapid decline over the following days. The slow climb signals a track carried by playlists, radio or a sound gone viral, and it generally produces the most durable successes. Finally the catalog resurgence, spectacular when it happens, brings ten, twenty or forty-year-old songs back into the top, reactivated by a film, a series, an advert or a dance on social media.",
        },
        {
          heading: 'Listen before you decide',
          body: "Every track page offers the official thirty-second preview provided by Apple, so you can form an immediate opinion without leaving the site, plus a direct link to play the full song on Apple Music. We also display the list of countries where that track is currently charting, with its position in each. It is an angle no other ranking offers and it completely changes the reading: you can tell at a glance whether you are looking at a regional phenomenon or a genuinely planetary hit.",
        },
      ],
    },
  },
  albums: {
    fr: {
      title: 'Les albums en tendance, mode d\'emploi',
      intro: "Le classement des albums raconte une histoire différente de celui des titres, et c'est précisément pour cela qu'il mérite sa propre page. Un single peut exploser grâce à quinze secondes devenues virales ; un album exige que l'auditeur accorde quarante minutes de son temps, et cette différence change tout.",
      sections: [
        {
          heading: 'Un indicateur d\'engagement, pas de curiosité',
          body: "Nos données montrent que les classements d'albums bougent nettement moins vite que ceux des titres. Un album installé au sommet y reste souvent plusieurs semaines, là où le top des singles peut être bouleversé du jour au lendemain. Cette inertie en fait un excellent révélateur de la solidité réelle d'un artiste. Quand un même nom domine simultanément les deux classements dans une trentaine de pays, on ne parle plus d'un coup marketing réussi mais d'une base d'auditeurs profondément fidélisée, et ces cas-là sont rares.",
        },
        {
          heading: 'Ce que l\'album dit encore de la musique',
          body: "On annonce la mort du format album depuis l'arrivée du streaming, et pourtant il continue de structurer les carrières. Les chiffres que nous relevons chaque nuit racontent une réalité plus nuancée que le discours ambiant : quand une sortie majeure arrive, ce n'est pas un titre qui entre dans nos classements mais la tracklist entière qui les colonise, chaque morceau menant sa propre course dans chaque pays. L'album reste donc l'événement autour duquel tout s'organise, même si l'écoute, elle, s'est fragmentée. Chaque fiche album propose la tracklist complète avec les extraits audio de chaque titre.",
        },
      ],
    },
    en: {
      title: 'Trending albums, how to use this page',
      intro: "The album ranking tells a different story from the singles chart, and that is precisely why it deserves its own page. A single can explode thanks to fifteen viral seconds; an album asks the listener for forty minutes of their time, and that difference changes everything.",
      sections: [
        {
          heading: 'An indicator of commitment, not curiosity',
          body: "Our data shows album charts move noticeably slower than song charts. An album settled at the top often stays there for weeks, where the singles top can be overturned overnight. That inertia makes it an excellent indicator of an artist's real solidity. When the same name dominates both rankings simultaneously across thirty-odd countries, we are no longer talking about a successful marketing push but about a deeply loyal listener base, and those cases are rare.",
        },
        {
          heading: 'What the album still says about music',
          body: "The death of the album format has been announced since streaming arrived, and yet it continues to structure careers. The numbers we record every night tell a more nuanced story than the prevailing narrative: when a major release lands, it is not one track entering our rankings but the entire tracklist colonizing them, each song running its own race in each country. The album therefore remains the event around which everything is organized, even if listening itself has fragmented. Every album page offers the full tracklist with audio previews for each track.",
        },
      ],
    },
  },
};

export default function EditorialSection({ page }: { page: PageKey }) {
  const { i18n } = useTranslation();
  const block = CONTENT[page][i18n.language === 'fr' ? 'fr' : 'en'];

  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 16px 8px' }}>
      <div style={{ maxWidth: 780 }}>
        <div style={{ height: 2, width: 56, background: 'linear-gradient(90deg,#7C3AED,#EC4899)', borderRadius: 1, marginBottom: 20 }} />
        <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 800, lineHeight: 1.3, marginBottom: 14 }}>{block.title}</h2>
        <p style={{ color: '#BBBBBB', fontSize: 15, lineHeight: 1.85, marginBottom: 28 }}>{block.intro}</p>

        {block.sections.map(s => (
          <div key={s.heading} style={{ marginBottom: 26 }}>
            <h3 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{s.heading}</h3>
            <p style={{ color: '#AAAAAA', fontSize: 14, lineHeight: 1.85, margin: 0 }}>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
