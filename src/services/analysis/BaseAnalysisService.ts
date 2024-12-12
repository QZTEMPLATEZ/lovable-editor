import { logger } from '../../utils/logger';
import { pipeline } from '@huggingface/transformers';

export class BaseAnalysisService {
  protected classifier: any = null;

  protected async initialize() {
    try {
      if (!this.classifier) {
        this.classifier = await pipeline(
          'image-classification',
          'Xenova/vit-base-patch16-224',
          { revision: 'main' }
        );
        logger.info('Video analysis classifier initialized successfully');
      }
      return true;
    } catch (error) {
      logger.error('Failed to initialize video classifier:', error);
      return false;
    }
  }

  protected async extractFrames(file: File): Promise<HTMLCanvasElement[]> {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);
    
    await new Promise((resolve, reject) => {
      video.onloadedmetadata = resolve;
      video.onerror = reject;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const frames: HTMLCanvasElement[] = [];
    
    const framePoints = Array.from({ length: 20 }, (_, i) => i / 19);
    const duration = video.duration;
    
    for (const point of framePoints) {
      video.currentTime = duration * point;
      await new Promise((resolve) => (video.onseeked = resolve));
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      
      const frameCanvas = document.createElement('canvas');
      frameCanvas.width = 224;
      frameCanvas.height = 224;
      const frameCtx = frameCanvas.getContext('2d')!;
      frameCtx.drawImage(
        canvas, 
        0, 0, canvas.width, canvas.height,
        0, 0, 224, 224
      );
      
      frames.push(frameCanvas);
    }

    URL.revokeObjectURL(video.src);
    return frames;
  }
}