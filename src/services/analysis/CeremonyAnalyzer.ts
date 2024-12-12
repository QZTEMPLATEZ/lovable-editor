import { ORGANIZER_CONFIG } from '../../config/organizerConfig';
import { logger } from '../../utils/logger';

export class CeremonyAnalyzer {
  static isCeremonyScene(predictions: any[]): { isCeremony: boolean; confidence: number } {
    const ceremonyCues = ORGANIZER_CONFIG.analysis.categories.Ceremony.visualCues;
    const requiredCues = ORGANIZER_CONFIG.analysis.categories.Ceremony.requiredCues;
    const environmentalCues = ORGANIZER_CONFIG.analysis.categories.Ceremony.environmentalCues;
    const receptionCues = ['dance', 'party', 'celebration', 'dinner'];

    let maxScore = 0;
    let totalScore = 0;
    let matchCount = 0;
    let hasRequiredCue = false;
    let hasEnvironmentalCue = false;
    let receptionScore = 0;

    for (const prediction of predictions) {
      const label = prediction.label.toLowerCase();
      
      // Check for required ceremony cues
      for (const requiredCue of requiredCues) {
        if (label.includes(requiredCue.toLowerCase())) {
          hasRequiredCue = true;
          break;
        }
      }

      // Check for environmental cues
      for (const envCue of environmentalCues) {
        if (label.includes(envCue.toLowerCase())) {
          hasEnvironmentalCue = true;
          break;
        }
      }

      // Check for reception indicators that would reduce confidence
      for (const receptionCue of receptionCues) {
        if (label.includes(receptionCue.toLowerCase())) {
          receptionScore += prediction.score;
        }
      }

      // Check for ceremony-specific cues
      for (const cue of ceremonyCues) {
        if (label.includes(cue.toLowerCase())) {
          maxScore = Math.max(maxScore, prediction.score);
          totalScore += prediction.score;
          matchCount++;
        }
      }
    }

    if (matchCount === 0 || !hasRequiredCue) {
      return { isCeremony: false, confidence: 0 };
    }

    // Calculate confidence score
    const avgScore = totalScore / matchCount;
    let confidence = (maxScore * 0.7 + avgScore * 0.3);
    
    // Boost confidence if environmental cues are present
    if (hasEnvironmentalCue) {
      confidence *= 1.2;
    }

    // Reduce confidence if there are strong reception indicators
    if (receptionScore > 0.3) {
      confidence *= (1 - receptionScore * 0.5);
    }

    return {
      isCeremony: confidence > ORGANIZER_CONFIG.analysis.categories.Ceremony.confidence,
      confidence
    };
  }
}