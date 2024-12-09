import React, { useRef, useState, useEffect } from 'react';
import { Upload, Film, Info, Video, Heart, X } from 'lucide-react';
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
        title: "Maximum files reached",
        description: "You can only upload one video at a time.",
        variant: "destructive"
      });
      return;
    }
    onDrop(e);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
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
          <p className="text-gray-400 mt-1">
            Upload your favorite wedding videos for inspiration
          </p>
        </div>
        {videoFiles.length > 0 && (
          <Button
            variant="outline"
            className="text-red-400 hover:text-red-500 border-red-400/20"
            onClick={handleRemoveVideo}
          >
            <X className="w-4 h-4 mr-2" />
            Remove Video
          </Button>
        )}
      </div>

      <div className="relative bg-editor-panel rounded-xl p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 rounded-xl" />
        
        <div className="relative space-y-6">
          {videoFiles.length === 0 ? (
            <div
              onClick={handleClick}
              onDrop={handleDrop}
              onDragOver={onDragOver}
              className="relative group cursor-pointer rounded-xl overflow-hidden"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="video/*"
                className="hidden"
              />
              
              <div className="min-h-[400px] border-2 border-dashed border-editor-border/50 rounded-xl flex flex-col items-center justify-center gap-4 transition-all duration-300 group-hover:border-purple-500/50 bg-editor-bg/50">
                <div className="w-16 h-16 rounded-full bg-editor-button/50 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors duration-300">
                  <Upload className="w-8 h-8 text-editor-text/50 group-hover:text-purple-400" />
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-editor-text mb-2">
                    Drop your video here
                  </h3>
                  <p className="text-sm text-editor-text/70 max-w-md mx-auto">
                    Drag and drop your video file, or click to browse
                  </p>
                </div>
                
                <div className="flex items-center gap-4 mt-4 text-sm text-editor-text/50">
                  <span className="flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    MP4, MOV up to 500MB
                  </span>
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    High quality recommended
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-xl overflow-hidden bg-editor-bg/50 p-6"
            >
              <div className="flex items-center gap-4">
                <Film className="w-8 h-8 text-purple-400" />
                <div>
                  <h3 className="font-medium text-editor-text">
                    {videoFiles[0].name}
                  </h3>
                  <p className="text-sm text-editor-text/70">
                    {(videoFiles[0].size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex items-center justify-between pt-6">
            <div className="flex items-center gap-2 text-sm text-editor-text/70">
              <Info className="w-4 h-4" />
              <span>Your video will be processed securely</span>
            </div>
            
            {videoFiles.length > 0 && (
              <Button
                onClick={onContinue}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Continue
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReferenceFilmsSection;