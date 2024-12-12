import { pipeline } from '@huggingface/transformers';
import { ORGANIZER_CONFIG } from '../config/organizerConfig';
import { logger } from '../utils/logger';

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
          'microsoft/resnet-50',
          { quantized: false }
        );
        logger.info('Video analysis classifier initialized successfully');
      }
      return true;
    } catch (error) {
      logger.error('Failed to initialize video classifier:', error);
      return false;
    }
  }

  private async extractFrames(file: File): Promise<HTMLCanvasElement[]> {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);
    await new Promise((resolve) => (video.onloadedmetadata = resolve));

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const frames: HTMLCanvasElement[] = [];
    
    // Extract 5 frames from different parts of the video
    const duration = video.duration;
    const framePoints = [0.1, 0.3, 0.5, 0.7, 0.9];
    
    for (const point of framePoints) {
      video.currentTime = duration * point;
      await new Promise((resolve) => (video.onseeked = resolve));
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      
      const frameCanvas = document.createElement('canvas');
      frameCanvas.width = 224;
      frameCanvas.height = 224;
      const frameCtx = frameCanvas.getContext('2d')!;
      frameCtx.drawImage(canvas, 0, 0, 224, 224);
      
      frames.push(frameCanvas);
    }

    URL.revokeObjectURL(video.src);
    return frames;
  }

  async analyzeVideo(file: File): Promise<string> {
    try {
      await this.initialize();
      const frames = await this.extractFrames(file);
      
      let categoryScores = new Map<string, number>();
      
      for (const frame of frames) {
        const imageData = frame.toDataURL('image/jpeg');
        const predictions = await this.classifier(imageData);
        
        // Analyze predictions against each category's visual cues
        for (const [category, config] of Object.entries(ORGANIZER_CONFIG.analysis.categories)) {
          let maxScore = 0;
          
          for (const prediction of predictions) {
            const label = prediction.label.toLowerCase();
            for (const cue of config.visualCues) {
              if (label.includes(cue.toLowerCase())) {
                maxScore = Math.max(maxScore, prediction.score);
              }
            }
          }
          
          if (maxScore >= config.confidence) {
            categoryScores.set(
              category,
              (categoryScores.get(category) || 0) + maxScore
            );
          }
        }
      }
      
      // Determine the best category based on accumulated scores
      let bestCategory = 'Extras';
      let bestScore = 0;
      
      categoryScores.forEach((score, category) => {
        if (score > bestScore) {
          bestScore = score;
          bestCategory = category;
        }
      });
      
      logger.info(`Video ${file.name} classified as ${bestCategory} with score ${bestScore}`);
      return bestCategory;
      
    } catch (error) {
      logger.error(`Error analyzing video ${file.name}:`, error);
      return 'Extras';
    }
  }
}

export const videoAnalysisService = VideoAnalysisService.getInstance();