import { pipeline } from '@huggingface/transformers';
import { logger } from '../utils/logger';
import { ORGANIZER_CONFIG } from '../config/organizerConfig';

export class VideoAnalysisService {
  private static instance: VideoAnalysisService;
  private classifier: any = null;

  private constructor() {}

  static getInstance(): VideoAnalysisService {
    if (!VideoAnalysisService.instance) {
      VideoAnalysisService.instance = new VideoAnalysisService();
    }
    return VideoAnalysisService.instance;
  }

  async initialize() {
    try {
      if (!this.classifier) {
        this.classifier = await pipeline(
          'image-classification',
          'Xenova/vit-base-patch16-224',
          { revision: 'main' }
        );
        logger.info('Video analysis classifier initialized successfully');
      }
      return true;
    } catch (error) {
      logger.error('Failed to initialize video classifier:', error);
      return false;
    }
  }

  private async extractFrames(file: File): Promise<ImageData[]> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.crossOrigin = "anonymous";
      video.playsInline = true;
      video.muted = true;
      
      const frames: ImageData[] = [];
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true })!;

      video.onloadedmetadata = async () => {
        canvas.width = 224;
        canvas.height = 224;
        
        const framePoints = Array.from(
          { length: ORGANIZER_CONFIG.processing.frameExtractionCount },
          (_, i) => i / (ORGANIZER_CONFIG.processing.frameExtractionCount - 1)
        );

        try {
          await video.play();
          
          for (const point of framePoints) {
            video.currentTime = video.duration * point;
            await new Promise(resolve => (video.onseeked = resolve));
            
            ctx.drawImage(video, 0, 0, 224, 224);
            frames.push(ctx.getImageData(0, 0, 224, 224));
          }

          video.pause();
          URL.revokeObjectURL(video.src);
          resolve(frames);
        } catch (error) {
          reject(error);
        }
      };

      video.onerror = reject;
      const objectUrl = URL.createObjectURL(file);
      video.src = objectUrl;
    });
  }

  async analyzeVideo(file: File): Promise<string> {
    try {
      const initialized = await this.initialize();
      if (!initialized || !this.classifier) {
        logger.error('Classifier not initialized properly');
        return 'BridePrep';
      }

      const frames = await this.extractFrames(file);
      logger.info(`Analyzing ${frames.length} frames for video: ${file.name}`);
      
      let categoryScores = new Map<string, number>();
      let predictionConfidence = new Map<string, number>();
      
      for (const frame of frames) {
        const predictions = await this.classifier(frame);
        
        for (const [category, config] of Object.entries(ORGANIZER_CONFIG.analysis.categories)) {
          let maxScore = 0;
          let totalScore = 0;
          let matchCount = 0;
          
          for (const prediction of predictions) {
            const label = prediction.label.toLowerCase();
            for (const cue of config.visualCues) {
              if (label.includes(cue.toLowerCase())) {
                maxScore = Math.max(maxScore, prediction.score);
                totalScore += prediction.score;
                matchCount++;
              }
            }
          }
          
          if (matchCount > 0) {
            const avgScore = totalScore / matchCount;
            const weightedScore = (maxScore * 0.7 + avgScore * 0.3) * config.confidence;
            
            categoryScores.set(
              category,
              (categoryScores.get(category) || 0) + weightedScore
            );
            predictionConfidence.set(
              category,
              Math.max(predictionConfidence.get(category) || 0, weightedScore)
            );
          }
        }
      }
      
      let bestCategory = 'BridePrep';
      let bestScore = 0;
      
      categoryScores.forEach((score, category) => {
        const confidence = predictionConfidence.get(category) || 0;
        const finalScore = score * confidence;
        
        if (finalScore > bestScore) {
          bestScore = finalScore;
          bestCategory = category;
        }
      });
      
      logger.info(`Video ${file.name} classified as ${bestCategory} with score ${bestScore}`);
      return bestCategory;
      
    } catch (error) {
      logger.error(`Error analyzing video ${file.name}:`, error);
      return 'BridePrep';
    }
  }
}

export const videoAnalysisService = VideoAnalysisService.getInstance();