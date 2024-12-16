import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { StopCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProcessingStatusProps {
  isProcessing: boolean;
  currentFile: string | null;
  totalProgress: number;
  remainingTimeMinutes: number;
  onStopProcessing: () => void;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  isProcessing,
  currentFile,
  totalProgress,
  remainingTimeMinutes,
  onStopProcessing
}) => {
  if (!isProcessing) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 bg-purple-500/10 rounded-xl p-6 border border-purple-500/20"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-purple-300">Processing Videos</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onStopProcessing}
          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
        >
          <StopCircle className="w-4 h-4 mr-2" />
          Stop Process
        </Button>
      </div>

      <div className="space-y-4">
        <Progress value={totalProgress} className="h-2" />
        <div className="flex justify-between text-sm text-gray-400">
          <span>{Math.round(totalProgress)}% Complete</span>
          <span>~{remainingTimeMinutes} minutes remaining</span>
        </div>
      </div>

      {currentFile && (
        <div className="text-sm text-purple-300/80">
          Currently processing: {currentFile}
        </div>
      )}
    </motion.div>
  );
};

export default ProcessingStatus;