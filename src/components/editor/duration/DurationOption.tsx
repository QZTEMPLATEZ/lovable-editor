import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { VideoSizeRange } from '../../../types';
import PlanBadge from '../../PlanBadge';

interface DurationOptionProps {
  duration: VideoSizeRange;
  isSelected: boolean;
  onSelect: (duration: VideoSizeRange) => void;
}

const DurationOption = ({ duration, isSelected, onSelect }: DurationOptionProps) => {
  if (!duration) {
    return null;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
        isSelected
          ? 'border-editor-glow-purple bg-editor-glow-purple/10' 
          : 'border-gray-700/30 hover:bg-editor-glow-purple/5'
      }`}
      onClick={() => onSelect(duration)}
    >
      <div className="container mx-auto max-w-[2560px]">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3">
              <h3 className="text-xl font-medium text-white">{duration.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Clock className="w-4 h-4" />
                <span>{duration.label}</span>
              </div>
              <PlanBadge tier={duration.tier} />
            </div>

            <p className="text-sm text-gray-400 mb-4 max-w-2xl whitespace-pre-line">
              {duration.description}
            </p>

            <div className="flex items-center gap-2 text-sm text-purple-300 bg-purple-500/10 p-2 rounded-lg inline-block">
              <Clock className="w-3 h-3" />
              <span>Recommended Tracks: {duration.recommendedTracks}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DurationOption;