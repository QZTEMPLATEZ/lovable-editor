
import React, { useEffect, useRef } from 'react';
import { FileVideo } from 'lucide-react';

interface VideoCanvasProps {
  file: File;
  className?: string;
}

const VideoCanvas: React.FC<VideoCanvasProps> = ({ file, className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const setupVideo = async () => {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      
      video.addEventListener('loadeddata', () => {
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');
          
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

          video.currentTime = Math.min(1, video.duration);
          
          video.addEventListener('seeked', () => {
            if (context) {
              context.drawImage(video, 0, 0, width, height);
              URL.revokeObjectURL(video.src);
            }
          }, { once: true });
        }
      });

      video.addEventListener('error', () => {
        console.error('Error loading video for frame extraction');
        URL.revokeObjectURL(video.src);
      });
    };

    setupVideo();
  }, [file]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain"
      />
      
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
        <FileVideo className="w-8 h-8 text-white" />
      </div>
    </>
  );
};

export default VideoCanvas;
