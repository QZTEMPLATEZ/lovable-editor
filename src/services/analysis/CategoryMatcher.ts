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
    confidence: 0.25 // Lowered threshold for better detection
  },
  {
    name: 'GroomPrep',
    visualCues: [
      'man', 'groom', 'suit', 'tie', 'formal wear', 'getting ready',
      'cufflinks', 'tuxedo', 'preparation', 'groomsmen', 'bow tie',
      'Windsor tie', 'suit of clothes', 'military uniform', 'formal dress'
    ],
    requiredCues: ['man', 'indoor'],
    confidence: 0.3
  },
  {
    name: 'Ceremony',
    visualCues: [
      'altar', 'church', 'ceremony', 'wedding', 'bride and groom',
      'guests', 'rows', 'aisle', 'vows', 'rings', 'monastery',
      'chapel', 'cathedral', 'priest', 'minister', 'wedding ceremony'
    ],
    requiredCues: ['formal'],
    confidence: 0.3
  },
  {
    name: 'Decoration',
    visualCues: [
      'flowers', 'chairs', 'arch', 'table', 'decoration', 'venue',
      'centerpiece', 'lights', 'setup', 'arrangement', 'palace',
      'fountain', 'garden', 'patio', 'terrace', 'vase', 'candles'
    ],
    requiredCues: ['static'],
    confidence: 0.25
  },
  {
    name: 'DroneFootage',
    visualCues: [
      'aerial', 'bird view', 'landscape', 'above', 'sky',
      'drone', 'overhead', 'venue', 'building', 'outdoor'
    ],
    requiredCues: ['aerial'],
    confidence: 0.4
  },
  {
    name: 'Reception',
    visualCues: [
      'party', 'dance', 'celebration', 'guests', 'music',
      'cake', 'dinner', 'toast', 'entertainment', 'crowd',
      'restaurant', 'eating place', 'ballroom', 'dancing'
    ],
    requiredCues: ['indoor'],
    confidence: 0.3
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

        if (hasRequiredCues && averageScore > category.confidence && averageScore > bestMatch.confidence) {
          bestMatch = {
            category: categoryName,
            confidence: averageScore
          };
        }
      }
    });

    // If no strong match is found, try filename analysis
    if (bestMatch.confidence < 0.2) {
      const filenameMatch = this.classifyByFilename(predictions[0]?.filename || '');
      if (filenameMatch.confidence > bestMatch.confidence) {
        bestMatch = filenameMatch;
      }
    }

    logger.info(`Best category match: ${bestMatch.category} with confidence ${bestMatch.confidence}`);
    return bestMatch;
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

    let bestMatch = { category: 'OtherMoments', confidence: 0.1 };

    for (const [category, keywords] of Object.entries(patterns)) {
      const matches = keywords.filter(keyword => lowerFilename.includes(keyword));
      if (matches.length > 0) {
        const confidence = 0.3 + (matches.length * 0.1); // Increased base confidence
        if (confidence > bestMatch.confidence) {
          bestMatch = { category, confidence };
        }
      }
    }

    logger.info(`Filename analysis result for ${filename}: ${bestMatch.category} (${bestMatch.confidence})`);
    return bestMatch;
  }
}