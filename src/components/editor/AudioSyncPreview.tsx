
import React from 'react';
import { motion } from 'framer-motion';
import { CloudLink } from '@/components/editor/types';
import { useAudioSync } from '@/hooks/useAudioSync';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AudioWaveform } from 'lucide-react';

interface AudioSyncPreviewProps {
  videoLink: CloudLink | null;
  audioLink: CloudLink | null;
  onSyncComplete?: (syncPoints: { videoTime: number; beatTime: number }[]) => void;
}

const AudioSyncPreview: React.FC<AudioSyncPreviewProps> = ({
  videoLink,
  audioLink,
  onSyncComplete
}) => {
  const { syncPoints, isAnalyzing, progress, analyzeMusicAndSync } = useAudioSync(videoLink, audioLink);

  return (
    <div className="space-y-4 p-4 bg-editor-glass-dark rounded-lg border border-editor-border">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Sincronização com Música</h3>
        <Button
          onClick={analyzeMusicAndSync}
          disabled={isAnalyzing || !videoLink || !audioLink}
          variant="outline"
          className="gap-2"
        >
          <AudioWaveform className="w-4 h-4" />
          {isAnalyzing ? 'Analisando...' : 'Sincronizar com Batidas'}
        </Button>
      </div>

      {isAnalyzing && (
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-gray-400">Analisando áudio e gerando pontos de sincronização...</p>
        </div>
      )}

      {syncPoints.length > 0 && (
        <div className="relative h-20 bg-editor-glass-dark rounded border border-editor-border overflow-hidden">
          {syncPoints.map((point, index) => (
            <motion.div
              key={index}
              className="absolute bottom-0 w-1 bg-purple-400"
              style={{
                left: `${(point.beatTime / syncPoints[syncPoints.length - 1].beatTime) * 100}%`,
                height: `${Math.min(100, point.beatTime * 50)}%`
              }}
              initial={{ height: 0 }}
              animate={{ height: `${Math.min(100, point.beatTime * 50)}%` }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
            />
          ))}
        </div>
      )}

      {syncPoints.length > 0 && (
        <p className="text-sm text-gray-400">
          {syncPoints.length} pontos de sincronização detectados
        </p>
      )}
    </div>
  );
};

export default AudioSyncPreview;
