import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { VideoIcon } from 'lucide-react';
import { VideoSizeRange } from '../../../types';

interface DurationOptionProps {
  duration: VideoSizeRange;
  isSelected?: boolean;
  onSelect: (duration: VideoSizeRange) => void;
}

const DurationOption = ({ duration, isSelected, onSelect }: DurationOptionProps) => {
  if (!duration) return null; // Early return if duration is undefined

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full [aspect-ratio:2.74/1] group cursor-pointer bg-editor-panel"
      onClick={() => onSelect(duration)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-editor-panel/60 via-editor-panel/40 to-editor-panel/60 z-[1]" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      
      <div className="relative z-10 flex items-center justify-between h-full w-full px-6 md:px-12">
        <div className="space-y-0.5">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <VideoIcon className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl md:text-4xl font-cinzel tracking-wider text-white">
              {duration.name}
            </h2>
          </motion.div>
          <motion.p 
            className="text-[6px] md:text-[8px] tracking-[0.2em] uppercase text-gray-400 font-italiana"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {duration.label}
          </motion.p>
          <motion.p 
            className="text-[6px] md:text-[8px] text-gray-400 max-w-sm line-clamp-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {duration.description}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.4
          }}
        >
          <Button 
            variant="outline" 
            className="border-2 border-white text-white hover:bg-white/10 uppercase tracking-wider text-[8px] md:text-[10px] px-3 py-2"
          >
            SELECT
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DurationOption;