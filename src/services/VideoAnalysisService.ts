import { logger } from '../utils/logger';
import { ModelService } from './analysis/ModelService';
import { FrameExtractor } from './analysis/FrameExtractor';
import { CategoryMatcher } from './analysis/CategoryMatcher';

export class VideoAnalysisService {
  static async analyzeVideo(file: File): Promise<{ category: string; confidence: number }> {
    try {
      logger.info(`Starting analysis for file: ${file.name}`);
      
      // Initialize classifier
      const classifier = await ModelService.initializeClassifier();
      
      // Extract frame from video
      const frameImage = await FrameExtractor.extractFrameFromVideo(file);
      logger.info(`Frame extracted successfully for ${file.name}`);
      
      // Get predictions from classifier
      const predictions = await classifier(frameImage);
      logger.info(`Predictions received for ${file.name}:`, predictions);
      
      // Match predictions to categories
      const result = CategoryMatcher.matchCategoryFromPredictions(predictions);
      
      // If confidence is too low, try filename-based classification
      if (result.confidence < 0.3) {
        logger.info(`Low confidence classification for ${file.name}, checking filename`);
        const filenameResult = CategoryMatcher.classifyByFilename(file.name);
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
      return CategoryMatcher.classifyByFilename(file.name);
    }
  }
}

export const videoAnalysisService = {
  analyzeVideo: VideoAnalysisService.analyzeVideo.bind(VideoAnalysisService)
};