import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

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
    description: 'made by world-class artists',
    previewVideo: '/classic-preview.mp4',
    darkMode: true
  },
  {
    id: 'cinematic',
    title: 'Cinematic',
    description: 'recorded by top sound engineers',
    previewVideo: '/cinematic-preview.mp4',
    darkMode: true
  },
  {
    id: 'documentary',
    title: 'Documentary',
    description: 'with exclusive voice actors',
    previewVideo: '/documentary-preview.mp4',
    darkMode: true
  },
  {
    id: 'dynamic',
    title: 'Dynamic',
    description: 'shot by pro filmmakers',
    previewVideo: '/dynamic-preview.mp4',
    darkMode: true
  }
] as const;

const VideoStyleSelector = ({ selectedStyle, onStyleSelect, onCustomVideoUpload }: VideoStyleSelectorProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="flex flex-col w-screen max-w-[100vw] -mx-[100vw] relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]">
      <div className="text-center py-12">
        <h1 className="text-2xl font-cinzel tracking-[0.2em] text-white/90 uppercase">
          Define Your Visual Story
        </h1>
      </div>

      {VIDEO_STYLES.map((style) => (
        <motion.div
          key={style.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-[60vh] group cursor-pointer w-full bg-black"
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

          <div className="relative z-10 flex items-center justify-between h-full px-96 max-w-[2400px] mx-auto w-full">
            <div className="space-y-1">
              <motion.h2 
                className="text-3xl font-cinzel tracking-wider text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {style.title}
              </motion.h2>
              <motion.p 
                className="text-xs tracking-[0.2em] uppercase text-gray-400 font-italiana"
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
                className="border border-white text-white hover:bg-white/10 uppercase tracking-wider text-xs"
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

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex gap-4">
        <Button
          onClick={() => navigate('/duration')}
          variant="outline"
          className="bg-black/50 border border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
        >
          Back
        </Button>
        <Button
          onClick={() => navigate('/edit')}
          className="bg-gradient-to-r from-editor-glow-purple to-editor-glow-pink hover:opacity-90"
          disabled={!selectedStyle}
        >
          Next Step
        </Button>
      </div>

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