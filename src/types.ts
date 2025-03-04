import { ReactNode } from 'react';

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

export interface FolderCategory {
  name: string;
  icon: ReactNode;  // Mantendo ReactNode direto para simplicidade
  description: string;
  expectedTypes: string;
  color: string;
  subfolders?: FolderCategory[];
}

export interface OrganizationStats {
  totalFiles: number;
  categorizedCount: number;
  uncategorizedCount: number;
}

export interface OrganizationResult {
  categorizedFiles: Map<string, File[]>;
  unorganizedFiles: File[];
  stats: OrganizationStats;
}

export interface OrganizationCategory {
  name: string;
  keywords: string[];
  description: string;
  icon: () => ReactNode;
}

export interface ProjectStructure {
  projectName: string;
  categories: OrganizationCategory[];
  mediaBins: {
    binName: string;
    files: File[];
  }[];
}

export interface OrganizedFiles {
  [key: string]: {
    files: File[];
    subfolders?: {
      [key: string]: File[];
    };
  };
}

export interface MusicAnalysis {
  bpm: number;
  key: string;
  tempo?: number;
  energy?: number;
  danceability?: number;
  valence?: number;
  duration: number;
  sections?: {
    start: number;
    duration: number;
    loudness: number;
    tempo: number;
    key: number;
    mode: number;
  }[];
}
