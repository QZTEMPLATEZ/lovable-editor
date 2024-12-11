import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import PlanBadge from './PlanBadge';
import { Clock, Check } from 'lucide-react';
import { VideoSizeRange } from '../types';

const VIDEO_SIZES: VideoSizeRange[] = [
  {
    min: 0.5,
    max: 1.5,
    name: "Social",
    label: "30s - 1:30min",
    description: "Quick, high-energy edit for social media\n• Perfect for Instagram/TikTok\n• Fast-paced highlights\n• Key moments only\n• Music-driven edits\n• Vertical format ready",
    icon: <Clock className="w-5 h-5 text-purple-400" />,
    recommendedTracks: 1,
    tier: 'basic'
  },
  {
    min: 3,
    max: 5,
    name: "Trailer",
    label: "3-5 minutes",
    description: "Dynamic event summary\n• Best moment highlights\n• Engaging transitions\n• Emotional storytelling\n• Professional pacing\n• Perfect for sharing",
    icon: <Clock className="w-5 h-5 text-purple-400" />,
    recommendedTracks: 2,
    tier: 'pro'
  },
  {
    min: 8,
    max: 12,
    name: "Short Film",
    label: "8-12 minutes",
    description: "Detailed artistic edit\n• Complete ceremony coverage\n• Key reception moments\n• Special family moments\n• Guest interviews\n• Cinematic transitions",
    icon: <Clock className="w-5 h-5 text-purple-400" />,
    recommendedTracks: 3,
    tier: 'pro'
  },
  {
    min: 15,
    max: 20,
    name: "Wedding Movie",
    label: "15-20 minutes",
    description: "Comprehensive coverage\n• Full ceremony with vows\n• Extended reception highlights\n• Detailed family moments\n• All important speeches\n• Multiple camera angles",
    icon: <Clock className="w-5 h-5 text-purple-400" />,
    recommendedTracks: 4,
    tier: 'business'
  },
  {
    min: 30,
    max: 40,
    name: "Cinematic Wedding",
    label: "30-40 minutes",
    description: "Full cinematic experience\n• Complete event documentation\n• Behind-the-scenes footage\n• Extended family coverage\n• Multiple perspectives\n• Documentary style",
    icon: <Clock className="w-5 h-5 text-purple-400" />,
    recommendedTracks: 6,
    tier: 'business'
  }
];

interface VideoSizeSelectorProps {
  selectedSize: VideoSizeRange | null;
  onSizeSelect: (size: VideoSizeRange) => void;
  userTier?: 'basic' | 'pro' | 'business';
}

const VideoSizeSelector = ({ selectedSize, onSizeSelect }: VideoSizeSelectorProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSizeSelect = (size: VideoSizeRange) => {
    onSizeSelect(size);
    toast({
      title: "Duration Selected",
      description: `Selected ${size.name} (${size.label})`,
    });
    navigate('/style');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with full-width layout */}
      <div className="relative h-[70vh] bg-[#0A0A0A] overflow-hidden">
        {/* Background video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://www.dropbox.com/scl/fi/2ctxlrnuqeqe8r4lcnnoz/first-page.mp4?rlkey=qknrts8gb6lwepv0vhupydosy&raw=1" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Background overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
        </div>
        
        {/* Content container */}
        <div className="relative container mx-auto h-full">
          <div className="flex flex-col justify-center h-full max-w-2xl px-6 py-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Get unlimited video editing
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-xl">
              Choose the perfect duration for your video project. Each option is carefully designed 
              to match different content needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigate('/style')}
                className="px-8 py-4 bg-[#D946EF] text-white font-semibold rounded-lg hover:bg-[#C935DE] transition-colors"
              >
                Start Free Now
              </button>
              <button 
                onClick={() => navigate('/pricing')}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Pricing
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Duration Options Grid */}
      <div className="container mx-auto px-4 py-16 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIDEO_SIZES.map((size) => {
            const isSelected = selectedSize && selectedSize.min === size.min && selectedSize.max === size.max;
            
            return (
              <motion.div
                key={`${size.min}-${size.max}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-6 rounded-xl border transition-all duration-300 cursor-pointer
                  ${isSelected 
                    ? 'border-editor-glow-purple shadow-lg shadow-editor-glow-purple/20 bg-editor-glow-purple/10' 
                    : 'border-gray-700 bg-gray-800/50 hover:border-editor-glow-purple/50'
                  }`}
                onClick={() => handleSizeSelect(size)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">{size.name}</h3>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="w-4 h-4" />
                      <span>{size.label}</span>
                    </div>
                  </div>
                  <PlanBadge tier={size.tier} />
                </div>

                <p className="text-gray-400 text-sm mb-4 whitespace-pre-line">
                  {size.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-purple-300 bg-purple-500/10 p-2 rounded-lg">
                  <Clock className="w-4 h-4" />
                  <span>Recommended Tracks: {size.recommendedTracks}</span>
                </div>

                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-2 -right-2 bg-editor-glow-purple rounded-full p-2 shadow-lg shadow-editor-glow-purple/50"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoSizeSelector;