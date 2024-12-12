import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, FileVideo } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

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
        <h2 className="text-2xl font-bold text-white font-montserrat">Processing Videos</h2>
        <span className="text-sm text-purple-300">{progress}% Complete</span>
      </div>

      <Progress value={progress} className="h-2 bg-purple-950" />

      {currentFile && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-editor-panel/50 rounded-xl p-4 border border-purple-500/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <FileVideo className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-purple-300 font-montserrat">
              Currently Processing
            </h3>
          </div>

          <div className="relative aspect-video rounded-lg overflow-hidden bg-black/20">
            {currentFile.type.startsWith('video/') && (
              <video 
                src={URL.createObjectURL(currentFile)}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-sm text-white truncate">{currentFile.name}</p>
            </div>
          </div>
        </motion.div>
      )}

      {unrecognizedFiles.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            <h3 className="text-lg font-semibold text-yellow-400">Videos Needing Review</h3>
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
                  <p className="text-sm text-yellow-300 mb-2 truncate">{file.name}</p>
                  <div className="flex gap-2 flex-wrap">
                    {["Ceremony", "Reception", "Preparation", "Extras"].map((category) => (
                      <button
                        key={category}
                        onClick={() => onCategorySelect(file, category)}
                        className="px-3 py-1 text-sm rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 transition-colors"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>{files.length} Total Videos</span>
        <span>{files.length - unrecognizedFiles.length} Categorized</span>
      </div>
    </div>
  );
};

export default FileAnalysisHandler;