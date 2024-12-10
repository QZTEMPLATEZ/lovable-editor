import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import PlanBadge from './PlanBadge';
import { Clock } from 'lucide-react';

export interface VideoSizeRange {
  min: number;
  max: number;
  label: string;
  description: string;
  icon: React.ReactNode | null;
  recommendedTracks: number;
  tier: 'basic' | 'pro' | 'business';
  name: string;
}

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

const VideoSizeSelector = ({ selectedSize, onSizeSelect, userTier = 'basic' }: VideoSizeSelectorProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSizeSelect = (size: VideoSizeRange) => {
    // Remove tier restriction for testing
    onSizeSelect(size);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 mb-4">
          Select Your Video Duration
        </h1>
        <p className="text-gray-400 text-lg">
          Choose the perfect duration for your video. Each option is carefully crafted for different needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VIDEO_SIZES.map((size) => {
          // Remove isLocked for testing
          const isLocked = false;
          const isSelected = selectedSize && selectedSize.min === size.min && selectedSize.max === size.max;
          
          return (
            <motion.div
              key={`${size.min}-${size.max}`}
              whileHover={{ scale: 1.02 }}
              className={`relative rounded-xl border ${
                isSelected 
                  ? 'border-purple-500 bg-purple-500/10' 
                  : 'border-gray-700 bg-gray-800/50'
              } p-6 cursor-pointer transition-all duration-300`}
              onClick={() => !isLocked && handleSizeSelect(size)}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-white">{size.name}</h3>
                <PlanBadge tier={size.tier} />
              </div>

              <div className="flex items-center gap-2 text-gray-300 mb-4">
                <Clock className="w-4 h-4" />
                <span>{size.label}</span>
              </div>

              <p className="text-gray-400 text-sm mb-4 whitespace-pre-line">
                {size.description}
              </p>

              <div className="flex items-center gap-2 text-sm text-purple-300 bg-purple-500/10 p-2 rounded-lg">
                <Clock className="w-4 h-4" />
                <span>Recommended Tracks: {size.recommendedTracks}</span>
              </div>

              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-purple-500 rounded-full p-2"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

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
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
          disabled={!selectedSize}
        >
          Next: Choose Style
        </Button>
      </div>
    </div>
  );
};

export default VideoSizeSelector;
