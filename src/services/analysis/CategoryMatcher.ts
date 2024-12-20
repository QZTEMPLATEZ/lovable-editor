import { logger } from '../../utils/logger';

interface CategoryCriteria {
  name: string;
  visualCues: string[];
  requiredCues: string[];
  confidence: number;
}

const CATEGORIES: CategoryCriteria[] = [
  {
    name: 'BridePrep',
    visualCues: [
      'woman', 'bride', 'dress', 'makeup', 'hair', 'mirror', 'getting ready',
      'wedding dress', 'bridal', 'preparation', 'beauty', 'making of',
      'makeup artist', 'hairstylist', 'bride room', 'getting dressed',
      'wedding gown', 'bridal suite', 'bride preparation', 'face powder',
      'lipstick', 'cosmetics', 'perfume', 'hair spray', 'beauty salon'
    ],
    requiredCues: ['woman', 'indoor'],
    confidence: 0.15 // Lowered threshold for better detection
  },
  {
    name: 'GroomPrep',
    visualCues: [
      'man', 'groom', 'suit', 'tie', 'formal wear', 'getting ready',
      'cufflinks', 'tuxedo', 'preparation', 'groomsmen', 'bow tie',
      'Windsor tie', 'suit of clothes', 'military uniform', 'formal dress',
      'bowtie', 'formal suit'
    ],
    requiredCues: ['man', 'indoor'],
    confidence: 0.2
  },
  {
    name: 'Ceremony',
    visualCues: [
      'altar', 'church', 'ceremony', 'wedding', 'bride and groom',
      'guests', 'rows', 'aisle', 'vows', 'rings', 'monastery',
      'chapel', 'cathedral', 'priest', 'minister', 'wedding ceremony',
      'gown', 'bridegroom', 'formal'
    ],
    requiredCues: ['formal'],
    confidence: 0.2
  },
  {
    name: 'Decoration',
    visualCues: [
      'flowers', 'chairs', 'arch', 'table', 'decoration', 'venue',
      'centerpiece', 'lights', 'setup', 'arrangement', 'palace',
      'fountain', 'garden', 'patio', 'terrace', 'vase', 'candles',
      'restaurant', 'eating place', 'ballroom'
    ],
    requiredCues: ['static'],
    confidence: 0.15
  },
  {
    name: 'DroneFootage',
    visualCues: [
      'aerial', 'bird view', 'landscape', 'above', 'sky',
      'drone', 'overhead', 'venue', 'building', 'outdoor'
    ],
    requiredCues: ['aerial'],
    confidence: 0.3
  },
  {
    name: 'Reception',
    visualCues: [
      'party', 'dance', 'celebration', 'guests', 'music',
      'cake', 'dinner', 'toast', 'entertainment', 'crowd',
      'restaurant', 'eating place', 'ballroom', 'dancing'
    ],
    requiredCues: ['indoor'],
    confidence: 0.2
  }
];

