
import React from 'react';
import { Play, Pause, X, Music2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import { Track } from './TrackList';
import { cn } from '@/lib/utils';

export interface TrackItemProps {
  track: Track;
  isPlaying: boolean;
  isAnalyzing: boolean;
  onTogglePlay: () => void;
  onRemove: () => void;
}

const TrackItem = ({
  track,
  isPlaying,
  isAnalyzing,
  onTogglePlay,
  onRemove,
}: TrackItemProps) => {
  const intensityColor = track.intensity > 0.7 
    ? 'bg-red-500/20' 
    : track.intensity > 0.4 
      ? 'bg-yellow-500/20' 
      : 'bg-green-500/20';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={cn(
        "relative p-4 rounded-lg border transition-all duration-300",
        "bg-purple-500/10 border-purple-500/20 group hover:border-purple-500/40",
        isPlaying && "border-purple-500/60 bg-purple-500/20"
      )}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-purple-500/20 hover:bg-purple-500/30"
          onClick={onTogglePlay}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 text-purple-300" />
          ) : (
            <Play className="h-4 w-4 text-purple-300" />
          )}
        </Button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Music2 className="h-4 w-4 text-purple-400" />
            <span className="text-purple-300 truncate font-medium">
              {track.file.name}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1 text-sm text-purple-300/70">
            {track.duration && (
              <span>{track.duration}</span>
            )}
            {track.bpm && (
              <span>• {track.bpm} BPM</span>
            )}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="text-purple-300/70 hover:text-red-400 transition-colors"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {isAnalyzing ? (
        <div className="mt-2">
          <Progress value={Math.random() * 100} className="h-1" />
          <p className="text-xs text-purple-300/70 mt-1">Analisando batidas e intensidade...</p>
        </div>
      ) : (
        <div className="mt-2">
          <div className={cn("h-1 rounded-full", intensityColor)} 
               style={{ width: `${track.intensity * 100}%` }} 
          />
          {track.waveform && (
            <div className="flex items-center gap-[1px] mt-2 h-8">
              {track.waveform.map((value, i) => (
                <div
                  key={i}
                  className="w-[2px] bg-purple-400/30"
                  style={{ height: `${value * 100}%` }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default TrackItem;
