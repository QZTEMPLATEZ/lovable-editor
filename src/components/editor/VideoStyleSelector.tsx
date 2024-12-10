import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export type VideoStyle = 'classic' | 'cinematic' | 'documentary' | 'dynamic' | 'custom';

interface VideoStyleSelectorProps {
  selectedStyle: VideoStyle | null;
  onStyleSelect: (style: VideoStyle) => void;
  onCustomVideoUpload: (file: File) => void;
}

const VIDEO_STYLES = [
  {
    id: 'classic',
    title: 'Classic',
    description: 'Traditional wedding style with timeless elegance',
    previewVideo: '/classic-preview.mp4',
    darkMode: false
  },
  {
    id: 'cinematic',
    title: 'Cinematic',
    description: 'Hollywood-inspired cinematic production',
    previewVideo: '/cinematic-preview.mp4',
    darkMode: true
  },
  {
    id: 'documentary',
    title: 'Documentary',
    description: 'Natural and journalistic approach',
    previewVideo: '/documentary-preview.mp4',
    darkMode: true
  },
  {
    id: 'dynamic',
    title: 'Dynamic',
    description: 'Modern and energetic editing style',
    previewVideo: '/dynamic-preview.mp4',
    darkMode: true
  }
] as const;

const VideoStyleSelector = ({ selectedStyle, onStyleSelect, onCustomVideoUpload }: VideoStyleSelectorProps) => {
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="flex flex-col">
      {VIDEO_STYLES.map((style) => (
        <motion.div
          key={style.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`relative h-[50vh] group cursor-pointer ${
            style.darkMode ? 'bg-black' : 'bg-gray-100'
          }`}
          onMouseEnter={() => setHoveredStyle(style.id)}
          onMouseLeave={() => setHoveredStyle(null)}
          onClick={() => onStyleSelect(style.id as VideoStyle)}
        >
          <AnimatePresence>
            {hoveredStyle === style.id && (
              <motion.video
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 w-full h-full object-cover"
                src={style.previewVideo}
                autoPlay
                loop
                muted={isMuted}
                playsInline
              />
            )}
          </AnimatePresence>

          <div className="relative z-10 flex items-center justify-between h-full px-12">
            <div className="space-y-2">
              <motion.h2 
                className={`text-5xl font-light ${style.darkMode ? 'text-white' : 'text-black'}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {style.title}
              </motion.h2>
              <motion.p 
                className={`text-sm ${style.darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {style.description}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                variant="outline" 
                className={`border ${style.darkMode ? 'border-white text-white' : 'border-black text-black'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `/explore/${style.id}`;
                }}
              >
                Explore {style.title}
              </Button>
            </motion.div>
          </div>

          {hoveredStyle === style.id && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
              }}
              className="absolute bottom-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          )}
        </motion.div>
      ))}

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (!file.type.startsWith('video/')) {
              toast({
                variant: "destructive",
                title: "Invalid file type",
                description: "Please upload a video file."
              });
              return;
            }
            onCustomVideoUpload(file);
            onStyleSelect('custom');
          }
        }}
        accept="video/*"
        className="hidden"
      />
    </div>
  );
};

export default VideoStyleSelector;