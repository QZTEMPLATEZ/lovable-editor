import React from 'react';
import { Upload, Film, Info, Video, Heart } from 'lucide-react';
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
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Your Inspiration Corner
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Share the wedding films that inspire you. Upload videos that capture the style, mood, and moments you love.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          className="relative group cursor-pointer rounded-xl overflow-hidden min-h-[400px]"
        >
          {/* Background image */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085')] bg-cover bg-center opacity-10" />
          
          {/* Content Container */}
          <div className="relative border-2 border-dashed border-purple-500/30 rounded-xl p-12 text-center space-y-6 backdrop-blur-sm transition-all duration-300 group-hover:border-purple-500/50 min-h-[400px] flex flex-col items-center justify-center">
            {/* Icon Container */}
            <div className="w-24 h-24 mx-auto bg-purple-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Video className="w-12 h-12 text-purple-400" />
            </div>

            {/* Text Content */}
            <div className="space-y-4 max-w-lg mx-auto">
              <h3 className="text-2xl font-semibold text-purple-300">
                Drop Your Favorite Wedding Films Here
              </h3>
              <p className="text-gray-400">
                Share up to 3 wedding videos that inspire you. We'll use their style to create your perfect wedding film.
              </p>
            </div>

            {/* Example Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-3xl">
              {[
                { icon: Heart, text: "Capture your preferred style" },
                { icon: Film, text: "Match your favorite transitions" },
                { icon: Video, text: "Mirror the perfect pacing" }
              ].map((feature, index) => (
                <div key={index} className="bg-purple-500/5 p-4 rounded-lg border border-purple-500/20">
                  <feature.icon className="w-6 h-6 text-purple-400 mb-2 mx-auto" />
                  <p className="text-sm text-gray-400">{feature.text}</p>
                </div>
              ))}
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