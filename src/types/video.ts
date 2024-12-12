export interface VideoStyle {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
}

export interface MusicAnalysis {
  key: string;
  tempo: number;
  timeSignature: string;
  duration: number;
  loudness: number;
  energy: number;
  danceability: number;
}

export type ClipType = "preparation" | "ceremony" | "celebration";

export interface Clip {
  file: File;
  type: ClipType;
  startTime: number;
  endTime: number;
  significance: number;
}