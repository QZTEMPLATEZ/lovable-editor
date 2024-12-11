export interface VideoSizeRange {
  min: number;
  max: number;
  name: string;
  label: string;
  description: string;
  icon: React.ReactNode | null;
  recommendedTracks: number;
  tier: 'basic' | 'pro' | 'business';
}

export interface MusicAnalysis {
  beats: BeatInfo[];
  bpm: number;
  segments: AudioSegment[];
  duration: number;
  energyProfile: EnergyProfile;
  key?: string;
}

export interface BeatInfo {
  timestamp: number;
  intensity: number;
  type: 'strong' | 'weak';
  bpm?: number;
}

export interface AudioSegment {
  start: number;
  end: number;
  type: 'crescendo' | 'decrescendo' | 'steady';
  intensity: number;
}

export interface EnergyProfile {
  average: number;
  peak: number;
  valleys: number[];
  peaks: number[];
}