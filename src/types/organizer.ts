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

export interface OrganizedFiles {
  [key: string]: {
    files: File[];
    subfolders?: {
      [key: string]: File[];
    };
  };
}