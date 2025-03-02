import React from 'react';
import { Upload } from 'lucide-react';
import { motion } from 'framer-motion';

interface DropZoneProps {
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DropZone = ({ onDrop, onDragOver, onClick, fileInputRef, handleFileSelect }: DropZoneProps) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="relative"
    >
      <div 
        onDrop={onDrop}
        onDragOver={onDragOver}
        onClick={onClick}
        className="border-2 border-dashed border-purple-500/30 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm relative overflow-hidden group"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="video/*"
          multiple
          className="hidden"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 transform group-hover:scale-105 transition-transform duration-300" />
        <Upload className="w-16 h-16 mx-auto mb-6 text-purple-400 animate-bounce" />
        <p className="text-xl mb-2 font-medium relative z-10 text-purple-200">
          Drag and drop your raw wedding footage here
        </p>
        <p className="text-sm text-purple-300/70 relative z-10">
          or click to browse
        </p>
        <p className="text-xs text-purple-300/50 mt-4 relative z-10">
          Supported formats: MP4, MOV
        </p>
      </div>
    </motion.div>
  );
};

export default DropZone;