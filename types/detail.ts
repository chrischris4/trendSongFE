import type { MusicType } from './index';

export interface AlbumTrack {
  appleId: string;
  name: string;
  trackNumber: number | null;
  durationMs: number | null;
  previewUrl: string | null;
  url: string | null;
  explicit: boolean;
}

export interface MiniItem {
  appleId: string;
  type: MusicType;
  name: string;
  artistName: string;
  artworkUrl: string | null;
  url: string | null;
  previewUrl: string | null;
}

export interface ChartPosition {
  countryCode: string;
  name: string;
  flag: string;
  rank: number;
}

export interface MediaDetail {
  appleId: string;
  type: MusicType;
  name: string;
  artistName: string;
  artistId: string | null;
  albumId: string | null;
  albumName: string | null;
  artworkUrl: string | null;
  previewUrl: string | null;
  durationMs: number | null;
  genre: string | null;
  releaseDate: string | null;
  url: string | null;
  explicit: boolean;
  trackNumber: number | null;
  trackCount: number | null;
  price: number | null;
  currency: string | null;
  copyright?: string | null;
  tracks: AlbumTrack[];
  moreFromArtist: MiniItem[];
  chartPositions: ChartPosition[];
}
