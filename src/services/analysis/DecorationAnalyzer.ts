import { ORGANIZER_CONFIG } from '../../config/organizerConfig';
import { logger } from '../../utils/logger';

export class DecorationAnalyzer {
  static isDecorationScene(predictions: any[]): { isDecoration: boolean; confidence: number } {
    const decorationCues = ORGANIZER_CONFIG.analysis.categories.Decoration.visualCues;
    const requiredCues = ['decor', 'flower', 'table', 'chair', 'light'];
    const humanPresenceCues = ['person', 'face', 'people', 'crowd'];

    let maxScore = 0;
    let totalScore = 0;
    let matchCount = 0;
    let hasRequiredCue = false;
    let humanPresenceScore = 0;

    for (const prediction of predictions) {
      const label = prediction.label.toLowerCase();
      
      // Check for human presence
      for (const humanCue of humanPresenceCues) {
        if (label.includes(humanCue)) {
          humanPresenceScore += prediction.score;
        }
      }

      // Check for required decoration cues
      for (const requiredCue of requiredCues) {
        if (label.includes(requiredCue.toLowerCase())) {
          hasRequiredCue = true;
          break;
        }
      }

      // Check for decoration-specific cues
      for (const cue of decorationCues) {
        if (label.includes(cue.toLowerCase())) {
          maxScore = Math.max(maxScore, prediction.score);
          totalScore += prediction.score;
          matchCount++;
        }
      }
    }

    if (matchCount === 0 || !hasRequiredCue) {
      return { isDecoration: false, confidence: 0 };
    }

    // Reduce confidence if there's significant human presence
    const avgScore = totalScore / matchCount;
    let confidence = (maxScore * 0.7 + avgScore * 0.3);
    
    if (humanPresenceScore > 0.3) {
      confidence *= (1 - humanPresenceScore);
    }

    return {
      isDecoration: confidence > ORGANIZER_CONFIG.analysis.categories.Decoration.confidence,
      confidence
    };
  }
}