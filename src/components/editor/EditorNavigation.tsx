import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EditorNavigationProps {
  currentStep: number;
  onPrevious: () => void;
  onNext: () => void;
}

const EditorNavigation = ({ currentStep, onPrevious, onNext }: EditorNavigationProps) => {
  return (
    <div className="flex justify-between items-center mt-8 px-4">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onPrevious}
        disabled={currentStep === 0}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200
          ${currentStep === 0 
            ? 'opacity-50 cursor-not-allowed bg-editor-panel/50' 
            : 'bg-editor-panel hover:bg-editor-panel/80'}`}
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        disabled={currentStep === 4}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200
          ${currentStep === 4
            ? 'opacity-50 cursor-not-allowed bg-editor-panel/50'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90'}`}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
};

export default EditorNavigation;