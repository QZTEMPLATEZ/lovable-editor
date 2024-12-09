import React from 'react';
import { motion } from 'framer-motion';

interface ProcessingProgressBarProps {
  progress: number;
}

const ProcessingProgressBar = ({ progress }: ProcessingProgressBarProps) => {
  return (
    <div className="relative w-full">
      <div className="h-2 bg-editor-panel/30 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 background-animate"
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="mt-2 flex justify-between text-sm text-gray-400">
        <span>{progress}% Complete</span>
        <span>Estimated: {Math.round((100 - progress) * 0.3)} min remaining</span>
      </div>
    </div>
  );
};

export default ProcessingProgressBar;