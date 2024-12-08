import React from 'react';
import { Upload, Film, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from 'framer-motion';

interface ReferenceFilmsSectionProps {
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  videoFiles: File[];
  onContinue?: () => void;
}

const ReferenceFilmsSection = ({ onDrop, onDragOver, videoFiles, onContinue }: ReferenceFilmsSectionProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Reference Videos
        </h2>
        <p className="text-gray-400">Upload up to 3 videos that inspire your desired style</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          className="relative group cursor-pointer rounded-xl overflow-hidden"
        >
          {/* Background image */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d')] bg-cover bg-center opacity-20" />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300" />
          
          <div className="relative border-2 border-dashed border-purple-500/30 rounded-xl p-12 text-center space-y-4 backdrop-blur-sm transition-all duration-300 group-hover:border-purple-500/50">
            <div className="w-20 h-20 mx-auto bg-purple-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Upload className="w-10 h-10 text-purple-400" />
            </div>
            <div className="space-y-2">
              <p className="text-xl font-medium text-purple-300">
                Drag and drop your reference videos here
              </p>
              <p className="text-sm text-gray-400">
                or click to browse your files
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {videoFiles.length > 0 && (
        <motion.div 
          className="grid gap-6 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {videoFiles.map((file, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative rounded-lg overflow-hidden bg-editor-bg border border-purple-500/30 group"
            >
              <video
                src={URL.createObjectURL(file)}
                className="w-full h-64 object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-medium truncate">{file.name}</p>
                <p className="text-gray-300 text-sm">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {videoFiles.length >= 1 && onContinue && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <Button
            onClick={onContinue}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-105"
          >
            Continue to Next Step
            <Film className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default ReferenceFilmsSection;