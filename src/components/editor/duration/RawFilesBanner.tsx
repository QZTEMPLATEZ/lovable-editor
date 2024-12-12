import React from 'react';
import { motion } from 'framer-motion';
import { FolderOpen } from 'lucide-react';
import PlanBadge from '../../PlanBadge';

interface RawFilesBannerProps {
  onClick: () => void;
}

const RawFilesBanner = ({ onClick }: RawFilesBannerProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="relative w-full p-8 border-b border-editor-glow-purple/30 bg-gradient-to-r from-purple-900/20 via-fuchsia-900/20 to-blue-900/20 hover:from-purple-900/30 hover:via-fuchsia-900/30 hover:to-blue-900/30 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
      onClick={onClick}
    >
      <div className="container mx-auto max-w-[2560px]">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3">
              <h3 className="text-2xl font-semibold text-white/90 tracking-wide">Raw File Organization</h3>
              <PlanBadge tier="basic" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RawFilesBanner;