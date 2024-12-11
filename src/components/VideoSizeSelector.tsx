import React from 'react';
import { VideoSizeRange } from '../types';
import DurationGrid from './editor/DurationGrid';
import DurationCard from './editor/DurationCard';

const VIDEO_DURATIONS: VideoSizeRange[] = [
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
    min: 8,
    max: 12,
    name: "Short Film",
    label: "8-12 minutes",
    description: "Detailed artistic edit",
    icon: null,
    recommendedTracks: 3,
    tier: 'pro'
  }
];

interface VideoSizeSelectorProps {
  selectedSize: VideoSizeRange | null;
  onSizeSelect: (size: VideoSizeRange) => void;
}

const VideoSizeSelector: React.FC<VideoSizeSelectorProps> = ({
  selectedSize,
  onSizeSelect,
}) => {
  return (
    <div className="w-full">
      {/* Banner with 21:9 aspect ratio */}
      <div className="relative [aspect-ratio:21/9] bg-editor-panel overflow-hidden mb-8">
        {/* Background grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl md:text-5xl font-cinzel tracking-[0.2em] text-white/90 uppercase">
            Select Duration
          </h1>
        </div>
      </div>

      <DurationGrid 
        durations={VIDEO_DURATIONS}
        selectedDuration={selectedSize}
        userTier="pro"
        onDurationSelect={onSizeSelect}
      />
    </div>
  );
};

export default VideoSizeSelector;