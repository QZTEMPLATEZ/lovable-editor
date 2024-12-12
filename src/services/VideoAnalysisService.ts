import { VideoCategory } from '../types';
import { logger } from '../utils/logger';

export class VideoAnalysisService {
  private static readonly CONFIDENCE_THRESHOLD = 0.3;
  
  private static readonly CATEGORY_PATTERNS = {
    brideprep: [/bride.*prep/i, /noiva.*prep/i, /makeup/i, /maquiagem/i],
    groomprep: [/groom.*prep/i, /noivo.*prep/i],
    decoration: [/decor/i, /flores/i, /flowers/i, /venue/i, /local/i],
    drone: [/drone/i, /aerial/i, /dji/i, /mavic/i, /air2s/i],
    ceremony: [/cerim[oôó]nia/i, /ceremony/i, /altar/i, /church/i, /igreja/i],
    reception: [/recep[cç][aã]o/i, /reception/i, /party/i, /festa/i, /dance/i]
  };

  private static readonly VISUAL_INDICATORS = {
    brideprep: ['makeup', 'dress', 'bride', 'mirror', 'hair'],
    groomprep: ['suit', 'tie', 'groom', 'getting ready'],
    decoration: ['flowers', 'chairs', 'tables', 'arch', 'lights'],
    drone: ['aerial', 'bird view', 'landscape', 'building'],
    ceremony: ['altar', 'church', 'aisle', 'chairs', 'guests'],
    reception: ['dance floor', 'party', 'cake', 'dinner', 'toast']
  };

  static async analyzeVideo(file: File): Promise<{ category: VideoCategory; confidence: number }> {
    try {
      logger.info(`Starting analysis for file: ${file.name}`);
      
      // First try filename-based classification
      const filenameCategory = this.classifyByFilename(file.name);
      if (filenameCategory) {
        logger.info(`File ${file.name} classified as ${filenameCategory} based on filename`);
        return { category: filenameCategory, confidence: 0.8 };
      }

      // Then try metadata-based classification
      const metadataCategory = await this.classifyByMetadata(file);
      if (metadataCategory) {
        logger.info(`File ${file.name} classified as ${metadataCategory} based on metadata`);
        return { category: metadataCategory, confidence: 0.7 };
      }

      // If no clear classification, mark as untagged
      logger.warn(`File ${file.name} could not be classified confidently`);
      return { category: 'untagged', confidence: 0 };
    } catch (error) {
      logger.error(`Error analyzing file ${file.name}:`, error);
      return { category: 'untagged', confidence: 0 };
    }
  }

  private static classifyByFilename(filename: string): VideoCategory | null {
    const lowercaseFilename = filename.toLowerCase();
    
    for (const [category, patterns] of Object.entries(this.CATEGORY_PATTERNS)) {
      if (patterns.some(pattern => pattern.test(lowercaseFilename))) {
        return category as VideoCategory;
      }
    }
    
    return null;
  }

  private static async classifyByMetadata(file: File): Promise<VideoCategory | null> {
    try {
      // Here we would integrate with actual video analysis AI
      // For now, using a simplified scoring system
      const scores = new Map<VideoCategory, number>();
      
      // Initialize scores
      Object.keys(this.VISUAL_INDICATORS).forEach(category => {
        scores.set(category as VideoCategory, 0);
      });

      // Simple scoring based on file properties
      if (file.type.includes('video')) {
        // Add basic scoring logic
        if (file.size > 100 * 1024 * 1024) { // Files larger than 100MB
          scores.set('ceremony', (scores.get('ceremony') || 0) + 0.2);
          scores.set('reception', (scores.get('reception') || 0) + 0.2);
        }
        
        if (file.name.includes('DJI') || file.name.includes('MAVIC')) {
          scores.set('drone', (scores.get('drone') || 0) + 0.5);
        }
      }

      // Find highest scoring category
      let maxScore = 0;
      let bestCategory: VideoCategory | null = null;

      scores.forEach((score, category) => {
        if (score > maxScore && score >= this.CONFIDENCE_THRESHOLD) {
          maxScore = score;
          bestCategory = category;
        }
      });

      return bestCategory;
    } catch (error) {
      logger.error('Error in metadata classification:', error);
      return null;
    }
  }
}