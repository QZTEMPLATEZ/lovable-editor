import { logger } from '../../utils/logger';
import { pipeline } from '@huggingface/transformers';
import { FrameExtractor } from './FrameExtractor';
import { CategoryMatcher } from './CategoryMatcher';

export class VideoAnalysisService {
  private static classifier: any = null;
  private static readonly CONFIDENCE_THRESHOLD = 0.2; // Lowered threshold for debugging

  private static async initializeClassifier() {
    if (!this.classifier) {
      try {
        this.classifier = await pipeline('image-classification', 'Xenova/vit-base-patch16-224', {
          dtype: 'float32',
          revision: 'main'
        });
        logger.info('Video classifier initialized successfully');
      } catch (error) {
        logger.error('Failed to initialize video classifier:', error);
        throw error;
      }
    }
    return this.classifier;
  }

  static async analyzeVideo(file: File): Promise<{ category: string; confidence: number }> {
    try {
      logger.info(`Starting comprehensive analysis for file: ${file.name}`);
      
      // Extract multiple frames
      const frames = await FrameExtractor.extractMultipleFrames(file);
      logger.info(`Extracted ${frames.length} frames for analysis from ${file.name}`);
      
      // Initialize classifier if needed
      const classifier = await this.initializeClassifier();
      
      // Analyze each frame
      const predictionPromises = frames.map(frame => classifier(frame));
      const allPredictions = await Promise.all(predictionPromises);
      const predictions = allPredictions.flat();
      
      // Group predictions by label and aggregate scores
      const groupedConfidence = predictions.reduce((acc, p) => {
        acc[p.label] = (acc[p.label] || 0) + p.score;
        return acc;
      }, {} as Record<string, number>);

      logger.info(`Grouped confidences for ${file.name}:`, groupedConfidence);

      // Find the best prediction
      const bestPrediction = Object.entries(groupedConfidence).reduce(
        (best, [label, score]) => (score > best.score ? { label, score } : best),
        { label: 'untagged', score: 0 }
      );

      logger.info(`Best prediction for ${file.name}: ${bestPrediction.label} (confidence: ${bestPrediction.score})`);

      // Get category match using the best prediction
      const result = CategoryMatcher.matchCategoryFromPredictions([
        { label: bestPrediction.label, score: bestPrediction.score }
      ]);
      
      // Return untagged if confidence is below threshold
      if (result.confidence < this.CONFIDENCE_THRESHOLD) {
        logger.info(`Low confidence for ${file.name}, marking as untagged`);
        return { category: 'untagged', confidence: 0.1 };
      }
      
      logger.info(`Final classification for ${file.name}: ${result.category} (confidence: ${result.confidence})`);
      return result;
      
    } catch (error) {
      logger.error(`Error analyzing file ${file.name}:`, error);
      return { category: 'untagged', confidence: 0.1 };
    }
  }
}

export const videoAnalysisService = {
  analyzeVideo: VideoAnalysisService.analyzeVideo.bind(VideoAnalysisService)
};