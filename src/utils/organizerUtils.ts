
import { OrganizationCategory, OrganizationResult, ProjectStructure } from '../types/organizer';
import { Camera, Video, Music, Image } from 'lucide-react';
import React from 'react';
import { analyzeImage } from './imageAnalysis';

export const DEFAULT_CATEGORIES: OrganizationCategory[] = [
  {
    name: 'MakingOf',
    keywords: ['making_of', 'prep', 'makeup', 'getting_ready', 'preparation', 'bride_prep', 'groom_prep'],
    description: 'Preparation footage including makeup, hair, and getting ready',
    icon: () => React.createElement(Camera, { className: "w-4 h-4" })
  },
  {
    name: 'Ceremony',
    keywords: ['ceremony', 'vows', 'altar', 'wedding', 'ring_exchange', 'service'],
    description: 'Main ceremony footage including vows and altar moments',
    icon: () => React.createElement(Video, { className: "w-4 h-4" })
  },
  {
    name: 'Reception',
    keywords: ['reception', 'party', 'dance', 'cake', 'toast', 'celebration'],
    description: 'Reception events and celebrations',
    icon: () => React.createElement(Video, { className: "w-4 h-4" })
  },
  {
    name: 'Details',
    keywords: ['ring', 'invitation', 'details', 'closeup', 'jewelry', 'bouquet', 'shoes'],
    description: 'Close-up shots of details like rings and decorations',
    icon: () => React.createElement(Image, { className: "w-4 h-4" })
  },
  {
    name: 'Decor',
    keywords: ['decor', 'flowers', 'venue', 'setup', 'table', 'centerpiece'],
    description: 'Venue decoration and setup',
    icon: () => React.createElement(Image, { className: "w-4 h-4" })
  }
];

export const organizeFiles = async (
  files: File[],
  categories: OrganizationCategory[] = DEFAULT_CATEGORIES
): Promise<OrganizationResult> => {
  const categorizedFiles = new Map<string, File[]>();
  const unorganizedFiles: File[] = [];
  
  // Initialize categories
  categories.forEach(category => {
    categorizedFiles.set(category.name, []);
  });

  for (const file of files) {
    let categorized = false;
    const fileName = file.name.toLowerCase();

    // First try keyword matching from filename
    for (const category of categories) {
      if (category.keywords.some(keyword => fileName.includes(keyword))) {
        const categoryFiles = categorizedFiles.get(category.name) || [];
        categoryFiles.push(file);
        categorizedFiles.set(category.name, categoryFiles);
        categorized = true;
        console.log(`File ${file.name} categorized as ${category.name} based on filename`);
        break;
      }
    }

    // If not categorized by filename and it's an image/video, try AI classification
    if (!categorized && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      try {
        const analysis = await analyzeImage(file);
        if (analysis.category !== 'Extras') {
          const categoryFiles = categorizedFiles.get(analysis.category) || [];
          categoryFiles.push(file);
          categorizedFiles.set(analysis.category, categoryFiles);
          categorized = true;
          console.log(`File ${file.name} categorized as ${analysis.category} based on AI analysis`);
        }
      } catch (error) {
        console.error(`Failed to analyze file ${file.name}:`, error);
      }
    }

    // If still not categorized, add to unorganized
    if (!categorized) {
      unorganizedFiles.push(file);
      console.log(`File ${file.name} remained uncategorized`);
    }
  }

  const result: OrganizationResult = {
    categorizedFiles,
    unorganizedFiles,
    stats: {
      totalFiles: files.length,
      categorizedCount: files.length - unorganizedFiles.length,
      uncategorizedCount: unorganizedFiles.length
    }
  };

  console.log('Organization results:', {
    totalFiles: result.stats.totalFiles,
    categorized: result.stats.categorizedCount,
    uncategorized: result.stats.uncategorizedCount
  });

  return result;
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
