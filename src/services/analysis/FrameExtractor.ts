import { logger } from '../../utils/logger';

export class FrameExtractor {
  private static readonly FRAME_POSITIONS = [0.1, 0.3, 0.5, 0.7, 0.9];

  static async extractFrameFromVideo(file: File, position: number = 0.5): Promise<string> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      video.autoplay = false;
      video.muted = true;
      video.src = URL.createObjectURL(file);
      
      video.onloadeddata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        video.currentTime = video.duration * position;
      };
      
      video.onseeked = () => {
        if (ctx) {
          try {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL('image/jpeg', 0.8);
            URL.revokeObjectURL(video.src);
            resolve(imageData);
          } catch (error) {
            logger.warn(`Frame extraction failed for position ${position}:`, error);
            reject(error);
          }
        } else {
          reject(new Error('Could not get canvas context'));
        }
      };
      
      video.onerror = (error) => {
        URL.revokeObjectURL(video.src);
        logger.warn(`Video loading failed for position ${position}:`, error);
        reject(error);
      };
    });
  }

  static async extractMultipleFrames(file: File): Promise<string[]> {
    logger.info(`Starting multiple frame extraction for ${file.name}`);
    
    const framePromises = this.FRAME_POSITIONS.map(position => 
      this.extractFrameFromVideo(file, position)
    );

    const frames = await Promise.allSettled(framePromises);
    const validFrames = frames
      .filter((result): result is PromiseFulfilledResult<string> => result.status === 'fulfilled')
      .map(result => result.value);

    logger.info(`Successfully extracted ${validFrames.length} frames from ${file.name}`);
    
    if (validFrames.length === 0) {
      logger.warn(`No valid frames extracted from ${file.name}`);
    }

    return validFrames;
  }
}