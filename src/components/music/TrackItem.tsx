import React from 'react';
import { AudioWaveform, X, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";

interface TrackItemProps {
  file: File;
  isPlaying: boolean;
  isAnalyzing: boolean;
  onTogglePlay: (fileName: string) => void;
  onRemove: (index: number) => void;
  index: number;
}

const TrackItem = ({ 
  file, 
  isPlaying, 
  isAnalyzing, 
  onTogglePlay, 
  onRemove, 
  index 
}: TrackItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.1 }}
      className="relative p-4 bg-purple-500/10 rounded-lg border border-purple-500/20 group hover:border-purple-500/40 transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-purple-500/20 hover:bg-purple-500/30"
          onClick={() => onTogglePlay(file.name)}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 text-purple-300" />
          ) : (
            <Play className="h-4 w-4 text-purple-300" />
          )}
        </Button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <AudioWaveform className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <span className="text-purple-300 truncate font-medium">
              {file.name}
            </span>
          </div>
          {isPlaying && (
            <div className="mt-2">
              <div className="h-1 bg-purple-500/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  animate={{
                    width: ["0%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => onRemove(index)}
          className="text-purple-300/70 hover:text-red-400 transition-colors p-1"
          aria-label="Remove track"
        >
          <X className="w-4 h-4" />
        </button>
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