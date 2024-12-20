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
    const extractFrame = async () => {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      
      video.addEventListener('loadeddata', () => {
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');
          
          // Set canvas dimensions to match video
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          // Draw the frame at 1 second or at the beginning if video is shorter
          video.currentTime = Math.min(1, video.duration);
          
          video.addEventListener('seeked', () => {
            if (context) {
              context.drawImage(video, 0, 0, canvas.width, canvas.height);
              URL.revokeObjectURL(video.src);
              onLoad?.();
            }
          }, { once: true });
        }
      });

      // Handle errors
      video.addEventListener('error', () => {
        console.error('Error loading video for frame extraction');
      });
    };

    extractFrame();
  }, [file, onLoad]);

  return (
    <div className={`relative aspect-video bg-black/20 rounded-lg overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
        <FileVideo className="w-8 h-8 text-white" />
      </div>
    </div>
  );
};

export default VideoFrame;