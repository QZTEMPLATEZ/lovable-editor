import { logger } from '../utils/logger';
import { BaseAnalysisService } from './analysis/BaseAnalysisService';
import { PrepAnalyzer } from './analysis/PrepAnalyzer';
import { DecorationAnalyzer } from './analysis/DecorationAnalyzer';
import { DroneAnalyzer } from './analysis/DroneAnalyzer';
import { CeremonyAnalyzer } from './analysis/CeremonyAnalyzer';

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
      
      let bridePrepFrames = 0;
      let groomPrepFrames = 0;
      let decorationFrames = 0;
      let droneFrames = 0;
      let ceremonyFrames = 0;
      let totalBridePrepConfidence = 0;
      let totalGroomPrepConfidence = 0;
      let totalDecorationConfidence = 0;
      let totalDroneConfidence = 0;
      let totalCeremonyConfidence = 0;
      
      for (const frame of frames) {
        const imageData = frame.toDataURL('image/jpeg', 0.8);
        const predictions = await this.classifier(imageData);
        
        const bridePrep = PrepAnalyzer.isBridePrepScene(predictions);
        const groomPrep = PrepAnalyzer.isGroomPrepScene(predictions);
        const decoration = DecorationAnalyzer.isDecorationScene(predictions);
        const drone = DroneAnalyzer.isDroneShot(predictions);
        const ceremony = CeremonyAnalyzer.isCeremonyScene(predictions);

        if (bridePrep.isPrep) {
          bridePrepFrames++;
          totalBridePrepConfidence += bridePrep.confidence;
        }

        if (groomPrep.isPrep) {
          groomPrepFrames++;
          totalGroomPrepConfidence += groomPrep.confidence;
        }

        if (decoration.isDecoration) {
          decorationFrames++;
          totalDecorationConfidence += decoration.confidence;
        }

        if (drone.isDrone) {
          droneFrames++;
          totalDroneConfidence += drone.confidence;
        }

        if (ceremony.isCeremony) {
          ceremonyFrames++;
          totalCeremonyConfidence += ceremony.confidence;
        }
      }
      
      const bridePrepRatio = bridePrepFrames / frames.length;
      const groomPrepRatio = groomPrepFrames / frames.length;
      const decorationRatio = decorationFrames / frames.length;
      const droneRatio = droneFrames / frames.length;
      const ceremonyRatio = ceremonyFrames / frames.length;
      
      const avgBridePrepConfidence = bridePrepFrames > 0 ? totalBridePrepConfidence / bridePrepFrames : 0;
      const avgGroomPrepConfidence = groomPrepFrames > 0 ? totalGroomPrepConfidence / groomPrepFrames : 0;
      const avgDecorationConfidence = decorationFrames > 0 ? totalDecorationConfidence / decorationFrames : 0;
      const avgDroneConfidence = droneFrames > 0 ? totalDroneConfidence / droneFrames : 0;
      const avgCeremonyConfidence = ceremonyFrames > 0 ? totalCeremonyConfidence / ceremonyFrames : 0;
      
      logger.info(`Video ${file.name} analysis results:`, {
        bridePrepRatio,
        groomPrepRatio,
        decorationRatio,
        droneRatio,
        ceremonyRatio,
        avgBridePrepConfidence,
        avgGroomPrepConfidence,
        avgDecorationConfidence,
        avgDroneConfidence,
        avgCeremonyConfidence
      });

      // Determine the most likely category based on ratio and confidence
      if (ceremonyRatio > 0.4 && avgCeremonyConfidence > 0.7) {
        return 'Ceremony';
      } else if (droneRatio > 0.4 && avgDroneConfidence > 0.5) {
        return 'DroneFootage';
      } else if (decorationRatio > 0.4 && avgDecorationConfidence > 0.5) {
        return 'Decoration';
      } else if (bridePrepRatio > 0.3 && avgBridePrepConfidence > 0.4) {
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
