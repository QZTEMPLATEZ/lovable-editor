import React from 'react';
import { Progress } from "@/components/ui/progress";
import { VideoMetadata } from '@/utils/videoProcessing';
import { FolderOpen, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

interface ProcessingStatusProps {
  currentStep: string;
  progress: number;
  metadata?: VideoMetadata;
  currentFile?: string;
  currentCategory?: string;
  isComplete?: boolean;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ 
  currentStep, 
  progress, 
  metadata,
  currentFile,
  currentCategory,
  isComplete 
}) => {
  const { toast } = useToast();

  React.useEffect(() => {
    if (isComplete) {
      toast({
        title: "Organization Complete",
        description: "All files have been successfully categorized.",
      });
    }
  }, [isComplete, toast]);

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {currentFile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-3 w-3 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-sm text-purple-200">Processing: {currentFile}</span>
            </div>
            
            {currentCategory && (
              <div className="flex items-center gap-2 text-sm text-purple-300 ml-6">
                <FolderOpen className="w-4 h-4" />
                <span>Moving to: {currentCategory}</span>
              </div>
            )}
          </motion.div>
        )}

        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-500/10 rounded-lg p-4 border border-green-500/20"
          >
            <div className="flex items-center gap-2 text-green-300">
              <CheckCircle2 className="w-5 h-5" />
              <span>Organization Complete</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {metadata && (
        <div className="text-sm text-gray-400 mt-1">
          {metadata.resolution.width}x{metadata.resolution.height} • {metadata.fps}fps
        </div>
      )}
      
      <Progress value={progress} className="h-2 bg-purple-950" />
    </div>
  );
};

export default ProcessingStatus;