import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RawFilesSection from '../RawFilesSection';
import NavigationButtons from './NavigationButtons';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { motion } from 'framer-motion';

const VideoOrganizer = () => {
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const navigate = useNavigate();

  const handleOrganize = () => {
    console.log('Organizing files:', videoFiles);
  };

  const handleContinue = () => {
    navigate('/review');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            Organize seus Vídeos
          </h2>
        </div>

        <div className="bg-editor-panel/30 rounded-lg p-6 border border-editor-border">
          {videoFiles.length === 0 ? (
            <div className="text-center py-12">
              <Upload className="w-12 h-12 mx-auto text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-purple-200 mb-2">
                Nenhum arquivo selecionado
              </h3>
              <p className="text-purple-300/70 mb-6">
                Faça upload dos seus arquivos de vídeo para começar
              </p>
              <Button
                onClick={() => document.getElementById('file-upload')?.click()}
                className="bg-purple-500 hover:bg-purple-600"
              >
                Selecionar Arquivos
              </Button>
              <input
                id="file-upload"
                type="file"
                multiple
                accept="video/*"
                className="hidden"
                onChange={(e) => setVideoFiles(Array.from(e.target.files || []))}
              />
            </div>
          ) : (
            <RawFilesSection
              videoFiles={videoFiles}
              onFileSelect={setVideoFiles}
              onOrganize={handleOrganize}
              onContinue={handleContinue}
            />
          )}
        </div>

        <NavigationButtons showContinueButton={videoFiles.length > 0} />
      </motion.div>
    </div>
  );
};

export default VideoOrganizer;