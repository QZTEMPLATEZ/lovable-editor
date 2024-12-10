import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Clock, Crown, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { VideoSizeRange } from '../VideoSizeSelector';

interface DurationOptionCardProps {
  duration: VideoSizeRange;
  isSelected: boolean;
  isLocked: boolean;
  onClick: () => void;
}

const getPlanBadge = (tier: 'basic' | 'pro' | 'business') => {
  switch (tier) {
    case 'basic':
      return (
        <Badge variant="secondary" className="bg-gradient-to-r from-blue-500/20 to-blue-400/20 text-blue-400 border border-blue-500/20">
          Basic
        </Badge>
      );
    case 'pro':
      return (
        <Badge variant="secondary" className="bg-gradient-to-r from-purple-500/20 to-purple-400/20 text-purple-400 border border-purple-500/20">
          <Crown className="w-3 h-3 mr-1" />
          Pro
        </Badge>
      );
    case 'business':
      return (
        <Badge variant="secondary" className="bg-gradient-to-r from-amber-500/20 to-amber-400/20 text-amber-400 border border-amber-500/20">
          <Sparkles className="w-3 h-3 mr-1" />
          Business
        </Badge>
      );
  }
};

const DurationOptionCard: React.FC<DurationOptionCardProps> = ({
  duration,
  isSelected,
  isLocked,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onClick}
      className={`
        relative p-6 rounded-xl cursor-pointer transition-all duration-300
        ${isLocked ? 'opacity-50' : 'hover:shadow-lg hover:shadow-editor-glow-purple/20'}
        ${isSelected 
          ? 'bg-gradient-to-br from-editor-glow-purple/20 to-editor-glow-pink/20 border-editor-glow-purple' 
          : 'bg-editor-panel/30 border-editor-border/30'}
        border backdrop-blur-sm
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
          {duration.name}
        </span>
        {getPlanBadge(duration.tier)}
      </div>
      
      <div className="space-y-3">
        <Badge variant="secondary" className="bg-editor-panel/50 flex items-center w-fit">
          <Clock className="w-4 h-4 mr-2" />
          {duration.label}
        </Badge>
        
        <p className="text-sm text-gray-400">
          {duration.description}
        </p>
        
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 rounded-lg bg-editor-accent/10"
          >
            <div className="flex items-center gap-2 text-sm text-editor-accent">
              <Clock className="w-4 h-4" />
              <span>Recommended Tracks: {duration.recommendedTracks}</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DurationOptionCard;