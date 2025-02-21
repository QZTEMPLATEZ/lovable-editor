import { ReactNode } from 'react';

export interface FolderCategory {
  name: string;
  icon: ReactNode;
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