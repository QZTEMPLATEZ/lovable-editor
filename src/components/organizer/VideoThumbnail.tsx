import React from 'react';
import { motion } from 'framer-motion';
import { FileVideo } from 'lucide-react';

interface VideoThumbnailProps {
  file: File;
  isSelected?: boolean;
}

const VideoThumbnail = ({ file, isSelected }: VideoThumbnailProps) => {
  return (
    <motion.div
      initial={false}
      animate={{
        scale: isSelected ? 1.05 : 1,
      }}
      className={`relative rounded-lg overflow-hidden border ${
        isSelected ? 'border-purple-500' : 'border-purple-500/20'
      }`}
    >
      <div className="aspect-video bg-black relative">
        <div className="absolute inset-0 flex items-center justify-center bg-editor-panel/50">
          <FileVideo className="w-8 h-8 text-purple-400" />
        </div>
      </div>
      <div className="p-2">
        <p className="text-xs text-gray-300 truncate">
          {file.name}
        </p>
      </div>
    </motion.div>
  );
};

export default VideoThumbnail;