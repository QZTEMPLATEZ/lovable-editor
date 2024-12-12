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
              <div className="flex items-center gap-2 text-sm bg-purple-500/20 px-3 py-1 rounded-full">
                <FolderOpen className="w-4 h-4 text-purple-300" />
                <span className="text-purple-200">File Separation Only</span>
              </div>
              <PlanBadge tier="basic" />
            </div>

            <p className="text-sm text-gray-300 mb-4 max-w-2xl whitespace-pre-line leading-relaxed">
              Organize and categorize your raw footage without editing\n• AI-powered file categorization\n• Smart file organization\n• No editing or style applied\n• Perfect for manual editing workflow
            </p>

            <div className="flex items-center gap-2 text-sm text-white/90 bg-purple-500/20 p-2 rounded-lg inline-block hover:bg-purple-500/30 transition-colors">
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