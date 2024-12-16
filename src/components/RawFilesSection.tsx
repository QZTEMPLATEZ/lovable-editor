import React from 'react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

export interface RawFilesSectionProps {
  videoFiles: File[];
  onFileSelect: (files: File[]) => void;
  onOrganize: () => void;
  onContinue: () => void;
}

const RawFilesSection: React.FC<RawFilesSectionProps> = ({
  videoFiles,
  onFileSelect,
  onOrganize,
  onContinue
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videoFiles.map((file, index) => (
          <motion.div
            key={`${file.name}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-editor-panel rounded-lg p-4 border border-editor-border"
          >
            <p className="text-sm text-purple-200 truncate">{file.name}</p>
            <p className="text-xs text-purple-300/70">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          onClick={() => onFileSelect([])}
          className="border-purple-500/30"
        >
          Limpar
        </Button>
        <Button
          onClick={onOrganize}
          className="bg-gradient-to-r from-purple-500 to-pink-500"
        >
          Organizar Arquivos
        </Button>
      </div>
    </div>
  );
};

export default RawFilesSection;