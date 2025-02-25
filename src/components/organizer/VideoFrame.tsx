
import React, { useState } from 'react';
import { useVideoAnalysis } from '@/hooks/useVideoAnalysis';
import { MotionAnalysisOverlay } from './video-analysis/MotionAnalysisOverlay';
import { createEditingSequence } from '@/services/premiere/premiereIntegration';
import EditingProgress from '../premiere/EditingProgress';
import VideoAnalyzer from './video-analysis/VideoAnalyzer';
import VideoCanvas from './video-display/VideoCanvas';

interface VideoFrameProps {
  file: File;
  className?: string;
  onLoad?: () => void;
}

const VideoFrame: React.FC<VideoFrameProps> = ({ file, className = "", onLoad }) => {
  const {
    analysisResults,
    overallMotion,
    dominantSceneType,
    addAnalysisResult
  } = useVideoAnalysis();

  const [editingProgress, setEditingProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("--:--");

  const handleReEdit = async () => {
    if (window.confirm("Deseja realmente reiniciar a edição?")) {
      setIsProcessing(true);
      setEditingProgress(0);
      try {
        await createEditingSequence(analysisResults, "Auto Edit", updateProgress);
      } catch (error) {
        console.error('Failed to re-edit sequence:', error);
      }
      setIsProcessing(false);
    }
  };

  const handleCorrect = () => {
    console.log("Abrindo interface de correção...");
  };

  const updateProgress = (step: string, progress: number) => {
    setEditingProgress(progress);
    const remainingSeconds = Math.ceil((100 - progress) * 0.5);
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, '0')}`);
  };

  return (
    <div className="space-y-4">
      <div className={`relative aspect-video bg-black/20 rounded-lg overflow-hidden ${className}`}>
        <VideoCanvas file={file} />
        <VideoAnalyzer 
          file={file}
          onAnalysisResult={addAnalysisResult}
          onLoad={onLoad}
        />
        <MotionAnalysisOverlay
          overallMotion={overallMotion}
          dominantSceneType={dominantSceneType}
          analysisResults={analysisResults}
        />
      </div>

      <EditingProgress
        progress={editingProgress}
        timeRemaining={timeRemaining}
        onReEdit={handleReEdit}
        onCorrect={handleCorrect}
        isProcessing={isProcessing}
      />
    </div>
  );
};

export default VideoFrame;
