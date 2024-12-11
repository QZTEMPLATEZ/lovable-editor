import { OrganizationCategory, OrganizationResult, ProjectStructure } from '../types/organizer';
import { Camera, Video, Music, Image } from 'lucide-react';
import React from 'react';

export const DEFAULT_CATEGORIES: OrganizationCategory[] = [
  {
    name: 'MakingOf',
    keywords: ['making_of', 'prep', 'makeup', 'getting_ready'],
    description: 'Preparation footage including makeup, hair, and getting ready',
    icon: () => React.createElement(Camera, { className: "w-4 h-4" })
  },
  {
    name: 'Ceremony',
    keywords: ['ceremony', 'vows', 'altar', 'wedding'],
    description: 'Main ceremony footage including vows and altar moments',
    icon: () => React.createElement(Video, { className: "w-4 h-4" })
  },
  {
    name: 'Audio',
    keywords: ['.wav', '.mp3', 'speech', 'music'],
    description: 'Audio files including speeches and music',
    icon: () => React.createElement(Music, { className: "w-4 h-4" })
  },
  {
    name: 'Details',
    keywords: ['ring', 'invitation', 'details', 'closeup'],
    description: 'Close-up shots of details like rings and decorations',
    icon: () => React.createElement(Image, { className: "w-4 h-4" })
  }
];

export const organizeFiles = (
  files: File[],
  categories: OrganizationCategory[] = DEFAULT_CATEGORIES
): OrganizationResult => {
  const categorizedFiles = new Map<string, File[]>();
  const unorganizedFiles: File[] = [];
  
  // Initialize categories
  categories.forEach(category => {
    categorizedFiles.set(category.name, []);
  });

  files.forEach(file => {
    const fileName = file.name.toLowerCase();
    let categorized = false;

    for (const category of categories) {
      if (category.keywords.some(keyword => fileName.includes(keyword))) {
        const categoryFiles = categorizedFiles.get(category.name) || [];
        categoryFiles.push(file);
        categorizedFiles.set(category.name, categoryFiles);
        categorized = true;
        break;
      }
    }

    if (!categorized) {
      unorganizedFiles.push(file);
    }
  });

  return {
    categorizedFiles,
    unorganizedFiles,
    stats: {
      totalFiles: files.length,
      categorizedCount: files.length - unorganizedFiles.length,
      uncategorizedCount: unorganizedFiles.length
    }
  };
};

export const createProjectStructure = (
  projectName: string,
  organizationResult: OrganizationResult,
  categories: OrganizationCategory[]
): ProjectStructure => {
  const mediaBins = Array.from(organizationResult.categorizedFiles.entries()).map(([binName, files]) => ({
    binName,
    files
  }));

  return {
    projectName,
    categories,
    mediaBins
  };
};