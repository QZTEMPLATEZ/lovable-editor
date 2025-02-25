
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

          // Analyze more frames for better motion detection
          const framePoints = [
            video.duration * 0.1,
            video.duration * 0.25,
            video.duration * 0.5,
            video.duration * 0.75,
            video.duration * 0.9
          ];

          // Extract first frame for thumbnail
          video.currentTime = Math.min(1, video.duration);
          
          video.addEventListener('seeked', () => {
            if (context) {
              context.drawImage(video, 0, 0, width, height);
              
              // After drawing the thumbnail, analyze frames
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
      let peaks: number[] = [];

      for (const timePoint of framePoints) {
        try {
          video.currentTime = timePoint;
          
          await new Promise(resolve => {
            video.addEventListener('seeked', resolve, { once: true });
          });

          tempContext.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);
          const frameData = tempContext.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
          
          if (previousFrameData) {
            const motionScore = calculateFrameDifference(previousFrameData, frameData);
            motionScores.push(motionScore);
            
            // Detect motion peaks
            if (motionScore > 40) {
              peaks.push(timePoint);
            }

            // Determine scene type based on motion
            let sceneType: 'emotional' | 'action' | 'default';
            if (motionScore < 20) {
              sceneType = 'emotional';
            } else if (motionScore > 40) {
              sceneType = 'action';
            } else {
              sceneType = 'default';
            }
            
            addAnalysisResult({
              timePoint,
              motionScore,
              sceneType,
              peaks,
              averageMotion: motionScores.reduce((a, b) => a + b, 0) / motionScores.length
            });
            
            console.log(`Analysis at ${timePoint}s:`, {
              motionScore,
              sceneType,
              peaks: peaks.length
            });
          }
          
          previousFrameData = frameData;
          
        } catch (error) {
          console.error(`Error analyzing frame at ${timePoint}s:`, error);
        }
      }

      if (motionScores.length > 0) {
        const avgMotion = motionScores.reduce((a, b) => a + b, 0) / motionScores.length;
        console.log('Final scene analysis:', {
          averageMotion: avgMotion,
          sceneType: avgMotion > 40 ? 'action' : avgMotion < 20 ? 'emotional' : 'default',
          totalPeaks: peaks.length,
          duration: video.duration
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
      
      {/* Enhanced motion analysis overlay */}
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
                className={`h-full rounded-full ${
                  overallMotion > 40 ? 'bg-red-400' : 
                  overallMotion > 20 ? 'bg-yellow-400' : 'bg-green-400'
                }`}
                style={{ width: `${Math.min(100, (overallMotion / 50) * 100)}%` }}
              />
            </div>
          </div>
        </div>
        <div className="mt-1 flex justify-between text-xs">
          <span>Type: 
            <span className={
              dominantSceneType === 'action' ? 'text-red-400' : 
              dominantSceneType === 'emotional' ? 'text-blue-400' : 'text-yellow-400'
            }>
              {' '}{dominantSceneType}
            </span>
          </span>
          <span>
            {analysisResults.length > 0 && 
              `Peaks: ${analysisResults.filter(r => r.peaks?.length > 0).length}`
            }
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
