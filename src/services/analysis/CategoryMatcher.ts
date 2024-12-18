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
      'wedding gown', 'bridal suite', 'bride preparation'
    ],
    requiredCues: ['woman', 'indoor'],
    confidence: 0.35
  },
  {
    name: 'GroomPrep',
    visualCues: [
      'man', 'groom', 'suit', 'tie', 'formal wear', 'getting ready',
      'cufflinks', 'tuxedo', 'preparation', 'groomsmen'
    ],
    requiredCues: ['man', 'indoor'],
    confidence: 0.4
  },
  {
    name: 'Ceremony',
    visualCues: [
      'altar', 'church', 'ceremony', 'wedding', 'bride and groom',
      'guests', 'rows', 'aisle', 'vows', 'rings'
    ],
    requiredCues: ['people', 'formal'],
    confidence: 0.5
  },
  {
    name: 'Decoration',
    visualCues: [
      'flowers', 'chairs', 'arch', 'table', 'decoration', 'venue',
      'centerpiece', 'lights', 'setup', 'arrangement'
    ],
    requiredCues: ['static'],
    confidence: 0.4
  },
  {
    name: 'DroneFootage',
    visualCues: [
      'aerial', 'bird view', 'landscape', 'above', 'sky',
      'drone', 'overhead', 'venue', 'building', 'outdoor'
    ],
    requiredCues: ['aerial'],
    confidence: 0.6
  },
  {
    name: 'Reception',
    visualCues: [
      'party', 'dance', 'celebration', 'guests', 'music',
      'cake', 'dinner', 'toast', 'entertainment', 'crowd'
    ],
    requiredCues: ['people', 'indoor'],
    confidence: 0.4
  },
  {
    name: 'CoupleScenes',
    visualCues: [
      'couple', 'romantic', 'kiss', 'embrace', 'love',
      'together', 'intimate', 'portrait', 'pose', 'holding hands'
    ],
    requiredCues: ['people'],
    confidence: 0.45
  },
  {
    name: 'ProtocolPhotos',
    visualCues: [
      'formal', 'group', 'family', 'portrait', 'posed',
      'lineup', 'traditional', 'official', 'protocol', 'formal photo'
    ],
    requiredCues: ['people', 'formal'],
    confidence: 0.5
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
        // Check for visual cues
        if (category.visualCues.some(cue => label.includes(cue.toLowerCase()))) {
          const current = categoryScores.get(category.name) || { score: 0, matches: 0 };
          categoryScores.set(category.name, {
            score: current.score + score,
            matches: current.matches + 1
          });
        }
      });
    });

    // Calculate final scores and check required cues
    let bestMatch = { category: 'OtherMoments', confidence: 0 };

    categoryScores.forEach((data, categoryName) => {
      if (data.matches > 0) {
        const category = CATEGORIES.find(c => c.name === categoryName)!;
        const averageScore = data.score / data.matches;
        
        // Check if required cues are present
        const hasRequiredCues = category.requiredCues.some(cue =>
          predictions.some(p => p.label.toLowerCase().includes(cue.toLowerCase()))
        );

        if (hasRequiredCues && averageScore > category.confidence && averageScore > bestMatch.confidence) {
          bestMatch = {
            category: categoryName,
            confidence: averageScore
          };
        }
      }
    });

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
      Reception: ['reception', 'party', 'festa', 'dance', 'danca'],
      CoupleScenes: ['couple', 'casal', 'romantic', 'love', 'together'],
      ProtocolPhotos: ['protocol', 'formal', 'family', 'familia', 'group', 'grupo']
    };

    let bestMatch = { category: 'OtherMoments', confidence: 0.1 };

    for (const [category, keywords] of Object.entries(patterns)) {
      const matches = keywords.filter(keyword => lowerFilename.includes(keyword));
      if (matches.length > 0) {
        const confidence = 0.4 + (matches.length * 0.1);
        if (confidence > bestMatch.confidence) {
          bestMatch = { category, confidence };
        }
      }
    }

    logger.info(`Filename analysis result for ${filename}: ${bestMatch.category} (${bestMatch.confidence})`);
    return bestMatch;
  }
}