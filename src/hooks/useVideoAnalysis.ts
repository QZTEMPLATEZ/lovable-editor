
import { useState } from 'react';

interface AnalysisResult {
  timePoint: number;
  motionScore: number;
  sceneType: 'emotional' | 'action' | 'default';
  hasFaces: boolean;
  peaks?: number[];
  averageMotion?: number;
}

export const useVideoAnalysis = () => {
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [overallMotion, setOverallMotion] = useState<number>(0);
  const [dominantSceneType, setDominantSceneType] = useState<'emotional' | 'action' | 'default'>('default');

  const addAnalysisResult = (result: AnalysisResult) => {
    setAnalysisResults(prev => [...prev, result]);
    
    // Update overall motion
    const allScores = [...analysisResults, result].map(r => r.motionScore);
    const avgMotion = allScores.reduce((a, b) => a + b, 0) / allScores.length;
    setOverallMotion(avgMotion);
    
    // Update dominant scene type based on motion score
    setDominantSceneType(
      avgMotion > 40 ? 'action' : 
      avgMotion < 20 ? 'emotional' : 
      'default'
    );
  };

  return {
    analysisResults,
    overallMotion,
    dominantSceneType,
    addAnalysisResult,
  };
};
