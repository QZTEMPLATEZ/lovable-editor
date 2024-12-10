import React from 'react';
import { EditingMode } from './EditingModeSelector';
import { VideoSizeRange } from '../types';
import { useNavigate } from 'react-router-dom';
import HeaderBanner from './editor/header/HeaderBanner';
import DurationOption from './editor/header/DurationOption';

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
  
  const handleDurationSelect = (duration: VideoSizeRange) => {
    onDurationChange(duration);
    navigate('/style');
  };
  
  return (
    <div className="flex flex-col w-screen max-w-[100vw] -mx-[100vw] relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]">
      <HeaderBanner title="Define Your Duration" />

      <div className="w-full max-w-none px-0 space-y-0">
        {VIDEO_DURATIONS.map((duration) => (
          <DurationOption
            key={`${duration.min}-${duration.max}`}
            duration={duration}
            onSelect={handleDurationSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default EditorHeader;