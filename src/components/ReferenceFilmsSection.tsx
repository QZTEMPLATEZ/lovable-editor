import React, { useRef } from 'react';
import { Upload, Film, Info, Video, Heart, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (videoFiles.length >= 1) {
      return; // Prevent adding more than one video
    }
    onDrop(e);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Create a synthetic drag event to reuse the existing onDrop handler
      const dragEvent = new DragEvent('drop');
      Object.defineProperty(dragEvent, 'dataTransfer', {
        value: {
          files: e.target.files
        }
      });
      onDrop(dragEvent as unknown as React.DragEvent);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveVideo = () => {
    // Create a new drop event with empty files
    const emptyDropEvent = new DragEvent('drop');
    Object.defineProperty(emptyDropEvent, 'dataTransfer', {
      value: {
        files: []
      }
    });
    onDrop(emptyDropEvent as unknown as React.DragEvent);
    
    toast({
      title: "Video Removed",
      description: "Your inspiration video has been removed",
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-pink-500">
          Your Wedding Film Inspiration
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Share a wedding film that captures your dream style. We'll use it as inspiration to create your perfect wedding video.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {videoFiles.length === 0 && (
          <div
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={onDragOver}
            className="relative group cursor-pointer rounded-xl overflow-hidden min-h-[500px]"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="video/*"
              className="hidden"
            />
            <div 
              className="absolute inset-0 bg-[url('/lovable-uploads/4e81f6f9-f013-4f4f-ab48-027c35513dce.png')] bg-cover bg-center opacity-20 transition-opacity duration-300 group-hover:opacity-30"
            />
            
            <div className="relative border-2 border-dashed border-pink-300/30 rounded-xl p-12 text-center space-y-6 backdrop-blur-sm transition-all duration-300 group-hover:border-pink-300/50 min-h-[500px] flex flex-col items-center justify-center">
              <div className="w-24 h-24 mx-auto bg-pink-300/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Video className="w-12 h-12 text-pink-400" />
              </div>

              <div className="space-y-4 max-w-lg mx-auto">
                <h3 className="text-2xl font-semibold text-pink-300">
                  Drop Your Favorite Wedding Film Here
                </h3>
                <p className="text-gray-400">
                  Share a wedding video that inspires you. We'll use its style to create your perfect wedding film.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-3xl">
                {[
                  { icon: Heart, text: "We'll match your preferred style" },
                  { icon: Film, text: "Capture similar transitions" },
                  { icon: Video, text: "Mirror the perfect pacing" }
                ].map((feature, index) => (
                  <div key={index} className="bg-pink-300/5 p-4 rounded-lg border border-pink-300/20">
                    <feature.icon className="w-6 h-6 text-pink-400 mb-2 mx-auto" />
                    <p className="text-sm text-gray-400">{feature.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {videoFiles.length > 0 && (
          <motion.div 
            className="rounded-xl overflow-hidden relative group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <video
              src={URL.createObjectURL(videoFiles[0])}
              className="w-full h-[500px] object-cover rounded-xl border border-pink-300/30"
              autoPlay
              loop
              muted
              playsInline
            />
            
            {/* Remove button */}
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-4 right-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              onClick={handleRemoveVideo}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="mt-4 p-4 bg-editor-bg/50 rounded-lg border border-pink-300/20">
              <p className="text-pink-300 font-medium">{videoFiles[0].name}</p>
              <p className="text-sm text-gray-400">
                {(videoFiles[0].size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </motion.div>
        )}

        {videoFiles.length > 0 && onContinue && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-8"
          >
            <Button
              onClick={onContinue}
              className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white px-8 py-6 rounded-xl shadow-lg shadow-pink-500/20 transition-all duration-300 hover:scale-105"
            >
              Continue to Next Step
              <Film className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ReferenceFilmsSection;