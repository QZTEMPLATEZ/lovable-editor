import React from 'react';
import { motion } from 'framer-motion';

interface ProcessingPreviewProps {
  videoFiles: File[];
  currentFrameIndex: number;
}

const ProcessingPreview = ({ videoFiles, currentFrameIndex }: ProcessingPreviewProps) => {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 bg-editor-bg/80 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
      
      <div className="relative aspect-video overflow-hidden">
        {videoFiles[currentFrameIndex] && (
          <motion.video
            key={currentFrameIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
            src={URL.createObjectURL(videoFiles[currentFrameIndex])}
            autoPlay
            muted
            playsInline
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Processing Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full animate-spin" 
                 style={{ animationDuration: '3s' }} />
            <div className="absolute inset-2 border-4 border-pink-500/30 rounded-full animate-spin" 
                 style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
            <div className="absolute inset-4 border-4 border-purple-400/30 rounded-full animate-spin" 
                 style={{ animationDuration: '1.5s' }} />
          </div>
        </div>
      </div>

      {/* Processing Info */}
      <div className="p-6">
        <div className="flex justify-between items-center text-sm text-purple-300/70">
          <span>Processing Frame {currentFrameIndex + 1}</span>
          <span>{videoFiles.length} Total Frames</span>
        </div>
      </div>
    </div>
  );
};

export default ProcessingPreview;