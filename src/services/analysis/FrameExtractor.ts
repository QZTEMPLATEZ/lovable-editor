import { logger } from '../../utils/logger';

interface ExtractionOptions {
  maxFrames?: number;
  minDifference?: number;
}

export class FrameExtractor {
  private static readonly DEFAULT_POSITIONS = [0.1, 0.3, 0.5, 0.7, 0.9];
  private static readonly MIN_PIXEL_DIFFERENCE = 0.15;

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

  static async extractKeyFrames(file: File, options: ExtractionOptions = {}): Promise<string[]> {
    const { maxFrames = 5, minDifference = this.MIN_PIXEL_DIFFERENCE } = options;
    const keyframes: string[] = [];
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    return new Promise((resolve, reject) => {
      video.src = URL.createObjectURL(file);
      video.muted = true;

      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        let lastImageData: ImageData | null = null;

        const checkFrame = async () => {
          if (!ctx) return;
          
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const currentImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

          if (!lastImageData || this.calculateDifference(currentImageData, lastImageData) > minDifference) {
            keyframes.push(canvas.toDataURL('image/jpeg', 0.8));
            lastImageData = currentImageData;
          }

          if (keyframes.length >= maxFrames || video.currentTime >= video.duration) {
            video.pause();
            URL.revokeObjectURL(video.src);
            resolve(keyframes);
            return;
          }

          video.currentTime += video.duration / 20; // Sample every 5% of video duration
        };

        video.onseeked = checkFrame;
        video.currentTime = 0; // Start checking frames
      };

      video.onerror = reject;
    });
  }

  private static calculateDifference(current: ImageData, previous: ImageData): number {
    const data1 = current.data;
    const data2 = previous.data;
    let diff = 0;
    
    for (let i = 0; i < data1.length; i += 4) {
      diff += Math.abs(data1[i] - data2[i]); // Red
      diff += Math.abs(data1[i + 1] - data2[i + 1]); // Green
      diff += Math.abs(data1[i + 2] - data2[i + 2]); // Blue
    }
    
    return diff / (data1.length * 255); // Normalize difference
  }

  static async extractMultipleFrames(file: File): Promise<string[]> {
    try {
      // Try to extract keyframes first
      const keyframes = await this.extractKeyFrames(file, { maxFrames: 5 });
      
      if (keyframes.length >= 3) {
        logger.info(`Successfully extracted ${keyframes.length} keyframes from ${file.name}`);
        return keyframes;
      }

      // Fallback to fixed positions if not enough keyframes found
      logger.info(`Falling back to fixed positions for ${file.name}`);
      const framePromises = this.DEFAULT_POSITIONS.map(position => 
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
    } catch (error) {
      logger.error(`Error extracting frames from ${file.name}:`, error);
      throw error;
    }
  }
}