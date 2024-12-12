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

    // If no strong match, try filename analysis
    const filenameMatch = this.classifyByFilename(analysis.filename);
    if (filenameMatch.confidence > 0.3) {
      return filenameMatch;
    }

    // Default to untagged with low confidence
    logger.info(`No strong category match for ${analysis.filename}, marking as untagged`);
    return { category: 'untagged', confidence: 0.1 };
  }

  private static classifyByFilename(filename: string): { category: string; confidence: number } {
    const lowerFilename = filename.toLowerCase();
    
    const patterns = {
      brideprep: ['bride', 'noiva', 'makeup', 'maquiagem', 'getting_ready', 'making'],
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