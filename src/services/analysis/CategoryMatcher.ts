import { logger } from '../../utils/logger';
import { ORGANIZER_CONFIG } from '../../config/organizerConfig';

export class CategoryMatcher {
  static matchCategoryFromPredictions(predictions: any[]): { category: string; confidence: number } {
    const categoryMatches = new Map<string, number>();
    
    logger.info('Raw predictions:', predictions);

    // Helper function to check for specific visual cues
    const checkVisualCues = (labels: string[], cues: string[]): number => {
      let maxScore = 0;
      for (const prediction of predictions) {
        const label = prediction.label.toLowerCase();
        if (cues.some(cue => label.includes(cue.toLowerCase()))) {
          maxScore = Math.max(maxScore, prediction.score);
        }
      }
      return maxScore;
    };

    // BridePrep detection
    const bridePrepScore = checkVisualCues(
      predictions.map(p => p.label),
      ['woman', 'dress', 'makeup', 'mirror', 'bride', 'wedding dress']
    );
    if (bridePrepScore > 0.3) {
      categoryMatches.set('brideprep', bridePrepScore);
    }

    // GroomPrep detection
    const groomPrepScore = checkVisualCues(
      predictions.map(p => p.label),
      ['man', 'suit', 'tie', 'groom', 'formal wear']
    );
    if (groomPrepScore > 0.3) {
      categoryMatches.set('groomprep', groomPrepScore);
    }

    // Decoration detection
    const decorationScore = checkVisualCues(
      predictions.map(p => p.label),
      ['flower', 'chair', 'table', 'decoration', 'arch', 'venue']
    );
    if (decorationScore > 0.3) {
      categoryMatches.set('decoration', decorationScore);
    }

    // Drone detection
    const droneScore = checkVisualCues(
      predictions.map(p => p.label),
      ['aerial', 'landscape', 'sky', 'building', 'outdoor']
    );
    if (droneScore > 0.3) {
      categoryMatches.set('drone', droneScore);
    }

    // Ceremony detection
    const ceremonyScore = checkVisualCues(
      predictions.map(p => p.label),
      ['ceremony', 'altar', 'church', 'wedding', 'audience']
    );
    if (ceremonyScore > 0.3) {
      categoryMatches.set('ceremony', ceremonyScore);
    }

    // Reception detection
    const receptionScore = checkVisualCues(
      predictions.map(p => p.label),
      ['party', 'dance', 'celebration', 'crowd', 'night']
    );
    if (receptionScore > 0.3) {
      categoryMatches.set('reception', receptionScore);
    }

    // Find best matching category
    let bestCategory = 'untagged';
    let bestConfidence = 0;

    categoryMatches.forEach((confidence, category) => {
      if (confidence > bestConfidence) {
        bestCategory = category;
        bestConfidence = confidence;
      }
    });

    logger.info(`Best category match: ${bestCategory} with confidence ${bestConfidence}`);
    return {
      category: bestCategory,
      confidence: bestConfidence
    };
  }

  static classifyByFilename(filename: string): { category: string; confidence: number } {
    const lowerFilename = filename.toLowerCase();
    
    // Define patterns for each category
    const patterns = {
      brideprep: ['bride', 'noiva', 'makeup', 'maquiagem', 'getting_ready'],
      groomprep: ['groom', 'noivo', 'suit', 'terno'],
      decoration: ['decor', 'flores', 'flowers', 'venue'],
      drone: ['drone', 'aerial', 'dji', 'mavic'],
      ceremony: ['ceremony', 'cerimonia', 'altar', 'church'],
      reception: ['reception', 'party', 'festa', 'dance']
    };

    for (const [category, keywords] of Object.entries(patterns)) {
      if (keywords.some(keyword => lowerFilename.includes(keyword))) {
        logger.info(`Filename match found for ${filename}: ${category}`);
        return {
          category,
          confidence: 0.6 // Moderate confidence for filename-based classification
        };
      }
    }

    logger.info(`No filename match found for ${filename}, marking as untagged`);
    return {
      category: 'untagged',
      confidence: 0.1
    };
  }
}