import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { VideoSizeRange } from '../../../types';

interface DurationOptionProps {
  duration: VideoSizeRange;
  onSelect: (duration: VideoSizeRange) => void;
}

const DurationOption = ({ duration, onSelect }: DurationOptionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full [aspect-ratio:2.74/1] group cursor-pointer bg-editor-panel"
      onClick={() => onSelect(duration)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-editor-panel/60 via-editor-panel/40 to-editor-panel/60 z-[1]" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      
      <div className="relative z-10 flex items-center justify-between h-full w-full px-8 md:px-16">
        <div className="space-y-1">
          <motion.h2 
            className="text-4xl md:text-6xl font-cinzel tracking-wider text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {duration.name}
          </motion.h2>
          <motion.p 
            className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-gray-400 font-italiana"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {duration.label}
          </motion.p>
          <motion.p 
            className="text-[10px] md:text-xs text-gray-400 max-w-xl"
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
            className="border-2 border-white text-white hover:bg-white/10 uppercase tracking-wider text-xs md:text-sm px-6 py-6"
          >
            SELECT
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DurationOption;