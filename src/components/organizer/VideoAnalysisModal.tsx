import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFile: File | null;
  progress: number;
  unrecognizedFiles: File[];
  onCategorySelect: (file: File, category: string) => void;
}

const VideoAnalysisModal = ({
  isOpen,
  onClose,
  currentFile,
  progress,
  unrecognizedFiles,
  onCategorySelect,
}: VideoAnalysisModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-editor-bg/95 border-purple-500/20">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Video Analysis</h2>
            <span className="text-sm text-purple-300">{progress}% Complete</span>
          </div>

          <Progress value={progress} className="h-2 bg-purple-950" />

          {currentFile && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-editor-panel/50 rounded-xl p-4 border border-purple-500/20"
            >
              <h3 className="text-lg font-semibold text-purple-300 mb-2">
                Currently Processing: {currentFile.name}
              </h3>
              <video 
                src={URL.createObjectURL(currentFile)}
                className="w-full aspect-video rounded-lg object-cover"
                autoPlay
                muted
                loop
              />
            </motion.div>
          )}

          {unrecognizedFiles.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-yellow-500">
                <AlertCircle className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Needs Your Input</h3>
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
                      <p className="text-sm text-yellow-300 mb-2">{file.name}</p>
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
            </div>
          )}

          <div className="flex items-center gap-2 text-green-500">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm">
              Analysis will continue for other files while you categorize
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoAnalysisModal;