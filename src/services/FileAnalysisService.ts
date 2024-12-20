import { logger } from '../utils/logger';
import { CategoryMatcher } from './analysis/core/CategoryMatcher';
import { getVideoMetadata } from '../utils/videoProcessing';

export interface AnalysisResult {
  file: File;
  category: string;
  confidence: number;
  metadata?: {
    duration?: number;
    fps?: number;
    resolution?: {
      width: number;
      height: number;
    };
  };
  error?: string;
}

export class FileAnalysisService {
  private static instance: FileAnalysisService;

  private constructor() {}

  static getInstance(): FileAnalysisService {
    if (!FileAnalysisService.instance) {
      FileAnalysisService.instance = new FileAnalysisService();
    }
    return FileAnalysisService.instance;
  }

  async analyzeFile(file: File): Promise<AnalysisResult> {
    try {
      logger.info(`Starting analysis for file: ${file.name}`);

      // Get video metadata
      let metadata = {};
      if (file.type.startsWith('video/')) {
        metadata = await getVideoMetadata(file);
      }

      // Get predictions from ML model
      const predictions = await this.getPredictions(file);
      
      // Get best category match
      const { category, confidence } = CategoryMatcher.getBestCategory(predictions, file.name);
      
      logger.info(`Analysis complete for ${file.name}: ${category} (${confidence})`);
      
      return {
        file,
        category,
        confidence,
        metadata
      };
    } catch (error) {
      logger.error(`Analysis failed for file: ${file.name}`, error);
      // Instead of returning untagged, return OtherMoments
      return {
        file,
        category: 'OtherMoments',
        confidence: 0.1,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  private async getPredictions(file: File): Promise<any[]> {
    // Implement ML model prediction logic here
    // For now, return mock predictions
    return [
      { label: 'video', score: 0.9 },
      { label: 'scene', score: 0.8 }
    ];
  }
}

export const fileAnalysisService = FileAnalysisService.getInstance();