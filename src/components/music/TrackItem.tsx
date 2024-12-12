import React from 'react';
import { Play, Pause, X, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";

export interface TrackItemProps {
  file: File;
  isPlaying: boolean;
  isAnalyzing: boolean;
  isSelected: boolean;
  onTogglePlay: () => void;
  onRemove: () => void;
}

const TrackItem = ({
  file,
  isPlaying,
  isAnalyzing,
  isSelected,
  onTogglePlay,
  onRemove,
}: TrackItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`relative p-4 rounded-lg border transition-all duration-300 ${
        isSelected 
          ? 'bg-purple-500/20 border-purple-500/40 hover:border-purple-500/60'
          : 'bg-purple-500/10 border-purple-500/20 hover:border-purple-500/40'
      }`}
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
          <span className="text-purple-300 truncate font-medium">
            {file.name}
          </span>
          {isSelected && (
            <span className="ml-2 inline-flex items-center text-green-400">
              <Check className="w-4 h-4 mr-1" />
              Selected
            </span>
          )}
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

      {isAnalyzing && (
        <div className="mt-2">
          <Progress value={Math.random() * 100} className="h-1" />
          <p className="text-xs text-purple-300/70 mt-1">Analyzing beats...</p>
        </div>
      )}
    </motion.div>
  );
};

export default TrackItem;