import { pipeline } from '@huggingface/transformers';
import { toast } from "@/components/ui/use-toast";
import { logger } from './logger';

let classifier: any = null;

export interface ImageClassification {
  category: string;
  confidence: number;
  labels: string[];
}

// Increased threshold for more accurate categorization
const CONFIDENCE_THRESHOLD = 0.45;

// Enhanced category mappings with more specific keywords
const CATEGORY_MAPPINGS = {
  // BridePrep specific terms
  'bride makeup': 'BridePrep',
  'bridal preparation': 'BridePrep',
  'wedding dress': 'BridePrep',
  'bride getting ready': 'BridePrep',
  'bridal makeup': 'BridePrep',
  'bridal suite': 'BridePrep',

  // GroomPrep specific terms
  'groom suit': 'GroomPrep',
  'groom preparation': 'GroomPrep',
  'groom getting ready': 'GroomPrep',
  'groomsmen': 'GroomPrep',
  'bow tie': 'GroomPrep',
  'tuxedo': 'GroomPrep',

  // Ceremony specific terms
  'wedding ceremony': 'Ceremony',
  'altar': 'Ceremony',
  'wedding vows': 'Ceremony',
  'ring exchange': 'Ceremony',
  'church ceremony': 'Ceremony',
  'wedding officiant': 'Ceremony',

  // Reception specific terms
  'wedding reception': 'Reception',
  'first dance': 'Reception',
  'wedding party': 'Reception',
  'wedding cake': 'Reception',
  'dance floor': 'Reception',
  'wedding toast': 'Reception',

  // Decor specific terms
  'wedding decoration': 'Decor',
  'floral arrangement': 'Decor',
  'wedding centerpiece': 'Decor',
  'venue decoration': 'Decor',
  'wedding arch': 'Decor',
  'table setting': 'Decor',
} as const;

export const initializeImageClassifier = async () => {
  try {
    if (!classifier) {
      classifier = await pipeline(
        'image-classification',
        'Xenova/vit-base-patch16-224'
      );
      logger.info('Image classifier initialized successfully');
    }
    return true;
  } catch (error) {
    logger.error('Failed to initialize image classifier:', error);
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to initialize image recognition system. Files will be categorized based on names only.",
    });
    return false;
  }
};

export const analyzeImage = async (file: File): Promise<ImageClassification> => {
  if (!classifier) {
    await initializeImageClassifier();
  }

  try {
    if (!classifier) {
      throw new Error('Classifier not initialized');
    }

    const objectUrl = URL.createObjectURL(file);
    const results = await classifier(objectUrl);
    URL.revokeObjectURL(objectUrl);

    logger.info('Classification results for', file.name, ':', results);

    // Extract labels and normalize them
    const labels = results.map((result: any) => result.label.toLowerCase());

    // Calculate category scores
    const categoryScores = new Map<string, number>();
    
    // Analyze each prediction against our category mappings
    for (const prediction of results) {
      const label = prediction.label.toLowerCase();
      
      for (const [keyword, category] of Object.entries(CATEGORY_MAPPINGS)) {
        if (label.includes(keyword)) {
          const currentScore = categoryScores.get(category) || 0;
          categoryScores.set(category, currentScore + prediction.score);
        }
      }
    }

    // Find the category with the highest score above threshold
    let bestCategory = '';
    let bestScore = 0;

    categoryScores.forEach((score, category) => {
      if (score > bestScore && score >= CONFIDENCE_THRESHOLD) {
        bestScore = score;
        bestCategory = category;
      }
    });

    // If we found a confident match
    if (bestCategory) {
      logger.info(`Match found for ${file.name}: ${bestCategory} (confidence: ${bestScore})`);
      return {
        category: bestCategory,
        confidence: bestScore,
        labels
      };
    }

    // Try filename-based categorization as fallback
    const fileName = file.name.toLowerCase();
    for (const [keyword, category] of Object.entries(CATEGORY_MAPPINGS)) {
      if (fileName.includes(keyword)) {
        logger.info(`Filename match found for ${file.name}: ${category}`);
        return {
          category,
          confidence: 0.5,
          labels
        };
      }
    }

    // If no confident match is found, mark as untagged
    logger.info(`No category match found for ${file.name}, marking as Untagged`);
    return {
      category: 'Untagged',
      confidence: 0,
      labels
    };
  } catch (error) {
    logger.error('Error analyzing image:', error, 'for file:', file.name);
    return {
      category: 'Untagged',
      confidence: 0,
      labels: []
    };
  }
};