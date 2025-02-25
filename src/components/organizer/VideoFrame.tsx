
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

    const analyzeFrames = async (video: HTMLVideoElement, framePoints: number[]) => {
      const tempCanvas = document.createElement('canvas');
      const tempContext = tempCanvas.getContext('2d');
      
      if (!tempContext) return;

      tempCanvas.width = video.videoWidth;
      tempCanvas.height = video.videoHeight;

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
          
          // Convert canvas to blob for analysis
          const blob = await new Promise<Blob>((resolve) => {
            tempCanvas.toBlob(blob => {
              if (blob) resolve(blob);
            }, 'image/jpeg');
          });

          // Create File object for analysis
          const frameFile = new File([blob], `frame-${timePoint}.jpg`, { type: 'image/jpeg' });
          
          // Log frame data for debugging
          console.log(`Extracted frame at ${timePoint}s for analysis`);
        } catch (error) {
          console.error(`Error extracting frame at ${timePoint}s:`, error);
        }
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
