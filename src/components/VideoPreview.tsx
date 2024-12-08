import React from 'react';
import { motion } from 'framer-motion';

interface VideoPreviewProps {
  file: File;
  metadata?: {
    stability?: number;
    slowMotionFactor?: number;
  };
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ file, metadata }) => {
  // Early return if no file is provided
  if (!file) {
    return (
      <div className="w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
        {/* Decorative Waveform */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 mx-1 bg-purple-400 rounded-full"
              initial={{ height: 20 }}
              animate={{ 
                height: [20, 40, 20],
                backgroundColor: ['#9b87f5', '#d946ef', '#9b87f5']
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        <p className="text-gray-400 font-['Montserrat'] text-lg relative z-10">Select your wedding soundtrack</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <video
        src={URL.createObjectURL(file)}
        className="w-full h-48 object-cover rounded-lg border border-purple-500/30"
        controls
      />
      
      {metadata && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
            <p className="text-white text-sm">
              Stability Score: {(metadata.stability || 0).toFixed(2)}
            </p>
            {metadata.slowMotionFactor && (
              <p className="text-white text-sm">
                Slow Motion: {metadata.slowMotionFactor}x
              </p>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default VideoPreview;