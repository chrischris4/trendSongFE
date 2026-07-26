// Texte éditorial propre à chaque marché et à chaque genre. Il conditionne
// l'indexation : seules les pages disposant d'un insight sont soumises au crawl
// et marquées `index: true`, pour ne pas exposer de pages purement templatées.

export const countryInsights: Record<string, { fr: string; en: string }> = {
  US: {
    fr: "Les États-Unis restent le marché qui donne le tempo au reste du monde. Le hip-hop et la country s'y disputent le haut du classement depuis plusieurs années, une cohabitation qu'on ne retrouve nulle part ailleurs à cette échelle. Le chart américain se distingue aussi par sa réactivité : un titre porté par une tendance vidéo peut y entrer dans le top 10 en quelques jours, avant de se diffuser vers l'Europe et l'Amérique latine.",
    en: "The United States still sets the tempo for the rest of the world. Hip-hop and country have been trading places at the top for several years now, a coexistence you find nowhere else at this scale. The American chart also stands out for its reactivity: a track carried by a video trend can enter the top 10 within days, before spreading to Europe and Latin America.",
  },
  GB: {
    fr: "Le Royaume-Uni fonctionne comme une chambre d'écho entre l'Amérique et l'Europe. Les hits américains y arrivent souvent en premier sur le continent, mais la scène locale garde une force de frappe rare, du rap britannique à la pop alternative. C'est aussi l'un des marchés où le catalogue pèse le plus lourd : les classiques britanniques ressurgissent régulièrement dans le classement au gré des anniversaires et des synchronisations.",
    en: "The United Kingdom works as an echo chamber between America and Europe. American hits often land here first on the continent, but the local scene keeps a rare striking power, from British rap to alternative pop. It is also one of the markets where catalog weighs heaviest: British classics resurface regularly in the ranking, carried by anniversaries and sync placements.",
  },
  FR: {
    fr: "La France est l'un des rares pays européens où la production locale écrase la pop internationale. Le rap francophone occupe durablement le sommet du classement, souvent avec plusieurs titres du même artiste simultanément. Cette préférence linguistique est si marquée qu'un hit mondial peut se retrouver relégué au-delà de la vingtième place, une situation qu'on n'observe presque nulle part ailleurs en Europe de l'Ouest.",
    en: "France is one of the few European countries where local production crushes international pop. French-language rap holds the top of the chart durably, often with several tracks from the same artist at once. That linguistic preference runs so deep that a worldwide hit can find itself pushed past twentieth place, a situation observed almost nowhere else in Western Europe.",
  },
  DE: {
    fr: "L'Allemagne partage avec la France cette particularité européenne : une scène nationale assez forte pour tenir tête aux sorties anglo-saxonnes. Le rap allemand y domine régulièrement, aux côtés d'une pop germanophone et d'un Schlager qui conserve un public fidèle. Le marché est aussi l'un des plus importants d'Europe en volume, ce qui rend chaque entrée dans son top 100 significative à l'échelle continentale.",
    en: "Germany shares France's European peculiarity: a domestic scene strong enough to stand up to Anglo-Saxon releases. German rap regularly dominates, alongside German-language pop and a Schlager tradition that keeps a loyal audience. The market is also one of Europe's largest by volume, which makes every entry in its top 100 significant at continental scale.",
  },
  ES: {
    fr: "L'Espagne sert de passerelle entre l'Europe et le monde hispanophone. Le reggaeton et l'urbano latino y dominent, mais souvent dans des versions différentes de celles qui marchent en Amérique latine, avec une scène madrilène et catalane qui impose ses propres codes. C'est l'un des marchés où l'écart entre le classement local et le classement mondial est le plus instructif à observer.",
    en: "Spain acts as a bridge between Europe and the Spanish-speaking world. Reggaeton and Latin urbano dominate, but often in different versions from those working in Latin America, with Madrid and Barcelona scenes imposing their own codes. It is one of the markets where the gap between the local chart and the global chart is most instructive to watch.",
  },
  IT: {
    fr: "L'Italie a vu son rap et sa pop urbaine prendre le contrôle du classement en une décennie, reléguant la chanson traditionnelle à un rôle d'appoint. Le pays conserve une singularité : le festival de Sanremo provoque chaque hiver un bouleversement complet du top 100, un phénomène de saisonnalité qu'aucun autre marché européen ne connaît avec cette intensité.",
    en: "Italy watched its rap and urban pop take control of the chart within a decade, relegating traditional song to a supporting role. The country keeps one singularity: the Sanremo festival triggers a complete upheaval of the top 100 every winter, a seasonality no other European market experiences with this intensity.",
  },
  NL: {
    fr: "Les Pays-Bas cumulent deux identités musicales : un marché très ouvert aux sorties internationales, et une tradition électronique qui a produit certains des plus grands DJ de la planète. Le classement néerlandais est souvent un bon indicateur avancé pour la dance et la house en Europe, un titre y perçant fréquemment avant de gagner les marchés voisins.",
    en: "The Netherlands combines two musical identities: a market highly open to international releases, and an electronic tradition that produced some of the planet's biggest DJs. The Dutch chart is often a good leading indicator for dance and house in Europe, with tracks breaking through here before reaching neighbouring markets.",
  },
  SE: {
    fr: "La Suède pèse dans la musique mondiale bien au-delà de sa taille. Le pays exporte depuis des décennies des auteurs et producteurs qui façonnent les hits d'autres pays, et son classement local reflète cette culture pop très travaillée. On y observe aussi une forte présence du rap suédophone, souvent invisible à l'international mais massivement écouté sur place.",
    en: "Sweden punches far above its size in global music. The country has exported songwriters and producers shaping other countries' hits for decades, and its local chart reflects that highly crafted pop culture. You also find a strong presence of Swedish-language rap, largely invisible internationally but massively streamed at home.",
  },
  PL: {
    fr: "La Pologne est l'un des marchés européens les plus tournés vers sa propre production. Le rap polonais y domine largement, avec des artistes qui remplissent des stades sans presque aucune visibilité hors des frontières. Comparer le classement polonais au classement mondial donne une bonne mesure de la distance qui sépare la circulation des hits de leur écoute réelle.",
    en: "Poland is one of Europe's most inward-facing markets. Polish rap dominates broadly, with artists filling stadiums while remaining almost invisible beyond the border. Comparing the Polish chart to the global one gives a good measure of the distance between how hits circulate and how they are actually listened to.",
  },
  CA: {
    fr: "Le Canada présente une dualité rare : un classement largement aligné sur celui des États-Unis, mais traversé par une scène francophone québécoise qui suit ses propres règles. Le pays a aussi produit une part démesurée des grandes figures du hip-hop et de la pop nord-américaine, ce qui donne à ses artistes locaux une présence durable dans le top 100.",
    en: "Canada shows a rare duality: a chart largely aligned with the United States, yet crossed by a French-speaking Quebec scene following its own rules. The country has also produced an outsized share of North American hip-hop and pop's major figures, giving its local artists lasting presence in the top 100.",
  },
  MX: {
    fr: "Le Mexique est devenu l'un des moteurs de la musique mondiale grâce aux corridos tumbados et à la musique régionale mexicaine, un genre longtemps cantonné au marché intérieur et désormais exporté massivement. Le classement mexicain est aujourd'hui l'un des plus intéressants à suivre : ce qui y perce se retrouve souvent quelques semaines plus tard dans les charts américains.",
    en: "Mexico has become one of global music's engines thanks to corridos tumbados and regional Mexican music, a genre long confined to the domestic market and now massively exported. The Mexican chart is currently among the most interesting to follow: what breaks through here often shows up weeks later in American charts.",
  },
  BR: {
    fr: "Le Brésil fonctionne en écosystème quasi autonome. Le sertanejo, le funk carioca et le pagode occupent l'essentiel du classement, dans des proportions qui laissent peu de place aux sorties internationales. C'est l'un des plus gros marchés d'écoute de la planète, et l'un de ceux dont le top 100 ressemble le moins à celui des autres pays que nous suivons.",
    en: "Brazil operates as a near-autonomous ecosystem. Sertanejo, funk carioca and pagode occupy most of the chart, in proportions that leave little room for international releases. It is one of the planet's largest listening markets, and one whose top 100 resembles the other countries we track the least.",
  },
  AU: {
    fr: "L'Australie combine une forte perméabilité aux hits anglo-saxons et une scène locale qui exporte régulièrement. Son décalage horaire en fait un marché à surveiller : c'est souvent l'un des premiers pays où une sortie mondiale apparaît dans le classement, plusieurs heures avant l'Europe et l'Amérique.",
    en: "Australia combines strong permeability to Anglo-Saxon hits with a local scene that exports regularly. Its time zone makes it a market worth watching: it is often one of the first countries where a global release appears in the chart, several hours ahead of Europe and America.",
  },
  JP: {
    fr: "Le Japon est le marché le plus atypique de tous ceux que nous suivons. Quasiment imperméable aux hits internationaux, il fonctionne autour de la J-pop, du J-rock, des génériques d'anime et des groupes d'idols. La culture du single y résiste aux logiques de playlist, si bien qu'un titre peut rester classé pendant des années — une longévité qu'aucun autre pays de notre panel n'affiche.",
    en: "Japan is the most atypical market of all those we track. Almost impervious to international hits, it revolves around J-pop, J-rock, anime openings and idol groups. Singles culture resists playlist logic here, so a track can stay charted for years — a longevity no other country in our panel displays.",
  },
  KR: {
    fr: "La Corée du Sud produit une part démesurée des phénomènes musicaux mondiaux tout en gardant un classement domestique très spécifique. Les ballades et la pop coréenne y occupent souvent des positions que les groupes exportés à l'international n'atteignent pas chez eux. L'écart entre ce que la Corée écoute et ce que la K-pop diffuse dans le monde est l'un des contrastes les plus parlants de nos données.",
    en: "South Korea produces an outsized share of global musical phenomena while keeping a very specific domestic chart. Ballads and Korean pop often hold positions there that internationally exported groups never reach at home. The gap between what Korea listens to and what K-pop broadcasts worldwide is one of the most telling contrasts in our data.",
  },
  IN: {
    fr: "L'Inde est le marché où le volume d'écoute est le plus élevé et la visibilité internationale la plus faible. La musique de film, bollywoodienne comme tamoule ou télougoue, y domine sans partage, portée par des labels qui déclinent chaque sortie en dizaines de formats. Un titre peut y cumuler des chiffres colossaux sans jamais apparaître dans un seul autre classement de notre panel.",
    en: "India is the market with the highest listening volume and the lowest international visibility. Film music, whether Bollywood, Tamil or Telugu, dominates without competition, driven by labels that break every release into dozens of formats. A track can accumulate colossal figures there without ever appearing in a single other chart in our panel.",
  },
};

