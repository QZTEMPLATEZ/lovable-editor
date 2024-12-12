import { logger } from '../utils/logger';
import { BaseAnalysisService } from './analysis/BaseAnalysisService';
import { PrepAnalyzer } from './analysis/PrepAnalyzer';
import { DecorationAnalyzer } from './analysis/DecorationAnalyzer';
import { DroneAnalyzer } from './analysis/DroneAnalyzer';

export class VideoAnalysisService extends BaseAnalysisService {
  private static instance: VideoAnalysisService;

  private constructor() {
    super();
  }

  static getInstance(): VideoAnalysisService {
    if (!VideoAnalysisService.instance) {
      VideoAnalysisService.instance = new VideoAnalysisService();
    }
    return VideoAnalysisService.instance;
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
      
      // Initialize counters for each category
      const categoryScores = {
        BridePrep: { frames: 0, confidence: 0 },
        GroomPrep: { frames: 0, confidence: 0 },
        Decoration: { frames: 0, confidence: 0 },
        Drone: { frames: 0, confidence: 0 },
        Ceremony: { frames: 0, confidence: 0 },
        Reception: { frames: 0, confidence: 0 }
      };
      
      // Analyze each frame
      for (const frame of frames) {
        const imageData = frame.toDataURL('image/jpeg', 0.8);
        const predictions = await this.classifier(imageData);
        
        // Check each category with lower confidence thresholds
        const bridePrep = PrepAnalyzer.isBridePrepScene(predictions);
        const groomPrep = PrepAnalyzer.isGroomPrepScene(predictions);
        const decoration = DecorationAnalyzer.isDecorationScene(predictions);
        const drone = DroneAnalyzer.isDroneShot(predictions);

        // Update scores with lower thresholds
        if (bridePrep.isPrep || bridePrep.confidence > 0.3) {
          categoryScores.BridePrep.frames++;
          categoryScores.BridePrep.confidence += bridePrep.confidence;
        }

        if (groomPrep.isPrep || groomPrep.confidence > 0.3) {
          categoryScores.GroomPrep.frames++;
          categoryScores.GroomPrep.confidence += groomPrep.confidence;
        }

        if (decoration.isDecoration || decoration.confidence > 0.3) {
          categoryScores.Decoration.frames++;
          categoryScores.Decoration.confidence += decoration.confidence;
        }

        if (drone.isDrone || drone.confidence > 0.3) {
          categoryScores.Drone.frames++;
          categoryScores.Drone.confidence += drone.confidence;
        }

        // Basic ceremony detection (can be improved with a dedicated analyzer)
        if (predictions.some(p => 
          p.label.toLowerCase().includes('ceremony') || 
          p.label.toLowerCase().includes('wedding') ||
          p.label.toLowerCase().includes('altar')
        )) {
          categoryScores.Ceremony.frames++;
          categoryScores.Ceremony.confidence += 0.7; // Default confidence for ceremony scenes
        }

        // Basic reception detection
        if (predictions.some(p => 
          p.label.toLowerCase().includes('party') || 
          p.label.toLowerCase().includes('reception') ||
          p.label.toLowerCase().includes('dance')
        )) {
          categoryScores.Reception.frames++;
          categoryScores.Reception.confidence += 0.7; // Default confidence for reception scenes
        }
      }
      
      // Calculate average confidence and frame ratios for each category
      const totalFrames = frames.length;
      const categoryRatios = Object.entries(categoryScores).map(([category, scores]) => ({
        category,
        ratio: scores.frames / totalFrames,
        avgConfidence: scores.frames > 0 ? scores.confidence / scores.frames : 0
      }));

      // Sort by ratio and confidence to find the best match
      categoryRatios.sort((a, b) => 
        (b.ratio * b.avgConfidence) - (a.ratio * a.avgConfidence)
      );

      // Lower the threshold for classification
      const bestMatch = categoryRatios[0];
      if (bestMatch.ratio > 0.15 && bestMatch.avgConfidence > 0.3) {
        logger.info(`Classified ${file.name} as ${bestMatch.category} with confidence ${bestMatch.avgConfidence}`);
        return bestMatch.category;
      }
      
      logger.info(`Could not confidently classify ${file.name}, marking as Untagged`);
      return 'Untagged';
      
    } catch (error) {
      logger.error(`Error analyzing video ${file.name}:`, error);
      return 'Untagged';
    }
  }
}

export const videoAnalysisService = VideoAnalysisService.getInstance();