import { logger } from '../utils/logger';
import { ORGANIZER_CONFIG } from '../config/organizerConfig';
import { getVideoMetadata } from '../utils/videoProcessing';
import { videoAnalysisService } from './VideoAnalysisService';

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

      if (!ORGANIZER_CONFIG.analysis.supportedFileTypes.includes(file.type)) {
        throw new Error(`Unsupported file type: ${file.type}`);
      }

      if (file.size > ORGANIZER_CONFIG.analysis.maxFileSize) {
        throw new Error('File size exceeds maximum limit');
      }

      // Get video metadata
      let metadata = {};
      if (file.type.startsWith('video/')) {
        metadata = await getVideoMetadata(file);
      }

      // Perform visual analysis
      const { category, confidence } = await videoAnalysisService.analyzeVideo(file);
      
      logger.info(`Analysis complete for ${file.name}: ${category} (${confidence})`);
      
      return {
        file,
        category,
        confidence,
        metadata
      };
    } catch (error) {
      logger.error(`Analysis failed for file: ${file.name}`, error);
      return {
        file,
        category: 'untagged',
        confidence: 0,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async analyzeFiles(files: File[]): Promise<AnalysisResult[]> {
    logger.info(`Starting batch analysis for ${files.length} files`);
    
    const results = await Promise.all(
      files.map(file => this.analyzeFile(file))
    );

    logger.info(`Completed batch analysis for ${files.length} files`);
    return results;
  }
}

export const fileAnalysisService = FileAnalysisService.getInstance();