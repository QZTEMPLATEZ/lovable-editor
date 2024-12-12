import { logger } from '../../utils/logger';
import { ModelService } from './ModelService';
import { FrameExtractor } from './FrameExtractor';
import { CategoryMatcher } from './CategoryMatcher';

interface Prediction {
  label: string;
  score: number;
}

export class VideoAnalysisService {
  private static readonly MIN_CONFIDENCE_THRESHOLD = 0.2;
  private static readonly MAX_CONFIDENCE_THRESHOLD = 0.6;

  static async analyzeVideo(file: File): Promise<{ category: string; confidence: number }> {
    try {
      logger.info(`Starting comprehensive analysis for file: ${file.name}`);
      
      // Initialize classifier
      const classifier = await ModelService.initializeClassifier();
      
      // Extract frames using the improved FrameExtractor
      const frames = await FrameExtractor.extractMultipleFrames(file);
      logger.info(`Extracted ${frames.length} frames for analysis from ${file.name}`);
      
      // Analyze each frame
      const predictionPromises = frames.map(async frame => {
        const predictions = await classifier(frame);
        return predictions.map((p: any) => ({ ...p, filename: file.name }));
      });
      
      const allPredictions = await Promise.all(predictionPromises);
      const predictions = allPredictions.flat() as Prediction[];
      
      // Group predictions by label and aggregate scores
      const groupedConfidence = predictions.reduce((acc: Record<string, number>, p: Prediction) => {
        acc[p.label] = (acc[p.label] || 0) + p.score;
        return acc;
      }, {});
      
      logger.info(`Grouped confidences for ${file.name}:`, groupedConfidence);
      
      // Calculate prediction diversity for dynamic threshold
      const scores = Object.values(groupedConfidence);
      const diversity = Math.max(...scores) - Math.min(...scores);
      const dynamicThreshold = this.calculateDynamicThreshold(diversity);
      
      logger.info(`Prediction diversity: ${diversity}, Dynamic threshold: ${dynamicThreshold}`);
      
      // Find the best prediction using typed parameters
      const bestPrediction = Object.entries(groupedConfidence).reduce(
        (best: { label: string; score: number }, [label, score]: [string, number]) => 
          score > best.score ? { label, score } : best,
        { label: 'untagged', score: 0 }
      );
      
      logger.info(`Best prediction for ${file.name}: ${bestPrediction.label} (confidence: ${bestPrediction.score})`);
      
      // Return untagged if confidence is below dynamic threshold
      if (bestPrediction.score < dynamicThreshold) {
        logger.info(`Low confidence for ${file.name}, marking as untagged`);
        return { category: 'untagged', confidence: 0.1 };
      }
      
      // Get category match using the best prediction
      const result = CategoryMatcher.matchCategoryFromPredictions([
        { label: bestPrediction.label, score: bestPrediction.score }
      ]);
      
      logger.info(`Final classification for ${file.name}: ${result.category} (confidence: ${result.confidence})`);
      return result;
      
    } catch (error) {
      logger.error(`Error analyzing file ${file.name}:`, error);
      return { category: 'untagged', confidence: 0.1 };
    }
  }

  private static calculateDynamicThreshold(diversity: number): number {
    // Lower threshold when predictions are diverse (less certain)
    // Higher threshold when predictions are concentrated (more certain)
    const normalizedDiversity = Math.min(Math.max(diversity, 0), 1);
    return this.MAX_CONFIDENCE_THRESHOLD - 
           (normalizedDiversity * (this.MAX_CONFIDENCE_THRESHOLD - this.MIN_CONFIDENCE_THRESHOLD));
  }
}

export const videoAnalysisService = {
  analyzeVideo: VideoAnalysisService.analyzeVideo.bind(VideoAnalysisService)
};