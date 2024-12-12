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

  private async extractFrames(file: File): Promise<HTMLCanvasElement[]> {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);
    
    await new Promise((resolve, reject) => {
      video.onloadedmetadata = resolve;
      video.onerror = reject;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const frames: HTMLCanvasElement[] = [];
    
    const framePoints = Array.from({ length: 20 }, 
      (_, i) => i / 19);
    
    const duration = video.duration;
    
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
      frameCtx.drawImage(
        canvas, 
        0, 0, canvas.width, canvas.height,
        0, 0, 224, 224
      );
      
      frames.push(frameCanvas);
    }

    URL.revokeObjectURL(video.src);
    return frames;
  }

  private isGroomPrepScene(predictions: any[]): { isPrep: boolean; confidence: number } {
    const groomPrepCues = ORGANIZER_CONFIG.analysis.categories.GroomPrep.visualCues;
    const requiredCues = ORGANIZER_CONFIG.analysis.categories.GroomPrep.requiredCues;

    let maxScore = 0;
    let totalScore = 0;
    let matchCount = 0;
    let hasRequiredCue = false;

    for (const prediction of predictions) {
      const label = prediction.label.toLowerCase();
      
      for (const requiredCue of requiredCues) {
        if (label.includes(requiredCue.toLowerCase())) {
          hasRequiredCue = true;
          break;
        }
      }

      for (const cue of groomPrepCues) {
        if (label.includes(cue.toLowerCase())) {
          maxScore = Math.max(maxScore, prediction.score);
          totalScore += prediction.score;
          matchCount++;
        }
      }
    }

    if (matchCount === 0 || !hasRequiredCue) return { isPrep: false, confidence: 0 };

    const avgScore = totalScore / matchCount;
    const confidence = (maxScore * 0.7 + avgScore * 0.3);

    return {
      isPrep: confidence > ORGANIZER_CONFIG.analysis.categories.GroomPrep.confidence,
      confidence
    };
  }

  private isBridePrepScene(predictions: any[]): { isPrep: boolean; confidence: number } {
    const bridePrepCues = [
      'bride', 'wedding dress', 'makeup', 'mirror', 'getting ready',
      'hair styling', 'beauty salon', 'dressing room', 'jewelry', 'veil',
      'woman face', 'female portrait', 'bridal preparation'
    ];

    let maxScore = 0;
    let totalScore = 0;
    let matchCount = 0;

    for (const prediction of predictions) {
      const label = prediction.label.toLowerCase();
      for (const cue of bridePrepCues) {
        if (label.includes(cue.toLowerCase())) {
          maxScore = Math.max(maxScore, prediction.score);
          totalScore += prediction.score;
          matchCount++;
        }
      }
    }

    if (matchCount === 0) return { isPrep: false, confidence: 0 };

    const avgScore = totalScore / matchCount;
    const confidence = (maxScore * 0.7 + avgScore * 0.3);

    return {
      isPrep: confidence > 0.4,
      confidence
    };
  }

  async analyzeVideo(file: File): Promise<string> {
    try {
      const initialized = await this.initialize();
      if (!initialized || !this.classifier) {
        logger.error('Classifier not initialized properly');
        return 'Untagged';
      }

      const frames = await this.extractFrames(file);
      logger.info(`Analyzing ${frames.length} frames for video: ${file.name}`);
      
      let bridePrepFrames = 0;
      let groomPrepFrames = 0;
      let totalBridePrepConfidence = 0;
      let totalGroomPrepConfidence = 0;
      
      for (const frame of frames) {
        const imageData = frame.toDataURL('image/jpeg', 0.8);
        const predictions = await this.classifier(imageData);
        
        const bridePrep = this.isBridePrepScene(predictions);
        const groomPrep = this.isGroomPrepScene(predictions);

        if (bridePrep.isPrep) {
          bridePrepFrames++;
          totalBridePrepConfidence += bridePrep.confidence;
        }

        if (groomPrep.isPrep) {
          groomPrepFrames++;
          totalGroomPrepConfidence += groomPrep.confidence;
        }
      }
      
      const bridePrepRatio = bridePrepFrames / frames.length;
      const groomPrepRatio = groomPrepFrames / frames.length;
      
      const avgBridePrepConfidence = bridePrepFrames > 0 ? totalBridePrepConfidence / bridePrepFrames : 0;
      const avgGroomPrepConfidence = groomPrepFrames > 0 ? totalGroomPrepConfidence / groomPrepFrames : 0;
      
      logger.info(`Video ${file.name} analysis results:`, {
        bridePrepRatio,
        groomPrepRatio,
        avgBridePrepConfidence,
        avgGroomPrepConfidence
      });

      if (bridePrepRatio > 0.3 && avgBridePrepConfidence > 0.4) {
        return 'BridePrep';
      } else if (groomPrepRatio > 0.3 && avgGroomPrepConfidence > 0.4) {
        return 'GroomPrep';
      }
      
      return 'Untagged';
      
    } catch (error) {
      logger.error(`Error analyzing video ${file.name}:`, error);
      return 'Untagged';
    }
  }
}

export const videoAnalysisService = VideoAnalysisService.getInstance();
