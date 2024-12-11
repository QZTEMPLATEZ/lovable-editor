import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import PlanBadge from './PlanBadge';
import { Clock, Check } from 'lucide-react';
import { VideoSizeRange } from '../types';
import { useVideoType } from '../contexts/VideoTypeContext';

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

const VideoSizeSelector = ({ selectedSize, onSizeSelect, userTier }: VideoSizeSelectorProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setSelectedVideoType } = useVideoType();

  const handleSizeSelect = (size: VideoSizeRange) => {
    onSizeSelect(size);
    setSelectedVideoType(size);
    toast({
      title: "Duration Selected",
      description: `Selected ${size.name} (${size.label})`,
    });
    navigate('/style');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with full-width layout optimized for 21:9 */}
      <div className="relative h-[40vh] lg:h-[50vh] bg-[#0A0A0A] overflow-hidden">
        {/* Background video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center opacity-100"
          >
            <source src="https://www.dropbox.com/scl/fi/2ctxlrnuqeqe8r4lcnnoz/first-page.mp4?rlkey=qknrts8gb6lwepv0vhupydosy&raw=1" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Background overlay with darker gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/80" />
        </div>
        
        {/* Content container optimized for 21:9 */}
        <div className="relative container mx-auto h-full max-w-[2560px] px-4 lg:px-8">
          <div className="flex flex-col justify-center h-full max-w-2xl lg:max-w-3xl xl:max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-['Inter'] font-extrabold tracking-[0.2em] uppercase text-white mb-4 leading-tight">
              GET UNLIMITED VIDEO EDITING
            </h1>
            <p className="text-sm md:text-base lg:text-lg font-['Inter'] font-light text-white/80 mb-6 max-w-xl lg:max-w-2xl">
              Choose the perfect duration for your video project. Each option is carefully designed 
              to match different content needs.
            </p>
          </div>
        </div>
      </div>

      {/* Duration Options in Banner Layout */}
      <div className="w-full">
        {VIDEO_SIZES.map((size) => {
          const isSelected = selectedSize && selectedSize.min === size.min && selectedSize.max === size.max;
          
          return (
            <motion.div
              key={`${size.min}-${size.max}`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`relative w-full p-8 border-b transition-all duration-300 cursor-pointer
                ${isSelected 
                  ? 'border-editor-glow-purple bg-editor-glow-purple/10' 
                  : 'border-gray-700/30 hover:bg-editor-glow-purple/5'
                }`}
              onClick={() => handleSizeSelect(size)}
            >
              <div className="container mx-auto max-w-[2560px]">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-xl font-medium text-white">{size.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Clock className="w-4 h-4" />
                        <span>{size.label}</span>
                      </div>
                      <PlanBadge tier={size.tier} />
                    </div>

                    <p className="text-sm text-gray-400 mb-4 max-w-2xl whitespace-pre-line">
                      {size.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-purple-300 bg-purple-500/10 p-2 rounded-lg inline-block">
                      <Clock className="w-3 h-3" />
                      <span>Recommended Tracks: {size.recommendedTracks}</span>
                    </div>
                  </div>

                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="bg-editor-glow-purple rounded-full p-3"
                    >
                      <Check className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoSizeSelector;
