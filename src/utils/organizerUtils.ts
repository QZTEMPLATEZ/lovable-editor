import { OrganizationCategory, OrganizationResult, ProjectStructure } from '../types/organizer';
import { Camera, Video, Music, Image } from 'lucide-react';
import React from 'react';
import { analyzeImage } from './imageAnalysis';
import { ORGANIZER_CONFIG } from '../config/organizerConfig';

export const DEFAULT_CATEGORIES: OrganizationCategory[] = [
  {
    name: 'BridePrep',
    keywords: ['bride_prep', 'makeup', 'getting_ready', 'bride_preparation', 'bridal'],
    description: 'Bride preparation footage including makeup, hair, and getting ready',
    icon: () => React.createElement(Camera, { className: "w-4 h-4" })
  },
  {
    name: 'GroomPrep',
    keywords: ['groom_prep', 'groom', 'suit', 'tuxedo', 'groomsmen'],
    description: 'Groom preparation footage',
    icon: () => React.createElement(Video, { className: "w-4 h-4" })
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
    let bestMatch = {
      category: '',
      confidence: 0
    };

    // First try AI classification for images/videos
    if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
      try {
        const analysis = await analyzeImage(file);
        
        // Find the category with highest confidence above threshold
        Object.entries(ORGANIZER_CONFIG.analysis.categories).forEach(([category, config]) => {
          const matchScore = config.visualCues.reduce((score, cue) => {
            if (analysis.labels.includes(cue.toLowerCase())) {
              score += 1;
            }
            return score;
          }, 0) / config.visualCues.length;

          if (matchScore > config.confidence && matchScore > bestMatch.confidence) {
            bestMatch = {
              category,
              confidence: matchScore
            };
          }
        });

        if (bestMatch.category) {
          const categoryFiles = categorizedFiles.get(bestMatch.category) || [];
          categoryFiles.push(file);
          categorizedFiles.set(bestMatch.category, categoryFiles);
          categorized = true;
          console.log(`File ${file.name} categorized as ${bestMatch.category} with confidence ${bestMatch.confidence}`);
        }
      } catch (error) {
        console.error(`Failed to analyze file ${file.name}:`, error);
      }
    }

    // If AI classification failed, try keyword matching from filename
    if (!categorized) {
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