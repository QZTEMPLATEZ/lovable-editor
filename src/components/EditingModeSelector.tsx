import React from 'react';
import { motion } from 'framer-motion';
import { Wand2, LayoutTemplate } from 'lucide-react';

export type EditingMode = 'ai' | 'template';

interface EditingModeSelectorProps {
  selectedMode: EditingMode | null;
  onModeSelect: (mode: EditingMode) => void;
}

const EditingModeSelector = ({ selectedMode, onModeSelect }: EditingModeSelectorProps) => {
  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 p-8 rounded-2xl backdrop-blur-lg border border-purple-500/30 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-3 w-3 rounded-full bg-purple-500 animate-pulse" />
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
          Choose Editing Mode
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onModeSelect('ai')}
          className={`p-6 rounded-xl border-2 ${
            selectedMode === 'ai'
              ? 'border-purple-500 bg-purple-500/20'
              : 'border-purple-500/30 hover:border-purple-500/50'
          } transition-colors`}
        >
          <Wand2 className="w-8 h-8 mb-4 text-purple-400" />
          <h4 className="text-xl font-semibold text-purple-300 mb-2">AI-Powered Editing</h4>
          <p className="text-gray-400">
            Upload reference videos and let AI learn your style preferences
          </p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onModeSelect('template')}
          className={`p-6 rounded-xl border-2 ${
            selectedMode === 'template'
              ? 'border-purple-500 bg-purple-500/20'
              : 'border-purple-500/30 hover:border-purple-500/50'
          } transition-colors`}
        >
          <LayoutTemplate className="w-8 h-8 mb-4 text-purple-400" />
          <h4 className="text-xl font-semibold text-purple-300 mb-2">QZ Templates</h4>
          <p className="text-gray-400">
            Choose from our collection of pre-designed professional templates
          </p>
        </motion.button>
      </div>
    </div>
  );
};

export default EditingModeSelector;