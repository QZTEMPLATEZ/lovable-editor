import { logger } from '../utils/logger';
import { pipeline } from '@huggingface/transformers';
import { ORGANIZER_CONFIG } from '../config/organizerConfig';

export class VideoAnalysisService {
  private static classifier: any = null;
  
  private static async initializeClassifier() {
    if (!this.classifier) {
      try {
        this.classifier = await pipeline(
          'image-classification',
          'microsoft/resnet-50'
        );
        logger.info('Video classifier initialized successfully');
      } catch (error) {
        logger.error('Failed to initialize video classifier:', error);
        throw error;
      }
    }
    return this.classifier;
  }

  private static async extractFrameFromVideo(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      video.autoplay = false;
      video.muted = true;
      video.src = URL.createObjectURL(file);
      
      video.onloadeddata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        video.currentTime = video.duration / 2;
      };
      
      video.onseeked = () => {
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = canvas.toDataURL('image/jpeg', 0.8);
          URL.revokeObjectURL(video.src);
          resolve(imageData);
        } else {
          reject(new Error('Could not get canvas context'));
        }
      };
      
      video.onerror = () => {
        URL.revokeObjectURL(video.src);
        reject(new Error('Failed to load video'));
      };
    });
  }

  private static matchCategoryFromPredictions(predictions: any[]): { category: string; confidence: number } {
    const categoryMatches = new Map<string, number>();
    
    logger.info('Raw predictions:', predictions);

    // Helper function to check for specific visual cues
    const checkVisualCues = (labels: string[], cues: string[]): number => {
      let maxScore = 0;
      for (const prediction of predictions) {
        const label = prediction.label.toLowerCase();
        if (cues.some(cue => label.includes(cue.toLowerCase()))) {
          maxScore = Math.max(maxScore, prediction.score);
        }
      }
      return maxScore;
    };

    // BridePrep detection
    const bridePrepScore = checkVisualCues(
      predictions.map(p => p.label),
      ['woman', 'dress', 'makeup', 'mirror', 'bride', 'wedding dress']
    );
    if (bridePrepScore > 0.3) {
      categoryMatches.set('brideprep', bridePrepScore);
    }

    // GroomPrep detection
    const groomPrepScore = checkVisualCues(
      predictions.map(p => p.label),
      ['man', 'suit', 'tie', 'groom', 'formal wear']
    );
    if (groomPrepScore > 0.3) {
      categoryMatches.set('groomprep', groomPrepScore);
    }

    // Decoration detection
    const decorationScore = checkVisualCues(
      predictions.map(p => p.label),
      ['flower', 'chair', 'table', 'decoration', 'arch', 'venue']
    );
    if (decorationScore > 0.3) {
      categoryMatches.set('decoration', decorationScore);
    }

    // Drone detection
    const droneScore = checkVisualCues(
      predictions.map(p => p.label),
      ['aerial', 'landscape', 'sky', 'building', 'outdoor']
    );
    if (droneScore > 0.3) {
      categoryMatches.set('drone', droneScore);
    }

    // Ceremony detection
    const ceremonyScore = checkVisualCues(
      predictions.map(p => p.label),
      ['ceremony', 'altar', 'church', 'wedding', 'audience']
    );
    if (ceremonyScore > 0.3) {
      categoryMatches.set('ceremony', ceremonyScore);
    }

    // Reception detection
    const receptionScore = checkVisualCues(
      predictions.map(p => p.label),
      ['party', 'dance', 'celebration', 'crowd', 'night']
    );
    if (receptionScore > 0.3) {
      categoryMatches.set('reception', receptionScore);
    }

    // Find best matching category
    let bestCategory = 'untagged';
    let bestConfidence = 0;

    categoryMatches.forEach((confidence, category) => {
      if (confidence > bestConfidence) {
        bestCategory = category;
        bestConfidence = confidence;
      }
    });

    logger.info(`Best category match: ${bestCategory} with confidence ${bestConfidence}`);
    return {
      category: bestCategory,
      confidence: bestConfidence
    };
  }

  static async analyzeVideo(file: File): Promise<{ category: string; confidence: number }> {
    try {
      logger.info(`Starting analysis for file: ${file.name}`);
      
      // Initialize classifier
      const classifier = await this.initializeClassifier();
      
      // Extract frame from video
      const frameImage = await this.extractFrameFromVideo(file);
      logger.info(`Frame extracted successfully for ${file.name}`);
      
      // Get predictions from classifier
      const predictions = await classifier(frameImage);
      logger.info(`Predictions received for ${file.name}:`, predictions);
      
      // Match predictions to categories
      const result = this.matchCategoryFromPredictions(predictions);
      
      // If confidence is too low, try filename-based classification
      if (result.confidence < 0.3) {
        logger.info(`Low confidence classification for ${file.name}, checking filename`);
        const filenameResult = this.classifyByFilename(file.name);
        if (filenameResult.confidence > result.confidence) {
          logger.info(`Using filename-based classification for ${file.name}: ${filenameResult.category}`);
          return filenameResult;
        }
      }
      
      logger.info(`Final classification for ${file.name}: ${result.category} (confidence: ${result.confidence})`);
      return result;
    } catch (error) {
      logger.error(`Error analyzing file ${file.name}:`, error);
      // Fallback to filename-based classification on error
      return this.classifyByFilename(file.name);
    }
  }

  private static classifyByFilename(filename: string): { category: string; confidence: number } {
    const lowerFilename = filename.toLowerCase();
    
    // Define patterns for each category
    const patterns = {
      brideprep: ['bride', 'noiva', 'makeup', 'maquiagem', 'getting_ready'],
      groomprep: ['groom', 'noivo', 'suit', 'terno'],
      decoration: ['decor', 'flores', 'flowers', 'venue'],
      drone: ['drone', 'aerial', 'dji', 'mavic'],
      ceremony: ['ceremony', 'cerimonia', 'altar', 'church'],
      reception: ['reception', 'party', 'festa', 'dance']
    };

    for (const [category, keywords] of Object.entries(patterns)) {
      if (keywords.some(keyword => lowerFilename.includes(keyword))) {
        logger.info(`Filename match found for ${filename}: ${category}`);
        return {
          category,
          confidence: 0.6 // Moderate confidence for filename-based classification
        };
      }
    }

    logger.info(`No filename match found for ${filename}, marking as untagged`);
    return {
      category: 'untagged',
      confidence: 0.1
    };
  }
}

export const videoAnalysisService = {
  analyzeVideo: VideoAnalysisService.analyzeVideo.bind(VideoAnalysisService)
};