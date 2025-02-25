
import React, { useEffect, useRef } from 'react';
import { FileVideo } from 'lucide-react';

interface VideoFrameProps {
  file: File;
  className?: string;
  onLoad?: () => void;
}

const VideoFrame: React.FC<VideoFrameProps> = ({ file, className = "", onLoad }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const extractFrames = async () => {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      
      video.addEventListener('loadeddata', () => {
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');
          
          // Set canvas dimensions while maintaining aspect ratio
          const maxDimension = 320;
          const aspectRatio = video.videoWidth / video.videoHeight;
          
          let width = maxDimension;
          let height = maxDimension;
          
          if (aspectRatio > 1) {
            height = width / aspectRatio;
          } else {
            width = height * aspectRatio;
          }
          
          canvas.width = width;
          canvas.height = height;

          // Calculate frame extraction points (25%, 50%, 75% of video duration)
          const framePoints = [
            video.duration * 0.25,
            video.duration * 0.5,
            video.duration * 0.75
          ];

          // Extract first frame for thumbnail
          video.currentTime = Math.min(1, video.duration);
          
          video.addEventListener('seeked', () => {
            if (context) {
              context.drawImage(video, 0, 0, width, height);
              
              // After drawing the thumbnail, we can start analyzing other frames
              analyzeFrames(video, framePoints).then(() => {
                URL.revokeObjectURL(video.src);
                onLoad?.();
              });
            }
          }, { once: true });
        }
      });

      video.addEventListener('error', () => {
        console.error('Error loading video for frame extraction');
        URL.revokeObjectURL(video.src);
      });
    };

    const calculateFrameDifference = (frame1: ImageData, frame2: ImageData): number => {
      const data1 = frame1.data;
      const data2 = frame2.data;
      let diff = 0;
      
      // Compare pixel values between frames
      for (let i = 0; i < data1.length; i += 4) {
        diff += Math.abs(data1[i] - data2[i]); // R
        diff += Math.abs(data1[i + 1] - data2[i + 1]); // G
        diff += Math.abs(data1[i + 2] - data2[i + 2]); // B
      }
      
      // Normalize difference value
      return diff / (frame1.width * frame1.height * 3);
    };

    const analyzeFrames = async (video: HTMLVideoElement, framePoints: number[]) => {
      const tempCanvas = document.createElement('canvas');
      const tempContext = tempCanvas.getContext('2d');
      
      if (!tempContext) return;

      tempCanvas.width = video.videoWidth;
      tempCanvas.height = video.videoHeight;

      let previousFrameData: ImageData | null = null;
      let motionScores: number[] = [];

      for (const timePoint of framePoints) {
        try {
          // Seek to frame point
          video.currentTime = timePoint;
          
          // Wait for seeking to complete
          await new Promise(resolve => {
            video.addEventListener('seeked', resolve, { once: true });
          });

          // Draw frame to temp canvas
          tempContext.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);
          
          // Get frame data for motion analysis
          const frameData = tempContext.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
          
          // Calculate motion if we have a previous frame
          if (previousFrameData) {
            const motionScore = calculateFrameDifference(previousFrameData, frameData);
            motionScores.push(motionScore);
            console.log(`Motion score at ${timePoint}s:`, motionScore);
          }
          
          previousFrameData = frameData;

          // Convert canvas to blob for analysis
          const blob = await new Promise<Blob>((resolve) => {
            tempCanvas.toBlob(blob => {
              if (blob) resolve(blob);
            }, 'image/jpeg');
          });

          // Create File object for analysis
          const frameFile = new File([blob], `frame-${timePoint}.jpg`, { type: 'image/jpeg' });
          
          // Analyze scene type based on motion scores
          const avgMotionScore = motionScores.reduce((a, b) => a + b, 0) / motionScores.length;
          const sceneType = avgMotionScore > 30 ? 'dynamic' : 'static';
          
          console.log(`Extracted frame at ${timePoint}s. Scene type: ${sceneType}`);
          console.log(`Motion analysis: ${avgMotionScore > 30 ? 'High motion' : 'Low motion'} scene`);
          
        } catch (error) {
          console.error(`Error extracting frame at ${timePoint}s:`, error);
        }
      }

      // Log overall scene analysis
      if (motionScores.length > 0) {
        const avgMotion = motionScores.reduce((a, b) => a + b, 0) / motionScores.length;
        console.log('Overall scene motion analysis:', {
          averageMotion: avgMotion,
          sceneType: avgMotion > 30 ? 'Dynamic Scene' : 'Static Scene',
          samples: motionScores.length
        });
      }
    };

    extractFrames();
  }, [file, onLoad]);

  return (
    <div className={`relative aspect-video bg-black/20 rounded-lg overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
        <FileVideo className="w-8 h-8 text-white" />
      </div>
    </div>
  );
};

export default VideoFrame;
