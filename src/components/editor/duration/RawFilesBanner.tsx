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
      className="relative w-full p-8 border-b border-editor-glow-purple/30 bg-gradient-to-r from-[#8B5CF6]/5 via-[#D946EF]/5 to-[#0EA5E9]/5 hover:from-[#8B5CF6]/10 hover:via-[#D946EF]/10 hover:to-[#0EA5E9]/10 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="container mx-auto max-w-[2560px]">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3">
              <h3 className="text-xl font-medium text-white">Raw File Organization</h3>
              <div className="flex items-center gap-2 text-sm text-[#E5DEFF]">
                <FolderOpen className="w-4 h-4" />
                <span>File Separation Only</span>
              </div>
              <PlanBadge tier="basic" />
            </div>

            <p className="text-sm text-gray-400 mb-4 max-w-2xl whitespace-pre-line">
              Organize and categorize your raw footage without editing\n• AI-powered file categorization\n• Smart file organization\n• No editing or style applied\n• Perfect for manual editing workflow
            </p>

            <div className="flex items-center gap-2 text-sm text-[#E5DEFF] bg-[#8B5CF6]/10 p-2 rounded-lg inline-block">
              <FolderOpen className="w-3 h-3" />
              <span>Skip to file organization</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RawFilesBanner;