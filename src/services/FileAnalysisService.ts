import { logger } from '../utils/logger';
import { ORGANIZER_CONFIG } from '../config/organizerConfig';
import { analyzeImage } from '../utils/imageAnalysis';

export interface AnalysisResult {
  file: File;
  category: string;
  confidence: number;
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

      const analysis = await analyzeImage(file);
      
      return {
        file,
        category: analysis.category,
        confidence: analysis.confidence
      };
    } catch (error) {
      logger.error(`Analysis failed for file: ${file.name}`, error);
      return {
        file,
        category: ORGANIZER_CONFIG.categories.defaultCategory,
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