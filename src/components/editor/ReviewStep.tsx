import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReviewSummary from './review/ReviewSummary';
import GenerationProgress from './review/GenerationProgress';
import ExportOptions from './review/ExportOptions';

const ReviewStep = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Review & Start Editing</h1>
        <p className="text-gray-400">
          Review your selections and start the editing process
        </p>
      </div>

      {/* Summary Section */}
      <ReviewSummary />

      {/* Progress Section */}
      {isGenerating && (
        <GenerationProgress progress={progress} isGenerating={isGenerating} />
      )}

      {/* Instructions */}
      <div className="text-center text-sm text-gray-400 mt-8">
        <p>
          Review your selections and click "Start Editing" when you're ready to begin.
        </p>
      </div>
    </motion.div>
  );
};

export default ReviewStep;