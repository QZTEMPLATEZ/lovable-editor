import { logger } from '../../../utils/logger';
import { objectDetectionService } from '../../detection/ObjectDetectionService';

interface CategoryAnalysis {
  bridePrep: { isPrep: boolean; confidence: number };
  groomPrep: { isPrep: boolean; confidence: number };
  decoration: { isDecoration: boolean; confidence: number };
  drone: { isDrone: boolean; confidence: number };
  filename: string;
  predictions: any[];
  sceneAnalysis?: Awaited<ReturnType<typeof objectDetectionService.analyzeWeddingScene>>;
}

export class CategoryMatcher {
  static async getBestCategory(analysis: CategoryAnalysis): Promise<{ category: string; confidence: number }> {
    // Use scene analysis if available
    if (analysis.sceneAnalysis) {
      if (analysis.sceneAnalysis.hasBride && analysis.sceneAnalysis.confidence > 0.7) {
        return { category: 'brideprep', confidence: analysis.sceneAnalysis.confidence };
      }
      if (analysis.sceneAnalysis.hasGroom && analysis.sceneAnalysis.confidence > 0.7) {
        return { category: 'groomprep', confidence: analysis.sceneAnalysis.confidence };
      }
      if (analysis.sceneAnalysis.hasDecoration && analysis.sceneAnalysis.confidence > 0.6) {
        return { category: 'decoration', confidence: analysis.sceneAnalysis.confidence };
      }
    }

    // Fallback to traditional analysis
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

    // Try filename analysis if no strong match found
    const filenameMatch = this.classifyByFilename(analysis.filename);
    if (filenameMatch.confidence > 0.3) {
      return filenameMatch;
    }

    logger.info(`No strong category match found for ${analysis.filename}, marking as untagged`);
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