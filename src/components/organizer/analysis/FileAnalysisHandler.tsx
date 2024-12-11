import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { analyzeImage } from '@/utils/imageAnalysis';

interface FileAnalysisHandlerProps {
  files: File[];
  isProcessing: boolean;
  progress: number;
  currentFile: File | null;
  unrecognizedFiles: File[];
  onCategorySelect: (file: File, category: string) => void;
}

const FileAnalysisHandler: React.FC<FileAnalysisHandlerProps> = ({
  files,
  isProcessing,
  progress,
  currentFile,
  unrecognizedFiles,
  onCategorySelect,
}) => {
  if (!isProcessing) return null;

  return (
    <div className="space-y-6 bg-editor-panel/50 rounded-xl p-6 border border-purple-500/20">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white font-montserrat">Analysis Progress</h2>
        <span className="text-sm text-purple-300">{progress}% Complete</span>
      </div>

      <Progress value={progress} className="h-2 bg-purple-950" />

      {currentFile && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-editor-panel/50 rounded-xl p-4 border border-purple-500/20"
        >
          <h3 className="text-lg font-semibold text-purple-300 mb-2 font-montserrat">
            Currently Processing: {currentFile.name}
          </h3>
          {currentFile.type.startsWith('video/') && (
            <video 
              src={URL.createObjectURL(currentFile)}
              className="w-full aspect-video rounded-lg object-cover"
              autoPlay
              muted
              loop
            />
          )}
          {currentFile.type.startsWith('image/') && (
            <img 
              src={URL.createObjectURL(currentFile)}
              alt={currentFile.name}
              className="w-full aspect-video rounded-lg object-cover"
            />
          )}
        </motion.div>
      )}

      {unrecognizedFiles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-yellow-500">
            <AlertCircle className="w-5 h-5" />
            <h3 className="text-lg font-semibold font-montserrat">Needs Your Input</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {unrecognizedFiles.map((file, index) => (
                <motion.div
                  key={file.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-editor-panel/30 rounded-lg p-4 border border-yellow-500/20"
                >
                  <p className="text-sm text-yellow-300 mb-2 font-montserrat">{file.name}</p>
                  <div className="flex gap-2 flex-wrap">
                    {["Ceremony", "Reception", "Preparation", "Extras"].map((category) => (
                      <button
                        key={category}
                        onClick={() => onCategorySelect(file, category)}
                        className="px-3 py-1 text-sm rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 transition-colors font-montserrat"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 text-green-500">
        <CheckCircle2 className="w-5 h-5" />
        <span className="text-sm font-montserrat">
          Analysis will continue for other files while you categorize
        </span>
      </div>
    </div>
  );
};

export default FileAnalysisHandler;