export const genreInsights: Record<string, { fr: string; en: string }> = {
  pop: {
    fr: "La pop reste le genre le plus universel de nos classements : c'est celui dont les titres apparaissent simultanément dans le plus grand nombre de pays. Sa force est aussi sa limite, un hit pop domine partout mais s'use vite, remplacé par le suivant en quelques semaines.",
    en: "Pop remains the most universal genre in our rankings: its tracks appear simultaneously in the largest number of countries. Its strength is also its limit, a pop hit dominates everywhere but wears out fast, replaced by the next one within weeks.",
  },
  'hip-hop': {
    fr: "Le hip-hop est le genre qui se décline le plus fortement selon les marchés. Chaque pays a développé sa propre scène, en sa propre langue, si bien qu'un classement rap français, allemand ou polonais ne partage presque aucun titre avec son voisin. C'est le genre le plus révélateur des identités musicales nationales.",
    en: "Hip-hop is the genre that varies most sharply from market to market. Each country developed its own scene in its own language, so a French, German or Polish rap chart shares almost no track with its neighbour. It is the genre that reveals national musical identities most clearly.",
  },
  rock: {
    fr: "Le rock occupe dans nos données une place particulière : il génère peu de nouvelles entrées, mais une proportion élevée de titres de catalogue. Ce sont souvent des morceaux vieux de plusieurs décennies qui remontent au classement, portés par une bande originale, une reprise ou une tendance vidéo.",
    en: "Rock holds a particular place in our data: it generates few new entries but a high proportion of catalog tracks. These are often decades-old songs climbing back into the chart, carried by a soundtrack, a cover or a video trend.",
  },
  'rnb-soul': {
    fr: "Le R&B et la soul irriguent une grande partie de la production actuelle sans toujours apparaître sous leur propre étiquette. Dans nos classements, le genre se distingue par une durée de vie longue : ses titres montent plus lentement que la pop, mais restent classés bien plus longtemps.",
    en: "R&B and soul feed much of today's production without always appearing under their own label. In our rankings the genre stands out for its long life: its tracks climb more slowly than pop, but stay charted considerably longer.",
  },
  country: {
    fr: "La country est le genre le plus concentré géographiquement de tous ceux que nous suivons. Presque toute son audience se situe aux États-Unis et au Canada, où elle rivalise avec le hip-hop pour la première place. Ailleurs, elle est pratiquement absente des classements, ce qui en fait un excellent marqueur du marché nord-américain.",
    en: "Country is the most geographically concentrated genre of all those we track. Nearly its entire audience sits in the United States and Canada, where it rivals hip-hop for the top spot. Elsewhere it is practically absent from the charts, which makes it an excellent marker of the North American market.",
  },
  latino: {
    fr: "La musique latine est le genre dont l'expansion est la plus visible dans nos données. Partie d'Amérique latine et d'Espagne, elle s'est installée durablement dans les classements de pays qui ne parlent pas espagnol, prouvant qu'une barrière linguistique ne freine pas un morceau dont le rythme fonctionne partout.",
    en: "Latin music is the genre whose expansion is most visible in our data. Starting from Latin America and Spain, it settled durably into the charts of countries that do not speak Spanish, proving that a language barrier does not hold back a track whose rhythm works everywhere.",
  },
  electro: {
    fr: "L'électro se comporte différemment des genres portés par des artistes : les titres y circulent souvent plus que les noms. Un morceau peut dominer un classement sans que son producteur soit connu du grand public, et sa durée de vie dépend fortement de la saison et des festivals.",
    en: "Electronic music behaves differently from artist-driven genres: tracks circulate more than names. A record can dominate a chart without its producer being known to the general public, and its lifespan depends heavily on the season and the festival calendar.",
  },
  dance: {
    fr: "La dance est le genre le plus saisonnier de nos relevés. Ses pics coïncident avec l'été européen et la saison des festivals, et son épicentre se déplace : ce qui perce d'abord aux Pays-Bas ou en Belgique se retrouve souvent quelques semaines plus tard dans le reste du continent.",
    en: "Dance is the most seasonal genre in our records. Its peaks coincide with the European summer and the festival season, and its epicentre moves: what breaks first in the Netherlands or Belgium often turns up weeks later across the rest of the continent.",
  },
  alternative: {
    fr: "L'alternatif est le genre où l'écart entre popularité et visibilité est le plus grand. Ses titres entrent rarement dans les premières places, mais y restent longtemps et reviennent par vagues, souvent réactivés par une synchronisation ou une redécouverte générationnelle.",
    en: "Alternative is the genre with the widest gap between popularity and visibility. Its tracks rarely enter the top positions, but they stay a long time and return in waves, often reactivated by a sync placement or a generational rediscovery.",
  },
  'k-pop': {
    fr: "La K-pop est le genre dont la mécanique est la plus lisible dans nos données : un fandom mondial coordonné fait entrer un titre très haut dès la première heure, puis les positions redescendent rapidement. C'est l'inverse exact d'un succès de catalogue, et l'illustration la plus nette de la différence entre mobilisation et écoute durable.",
    en: "K-pop is the genre whose machinery reads most clearly in our data: a coordinated global fandom pushes a track very high within the first hour, then positions fall back quickly. It is the exact opposite of a catalog success, and the clearest illustration of the difference between mobilization and sustained listening.",
  },
  jazz: {
    fr: "Le jazz occupe une place discrète mais remarquablement stable dans nos classements. Peu d'entrées, peu de sorties, et une proportion de catalogue proche de la totalité : c'est le genre qui dépend le moins de l'actualité, et celui dont les positions varient le moins d'une semaine à l'autre.",
    en: "Jazz holds a discreet but remarkably stable place in our rankings. Few entries, few exits, and a catalog proportion close to total: it is the genre least dependent on current events, and the one whose positions vary least from week to week.",
  },
  reggae: {
    fr: "Le reggae se distingue par une géographie d'écoute qui ne suit pas les grands marchés. Il pèse davantage dans certains pays européens et latino-américains que dans les classements anglo-saxons, et son catalogue historique y reste plus présent que les sorties récentes.",
    en: "Reggae stands out for a listening geography that does not follow the major markets. It weighs more in certain European and Latin American countries than in Anglo-Saxon charts, and its historic catalog stays more present there than recent releases.",
  },
};
