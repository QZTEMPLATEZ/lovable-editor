export type VideoStyle = 'cinematic' | 'documentary' | 'classic' | 'dynamic';

export interface VideoStyleData {
  id: VideoStyle;
  title: string;
  description: string;
  previewVideo: string;
  features: string[];
}

export interface MusicAnalysis {
  key: string;
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