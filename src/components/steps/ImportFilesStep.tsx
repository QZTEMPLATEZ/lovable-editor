
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FileVideo, Video, ArrowRight } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ImportFilesStepProps {
  rawFiles: File[];
  referenceVideo: File | null;
  onRawFilesSelected: (files: File[]) => void;
  onReferenceVideoSelected: (file: File) => void;
  onContinue: () => void;
}

const ImportFilesStep: React.FC<ImportFilesStepProps> = ({
  rawFiles,
  referenceVideo,
  onRawFilesSelected,
  onReferenceVideoSelected,
  onContinue
}) => {
  const rawInputRef = useRef<HTMLInputElement>(null);
  const referenceInputRef = useRef<HTMLInputElement>(null);

  const handleRawFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      onRawFilesSelected(files);
    }
  };

  const handleReferenceSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onReferenceVideoSelected(e.target.files[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="p-6 bg-black/20 backdrop-blur-md border border-purple-500/20 rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-purple-200">Import Your Files</h2>
        
        {/* Raw Footage Upload */}
        <div 
          onClick={() => rawInputRef.current?.click()}
          className="border-2 border-dashed border-purple-500/30 rounded-xl p-6 mb-6 text-center cursor-pointer hover:border-purple-500/50 transition-all duration-300"
        >
          <input
            type="file"
            multiple
            accept="video/*"
            className="hidden"
            ref={rawInputRef}
            onChange={handleRawFileSelection}
          />
          <FileVideo className="w-16 h-16 mx-auto mb-3 text-purple-400" />
          <h3 className="text-xl font-medium mb-2 text-purple-200">
            Upload Raw Footage
          </h3>
          <p className="text-purple-300/70 mb-3">
            Drag and drop your raw wedding videos
          </p>
          {rawFiles.length > 0 && (
            <div className="mt-3 p-2 bg-purple-900/30 rounded-lg text-left">
              <p className="text-sm font-medium text-purple-200">{rawFiles.length} files selected</p>
            </div>
          )}
        </div>
        
        {/* Reference Video Upload */}
        <div 
          onClick={() => referenceInputRef.current?.click()}
          className="border-2 border-dashed border-purple-500/30 rounded-xl p-6 mb-6 text-center cursor-pointer hover:border-purple-500/50 transition-all duration-300"
        >
          <input
            type="file"
            accept="video/*"
            className="hidden"
            ref={referenceInputRef}
            onChange={handleReferenceSelection}
          />
          <Video className="w-16 h-16 mx-auto mb-3 text-purple-400" />
          <h3 className="text-xl font-medium mb-2 text-purple-200">
            Upload Reference Video
          </h3>
          <p className="text-purple-300/70 mb-3">
            Select an edited wedding video to use as reference
          </p>
          {referenceVideo && (
            <div className="mt-3 p-2 bg-purple-900/30 rounded-lg text-left">
              <p className="text-sm font-medium text-purple-200">{referenceVideo.name}</p>
            </div>
          )}
        </div>
        
        <Button 
          className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-opacity"
          disabled={!referenceVideo || rawFiles.length === 0}
          onClick={onContinue}
        >
          <ArrowRight className="w-5 h-5 mr-2" />
          Continue to Analysis
        </Button>
      </Card>
    </motion.div>
  );
};

export default ImportFilesStep;
