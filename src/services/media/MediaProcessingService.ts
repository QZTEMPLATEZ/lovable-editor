import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { logger } from '../../utils/logger';

interface AudioAnalysisResult {
  bpm: number;
  beats: number[];
  segments: {
    start: number;
    end: number;
    type: 'speech' | 'music';
  }[];
}

interface VideoSegment {
  start: number;
  end: number;
  type: 'ceremony' | 'speech' | 'dance' | 'general';
  confidence: number;
}

export class MediaProcessingService {
  private static instance: MediaProcessingService;
  private ffmpeg: any;
  private initialized = false;

  private constructor() {
    this.ffmpeg = createFFmpeg({
      log: true,
      corePath: 'https://unpkg.com/@ffmpeg/core@0.12.2/dist/ffmpeg-core.js'
    });
  }

  static getInstance(): MediaProcessingService {
    if (!MediaProcessingService.instance) {
      MediaProcessingService.instance = new MediaProcessingService();
    }
    return MediaProcessingService.instance;
  }

  async initialize() {
    if (!this.initialized) {
      try {
        await this.ffmpeg.load();
        this.initialized = true;
        logger.info('FFmpeg initialized successfully');
      } catch (error) {
        logger.error('Failed to initialize FFmpeg:', error);
        throw error;
      }
    }
  }

  async extractAudio(videoFile: File): Promise<Blob> {
    await this.initialize();
    
    try {
      const inputFileName = 'input.mp4';
      const outputFileName = 'output.wav';
      
      this.ffmpeg.FS('writeFile', inputFileName, await fetchFile(videoFile));
      
      await this.ffmpeg.run(
        '-i', inputFileName,
        '-vn',
        '-acodec', 'pcm_s16le',
        '-ar', '44100',
        '-ac', '2',
        outputFileName
      );
      
      const data = this.ffmpeg.FS('readFile', outputFileName);
      return new Blob([data.buffer], { type: 'audio/wav' });
    } catch (error) {
      logger.error('Error extracting audio:', error);
      throw error;
    }
  }

  async analyzeAudio(audioBlob: Blob): Promise<AudioAnalysisResult> {
    // Esta é uma implementação simulada
    // Em produção, usaríamos APIs nativas do iOS ou serviços externos
    return {
      bpm: 120,
      beats: [0, 0.5, 1.0, 1.5],
      segments: [
        { start: 0, end: 30, type: 'music' },
        { start: 30, end: 60, type: 'speech' }
      ]
    };
  }

  async extractFrames(videoFile: File, fps: number = 1): Promise<Blob[]> {
    await this.initialize();
    
    try {
      const inputFileName = 'input.mp4';
      const outputPattern = 'frame%d.jpg';
      
      this.ffmpeg.FS('writeFile', inputFileName, await fetchFile(videoFile));
      
      await this.ffmpeg.run(
        '-i', inputFileName,
        '-vf', `fps=${fps}`,
        '-frame_pts', '1',
        outputPattern
      );
      
      // Ler os frames gerados
      const frames: Blob[] = [];
      let frameCount = 0;
      
      while (true) {
        try {
          const frameData = this.ffmpeg.FS('readFile', `frame${frameCount + 1}.jpg`);
          frames.push(new Blob([frameData.buffer], { type: 'image/jpeg' }));
          frameCount++;
        } catch {
          break;
        }
      }
      
      return frames;
    } catch (error) {
      logger.error('Error extracting frames:', error);
      throw error;
    }
  }

  async detectScenes(videoFile: File): Promise<VideoSegment[]> {
    // Esta função seria implementada usando APIs nativas do iOS
    // ou serviços externos em produção
    return [
      { start: 0, end: 30, type: 'ceremony', confidence: 0.9 },
      { start: 30, end: 60, type: 'speech', confidence: 0.8 }
    ];
  }

  async cleanup() {
    if (this.initialized) {
      try {
        // Limpar arquivos temporários
        const files = this.ffmpeg.FS('readdir', '/');
        for (const file of files) {
          if (file !== '.' && file !== '..') {
            this.ffmpeg.FS('unlink', file);
          }
        }
      } catch (error) {
        logger.error('Error during cleanup:', error);
      }
    }
  }
}

export const mediaProcessingService = MediaProcessingService.getInstance();