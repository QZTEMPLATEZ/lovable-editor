import React from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, FileVideo, Clock, Sparkles } from 'lucide-react';

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
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <FolderOpen className="w-8 h-8 text-purple-400" />
              <h3 className="text-2xl font-semibold text-white/90 tracking-wide">Raw File Organization</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1: Automatic Classification */}
            <div className="flex items-start gap-3 bg-white/5 rounded-lg p-4">
              <Sparkles className="w-5 h-5 text-purple-400 mt-1" />
              <div>
                <h4 className="text-white font-medium mb-1">Automatic Classification</h4>
                <p className="text-sm text-gray-400">AI-powered sorting into ceremony, reception, and preparation categories</p>
              </div>
            </div>

            {/* Feature 2: File Support */}
            <div className="flex items-start gap-3 bg-white/5 rounded-lg p-4">
              <FileVideo className="w-5 h-5 text-purple-400 mt-1" />
              <div>
                <h4 className="text-white font-medium mb-1">Supported Formats</h4>
                <p className="text-sm text-gray-400">MP4, MOV, and other professional video formats</p>
              </div>
            </div>

            {/* Feature 3: Processing Time */}
            <div className="flex items-start gap-3 bg-white/5 rounded-lg p-4">
              <Clock className="w-5 h-5 text-purple-400 mt-1" />
              <div>
                <h4 className="text-white font-medium mb-1">Quick Processing</h4>
                <p className="text-sm text-gray-400">Instant analysis and organization of your footage</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RawFilesBanner;