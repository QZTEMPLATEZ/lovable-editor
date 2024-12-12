import { BaseVideoAnalyzer } from '../core/BaseVideoAnalyzer';
import { ORGANIZER_CONFIG } from '../../../config/organizerConfig';

export class DroneAnalyzer extends BaseVideoAnalyzer {
  async analyzeDroneShot(predictions: any[]): Promise<{ isDrone: boolean; confidence: number }> {
    const config = ORGANIZER_CONFIG.analysis.categories.DroneFootage;
    const aerialCues = ['aerial', 'sky', 'landscape', 'bird', 'view'];
    const groundCues = ['face', 'closeup', 'indoor', 'room'];
    
    let hasAerialCue = false;
    let groundPresenceScore = 0;

    for (const prediction of predictions) {
      const label = prediction.label.toLowerCase();
      
      // Check for aerial perspective
      for (const aerialCue of aerialCues) {
        if (label.includes(aerialCue)) {
          hasAerialCue = true;
          break;
        }
      }

      // Check ground-level indicators
      for (const groundCue of groundCues) {
        if (label.includes(groundCue)) {
          groundPresenceScore += prediction.score;
        }
      }
    }

    if (!hasAerialCue) {
      return { isDrone: false, confidence: 0 };
    }

    const confidence = this.calculateConfidence(
      predictions,
      ['aerial', 'sky'],
      config.visualCues
    );

    // Reduce confidence if strong ground-level indicators
    const adjustedConfidence = groundPresenceScore > 0.3 
      ? confidence * (1 - groundPresenceScore)
      : confidence;

    return {
      isDrone: adjustedConfidence > config.confidence,
      confidence: adjustedConfidence
    };
  }
}