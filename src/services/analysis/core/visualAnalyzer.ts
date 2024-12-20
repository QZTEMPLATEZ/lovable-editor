import { CATEGORY_RULES } from '../../../config/categoryRules';
import { logger } from '../../../utils/logger';

export const analyzeVisualElements = (predictions: any[]): { category: string; confidence: number } => {
  const categoryScores = new Map<string, { score: number; matches: number }>();

  // Initialize scores
  Object.keys(CATEGORY_RULES).forEach(category => {
    categoryScores.set(category, { score: 0, matches: 0 });
  });

  // Analyze predictions
  predictions.forEach(prediction => {
    const label = prediction.label.toLowerCase();
    
    Object.entries(CATEGORY_RULES).forEach(([category, rules]) => {
      const hasVisualCue = rules.visualCues.some(cue => 
        label.includes(cue.toLowerCase())
      );

      if (hasVisualCue) {
        const current = categoryScores.get(category) || { score: 0, matches: 0 };
        categoryScores.set(category, {
          score: current.score + prediction.score,
          matches: current.matches + 1
        });
      }
    });
  });

  // Find best match
  let bestMatch = { category: 'OtherMoments', confidence: 0.1 };
  
  categoryScores.forEach((data, category) => {
    if (data.matches > 0) {
      const confidence = data.score / data.matches;
      if (confidence > bestMatch.confidence) {
        bestMatch = { category, confidence };
      }
    }
  });

  return bestMatch;
};