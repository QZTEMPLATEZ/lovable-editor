import React, { useEffect, useRef } from 'react';
import { FileVideo } from 'lucide-react';
import { useVideoAnalysis } from '@/hooks/useVideoAnalysis';
import { MotionAnalysisOverlay } from './video-analysis/MotionAnalysisOverlay';
import { calculateFrameDifference, getFramePoints, determineSceneType } from '@/services/video/frameAnalysis';
import { createEditingSequence } from '@/services/premiere/premiereIntegration';

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
            
            if (motionScore > 40) {
              peaks.push(timePoint);
            }

            const sceneType = determineSceneType(motionScore);
            
            addAnalysisResult({
              timePoint,
              motionScore,
              sceneType,
              hasFaces: false,
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
          sceneType: determineSceneType(avgMotion),
          totalPeaks: peaks.length,
          duration: video.duration
        });
      }
    };

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

          const framePoints = getFramePoints(video.duration);
          video.currentTime = Math.min(1, video.duration);
          
          video.addEventListener('seeked', () => {
            if (context) {
              context.drawImage(video, 0, 0, width, height);
              analyzeFrames(video, framePoints).then(() => {
                URL.revokeObjectURL(video.src);
                onLoad?.();

                // Criar sequência no Premiere após análise
                if (window.premiere) {
                  createEditingSequence(analysisResults, "Auto Edit")
                    .catch(error => console.error('Failed to create Premiere sequence:', error));
                }
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

    setupVideo();
  }, [file, onLoad, addAnalysisResult, analysisResults]);

  return (
    <div className={`relative aspect-video bg-black/20 rounded-lg overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain"
      />
      
      <MotionAnalysisOverlay
        overallMotion={overallMotion}
        dominantSceneType={dominantSceneType}
        analysisResults={analysisResults}
      />

      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
        <FileVideo className="w-8 h-8 text-white" />
      </div>
    </div>
  );
};

export default VideoFrame;
