import { ORGANIZER_CONFIG } from '../../config/organizerConfig';
import { logger } from '../../utils/logger';

export class DroneAnalyzer {
  static isDroneShot(predictions: any[]): { isDrone: boolean; confidence: number } {
    const droneCues = ORGANIZER_CONFIG.analysis.categories.DroneFootage.visualCues;
    const aerialCues = ['aerial', 'sky', 'landscape', 'bird', 'view'];
    const groundCues = ['face', 'closeup', 'indoor', 'room'];

    let maxScore = 0;
    let totalScore = 0;
    let matchCount = 0;
    let hasAerialCue = false;
    let groundPresenceScore = 0;

    for (const prediction of predictions) {
      const label = prediction.label.toLowerCase();
      
      // Check for aerial perspective cues
      for (const aerialCue of aerialCues) {
        if (label.includes(aerialCue)) {
          hasAerialCue = true;
          maxScore = Math.max(maxScore, prediction.score);
          break;
        }
      }

      // Check for ground-level indicators that would reduce confidence
      for (const groundCue of groundCues) {
        if (label.includes(groundCue)) {
          groundPresenceScore += prediction.score;
        }
      }

      // Check for drone-specific cues
      for (const cue of droneCues) {
        if (label.includes(cue.toLowerCase())) {
          maxScore = Math.max(maxScore, prediction.score);
          totalScore += prediction.score;
          matchCount++;
        }
      }
    }

    if (matchCount === 0 || !hasAerialCue) {
      return { isDrone: false, confidence: 0 };
    }

    // Calculate confidence score
    const avgScore = totalScore / matchCount;
    let confidence = (maxScore * 0.7 + avgScore * 0.3);
    
    // Reduce confidence if there are strong ground-level indicators
    if (groundPresenceScore > 0.3) {
      confidence *= (1 - groundPresenceScore);
    }

    return {
      isDrone: confidence > ORGANIZER_CONFIG.analysis.categories.DroneFootage.confidence,
      confidence
    };
  }
}