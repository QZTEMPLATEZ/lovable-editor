import React from 'react';
import { Upload } from 'lucide-react';
import { motion } from 'framer-motion';

interface UploadSectionProps {
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadSection = ({ onUpload }: UploadSectionProps) => {
  return (
    <div className="relative">
      <input
        type="file"
        accept=".mp3,.wav,.aac,audio/*"
        onChange={onUpload}
        className="hidden"
        id="music-upload"
        multiple
      />
      <label
        htmlFor="music-upload"
        className="block w-full"
      >
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="border-2 border-dashed border-purple-500/30 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500/50 transition-all duration-300 bg-purple-500/5"
        >
          <Upload className="w-12 h-12 mx-auto text-purple-400 mb-2" />
          <p className="text-purple-200">
            Drag and drop your music files here or click to browse
          </p>
          <p className="text-sm text-purple-300/70 mt-2">
            Supported formats: MP3, WAV, AAC
          </p>
        </motion.div>
      </label>
    </div>
  );
};

export default UploadSection;