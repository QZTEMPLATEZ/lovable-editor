import { VideoCategory } from '../types/video';
import { logger } from '../utils/logger';

export class VideoAnalysisService {
  private static readonly CONFIDENCE_THRESHOLD = 0.3;
  
  private static readonly CATEGORY_PATTERNS = {
    brideprep: [/bride.*prep/i, /noiva.*prep/i, /makeup/i, /maquiagem/i, /getting.*ready/i, /bride/i, /noiva/i],
    groomprep: [/groom.*prep/i, /noivo.*prep/i, /suit/i, /terno/i, /groom/i, /noivo/i],
    decoration: [/decor/i, /flores/i, /flowers/i, /venue/i, /local/i, /details/i, /detalhes/i],
    drone: [/drone/i, /aerial/i, /dji/i, /mavic/i, /air2s/i, /phantom/i],
    ceremony: [/cerim[oôó]nia/i, /ceremony/i, /altar/i, /church/i, /igreja/i, /wedding/i, /casamento/i],
    reception: [/recep[cç][aã]o/i, /reception/i, /party/i, /festa/i, /dance/i, /first.*dance/i, /primeira.*danca/i]
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

      // If no clear classification, use heuristics to make a best guess
      const bestGuessCategory = this.makeBestGuess(file);
      logger.info(`File ${file.name} classified as ${bestGuessCategory} based on best guess`);
      return { category: bestGuessCategory, confidence: 0.4 };
    } catch (error) {
      logger.error(`Error analyzing file ${file.name}:`, error);
      return { category: 'untagged', confidence: 0.3 }; // Default to untagged if all else fails
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
      const scores = new Map<VideoCategory, number>();
      
      Object.keys(this.CATEGORY_PATTERNS).forEach(category => {
        scores.set(category as VideoCategory, 0);
      });

      if (file.type.includes('video')) {
        if (file.size > 100 * 1024 * 1024) {
          scores.set('ceremony', (scores.get('ceremony') || 0) + 0.2);
          scores.set('reception', (scores.get('reception') || 0) + 0.2);
        }
        
        if (file.name.includes('DJI') || file.name.includes('MAVIC')) {
          scores.set('drone', (scores.get('drone') || 0) + 0.5);
        }
      }

      let maxScore = 0;
      let bestCategory: VideoCategory | null = null;

      scores.forEach((score, category) => {
        if (score > maxScore) {
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

  private static makeBestGuess(file: File): VideoCategory {
    const timeBasedCategories: VideoCategory[] = ['brideprep', 'groomprep', 'decoration', 'ceremony', 'reception'];
    const fileNumber = parseInt(file.name.replace(/\D/g, '')) || 0;
    const index = Math.floor((fileNumber % 100) / 20);
    return timeBasedCategories[index] || 'untagged';
  }
}

export const videoAnalysisService = {
  analyzeVideo: VideoAnalysisService.analyzeVideo.bind(VideoAnalysisService)
};