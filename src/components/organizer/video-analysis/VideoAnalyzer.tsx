
import React, { useEffect } from 'react';
import { calculateFrameDifference, getFramePoints, determineSceneType } from '@/services/video/frameAnalysis';
import { AnalysisResult } from '@/hooks/useVideoAnalysis';

interface VideoAnalyzerProps {
  file: File;
  onAnalysisResult: (result: AnalysisResult) => void;
  onLoad?: () => void;
}

const VideoAnalyzer: React.FC<VideoAnalyzerProps> = ({ file, onAnalysisResult, onLoad }) => {
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

            const sceneType = determineSceneType(motionScore) as 'emotional' | 'action' | 'default';
            
            onAnalysisResult({
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
        const framePoints = getFramePoints(video.duration);
        video.currentTime = Math.min(1, video.duration);
        
        video.addEventListener('seeked', () => {
          analyzeFrames(video, framePoints).then(() => {
            URL.revokeObjectURL(video.src);
            onLoad?.();
          });
        }, { once: true });
      });

      video.addEventListener('error', () => {
        console.error('Error loading video for frame extraction');
        URL.revokeObjectURL(video.src);
      });
    };

    setupVideo();
  }, [file, onLoad, onAnalysisResult]);

  return null;
};

export default VideoAnalyzer;
