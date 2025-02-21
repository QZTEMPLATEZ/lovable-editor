
import { pipeline } from '@huggingface/transformers';
import { toast } from '@/hooks/use-toast';

export interface VideoAnalysisResult {
  category: string;
  confidence: number;
  detectedObjects: string[];
  timestamp: number;
}

export interface FrameAnalysis {
  timestamp: number;
  category: string;
  confidence: number;
}

class VideoAnalysisService {
  private classifier: any = null;
  private objectDetector: any = null;

  async initialize() {
    try {
      if (!this.classifier) {
        this.classifier = await pipeline('image-classification', 'Xenova/vit-base-patch16-224');
        console.log('Video classifier initialized');
      }
      
      if (!this.objectDetector) {
        this.objectDetector = await pipeline('object-detection', 'Xenova/detr-resnet-50');
        console.log('Object detector initialized');
      }

      return true;
    } catch (error) {
      console.error('Failed to initialize video analysis:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to initialize video analysis. Some features may be limited.",
      });
      return false;
    }
  }

  async analyzeVideoFrame(frame: ImageBitmap): Promise<VideoAnalysisResult> {
    if (!this.classifier || !this.objectDetector) {
      await this.initialize();
    }

    try {
      // Analyze frame with image classifier
      const classificationResults = await this.classifier(frame);
      
      // Detect objects in frame
      const detectionResults = await this.objectDetector(frame);

      // Map results to wedding categories
      const category = this.mapToWeddingCategory(
        classificationResults[0].label,
        detectionResults.map((obj: any) => obj.label)
      );

      return {
        category,
        confidence: classificationResults[0].score,
        detectedObjects: detectionResults.map((obj: any) => obj.label),
        timestamp: performance.now()
      };
    } catch (error) {
      console.error('Error analyzing video frame:', error);
      throw error;
    }
  }

  private mapToWeddingCategory(classLabel: string, detectedObjects: string[]): string {
    const label = classLabel.toLowerCase();
    const objects = detectedObjects.map(obj => obj.toLowerCase());

    // Wedding preparation detection
    if (
      objects.includes('person') &&
      (objects.includes('mirror') || objects.includes('chair')) &&
      (label.includes('room') || label.includes('indoor'))
    ) {
      return objects.includes('dress') ? 'brideprep' : 'groomprep';
    }

    // Ceremony detection
    if (
      (objects.includes('altar') || label.includes('church')) ||
      (objects.includes('people') && objects.includes('chairs') && label.includes('ceremony'))
    ) {
      return 'ceremony';
    }

    // Reception detection
    if (
      objects.includes('table') ||
      objects.includes('dance floor') ||
      label.includes('party') ||
      label.includes('celebration')
    ) {
      return 'reception';
    }

    // Decoration detection
    if (
      objects.includes('flower') ||
      objects.includes('decoration') ||
      label.includes('arrangement') ||
      label.includes('decor')
    ) {
      return 'decoration';
    }

    // Drone shot detection
    if (
      label.includes('aerial') ||
      label.includes('landscape') ||
      label.includes('building') ||
      objects.includes('sky')
    ) {
      return 'drone';
    }

    return 'uncategorized';
  }

  async extractFrames(videoFile: File, interval: number = 1000): Promise<FrameAnalysis[]> {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) {
      throw new Error('Failed to get canvas context');
    }

    return new Promise((resolve, reject) => {
      const frames: FrameAnalysis[] = [];
      
      video.src = URL.createObjectURL(videoFile);
      
      video.onloadedmetadata = async () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const duration = video.duration;
        const totalFrames = Math.floor(duration * 1000 / interval);
        
        for (let i = 0; i < totalFrames; i++) {
          video.currentTime = i * interval / 1000;
          
          await new Promise(resolve => {
            video.onseeked = resolve;
          });
          
          context.drawImage(video, 0, 0);
          const frame = await createImageBitmap(canvas);
          
          try {
            const analysis = await this.analyzeVideoFrame(frame);
            frames.push({
              timestamp: i * interval,
              category: analysis.category,
              confidence: analysis.confidence
            });
          } catch (error) {
            console.error(`Error analyzing frame at ${i * interval}ms:`, error);
          }
        }
        
        URL.revokeObjectURL(video.src);
        resolve(frames);
      };
      
      video.onerror = () => {
        URL.revokeObjectURL(video.src);
        reject(new Error('Failed to load video'));
      };
    });
  }
}

export const videoAnalysisService = new VideoAnalysisService();