export class CategoryMatcher {
  static matchCategoryFromPredictions(predictions: any[]): { category: string; confidence: number } {
    const categoryScores = new Map<string, { score: number; matches: number }>();
    
    logger.info('Analyzing predictions:', predictions);

    // Initialize scores for all categories
    CATEGORIES.forEach(category => {
      categoryScores.set(category.name, { score: 0, matches: 0 });
    });

    // Analyze each prediction
    predictions.forEach(prediction => {
      const label = prediction.label.toLowerCase();
      const score = prediction.score;

      CATEGORIES.forEach(category => {
        // Check for visual cues with more flexible matching
        const hasVisualCue = category.visualCues.some(cue => {
          const cueWords = cue.toLowerCase().split(' ');
          return cueWords.every(word => label.includes(word));
        });

        if (hasVisualCue) {
          const current = categoryScores.get(category.name) || { score: 0, matches: 0 };
          categoryScores.set(category.name, {
            score: current.score + score,
            matches: current.matches + 1
          });
        }
      });
    });

    // Calculate final scores with improved logic
    let bestMatch = { category: 'OtherMoments', confidence: 0 };
    let secondBestMatch = { category: 'OtherMoments', confidence: 0 };

    categoryScores.forEach((data, categoryName) => {
      if (data.matches > 0) {
        const category = CATEGORIES.find(c => c.name === categoryName)!;
        const averageScore = data.score / data.matches;
        
        // More flexible required cues check
        const hasRequiredCues = category.requiredCues.length === 0 || 
          category.requiredCues.some(cue =>
            predictions.some(p => 
              p.label.toLowerCase().includes(cue.toLowerCase()) &&
              p.score > 0.1 // Lowered threshold for required cues
            )
          );

        if (hasRequiredCues && averageScore > category.confidence) {
          if (averageScore > bestMatch.confidence) {
            secondBestMatch = { ...bestMatch };
            bestMatch = {
              category: categoryName,
              confidence: averageScore
            };
          } else if (averageScore > secondBestMatch.confidence) {
            secondBestMatch = {
              category: categoryName,
              confidence: averageScore
            };
          }
        }
      }
    });

    // If no strong match is found, try filename analysis
    if (bestMatch.confidence < 0.15) {
      const filenameMatch = this.classifyByFilename(predictions[0]?.filename || '');
      if (filenameMatch.confidence > bestMatch.confidence) {
        bestMatch = filenameMatch;
      }
    }

    // If still no good match, use context from predictions to make a best guess
    if (bestMatch.confidence < 0.15) {
      bestMatch = this.makeContextualGuess(predictions);
    }

    logger.info(`Best category match: ${bestMatch.category} with confidence ${bestMatch.confidence}`);
    return bestMatch;
  }

  private static makeContextualGuess(predictions: any[]): { category: string; confidence: number } {
    const labels = predictions.map(p => p.label.toLowerCase());
    
    // Check for indoor/outdoor context
    const isIndoor = labels.some(label => 
      ['room', 'indoor', 'interior', 'house', 'building'].some(word => label.includes(word))
    );
    
    // Check for formal/casual context
    const isFormal = labels.some(label =>
      ['suit', 'dress', 'gown', 'formal', 'ceremony'].some(word => label.includes(word))
    );

    // Make educated guesses based on context
    if (labels.some(l => l.includes('face') || l.includes('makeup') || l.includes('cosmetic'))) {
      return { category: 'BridePrep', confidence: 0.2 };
    }
    
    if (labels.some(l => l.includes('suit') || l.includes('tie'))) {
      return { category: 'GroomPrep', confidence: 0.2 };
    }
    
    if (labels.some(l => l.includes('flower') || l.includes('decoration'))) {
      return { category: 'Decoration', confidence: 0.2 };
    }

    if (isFormal && isIndoor) {
      return { category: 'Ceremony', confidence: 0.15 };
    }

    // Default to OtherMoments with low confidence if no contextual match
    return { category: 'OtherMoments', confidence: 0.1 };
  }

  static classifyByFilename(filename: string): { category: string; confidence: number } {
    const lowerFilename = filename.toLowerCase();
    
    // Enhanced filename patterns
    const patterns = {
      BridePrep: ['bride', 'noiva', 'makeup', 'maquiagem', 'getting_ready', 'making_of', 'making'],
      GroomPrep: ['groom', 'noivo', 'suit', 'terno', 'prep'],
      Decoration: ['decor', 'flores', 'flowers', 'venue', 'local'],
      DroneFootage: ['drone', 'aerial', 'dji', 'mavic', 'air'],
      Ceremony: ['ceremony', 'cerimonia', 'altar', 'church', 'igreja'],
      Reception: ['reception', 'party', 'festa', 'dance', 'danca']
    };

    for (const [category, keywords] of Object.entries(patterns)) {
      const matches = keywords.filter(keyword => lowerFilename.includes(keyword));
      if (matches.length > 0) {
        const confidence = 0.3 + (matches.length * 0.1);
        return { category, confidence };
      }
    }

    // If no filename match, return OtherMoments with low confidence
    return { category: 'OtherMoments', confidence: 0.1 };
  }
}