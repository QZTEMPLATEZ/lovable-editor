import { BaseVideoAnalyzer } from '../core/BaseVideoAnalyzer';
import { ORGANIZER_CONFIG } from '../../../config/organizerConfig';

export class DecorationAnalyzer extends BaseVideoAnalyzer {
  async analyzeDecorationScene(predictions: any[]): Promise<{ isDecoration: boolean; confidence: number }> {
    const config = ORGANIZER_CONFIG.analysis.categories.Decoration;
    const humanPresenceCues = ['person', 'face', 'people', 'crowd'];
    
    let humanPresenceScore = 0;
    for (const prediction of predictions) {
      const label = prediction.label.toLowerCase();
      for (const humanCue of humanPresenceCues) {
        if (label.includes(humanCue)) {
          humanPresenceScore += prediction.score;
        }
      }
    }

    const confidence = this.calculateConfidence(
      predictions,
      ['decor', 'flower', 'table', 'chair', 'light'],
      config.visualCues
    );

    // Reduce confidence if there's significant human presence
    const adjustedConfidence = humanPresenceScore > 0.3 
      ? confidence * (1 - humanPresenceScore)
      : confidence;

    return {
      isDecoration: adjustedConfidence > config.confidence,
      confidence: adjustedConfidence
    };
  }
}