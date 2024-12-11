export interface VideoStyle {
  id: string;
  name: string;
  description: string;
  previewUrl?: string;
  features?: string[];
}

export interface MusicAnalysis {
  key: string;           // Added the missing key property
  bpm: number;
  duration: number;
  energy?: number;
  danceability?: number;
  valence?: number;
  instrumentalness?: number;
}

export interface VideoSize {
  width: number;
  height: number;
  aspectRatio: string;
  name: string;
  description?: string;
}