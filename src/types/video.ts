export interface VideoStyle {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
}

export interface MusicAnalysis {
  key: string;  // Added this property
  title: string;
  artist: string;
  duration: number;
  tempo: number;
  energy: number;
  danceability: number;
  valence: number;
}
