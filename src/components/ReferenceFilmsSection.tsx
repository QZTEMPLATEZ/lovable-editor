import React, { useRef, useState, useEffect } from 'react';
import { Upload, Film, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface ReferenceFilmsSectionProps {
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  videoFiles: File[];
  onContinue: () => void;
}

const ReferenceFilmsSection = ({ onDrop, onDragOver, videoFiles, onContinue }: ReferenceFilmsSectionProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    if (videoFiles.length > 0) {
      const url = URL.createObjectURL(videoFiles[0]);
      setVideoUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [videoFiles]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (videoFiles.length > 0) {
      toast({
        variant: "destructive",
        title: "Maximum files reached",
        description: "You can only upload one reference video at a time."
      });
      return;
    }
    onDrop(e);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (videoFiles.length > 0) {
        toast({
          variant: "destructive",
          title: "Maximum files reached",
          description: "You can only upload one reference video at a time."
        });
        return;
      }
      const file = e.target.files[0];
      const fakeEvent = {
        preventDefault: () => {},
        dataTransfer: {
          files: [file]
        }
      } as unknown as React.DragEvent;
      onDrop(fakeEvent);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/lovable-uploads/9c94106e-534b-4312-bd91-f8d9f296cfb2.png"
          alt="Mountain landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-cinzel text-white mb-6"
          >
            Reference Films
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-200 mb-8"
          >
            Upload or drag & drop your inspiration videos to help us understand your vision
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="video/*"
              className="hidden"
            />
            
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg rounded-full"
            >
              Start Free Now
            </Button>
          </motion.div>
        </div>

        {/* Drop Zone - Only show if no video is uploaded */}
        {!videoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onDrop={handleDrop}
            onDragOver={onDragOver}
            className="mt-12 border-2 border-dashed border-white/30 rounded-xl p-12 bg-black/20 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center justify-center text-center">
              <Upload className="w-12 h-12 text-white/70 mb-4" />
              <p className="text-white/70 text-lg mb-4">
                Drag and drop your video here
              </p>
              <p className="text-white/50">
                or click the button above to browse
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ReferenceFilmsSection;