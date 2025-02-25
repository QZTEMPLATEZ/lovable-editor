
import React, { useEffect, useRef } from 'react';
import { FileVideo, Activity } from 'lucide-react';
import { useVideoAnalysis } from '@/hooks/useVideoAnalysis';

interface VideoFrameProps {
  file: File;
  className?: string;
  onLoad?: () => void;
}

const VideoFrame: React.FC<VideoFrameProps> = ({ file, className = "", onLoad }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    analysisResults,
    overallMotion,
    dominantSceneType,
    addAnalysisResult
  } = useVideoAnalysis();

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
            
            // Add analysis result
            addAnalysisResult({
              timePoint,
              motionScore,
              sceneType: motionScore > 30 ? 'dynamic' : 'static',
              hasFaces: false, // To be implemented with face detection
            });
            
            console.log(`Motion score at ${timePoint}s:`, motionScore);
          }
          
          previousFrameData = frameData;
          
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
  }, [file, onLoad, addAnalysisResult]);

  return (
    <div className={`relative aspect-video bg-black/20 rounded-lg overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain"
      />
      
      {/* Motion analysis overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4" />
          <div className="flex-1">
            <div className="flex justify-between">
              <span>Motion Level:</span>
              <span className={overallMotion > 30 ? 'text-red-400' : 'text-green-400'}>
                {Math.round(overallMotion)}
              </span>
            </div>
            <div className="w-full bg-gray-700 h-1 rounded-full mt-1">
              <div 
                className={`h-full rounded-full ${overallMotion > 30 ? 'bg-red-400' : 'bg-green-400'}`}
                style={{ width: `${Math.min(100, (overallMotion / 50) * 100)}%` }}
              />
            </div>
          </div>
        </div>
        <div className="mt-1">
          Scene Type: <span className={dominantSceneType === 'dynamic' ? 'text-red-400' : 'text-green-400'}>
            {dominantSceneType}
          </span>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
        <FileVideo className="w-8 h-8 text-white" />
      </div>
    </div>
  );
};

export default VideoFrame;
