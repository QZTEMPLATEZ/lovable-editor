import React from 'react';
import { EditingMode } from './EditingModeSelector';
import { VideoSizeRange } from './VideoSizeSelector';
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DurationGrid from './editor/DurationGrid';

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
    <div className="min-h-screen bg-gradient-to-b from-editor-bg to-editor-bg/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-editor-glow-purple via-editor-glow-pink to-editor-glow-blue animate-gradient mb-4">
            Select Your Video Duration
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose the perfect duration for your wedding story. Each option is carefully crafted to deliver the best possible experience.
          </p>
        </motion.div>

        <div className="space-y-8">
          <Tabs 
            defaultValue={`${targetDuration.min}-${targetDuration.max}`}
            className="w-full"
            onValueChange={(value) => {
              const [min, max] = value.split('-').map(Number);
              const newDuration = VIDEO_DURATIONS.find(d => d.min === min && d.max === max);
              if (newDuration) {
                onDurationChange(newDuration);
              }
            }}
          >
            <DurationGrid
              durations={VIDEO_DURATIONS}
              selectedDuration={targetDuration}
              userTier="pro" // Force pro tier access
              onDurationSelect={onDurationChange}
            />
          </Tabs>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mt-8"
          >
            <Button
              onClick={() => navigate('/style')}
              className="bg-gradient-to-r from-editor-glow-purple to-editor-glow-pink hover:opacity-90 px-8 py-6 text-lg rounded-xl"
            >
              Next Step: Choose Your Style
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EditorHeader;
