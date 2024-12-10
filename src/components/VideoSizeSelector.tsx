import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
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
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:block w-1/2 bg-editor-bg relative">
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/2dce83de-8b50-4311-8631-d0277b63b09c.png" 
            alt="Showcase" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right side - Content */}
      <div className="w-full lg:w-1/2 p-8 lg:p-16 bg-editor-bg overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-12">
          {/* Main heading */}
          <div>
            <h1 className="text-5xl font-bold text-white mb-4 font-cinzel">
              Select Your Duration
            </h1>
            <p className="text-lg text-gray-400">
              Choose the perfect duration for your video. Each option is carefully crafted for different needs.
            </p>
          </div>

          {/* Duration options */}
          <div className="space-y-6">
            {VIDEO_SIZES.map((size) => {
              const isSelected = selectedSize && selectedSize.min === size.min && selectedSize.max === size.max;
              
              return (
                <motion.div
                  key={`${size.min}-${size.max}`}
                  whileHover={{ x: 4 }}
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

          {/* Navigation buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-700">
            <Button
              onClick={handleBack}
              variant="outline"
              className="bg-gray-800/50 hover:bg-gray-700"
            >
              Back to Home
            </Button>
            
            <Button
              onClick={() => navigate('/style')}
              className="bg-gradient-to-r from-editor-glow-purple to-editor-glow-pink hover:opacity-90 shadow-lg shadow-editor-glow-purple/20"
            >
              Next: Choose Style
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSizeSelector;
