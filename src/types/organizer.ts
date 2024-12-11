import { ReactNode } from 'react';

export interface OrganizationCategory {
  name: string;
  keywords: string[];
  description: string;
  icon: () => ReactNode;
}

export interface OrganizationResult {
  categorizedFiles: Map<string, File[]>;
  unorganizedFiles: File[];
  stats: {
    totalFiles: number;
    categorizedCount: number;
    uncategorizedCount: number;
  };
}

export interface ProjectStructure {
  projectName: string;
  categories: OrganizationCategory[];
  mediaBins: {
    binName: string;
    files: File[];
  }[];
}