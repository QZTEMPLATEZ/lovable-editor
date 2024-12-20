import { logger } from '../../utils/logger';

export class FrameExtractor {
  static async extractFrameFromVideo(file: File, position: number): Promise<string> {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);
    
    try {
      await new Promise((resolve, reject) => {
        video.onloadedmetadata = resolve;
        video.onerror = reject;
      });

      // Set video quality to low for faster processing
      video.width = 224; // Minimum size for analysis
      video.height = 224;
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      canvas.width = video.width;
      canvas.height = video.height;
      
      // Seek to specific position
      video.currentTime = video.duration * position;
      await new Promise((resolve) => (video.onseeked = resolve));
      
      // Draw frame at low quality
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      return canvas.toDataURL('image/jpeg', 0.5); // Use JPEG with 50% quality
      
    } catch (error) {
      logger.error('Error extracting frame:', error);
      throw error;
    } finally {
      URL.revokeObjectURL(video.src);
    }
  }
}