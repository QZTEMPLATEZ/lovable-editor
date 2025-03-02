import React from 'react';
import { motion } from 'framer-motion';
import { FileVideo, CheckCircle2, AlertCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface ProcessStatusProps {
  totalFiles: number;
  processedFiles: number;
  successCount: number;
  errorCount: number;
  currentFile?: string;
}

const ProcessStatus = ({ totalFiles, processedFiles, successCount, errorCount, currentFile }: ProcessStatusProps) => {
  const progress = totalFiles ? (processedFiles / totalFiles) * 100 : 0;

  return (
    <div className="space-y-4 bg-editor-bg/50 p-6 rounded-xl border border-purple-500/20 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileVideo className="w-5 h-5 text-purple-400" />
          <span className="text-lg font-medium text-purple-100">Processing Videos</span>
        </div>
        <span className="text-sm text-purple-200">
          {processedFiles} / {totalFiles} files
        </span>
      </div>

      <Progress value={progress} className="h-2" />
      
      {currentFile && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-purple-300"
        >
          Currently processing: {currentFile}
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex items-center gap-2 bg-green-500/10 p-3 rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          <div>
            <div className="text-sm font-medium text-green-300">Processed</div>
            <div className="text-2xl font-bold text-green-400">{successCount}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-red-500/10 p-3 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <div>
            <div className="text-sm font-medium text-red-300">Errors</div>
            <div className="text-2xl font-bold text-red-400">{errorCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessStatus;