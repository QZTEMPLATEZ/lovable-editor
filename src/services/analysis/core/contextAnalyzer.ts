import { CATEGORY_RULES } from '../../../config/categoryRules';
import { logger } from '../../../utils/logger';

export const analyzeFileContext = (
  filename: string, 
  predictions: any[]
): { category: string; confidence: number } => {
  const lowerFilename = filename.toLowerCase();
  let bestMatch = { category: 'OtherMoments', confidence: 0.1 };

  // Check filename patterns
  Object.entries(CATEGORY_RULES).forEach(([category, rules]) => {
    const matches = rules.keywords.filter(keyword => 
      lowerFilename.includes(keyword.toLowerCase())
    );

    if (matches.length > 0) {
      const confidence = 0.3 + (matches.length * 0.1);
      if (confidence > bestMatch.confidence) {
        bestMatch = { category, confidence };
      }
    }
  });

  // If no filename match, try environmental context
  if (bestMatch.confidence <= 0.3) {
    Object.entries(CATEGORY_RULES).forEach(([category, rules]) => {
      const contextMatches = rules.environmentalCues.filter(cue =>
        predictions.some(p => 
          p.label.toLowerCase().includes(cue.toLowerCase()) &&
          p.score > 0.2
        )
      );

      if (contextMatches.length > 0) {
        const confidence = 0.2 + (contextMatches.length * 0.1);
        if (confidence > bestMatch.confidence) {
          bestMatch = { category, confidence };
        }
      }
    });
  }

  return bestMatch;
};