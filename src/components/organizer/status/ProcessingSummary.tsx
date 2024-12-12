import React from 'react';
import { FileVideo, AlertCircle } from 'lucide-react';
import NavigationButtons from '../NavigationButtons';

interface ProcessingSummaryProps {
  successCount: number;
  errorCount: number;
}

const ProcessingSummary = ({ successCount, errorCount }: ProcessingSummaryProps) => {
  if (successCount === 0 && errorCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-editor-bg/95 border-t border-purple-500/20 p-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FileVideo className="text-green-400" />
            <span className="text-green-300">{successCount} Processed</span>
          </div>
          {errorCount > 0 && (
            <div className="flex items-center gap-2">
              <AlertCircle className="text-red-400" />
              <span className="text-red-300">{errorCount} Errors</span>
            </div>
          )}
        </div>
        <NavigationButtons showContinueButton={successCount > 0} />
      </div>
    </div>
  );
};

export default ProcessingSummary;