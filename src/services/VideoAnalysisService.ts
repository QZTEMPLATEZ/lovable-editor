import { VideoCategory } from '../types/video';
import { logger } from '../utils/logger';
import { pipeline } from '@huggingface/transformers';
import { ORGANIZER_CONFIG } from '../config/organizerConfig';

export class VideoAnalysisService {
  private static classifier: any = null;
  private static readonly CONFIDENCE_THRESHOLD = 0.3;
  
  private static async initializeClassifier() {
    if (!this.classifier) {
      try {
        this.classifier = await pipeline(
          'image-classification',
          'Xenova/vit-base-patch16-224'
        );
        logger.info('Video classifier initialized successfully');
      } catch (error) {
        logger.error('Failed to initialize video classifier:', error);
        throw error;
      }
    }
    return this.classifier;
  }

  private static async extractFrameFromVideo(file: File): Promise<HTMLCanvasElement> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      
      video.onloadeddata = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        
        // Capture frame from middle of video
        video.currentTime = video.duration / 2;
        
        video.onseeked = () => {
          ctx?.drawImage(video, 0, 0);
          URL.revokeObjectURL(video.src);
          resolve(canvas);
        };
      };
      
      video.onerror = () => {
        URL.revokeObjectURL(video.src);
        reject(new Error('Failed to load video'));
      };
    });
  }

  private static matchCategoryFromPredictions(predictions: any[]): { category: VideoCategory; confidence: number } {
    const categoryMatches = new Map<VideoCategory, number>();

    for (const prediction of predictions) {
      const label = prediction.label.toLowerCase();
      const score = prediction.score;

      // Check each category's visual cues
      for (const [category, config] of Object.entries(ORGANIZER_CONFIG.analysis.categories)) {
        for (const cue of config.visualCues) {
          if (label.includes(cue.toLowerCase())) {
            const currentScore = categoryMatches.get(category as VideoCategory) || 0;
            categoryMatches.set(category as VideoCategory, Math.max(currentScore, score));
          }
        }
      }
    }

    // Find best matching category
    let bestCategory: VideoCategory = 'untagged';
    let bestConfidence = 0;

    categoryMatches.forEach((confidence, category) => {
      if (confidence > bestConfidence) {
        bestCategory = category;
        bestConfidence = confidence;
      }
    });

    return {
      category: bestCategory,
      confidence: bestConfidence
    };
  }

  static async analyzeVideo(file: File): Promise<{ category: VideoCategory; confidence: number }> {
    try {
      logger.info(`Starting analysis for file: ${file.name}`);
      
      // Initialize classifier
      const classifier = await this.initializeClassifier();
      
      // Extract frame from video
      const frame = await this.extractFrameFromVideo(file);
      
      // Get predictions from classifier
      const predictions = await classifier(frame);
      logger.info(`Predictions for ${file.name}:`, predictions);
      
      // Match predictions to categories
      const result = this.matchCategoryFromPredictions(predictions);
      
      if (result.confidence < this.CONFIDENCE_THRESHOLD) {
        logger.info(`Low confidence classification for ${file.name}, falling back to filename analysis`);
        const filenameResult = this.classifyByFilename(file.name);
        if (filenameResult) {
          return filenameResult;
        }
      }
      
      logger.info(`File ${file.name} classified as ${result.category} with confidence ${result.confidence}`);
      return result;
    } catch (error) {
      logger.error(`Error analyzing file ${file.name}:`, error);
      return { category: 'untagged', confidence: 0 };
    }
  }

  private static classifyByFilename(filename: string): { category: VideoCategory; confidence: number } | null {
    const patterns = {
      brideprep: [/bride.*prep/i, /noiva.*prep/i, /makeup/i, /maquiagem/i],
      groomprep: [/groom.*prep/i, /noivo.*prep/i, /suit/i, /terno/i],
      decoration: [/decor/i, /flores/i, /flowers/i, /venue/i],
      drone: [/drone/i, /aerial/i, /dji/i, /mavic/i],
      ceremony: [/cerim[oôó]nia/i, /ceremony/i, /altar/i, /church/i],
      reception: [/recep[cç][aã]o/i, /reception/i, /party/i, /festa/i]
    };

    const lowercaseFilename = filename.toLowerCase();
    
    for (const [category, categoryPatterns] of Object.entries(patterns)) {
      if (categoryPatterns.some(pattern => pattern.test(lowercaseFilename))) {
        return {
          category: category as VideoCategory,
          confidence: 0.7 // Moderate confidence for filename-based classification
        };
      }
    }
    
    return null;
  }
}

export const videoAnalysisService = {
  analyzeVideo: VideoAnalysisService.analyzeVideo.bind(VideoAnalysisService)
};