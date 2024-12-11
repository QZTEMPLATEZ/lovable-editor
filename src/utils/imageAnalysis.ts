import { pipeline, Pipeline } from '@huggingface/transformers';
import { toast } from "@/components/ui/use-toast";

let classifier: Pipeline | null = null;

export interface ImageClassification {
  category: string;
  confidence: number;
}

const CONFIDENCE_THRESHOLD = 0.6;

const CATEGORY_MAPPINGS = {
  'wedding dress': 'MakingOf',
  'makeup': 'MakingOf',
  'hairstyle': 'MakingOf',
  'flower arrangement': 'Decor',
  'table setting': 'Decor',
  'chandelier': 'Decor',
  'altar': 'Ceremony',
  'bride': 'Ceremony',
  'groom': 'Ceremony',
  'wedding ceremony': 'Ceremony',
  'dance floor': 'Reception',
  'wedding cake': 'Reception',
  'party': 'Reception',
  'ring': 'Details',
  'invitation': 'Details',
  'jewelry': 'Details',
} as const;

export const initializeImageClassifier = async () => {
  try {
    if (!classifier) {
      classifier = await pipeline(
        'image-classification',
        'microsoft/resnet-50',
        { device: 'cpu' } // Fallback to CPU if WebGPU is not available
      );
      console.log('Image classifier initialized successfully');
    }
    return true;
  } catch (error) {
    console.error('Failed to initialize image classifier:', error);
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

    const results = await classifier(file);
    console.log('Classification results:', results);

    // Find the best matching category
    for (const prediction of results) {
      const label = prediction.label.toLowerCase();
      for (const [keyword, category] of Object.entries(CATEGORY_MAPPINGS)) {
        if (label.includes(keyword) && prediction.score > CONFIDENCE_THRESHOLD) {
          return {
            category,
            confidence: prediction.score
          };
        }
      }
    }

    // If no confident match is found, return Extras category
    return {
      category: 'Extras',
      confidence: 0
    };
  } catch (error) {
    console.error('Error analyzing image:', error);
    return {
      category: 'Extras',
      confidence: 0
    };
  }
};