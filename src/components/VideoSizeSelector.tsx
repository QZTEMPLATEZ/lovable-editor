import React, { useState } from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { Clock, Music, Lock, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

export interface VideoSizeRange {
  name: string;
  label: string;
  min: number;
  max: number;
  description: string;
  icon: React.ReactNode | null;
  recommendedTracks: number;
  tier: 'basic' | 'pro' | 'business';
}

interface VideoSizeSelectorProps {
  selectedSize: VideoSizeRange | null;
  onSizeSelect: (size: VideoSizeRange) => void;
  userTier?: 'basic' | 'pro' | 'business';
}

const VIDEO_SIZES: VideoSizeRange[] = [
  { 
    name: "Social", 
    label: "30s - 1:30min", 
    min: 0.5, 
    max: 1.5, 
    description: "Quick, high-energy edit for social media",
    icon: null,
    recommendedTracks: 1, 
    tier: 'basic' 
  },
  { 
    name: "Trailer", 
    label: "3-5 minutes", 
    min: 3, 
    max: 5, 
    description: "Dynamic event summary",
    icon: null,
    recommendedTracks: 2, 
    tier: 'pro' 
  },
  { 
    name: "Feature", 
    label: "8-12 minutes", 
    min: 8, 
    max: 12, 
    description: "Detailed artistic edit",
    icon: null,
    recommendedTracks: 3, 
    tier: 'business' 
  },
];

const VideoSizeSelector = ({ selectedSize, onSizeSelect, userTier = 'basic' }: VideoSizeSelectorProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [expandedSize, setExpandedSize] = useState<string | null>(null);

  const handleSizeSelect = (size: VideoSizeRange) => {
    setExpandedSize(size.name);
    onSizeSelect(size);
  };

  const handleNext = () => {
    if (!selectedSize) {
      toast({
        title: "Select a duration",
        description: "Please select a video duration before proceeding.",
        variant: "destructive",
      });
      return;
    }
    navigate('/style');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-editor-glow-purple to-editor-glow-pink">
          Choose Video Duration
        </h2>
        <p className="text-gray-400 mt-2">Select the perfect length for your story</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {VIDEO_SIZES.map((size) => {
          const isLocked = userTier === 'basic' && size.tier !== 'basic';
          const isSelected = selectedSize?.name === size.name;
          const isExpanded = expandedSize === size.name;
          
          return (
            <motion.div
              key={size.name}
              layout
              className={`
                relative rounded-xl border transition-all duration-200 overflow-hidden
                ${isSelected 
                  ? 'border-editor-glow-purple bg-editor-panel/50 shadow-lg shadow-editor-glow-purple/20' 
                  : 'border-editor-border bg-editor-panel/30 hover:border-editor-glow-purple/50'}
                ${isLocked ? 'opacity-50' : ''}
              `}
              onClick={() => !isLocked && handleSizeSelect(size)}
            >
              <div className="p-4 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-medium text-white">{size.name}</span>
                  {size.tier !== 'basic' && (
                    <Diamond className={`w-4 h-4 ${
                      size.tier === 'pro' ? 'text-gray-300' : 'text-yellow-400'
                    }`} />
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{size.label}</span>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 space-y-3"
                    >
                      <p className="text-sm text-gray-400">{size.description}</p>
                      <div className="flex items-center gap-2 text-sm text-editor-accent">
                        <Music className="w-4 h-4" />
                        <span>Recommended Tracks: {size.recommendedTracks}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {isLocked && (
                <div className="absolute inset-0 backdrop-blur-sm bg-editor-bg/50 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Lock className="w-4 h-4" />
                    <span>Pro Feature</span>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-between pt-6 border-t border-editor-border/30">
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          className="bg-editor-panel/50 hover:bg-editor-panel"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          className="bg-gradient-to-r from-editor-glow-purple to-editor-glow-pink hover:opacity-90"
          disabled={!selectedSize}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default VideoSizeSelector;