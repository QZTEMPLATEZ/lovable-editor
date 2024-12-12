import { logger } from '../../../utils/logger';

interface CategoryAnalysis {
  bridePrep: { isPrep: boolean; confidence: number };
  groomPrep: { isPrep: boolean; confidence: number };
  decoration: { isDecoration: boolean; confidence: number };
  drone: { isDrone: boolean; confidence: number };
  filename: string;
  predictions: any[];
}

export class CategoryMatcher {
  static getBestCategory(analysis: CategoryAnalysis): { category: string; confidence: number } {
    // First try to match using the structured rule-based approach
    const structuredMatch = this.applyStructuredRules(analysis.predictions);
    if (structuredMatch.confidence > 0.4) {
      logger.info(`Structured match found for category: ${structuredMatch.category} with confidence: ${structuredMatch.confidence}`);
      return structuredMatch;
    }

    // If structured approach doesn't yield high confidence, fall back to previous methods
    const categories = [
      { name: 'brideprep', match: analysis.bridePrep.isPrep, confidence: analysis.bridePrep.confidence },
      { name: 'groomprep', match: analysis.groomPrep.isPrep, confidence: analysis.groomPrep.confidence },
      { name: 'decoration', match: analysis.decoration.isDecoration, confidence: analysis.decoration.confidence },
      { name: 'drone', match: analysis.drone.isDrone, confidence: analysis.drone.confidence }
    ];

    // Get best matching category
    const bestMatch = categories
      .filter(cat => cat.match)
      .sort((a, b) => b.confidence - a.confidence)[0];

    if (bestMatch && bestMatch.confidence > 0.3) {
      return {
        category: bestMatch.name,
        confidence: bestMatch.confidence
      };
    }

    // Try filename analysis as last resort
    const filenameMatch = this.classifyByFilename(analysis.filename);
    if (filenameMatch.confidence > 0.3) {
      return filenameMatch;
    }

    logger.info(`No strong category match found for ${analysis.filename}, marking as untagged`);
    return { category: 'untagged', confidence: 0.1 };
  }

  private static applyStructuredRules(predictions: any[]): { category: string; confidence: number } {
    // Helper function to check for specific elements in predictions
    const hasElement = (elements: string[], threshold: number = 0.3): boolean => {
      return predictions.some(p => 
        elements.some(element => 
          p.label.toLowerCase().includes(element.toLowerCase()) && p.score > threshold
        )
      );
    };

    // Check for single woman in private setting
    if (hasElement(['woman', 'female', 'bride']) && 
        hasElement(['makeup', 'dress', 'hair', 'preparation']) &&
        !hasElement(['crowd', 'party', 'ceremony'])) {
      return { category: 'brideprep', confidence: 0.8 };
    }

    // Check for groom preparation
    if (hasElement(['man', 'male', 'groom', 'suit']) && 
        hasElement(['preparation', 'dressing', 'tie']) &&
        !hasElement(['ceremony', 'altar'])) {
      return { category: 'groomprep', confidence: 0.8 };
    }

    // Check for ceremony
    if (hasElement(['altar', 'ceremony', 'church']) && 
        hasElement(['guests', 'rows', 'seated']) &&
        !hasElement(['party', 'dance'])) {
      return { category: 'ceremony', confidence: 0.9 };
    }

    // Check for decoration
    if (hasElement(['flowers', 'chairs', 'decor', 'venue']) && 
        !hasElement(['person', 'people', 'crowd'], 0.4)) {
      return { category: 'decoration', confidence: 0.85 };
    }

    // Check for drone footage
    if (hasElement(['aerial', 'sky', 'bird view', 'landscape']) &&
        !hasElement(['indoor', 'room'])) {
      return { category: 'drone', confidence: 0.95 };
    }

    // Check for reception
    if (hasElement(['party', 'dance', 'celebration']) && 
        hasElement(['people', 'crowd', 'guests'])) {
      return { category: 'reception', confidence: 0.8 };
    }

    // If no clear match is found
    return { category: 'untagged', confidence: 0.1 };
  }

  private static classifyByFilename(filename: string): { category: string; confidence: number } {
    const lowerFilename = filename.toLowerCase();
    
    const patterns = {
      brideprep: ['bride', 'noiva', 'makeup', 'maquiagem', 'getting_ready', 'making_of', 'making'],
      groomprep: ['groom', 'noivo', 'suit', 'terno', 'prep'],
      decoration: ['decor', 'flores', 'flowers', 'venue', 'local'],
      drone: ['drone', 'aerial', 'dji', 'mavic', 'air'],
      ceremony: ['ceremony', 'cerimonia', 'altar', 'church', 'igreja'],
      reception: ['reception', 'party', 'festa', 'dance', 'danca']
    };

    for (const [category, keywords] of Object.entries(patterns)) {
      const matches = keywords.filter(keyword => lowerFilename.includes(keyword));
      if (matches.length > 0) {
        const confidence = 0.4 + (matches.length * 0.1);
        return { category, confidence };
      }
    }

    return { category: 'untagged', confidence: 0.1 };
  }
}