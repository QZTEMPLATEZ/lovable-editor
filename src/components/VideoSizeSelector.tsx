import React from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { VideoSizeRange } from '../types';
import { useVideoType } from '../contexts/VideoTypeContext';
import { Button } from './ui/button';
import DurationOption from './editor/duration/DurationOption';
import RawFilesBanner from './editor/duration/RawFilesBanner';
import { createPremiereSequence } from '../utils/premiere/sequenceCreator';

const VIDEO_SIZES: VideoSizeRange[] = [
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
    description: "Detailed artistic edit\n• Complete ceremony coverage\n• Key reception moments\n• Special family moments\n• Guest interviews\n• Cinematic transitions",
    icon: null,
    recommendedTracks: 3,
    tier: 'pro'
  },
  {
    min: 15,
    max: 20,
    name: "Wedding Movie",
    label: "15-20 minutes",
    description: "Comprehensive coverage\n• Full ceremony with vows\n• Extended reception highlights\n• Detailed family moments\n• All important speeches\n• Multiple camera angles",
    icon: null,
    recommendedTracks: 4,
    tier: 'business'
  },
  {
    min: 30,
    max: 40,
    name: "Cinematic Wedding",
    label: "30-40 minutes",
    description: "Full cinematic experience\n• Complete event documentation\n• Behind-the-scenes footage\n• Extended family coverage\n• Multiple perspectives\n• Documentary style",
    icon: null,
    recommendedTracks: 6,
    tier: 'business'
  }
];

interface VideoSizeSelectorProps {
  selectedSize: VideoSizeRange | null;
  onSizeSelect: (size: VideoSizeRange) => void;
  userTier?: 'basic' | 'pro' | 'business';
}

const VideoSizeSelector = ({ selectedSize, onSizeSelect, userTier }: VideoSizeSelectorProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setSelectedVideoType } = useVideoType();

  const handleSizeSelect = async (size: VideoSizeRange) => {
    try {
      // Create new sequence in Premiere Pro
      await createPremiereSequence({
        name: size.name,
        duration: size.max * 60, // Convert minutes to seconds
        frameRate: 29.97,
        width: 1920,
        height: 1080
      });

      onSizeSelect(size);
      setSelectedVideoType(size);
      
      toast({
        title: "Sequence Created",
        description: `Created new ${size.name} sequence (${size.label})`,
      });
      
      navigate('/style');
    } catch (error) {
      console.error('Error creating sequence:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create sequence in Premiere Pro. Please ensure Premiere is running.",
      });
    }
  };

  const handleRawFileOrganization = () => {
    toast({
      title: "Raw File Organization",
      description: "Proceeding to file organization without editing",
    });
    navigate('/organize');
  };

  return (
    <div className="min-h-screen">
      <div className="relative h-[40vh] lg:h-[50vh] bg-[#0A0A0A] overflow-hidden">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 z-10 text-white hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover object-center"
          >
            <source src="https://www.dropbox.com/scl/fi/2ctxlrnuqeqe8r4lcnnoz/first-page.mp4?rlkey=qknrts8gb6lwepv0vhupydosy&raw=1" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
        </div>
        
        <div className="relative container mx-auto h-full max-w-[2560px] px-4 lg:px-8">
          <div className="flex flex-col justify-center h-full max-w-2xl lg:max-w-3xl xl:max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-cinzel font-extrabold tracking-[0.2em] uppercase text-white mb-4 leading-tight">
              GET UNLIMITED<br />VIDEO EDITING
            </h1>
            <p className="text-sm md:text-base lg:text-lg font-['Inter'] font-light text-white/80 mb-6 max-w-xl lg:max-w-2xl">
              Choose the perfect duration for your video project. Each option is carefully designed 
              to match different content needs.
            </p>
          </div>
        </div>
      </div>

      {/* Raw File Organization Banner - Now First */}
      <RawFilesBanner onClick={handleRawFileOrganization} />

      {/* Duration Options */}
      {VIDEO_SIZES.map((size) => (
        <DurationOption
          key={`${size.min}-${size.max}`}
          size={size}
          isSelected={selectedSize?.min === size.min && selectedSize?.max === size.max}
          onSelect={handleSizeSelect}
        />
      ))}
    </div>
  );
};

export default VideoSizeSelector;
