
import React from 'react';
import { motion } from 'framer-motion';
import { FileVideo, Brain, CheckCircle2, AlertCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface FileAnalysisStatusProps {
  totalFiles: number;
  analyzedFiles: number;
  successCount: number;
  errorCount: number;
  currentFile?: string;
  averageConfidence?: number;
}

const FileAnalysisStatus: React.FC<FileAnalysisStatusProps> = ({
  totalFiles,
  analyzedFiles,
  successCount,
  errorCount,
  currentFile,
  averageConfidence
}) => {
  const progress = totalFiles ? (analyzedFiles / totalFiles) * 100 : 0;

  return (
    <div className="space-y-4 bg-editor-bg/50 p-6 rounded-xl border border-purple-500/20 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Brain className="w-5 h-5 text-purple-400" />
          <span className="text-lg font-medium text-purple-100">AI Analysis</span>
        </div>
        
        <div className="flex items-center gap-2">
          <FileVideo className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-purple-200">
            {analyzedFiles} / {totalFiles} files
          </span>
        </div>
      </div>

      <Progress value={progress} className="h-2" />
      
      {currentFile && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-purple-300"
        >
          Analyzing: {currentFile}
        </motion.div>
      )}

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="flex items-center gap-2 bg-green-500/10 p-3 rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          <div>
            <div className="text-sm font-medium text-green-300">Success</div>
            <div className="text-2xl font-bold text-green-400">{successCount}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-amber-500/10 p-3 rounded-lg">
          <Brain className="w-5 h-5 text-amber-400" />
          <div>
            <div className="text-sm font-medium text-amber-300">Confidence</div>
            <div className="text-2xl font-bold text-amber-400">
              {averageConfidence ? `${(averageConfidence * 100).toFixed(1)}%` : '-'}
            </div>
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

export default FileAnalysisStatus;
