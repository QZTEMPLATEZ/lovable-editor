
import React from 'react';
import { Activity, Users } from 'lucide-react';

interface VideoAnalysisStats {
  dynamicScenes: number;
  totalScenes: number;
  faceDetections: number;
  avgMotionScore: number;
  dominantMotionType: 'static' | 'dynamic';
}

interface AnalysisStatsProps {
  stats: VideoAnalysisStats;
}

const AnalysisStats = ({ stats }: AnalysisStatsProps) => {
  if (stats.totalScenes === 0) return null;

  return (
    <div className="bg-black/40 p-4 rounded-lg backdrop-blur-sm space-y-3">
      <div className="flex items-center gap-2 text-sm text-white/80">
        <Activity className="w-4 h-4" />
        <span>Motion Analysis:</span>
        <span className="text-purple-400">
          {stats.dominantMotionType === 'dynamic' ? 'Dynamic' : 'Static'} Dominant
        </span>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-white/80">
        <Users className="w-4 h-4" />
        <span>Face Detections:</span>
        <span className="text-purple-400">
          {Math.round(stats.faceDetections / Math.max(1, stats.totalScenes))} per scene
        </span>
      </div>

      <div className="w-full bg-gray-700 h-1.5 rounded-full">
        <div 
          className="h-full rounded-full bg-purple-400 transition-all duration-300"
          style={{ width: `${Math.min(100, (stats.avgMotionScore / 50) * 100)}%` }}
        />
      </div>
    </div>
  );
};

export default AnalysisStats;
