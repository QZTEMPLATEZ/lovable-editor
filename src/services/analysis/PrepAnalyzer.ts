import { ORGANIZER_CONFIG } from '../../config/organizerConfig';

export class PrepAnalyzer {
  static isGroomPrepScene(predictions: any[]): { isPrep: boolean; confidence: number } {
    const groomPrepCues = ORGANIZER_CONFIG.analysis.categories.GroomPrep.visualCues;
    const requiredCues = ORGANIZER_CONFIG.analysis.categories.GroomPrep.requiredCues;

    let maxScore = 0;
    let totalScore = 0;
    let matchCount = 0;
    let hasRequiredCue = false;

    for (const prediction of predictions) {
      const label = prediction.label.toLowerCase();
      
      for (const requiredCue of requiredCues) {
        if (label.includes(requiredCue.toLowerCase())) {
          hasRequiredCue = true;
          break;
        }
      }

      for (const cue of groomPrepCues) {
        if (label.includes(cue.toLowerCase())) {
          maxScore = Math.max(maxScore, prediction.score);
          totalScore += prediction.score;
          matchCount++;
        }
      }
    }

    if (matchCount === 0 || !hasRequiredCue) {
      return { isPrep: false, confidence: 0 };
    }

    const avgScore = totalScore / matchCount;
    const confidence = (maxScore * 0.7 + avgScore * 0.3);

    return {
      isPrep: confidence > ORGANIZER_CONFIG.analysis.categories.GroomPrep.confidence,
      confidence
    };
  }

  static isBridePrepScene(predictions: any[]): { isPrep: boolean; confidence: number } {
    const bridePrepCues = ORGANIZER_CONFIG.analysis.categories.BridePrep.visualCues;
    const requiredCues = ORGANIZER_CONFIG.analysis.categories.BridePrep.requiredCues;

    let maxScore = 0;
    let totalScore = 0;
    let matchCount = 0;
    let hasRequiredCue = false;

    for (const prediction of predictions) {
      const label = prediction.label.toLowerCase();
      
      for (const requiredCue of requiredCues) {
        if (label.includes(requiredCue.toLowerCase())) {
          hasRequiredCue = true;
          break;
        }
      }

      for (const cue of bridePrepCues) {
        if (label.includes(cue.toLowerCase())) {
          maxScore = Math.max(maxScore, prediction.score);
          totalScore += prediction.score;
          matchCount++;
        }
      }
    }

    if (matchCount === 0 || !hasRequiredCue) {
      return { isPrep: false, confidence: 0 };
    }

    const avgScore = totalScore / matchCount;
    const confidence = (maxScore * 0.7 + avgScore * 0.3);

    return {
      isPrep: confidence > ORGANIZER_CONFIG.analysis.categories.BridePrep.confidence,
      confidence
    };
  }
}