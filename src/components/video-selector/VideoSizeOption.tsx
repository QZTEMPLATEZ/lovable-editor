
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Check } from 'lucide-react';
import PlanBadge from '../PlanBadge';
import { VideoSizeRange } from '@/types';

interface VideoSizeOptionProps {
  size: VideoSizeRange;
  isSelected: boolean;
  onClick: () => void;
}

const VideoSizeOption = ({ size, isSelected, onClick }: VideoSizeOptionProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`relative w-full p-8 border-b transition-all duration-300 cursor-pointer
        ${isSelected 
          ? 'border-editor-glow-purple bg-editor-glow-purple/10' 
          : 'border-gray-700/30 hover:bg-editor-glow-purple/5'
        }`}
      onClick={onClick}
    >
      <div className="container mx-auto max-w-[2560px]">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3">
              <h3 className="text-xl font-medium text-white">{size.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Clock className="w-4 h-4" />
                <span>{size.label}</span>
              </div>
              <PlanBadge tier={size.tier} />
            </div>

            <p className="text-sm text-gray-400 mb-4 max-w-2xl whitespace-pre-line">
              {size.description}
            </p>

            <div className="flex items-center gap-2 text-sm text-purple-300 bg-purple-500/10 p-2 rounded-lg inline-block">
              <Clock className="w-3 h-3" />
              <span>Recommended Tracks: {size.recommendedTracks}</span>
            </div>
          </div>

          {isSelected && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="bg-editor-glow-purple rounded-full p-3"
            >
              <Check className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default VideoSizeOption;
