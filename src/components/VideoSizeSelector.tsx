import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clock, Music, Lock, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

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
    if (userTier === 'basic' && size.tier !== 'basic') {
      toast({
        title: "Upgrade Required",
        description: "This duration option is only available with our Pro or Business plans. Would you like to upgrade?",
        action: (
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              // Add upgrade logic here
              console.log('Upgrade clicked');
            }}
          >
            Upgrade Now
          </Button>
        ),
      });
      return;
    }
    onSizeSelect(size);
  };

  const handleNext = () => {
    if (!selectedSize) {
      toast({
        title: "Selection Required",
        description: "Please select a video duration before proceeding.",
        variant: "destructive",
      });
      return;
    }
    navigate('/style');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 p-8 rounded-2xl backdrop-blur-lg border border-purple-500/30 shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-3 w-3 rounded-full bg-purple-500 animate-pulse" />
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
          Select Video Duration
        </h3>
      </div>
      
      <RadioGroup
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        value={selectedSize ? `${selectedSize.min}-${selectedSize.max}` : undefined}
        onValueChange={(value) => {
          const [min, max] = value.split('-').map(Number);
          const size = VIDEO_SIZES.find(s => s.min === min && s.max === max);
          if (size) handleSizeSelect(size);
        }}
      >
        {VIDEO_SIZES.map((size) => {
          const isLocked = userTier === 'basic' && size.tier !== 'basic';
          
          return (
            <div key={`${size.min}-${size.max}`} className="relative">
              <RadioGroupItem
                value={`${size.min}-${size.max}`}
                id={`size-${size.min}-${size.max}`}
                className="peer sr-only"
                disabled={isLocked}
              />
              <Label
                htmlFor={`size-${size.min}-${size.max}`}
                className={`flex items-start gap-4 rounded-xl border-2 border-purple-500/30 bg-editor-bg/50 p-6 
                  ${isLocked ? 'opacity-50' : 'hover:bg-editor-bg/70 hover:border-purple-500/50'} 
                  peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:bg-purple-500/20 
                  transition-all cursor-pointer h-full relative`}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-purple-300">{size.name}</span>
                      {size.tier !== 'basic' && (
                        <Crown className={`w-4 h-4 ${
                          size.tier === 'pro' ? 'text-gray-300' : 'text-yellow-400'
                        }`} />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-400">{size.label}</span>
                  </div>
                  <span className="block text-sm text-gray-400 whitespace-pre-line mb-4">{size.description}</span>
                  <div className="flex items-center gap-2 text-sm text-purple-300 mt-2 bg-purple-500/10 p-2 rounded-lg">
                    <Music className="w-4 h-4" />
                    <span>Recommended Tracks: {size.recommendedTracks}</span>
                  </div>
                  {isLocked && (
                    <div className="absolute top-2 right-2">
                      <Lock className="w-5 h-5 text-purple-400" />
                    </div>
                  )}
                </div>
              </Label>
            </div>
          );
        })}
      </RadioGroup>

      <div className="flex justify-between pt-6 border-t border-purple-500/20">
        <Button
          onClick={handleBack}
          variant="outline"
          className="bg-editor-bg/50 hover:bg-editor-bg border-purple-500/30"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
          disabled={!selectedSize}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default VideoSizeSelector;