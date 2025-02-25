
import { useState } from 'react';

interface AnalysisResult {
  timePoint: number;
  motionScore: number;
  sceneType: 'static' | 'dynamic';
  hasFaces: boolean;
}

export const useVideoAnalysis = () => {
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [overallMotion, setOverallMotion] = useState<number>(0);
  const [dominantSceneType, setDominantSceneType] = useState<'static' | 'dynamic'>('static');

  const addAnalysisResult = (result: AnalysisResult) => {
    setAnalysisResults(prev => [...prev, result]);
    
    // Update overall motion
    const allScores = [...analysisResults, result].map(r => r.motionScore);
    const avgMotion = allScores.reduce((a, b) => a + b, 0) / allScores.length;
    setOverallMotion(avgMotion);
    
    // Update dominant scene type
    const dynamicScenes = allScores.filter(score => score > 30).length;
    setDominantSceneType(dynamicScenes > allScores.length / 2 ? 'dynamic' : 'static');
  };

  return {
    analysisResults,
    overallMotion,
    dominantSceneType,
    addAnalysisResult,
  };
};
