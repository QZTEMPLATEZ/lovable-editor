import { BaseVideoAnalyzer } from '../core/BaseVideoAnalyzer';
import { ORGANIZER_CONFIG } from '../../../config/organizerConfig';

export class PrepAnalyzer extends BaseVideoAnalyzer {
  async analyzePrepScene(predictions: any[], type: 'bride' | 'groom'): Promise<{ isPrep: boolean; confidence: number }> {
    const config = type === 'bride' 
      ? ORGANIZER_CONFIG.analysis.categories.BridePrep 
      : ORGANIZER_CONFIG.analysis.categories.GroomPrep;

    const confidence = this.calculateConfidence(
      predictions,
      config.requiredCues,
      config.visualCues
    );

    return {
      isPrep: confidence > config.confidence,
      confidence
    };
  }
}