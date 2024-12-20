import React from 'react';
import { motion } from 'framer-motion';
import { FileVideo } from 'lucide-react';

interface VideoThumbnailProps {
  file: File;
  isSelected?: boolean;
  category?: string;
  confidence?: number;
  onPreview?: (file: File) => void;
}

const VideoThumbnail = ({ 
  file, 
  isSelected,
  category,
  confidence,
  onPreview 
}: VideoThumbnailProps) => {
  return (
    <motion.div
      initial={false}
      animate={{
        scale: isSelected ? 1.05 : 1,
      }}
      className={`relative rounded-lg overflow-hidden border ${
        isSelected ? 'border-purple-500' : 'border-purple-500/20'
      }`}
      onClick={() => onPreview?.(file)}
    >
      <div className="aspect-video bg-black relative">
        <div className="absolute inset-0 flex items-center justify-center bg-editor-panel/50">
          <FileVideo className="w-8 h-8 text-purple-400" />
        </div>
        {category && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 rounded-full">
            <span className="text-xs text-white">{category}</span>
          </div>
        )}
        {confidence !== undefined && (
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/50 rounded-full">
            <span className="text-xs text-white">{Math.round(confidence * 100)}%</span>
          </div>
        )}
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