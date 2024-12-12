import { logger } from '../../../utils/logger';
import { pipeline } from '@huggingface/transformers';

export abstract class BaseVideoAnalyzer {
  protected classifier: any = null;

  protected async initializeClassifier() {
    try {
      if (!this.classifier) {
        this.classifier = await pipeline(
          'image-classification',
          'Xenova/vit-base-patch16-224'
        );
        logger.info('Video classifier initialized successfully');
      }
      return true;
    } catch (error) {
      logger.error('Failed to initialize video classifier:', error);
      return false;
    }
  }

  protected calculateConfidence(predictions: any[], requiredCues: string[], visualCues: string[]): number {
    let maxScore = 0;
    let totalScore = 0;
    let matchCount = 0;
    let hasRequiredCue = false;

    for (const prediction of predictions) {
      const label = prediction.label.toLowerCase();
      
      // Check for required cues
      for (const requiredCue of requiredCues) {
        if (label.includes(requiredCue.toLowerCase())) {
          hasRequiredCue = true;
          break;
        }
      }

      // Check for visual cues
      for (const cue of visualCues) {
        if (label.includes(cue.toLowerCase())) {
          maxScore = Math.max(maxScore, prediction.score);
          totalScore += prediction.score;
          matchCount++;
        }
      }
    }

    if (matchCount === 0 || !hasRequiredCue) {
      return 0;
    }

    const avgScore = totalScore / matchCount;
    return (maxScore * 0.7 + avgScore * 0.3);
  }
}