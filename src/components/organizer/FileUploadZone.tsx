import React from 'react';
import { Upload } from 'lucide-react';
import { motion } from 'framer-motion';

interface FileUploadZoneProps {
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({ onDrop, onFileSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-purple-500/30 rounded-xl p-12 text-center cursor-pointer hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm relative overflow-hidden group"
      >
        <input
          type="file"
          onChange={onFileSelect}
          className="hidden"
          id="file-upload"
          multiple
          accept="video/*"
        />
        <label htmlFor="file-upload" className="cursor-pointer block">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 transform group-hover:scale-105 transition-transform duration-300" />
          <Upload className="w-16 h-16 mx-auto mb-6 text-purple-400 animate-bounce" />
          <p className="text-xl mb-2 font-medium relative z-10 text-purple-200">
            Drag and drop your raw wedding footage here
          </p>
          <p className="text-sm text-purple-300/70 relative z-10">
            or click to browse
          </p>
          <p className="text-xs text-purple-300/50 mt-4 relative z-10">
            Supported formats: Video (MP4, MOV)
          </p>
        </label>
      </div>
    </motion.div>
  );
};

export default FileUploadZone;