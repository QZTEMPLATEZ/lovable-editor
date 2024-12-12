import { pipeline } from '@huggingface/transformers';
import { logger } from '../../utils/logger';

export class ModelService {
  private static classifier: any = null;

  static async initializeClassifier() {
    if (!this.classifier) {
      try {
        this.classifier = await pipeline(
          'image-classification',
          'Xenova/vit-base-patch16-224'
        );
        logger.info('Video classifier initialized successfully');
      } catch (error) {
        logger.error('Failed to initialize video classifier:', error);
        throw error;
      }
    }
    return this.classifier;
  }
}