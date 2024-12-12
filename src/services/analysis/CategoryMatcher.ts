import { logger } from '../../utils/logger';
import { ORGANIZER_CONFIG } from '../../config/organizerConfig';

export class CategoryMatcher {
  static matchCategoryFromPredictions(predictions: any[]): { category: string; confidence: number } {
    const categoryScores = new Map<string, { score: number; matches: number }>();
    
    logger.info('Analyzing predictions:', predictions);

    // Initialize scores for all categories
    ['brideprep', 'groomprep', 'decoration', 'drone', 'ceremony', 'reception', 'untagged'].forEach(category => {
      categoryScores.set(category, { score: 0, matches: 0 });
    });

    // Context-aware scoring function
    const updateCategoryScore = (category: string, score: number, weight: number = 1) => {
      const current = categoryScores.get(category) || { score: 0, matches: 0 };
      categoryScores.set(category, {
        score: current.score + (score * weight),
        matches: current.matches + 1
      });
    };

    // Analyze each prediction in context
    predictions.forEach(prediction => {
      const label = prediction.label.toLowerCase();
      const score = prediction.score;

      // BridePrep indicators
      if (['woman', 'dress', 'makeup', 'mirror', 'bride'].some(term => label.includes(term))) {
        updateCategoryScore('brideprep', score, 1.2);
      }

      // GroomPrep indicators
      if (['man', 'suit', 'tie', 'groom', 'formal'].some(term => label.includes(term))) {
        updateCategoryScore('groomprep', score, 1.2);
      }

      // Decoration indicators
      if (['flower', 'chair', 'table', 'decoration', 'arch'].some(term => label.includes(term))) {
        updateCategoryScore('decoration', score, 1.1);
      }

      // Drone indicators
      if (['aerial', 'sky', 'landscape', 'building', 'outdoor'].some(term => label.includes(term))) {
        updateCategoryScore('drone', score, 1.3);
      }

      // Ceremony indicators
      if (['ceremony', 'altar', 'church', 'wedding', 'audience'].some(term => label.includes(term))) {
        updateCategoryScore('ceremony', score, 1.2);
      }

      // Reception indicators
      if (['party', 'dance', 'celebration', 'crowd', 'night'].some(term => label.includes(term))) {
        updateCategoryScore('reception', score, 1.1);
      }
    });

    // Calculate final scores considering context
    let bestCategory = 'untagged';
    let bestConfidence = 0;

    categoryScores.forEach((data, category) => {
      if (data.matches > 0) {
        const averageScore = data.score / data.matches;
        if (averageScore > bestConfidence) {
          bestCategory = category;
          bestConfidence = averageScore;
        }
      }
    });

    // If no strong match is found, try filename analysis
    if (bestConfidence < 0.3) {
      logger.info('Low confidence in visual analysis, checking filename patterns');
      return this.classifyByFilename(predictions[0]?.filename || '');
    }

    logger.info(`Best category match: ${bestCategory} with confidence ${bestConfidence}`);
    return {
      category: bestCategory,
      confidence: bestConfidence
    };
  }

  static classifyByFilename(filename: string): { category: string; confidence: number } {
    const lowerFilename = filename.toLowerCase();
    
    // Enhanced filename patterns
    const patterns = {
      brideprep: ['bride', 'noiva', 'makeup', 'maquiagem', 'getting_ready', 'making'],
      groomprep: ['groom', 'noivo', 'suit', 'terno', 'prep'],
      decoration: ['decor', 'flores', 'flowers', 'venue', 'local'],
      drone: ['drone', 'aerial', 'dji', 'mavic', 'air'],
      ceremony: ['ceremony', 'cerimonia', 'altar', 'church', 'igreja'],
      reception: ['reception', 'party', 'festa', 'dance', 'danca']
    };

    let bestMatch = { category: 'untagged', confidence: 0.1 };

    for (const [category, keywords] of Object.entries(patterns)) {
      const matches = keywords.filter(keyword => lowerFilename.includes(keyword));
      if (matches.length > 0) {
        const confidence = 0.4 + (matches.length * 0.1); // Increase confidence with more keyword matches
        if (confidence > bestMatch.confidence) {
          bestMatch = { category, confidence };
        }
      }
    }

    logger.info(`Filename analysis result for ${filename}: ${bestMatch.category} (${bestMatch.confidence})`);
    return bestMatch;
  }
}