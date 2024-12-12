import React from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

interface RawFilesBannerProps {
  onUploadClick: () => void;
}

const RawFilesBanner = ({ onUploadClick }: RawFilesBannerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 p-6 rounded-xl border border-gray-700/30 bg-editor-panel/30 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-medium text-white mb-2">Have Raw Footage?</h3>
          <p className="text-sm text-gray-400">
            Upload your raw footage directly and let our AI organize and edit it for you
          </p>
        </div>
        <button
          onClick={onUploadClick}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-editor-accent hover:bg-editor-accent/80 text-white transition-colors"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Raw Files</span>
        </button>
      </div>
    </motion.div>
  );
};

export default RawFilesBanner;