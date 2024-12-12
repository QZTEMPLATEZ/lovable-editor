import { pipeline } from '@huggingface/transformers';
import { logger } from './logger';

export interface ImageClassification {
  category: string;
  confidence: number;
  labels: string[];
}

let classifier: any = null;

const initializeClassifier = async () => {
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
    return false;
  }
};

export const analyzeImage = async (file: File): Promise<ImageClassification> => {
  try {
    const initialized = await initializeClassifier();
    if (!initialized || !classifier) {
      logger.error('Classifier not initialized properly');
      return {
        category: 'Untagged',
        confidence: 0,
        labels: []
      };
    }

    // Create object URL for the image file
    const objectUrl = URL.createObjectURL(file);

    try {
      // Analyze the image
      const results = await classifier(objectUrl);
      
      // Clean up the object URL after analysis
      URL.revokeObjectURL(objectUrl);

      // Extract labels from results
      const labels = results.map((result: any) => result.label.toLowerCase());

      // Process results to determine category
      let bestCategory = 'Untagged';
      let bestConfidence = 0;

      // Map the results to categories based on labels
      const categoryMappings = {
        'BridePrep': ['bride', 'wedding dress', 'makeup', 'bridal'],
        'GroomPrep': ['groom', 'suit', 'tuxedo', 'tie'],
        'Ceremony': ['altar', 'church', 'ceremony', 'wedding'],
        'Reception': ['party', 'dance', 'celebration', 'reception'],
        'Decoration': ['flowers', 'decor', 'arrangement', 'venue'],
        'DroneFootage': ['aerial', 'drone', 'landscape', 'sky']
      };

      // Calculate confidence for each category
      Object.entries(categoryMappings).forEach(([category, keywords]) => {
        const matchingLabels = labels.filter(label => 
          keywords.some(keyword => label.includes(keyword))
        );
        
        if (matchingLabels.length > 0) {
          const confidence = matchingLabels.length / keywords.length;
          if (confidence > bestConfidence) {
            bestConfidence = confidence;
            bestCategory = category;
          }
        }
      });

      logger.info(`Image ${file.name} classified as ${bestCategory} with confidence ${bestConfidence}`);

      return {
        category: bestCategory,
        confidence: bestConfidence,
        labels
      };

    } catch (error) {
      logger.error(`Error analyzing image ${file.name}:`, error);
      URL.revokeObjectURL(objectUrl); // Clean up in case of error
      throw error;
    }

  } catch (error) {
    logger.error(`Failed to analyze image ${file.name}:`, error);
    return {
      category: 'Untagged',
      confidence: 0,
      labels: []
    };
  }
};