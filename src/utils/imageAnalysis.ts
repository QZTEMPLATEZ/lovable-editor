import { pipeline } from '@huggingface/transformers';
import { toast } from "@/components/ui/use-toast";

export interface ImageClassification {
  category: string;
  confidence: number;
  labels: string[];  // Added this property
}

// Lowered threshold for better categorization
const CONFIDENCE_THRESHOLD = 0.3;

// Expanded category mappings with more keywords
const CATEGORY_MAPPINGS = {
  // Making Of related terms
  'wedding dress': 'MakingOf',
  'makeup': 'MakingOf',
  'hairstyle': 'MakingOf',
  'preparation': 'MakingOf',
  'getting ready': 'MakingOf',
  'bride preparation': 'MakingOf',
  'groom preparation': 'MakingOf',

  // Decor related terms
  'flower arrangement': 'Decor',
  'table setting': 'Decor',
  'chandelier': 'Decor',
  'decoration': 'Decor',
  'centerpiece': 'Decor',
  'venue': 'Decor',

  // Ceremony related terms
  'altar': 'Ceremony',
  'bride': 'Ceremony',
  'groom': 'Ceremony',
  'wedding ceremony': 'Ceremony',
  'vows': 'Ceremony',
  'ring exchange': 'Ceremony',
  'wedding service': 'Ceremony',

  // Reception related terms
  'dance floor': 'Reception',
  'wedding cake': 'Reception',
  'party': 'Reception',
  'celebration': 'Reception',
  'toast': 'Reception',
  'dinner': 'Reception',

  // Details related terms
  'ring': 'Details',
  'invitation': 'Details',
  'jewelry': 'Details',
  'bouquet': 'Details',
  'shoes': 'Details',
  'accessories': 'Details',
} as const;

export const initializeImageClassifier = async () => {
  try {
    if (!classifier) {
      classifier = await pipeline(
        'image-classification',
        'Xenova/vit-base-patch16-224'
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

    const objectUrl = URL.createObjectURL(file);
    const results = await classifier(objectUrl);
    URL.revokeObjectURL(objectUrl);

    console.log('Classification results for', file.name, ':', results);

    // Extract labels from results
    const labels = results.map((result: any) => result.label.toLowerCase());

    // Find the best matching category
    for (const prediction of results) {
      const label = prediction.label.toLowerCase();
      
      for (const [keyword, category] of Object.entries(CATEGORY_MAPPINGS)) {
        if (label.includes(keyword) || file.name.toLowerCase().includes(keyword)) {
          console.log(`Match found for ${file.name}: ${category} (confidence: ${prediction.score})`);
          return {
            category,
            confidence: prediction.score,
            labels
          };
        }
      }
    }

    // If no confident match is found but filename contains category hints
    const fileName = file.name.toLowerCase();
    for (const [keyword, category] of Object.entries(CATEGORY_MAPPINGS)) {
      if (fileName.includes(keyword)) {
        console.log(`Filename match found for ${file.name}: ${category}`);
        return {
          category,
          confidence: 0.5,
          labels
        };
      }
    }

    console.log(`No category match found for ${file.name}, marking as Extras`);
    return {
      category: 'Extras',
      confidence: 0,
      labels
    };
  } catch (error) {
    console.error('Error analyzing image:', error, 'for file:', file.name);
    return {
      category: 'Extras',
      confidence: 0,
      labels: []
    };
  }
};
