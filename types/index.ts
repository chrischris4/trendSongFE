export type MusicType = 'songs' | 'albums';

export interface TrendingItem {
  id: string;
  appleId: string;
  type: MusicType;
  name: string;
  artistName: string;
  artistId: string | null;
  artistUrl: string | null;
  artworkUrl: string | null;
  url: string | null;
  releaseDate: string | null;
  genreIds: string[];
  genreNames: string[];
  explicit: boolean;
  rank: number;
  countryCode: string;
  fetchedAt: string;
}

export type BlogArticleFormat =
  | 'SIMPLE'
  | 'SUGGESTION'
  | 'TOP_10'
  | 'GUIDE'
  | 'DATA_ANALYSIS'
  | 'FACE_TO_FACE'
  | 'PORTRAIT'
  | 'RETROSPECTIVE';

export interface BlogArticleItem {
  id: number;
  articleId: number;
  position: number;
  appleId: string | null;
  type: 'songs' | 'albums' | null;
  title: string;
  artistName: string;
  artworkUrl: string | null;
  streamCount: number | null;
  countryCount: number | null;
  sectionTitleFr: string | null;
  sectionTitleEn: string | null;
  sectionTextFr: string | null;
  sectionTextEn: string | null;
}

export interface BlogArticle {
  id: number;
  format: BlogArticleFormat;
  appleId: string | null;
  type: string | null;
  title: string;
  titleFr: string | null;
  titleEn: string | null;
  artistName: string;
  artworkUrl: string | null;
  streamCount: number | null;
  countryCount: number | null;
  weekOf: string;
  editorialFr: string;
  editorialEn: string;
  introFr: string | null;
  introEn: string | null;
  conclusionFr: string | null;
  conclusionEn: string | null;
  items: BlogArticleItem[];
  published: boolean;
  createdAt: string;
}

export interface GlobalTopItem {
  appleId: string;
  name: string;
  artistName: string;
  artworkUrl: string | null;
  countryCount: number;
  avgRank: number;
}

export interface GenreStat {
  genreId: string;
  name: string;
  count: number;
  pct: number;
}

export interface ArtistStat {
  artist: string;
  count: number;
  pct: number;
}

export interface StatsData {
  songs: number;
  albums: number;
  countries: number;
  topSongs: GlobalTopItem[];
  topAlbums: GlobalTopItem[];
  topGenres: GenreStat[];
  topArtists: ArtistStat[];
  yearDistribution: { year: string; count: number; pct: number }[];
  newToday: number;
  lastUpdated: string;
}
