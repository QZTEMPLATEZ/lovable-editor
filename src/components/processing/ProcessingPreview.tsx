import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProcessingPreviewProps {
  videoFiles: File[];
  currentFrameIndex: number;
}

const ProcessingPreview = ({ videoFiles, currentFrameIndex }: ProcessingPreviewProps) => {
  return (
    <div className="relative h-64 overflow-hidden rounded-xl border border-purple-500/30 bg-editor-bg shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-50" />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFrameIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {videoFiles[currentFrameIndex] && (
            <video 
              src={URL.createObjectURL(videoFiles[currentFrameIndex])} 
              className="w-full h-full object-cover opacity-90"
              autoPlay
              muted
              playsInline
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white text-lg font-medium">
                Processing Frame {currentFrameIndex + 1} of {videoFiles.length}
              </p>
              <p className="text-purple-300 text-sm">
                Enhancing video quality and applying AI effects
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute top-4 right-4 flex gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div 
            key={i}
            className="w-2 h-2 rounded-full bg-purple-500/50 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProcessingPreview;