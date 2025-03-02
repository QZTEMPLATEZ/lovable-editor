import { logger } from '../utils/logger';
import { ModelService } from './analysis/ModelService';
import { FrameExtractor } from './analysis/FrameExtractor';
import { CategoryMatcher } from './analysis/CategoryMatcher';

export class VideoAnalysisService {
  static async analyzeVideo(file: File): Promise<{ category: string; confidence: number }> {
    try {
      logger.info(`Starting comprehensive analysis for file: ${file.name}`);
      
      // Initialize classifier
      const classifier = await ModelService.initializeClassifier();
      
      // Extract multiple frames for better analysis
      const framePromises = [0.25, 0.5, 0.75].map(position => 
        FrameExtractor.extractFrameFromVideo(file, position)
      );
      
      const frames = await Promise.all(framePromises);
      logger.info(`Extracted ${frames.length} frames for analysis from ${file.name}`);
      
      // Analyze each frame
      const predictionPromises = frames.map(async frame => {
        const predictions = await classifier(frame);
        return predictions.map((p: any) => ({ ...p, filename: file.name }));
      });
      
      const allPredictions = await Promise.all(predictionPromises);
      const combinedPredictions = allPredictions.flat();
      
      logger.info(`Combined predictions for ${file.name}:`, combinedPredictions);
      
      // Get category match using all predictions
      const result = CategoryMatcher.matchCategoryFromPredictions(combinedPredictions);
      
      // Ensure we always return a category
      if (!result.category || result.confidence < 0.2) {
        logger.info(`Low confidence for ${file.name}, marking as untagged`);
        return { category: 'Untagged', confidence: 0.1 };
      }
      
      logger.info(`Final classification for ${file.name}: ${result.category} (confidence: ${result.confidence})`);
      return result;
      
    } catch (error) {
      logger.error(`Error analyzing file ${file.name}:`, error);
      // Always return untagged instead of throwing error
      return { category: 'Untagged', confidence: 0.1 };
    }
  }
}

export const videoAnalysisService = {
  analyzeVideo: VideoAnalysisService.analyzeVideo.bind(VideoAnalysisService)
};