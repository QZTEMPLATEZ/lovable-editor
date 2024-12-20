import { logger } from '../../../utils/logger';
import { analyzeVisualElements } from './visualAnalyzer';
import { analyzeFileContext } from './contextAnalyzer';
import { CONFIDENCE_THRESHOLDS } from '../../../config/analysisConfig';

export class CategoryMatcher {
  static getBestCategory(predictions: any[], filename: string): { category: string; confidence: number } {
    // First try visual analysis
    const visualMatch = analyzeVisualElements(predictions);
    if (visualMatch.confidence > CONFIDENCE_THRESHOLDS.HIGH) {
      return visualMatch;
    }

    // Try context analysis
    const contextMatch = analyzeFileContext(filename, predictions);
    if (contextMatch.confidence > CONFIDENCE_THRESHOLDS.MEDIUM) {
      return contextMatch;
    }

    // If no strong match, use best available match
    if (visualMatch.confidence > contextMatch.confidence) {
      return visualMatch;
    }

    // Default to OtherMoments with low confidence if no good match
    return { 
      category: 'OtherMoments',
      confidence: Math.max(0.1, visualMatch.confidence)
    };
  }
}