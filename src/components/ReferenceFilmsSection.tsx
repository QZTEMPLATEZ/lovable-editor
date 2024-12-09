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

  const handleClearVideo = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    videoFiles.length = 0;
    setVideoUrl(null);
    toast({
      title: "Video removed",
      description: "Your video has been removed successfully."
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 relative"
    >
      {/* Background Video Effect */}
      <AnimatePresence>
        {videoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10" />
            <video
              src={videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover scale-105"
              onPlay={() => setIsPlaying(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            Reference Films
          </h2>
          <p className="text-gray-400">Upload or drag & drop your inspiration videos</p>
        </div>
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={onDragOver}
        className="relative min-h-[300px] rounded-xl border-2 border-dashed border-editor-border bg-editor-bg/50 p-8 transition-colors hover:border-purple-500/50"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="video/*"
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center gap-4">
          <Upload className="w-12 h-12 text-gray-400" />
          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => fileInputRef.current?.click()}
              className="bg-editor-panel/50 hover:bg-editor-panel"
            >
              Choose a file
            </Button>
            <p className="mt-2 text-sm text-gray-400">
              or drag and drop your video here
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onContinue}
          disabled={videoFiles.length === 0}
          className="bg-gradient-to-r from-editor-glow-purple to-editor-glow-pink hover:opacity-90"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
};

export default ReferenceFilmsSection;
