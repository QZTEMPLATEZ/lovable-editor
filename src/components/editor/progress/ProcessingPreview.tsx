import React from 'react';
import { motion } from 'framer-motion';

interface ProcessingPreviewProps {
  currentFile: string;
}

const ProcessingPreview = ({ currentFile }: ProcessingPreviewProps) => {
  return (
    <div className="relative w-full aspect-video bg-black/50 rounded-lg overflow-hidden backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-400">Currently processing:</p>
          <p className="text-white font-medium">{currentFile}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ProcessingPreview;