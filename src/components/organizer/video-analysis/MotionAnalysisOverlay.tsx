
import { Activity } from 'lucide-react';
import { AnalysisResult } from '@/hooks/useVideoAnalysis';

interface MotionAnalysisOverlayProps {
  overallMotion: number;
  dominantSceneType: 'emotional' | 'action' | 'default';
  analysisResults: AnalysisResult[];
}

export const MotionAnalysisOverlay = ({
  overallMotion,
  dominantSceneType,
  analysisResults
}: MotionAnalysisOverlayProps) => {
  return (
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
            dominantSceneType === 'emotional' ? 'text-blue-400' : 
            'text-yellow-400'
          }>
            {' '}{dominantSceneType}
          </span>
        </span>
        <span>
          Peaks: {analysisResults.reduce((acc, curr) => acc + (curr.peaks?.length || 0), 0)}
        </span>
      </div>
    </div>
  );
};
