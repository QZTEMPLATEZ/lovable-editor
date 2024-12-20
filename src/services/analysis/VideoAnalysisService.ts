import { logger } from '../../utils/logger';
import { FrameExtractor } from '../analysis/FrameExtractor';
import { PrepAnalyzer } from './analyzers/PrepAnalyzer';
import { DecorationAnalyzer } from './analyzers/DecorationAnalyzer';
import { DroneAnalyzer } from './analyzers/DroneAnalyzer';
import { CategoryMatcher } from './core/CategoryMatcher';
import { BaseVideoAnalyzer } from './core/BaseVideoAnalyzer';

export class VideoAnalysisService extends BaseVideoAnalyzer {
  private prepAnalyzer: PrepAnalyzer;
  private decorationAnalyzer: DecorationAnalyzer;
  private droneAnalyzer: DroneAnalyzer;

  constructor() {
    super();
    this.prepAnalyzer = new PrepAnalyzer();
    this.decorationAnalyzer = new DecorationAnalyzer();
    this.droneAnalyzer = new DroneAnalyzer();
  }

  async analyzeVideo(file: File): Promise<{ category: string; confidence: number }> {
    try {
      logger.info(`Starting analysis for file: ${file.name}`);
      
      // Extract only key frames for efficient analysis
      const framePositions = [0.25]; // Analyze only one frame at 25% of the video
      const framePromises = framePositions.map(position => 
        FrameExtractor.extractFrameFromVideo(file, position)
      );
      
      const frames = await Promise.all(framePromises);
      logger.info(`Extracted ${frames.length} frame for analysis from ${file.name}`);
      
      // Initialize classifier if needed
      await this.initializeClassifier();
      
      // Analyze frame with optimized settings
      const predictions = await this.analyzePredictions(frames);
      
      // Quick category analysis
      const [bridePrep, groomPrep, decoration, drone] = await Promise.all([
        this.prepAnalyzer.analyzePrepScene(predictions, 'bride'),
        this.prepAnalyzer.analyzePrepScene(predictions, 'groom'),
        this.decorationAnalyzer.analyzeDecorationScene(predictions),
        this.droneAnalyzer.analyzeDroneShot(predictions)
      ]);

      // Get best category match
      const result = CategoryMatcher.getBestCategory({
        bridePrep,
        groomPrep,
        decoration,
        drone,
        filename: file.name,
        predictions
      });

      logger.info(`Classification for ${file.name}: ${result.category} (confidence: ${result.confidence})`);
      return result;
      
    } catch (error) {
      logger.error(`Error analyzing file ${file.name}:`, error);
      return { category: 'OtherMoments', confidence: 0.1 };
    }
  }

  protected async analyzePredictions(frames: string[]): Promise<any[]> {
    if (!this.classifier) {
      await this.initializeClassifier();
    }
    
    const predictionPromises = frames.map(async frame => {
      return await this.classifier(frame, {
        topk: 5, // Return top 5 predictions
        threshold: 0.1 // Lower threshold to catch more potential matches
      });
    });
    
    const allPredictions = await Promise.all(predictionPromises);
    return allPredictions.flat();
  }
}

export const videoAnalysisService = new VideoAnalysisService();