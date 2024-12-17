import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { logger } from '../../utils/logger';

export class ObjectDetectionService {
  private static model: cocoSsd.ObjectDetection | null = null;

  static async initialize() {
    if (!this.model) {
      logger.info('Initializing object detection model...');
      this.model = await cocoSsd.load({
        base: 'mobilenet_v2'
      });
      logger.info('Object detection model loaded successfully');
    }
    return this.model;
  }

  static async detectObjects(imageElement: HTMLImageElement | ImageBitmap): Promise<cocoSsd.DetectedObject[]> {
    try {
      const model = await this.initialize();
      const predictions = await model.detect(imageElement);
      
      logger.info(`Detected ${predictions.length} objects in image`);
      return predictions;
    } catch (error) {
      logger.error('Error detecting objects:', error);
      throw error;
    }
  }

  static async analyzeWeddingScene(predictions: cocoSsd.DetectedObject[]): Promise<{
    hasBride: boolean;
    hasGroom: boolean;
    hasAltar: boolean;
    hasDecoration: boolean;
    confidence: number;
  }> {
    const results = {
      hasBride: false,
      hasGroom: false,
      hasAltar: false,
      hasDecoration: false,
      confidence: 0
    };

    let totalConfidence = 0;
    const relevantObjects = predictions.filter(pred => pred.score > 0.5);

    for (const prediction of relevantObjects) {
      const className = prediction.class.toLowerCase();
      
      // Bride detection
      if (className.includes('person') && prediction.score > 0.7) {
        results.hasBride = true;
        totalConfidence += prediction.score;
      }

      // Groom detection
      if (className.includes('person') && prediction.score > 0.7) {
        results.hasGroom = true;
        totalConfidence += prediction.score;
      }

      // Altar and decoration detection
      if (className.includes('chair') || 
          className.includes('flower') || 
          className.includes('vase') ||
          className.includes('table')) {
        results.hasDecoration = true;
        totalConfidence += prediction.score;
      }
    }

    results.confidence = relevantObjects.length > 0 
      ? totalConfidence / relevantObjects.length 
      : 0;

    return results;
  }
}

export const objectDetectionService = {
  detectObjects: ObjectDetectionService.detectObjects.bind(ObjectDetectionService),
  analyzeWeddingScene: ObjectDetectionService.analyzeWeddingScene.bind(ObjectDetectionService),
};