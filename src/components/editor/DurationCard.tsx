import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Clock, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { VideoSizeRange } from '../VideoSizeSelector';

interface DurationCardProps {
  duration: VideoSizeRange;
  isSelected: boolean;
  isLocked: boolean;
  onClick: () => void;
}

const DurationCard = ({ duration, isSelected, isLocked, onClick }: DurationCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onClick}
      className={`relative w-full transition-all duration-300 rounded-xl
        ${isLocked 
          ? 'opacity-50' 
          : 'hover:bg-editor-accent/10'} 
        ${isSelected ? 'bg-editor-accent/20 shadow-[0_0_20px_rgba(155,135,245,0.2)]' : ''}
        h-full flex flex-col items-start gap-3 border border-editor-border/30
        backdrop-blur-sm bg-editor-panel/30 cursor-pointer p-6`}
    >
      <div className="flex items-center justify-between w-full">
        <span className="font-medium text-xl text-white">{duration.name}</span>
        <Badge variant="secondary" className={`
          ${duration.tier === 'pro' 
            ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
            : duration.tier === 'business' 
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
          }`}>
          {duration.tier.charAt(0).toUpperCase() + duration.tier.slice(1)}
        </Badge>
      </div>
      
      <Badge variant="secondary" className="bg-editor-panel/50">
        <Clock className="w-4 h-4 mr-2" />
        {duration.label}
      </Badge>
      
      <p className="text-sm text-gray-400 text-left">
        {duration.description}
      </p>
      
      <div className="flex items-center gap-2 text-sm text-editor-accent mt-2 bg-editor-accent/10 px-3 py-2 rounded-lg">
        <Clock className="w-4 h-4" />
        <span>Recommended Tracks: {duration.recommendedTracks}</span>
      </div>

      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-editor-glow-purple rounded-full p-1"
        >
          <Check className="w-4 h-4 text-white" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default DurationCard;