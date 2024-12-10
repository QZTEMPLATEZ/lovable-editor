import React from 'react';
import { EditingMode } from './EditingModeSelector';
import { VideoSizeRange } from '../types';
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DurationCard from './editor/DurationCard';

const VIDEO_DURATIONS: VideoSizeRange[] = [
  {
    min: 3,
    max: 5,
    name: "Trailer",
    label: "3-5 minutes",
    description: "Dynamic event summary\n• Best moment highlights\n• Engaging transitions\n• Emotional storytelling\n• Professional pacing\n• Perfect for sharing",
    icon: null,
    recommendedTracks: 2,
    tier: 'pro'
  },
  {
    min: 0.5,
    max: 1.5,
    name: "Social",
    label: "30s - 1:30min",
    description: "Quick, high-energy edit for social media\n• Perfect for Instagram/TikTok\n• Fast-paced highlights\n• Key moments only\n• Music-driven edits\n• Vertical format ready",
    icon: null,
    recommendedTracks: 1,
    tier: 'basic'
  },
  {
    min: 8,
    max: 12,
    name: "Short Film",
    label: "8-12 minutes",
    description: "Detailed artistic edit",
    icon: null,
    recommendedTracks: 3,
    tier: 'pro'
  },
  {
    min: 15,
    max: 20,
    name: "Wedding Movie",
    label: "15-20 minutes",
    description: "Comprehensive coverage",
    icon: null,
    recommendedTracks: 4,
    tier: 'business'
  },
  {
    min: 30,
    max: 40,
    name: "Cinematic Wedding",
    label: "30-40 minutes",
    description: "Full cinematic experience",
    icon: null,
    recommendedTracks: 6,
    tier: 'business'
  }
];

interface EditorHeaderProps {
  editingMode: EditingMode;
  targetDuration: VideoSizeRange;
  onDurationChange: (duration: VideoSizeRange) => void;
  userTier?: 'basic' | 'pro' | 'business';
}

const EditorHeader = ({ editingMode, targetDuration, onDurationChange }: EditorHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col w-screen max-w-[100vw] -mx-[100vw] relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]">
      <div className="relative [aspect-ratio:21/9] bg-editor-panel overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-2xl font-cinzel tracking-[0.2em] text-white/90 uppercase">
            Define Your Duration
          </h1>
        </div>
      </div>

      <div className="w-full max-w-none px-0 space-y-0">
        {VIDEO_DURATIONS.map((duration) => (
          <motion.div
            key={`${duration.min}-${duration.max}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full [aspect-ratio:2.74/1] group cursor-pointer bg-editor-panel"
            onClick={() => {
              onDurationChange(duration);
              navigate('/style');
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-editor-panel/60 via-editor-panel/40 to-editor-panel/60 z-[1]" />
            
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
            
            <div className="relative z-10 flex items-center justify-between h-full w-full px-8 md:px-16">
              <div className="space-y-1">
                <motion.h2 
                  className="text-4xl md:text-6xl font-cinzel tracking-wider text-white"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {duration.name}
                </motion.h2>
                <motion.p 
                  className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-gray-400 font-italiana"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {duration.label}
                </motion.p>
                <motion.p 
                  className="text-[10px] md:text-xs text-gray-400 max-w-xl"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {duration.description}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.4
                }}
              >
                <Button 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white/10 uppercase tracking-wider text-xs md:text-sm px-6 py-6"
                >
                  SELECT
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EditorHeader;