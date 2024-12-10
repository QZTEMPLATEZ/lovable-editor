import React from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { Clock, Music, Lock, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

interface VideoSize {
  name: string;
  label: string;
  min: number;
  max: number;
  musicTracks: number;
  tier: 'basic' | 'pro' | 'business';
}

interface VideoSizeSelectorProps {
  selectedSize: VideoSize | null;
  onSizeSelect: (size: VideoSize) => void;
  userTier?: 'basic' | 'pro' | 'business';
}

const VIDEO_SIZES: VideoSize[] = [
  { name: "short", label: "Short", min: 0, max: 1.5, musicTracks: 1, tier: 'basic' },
  { name: "medium", label: "Medium", min: 1.5, max: 5, musicTracks: 2, tier: 'pro' },
  { name: "long", label: "Long", min: 5, max: 12, musicTracks: 3, tier: 'business' },
];

const VideoSizeSelector = ({ selectedSize, onSizeSelect, userTier = 'basic' }: VideoSizeSelectorProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSizeSelect = (size: VideoSize) => {
    onSizeSelect(size);
  };

  const handleNext = () => {
    if (!selectedSize) {
      toast({
        title: "Select a size",
        description: "Please select a video size before proceeding.",
        variant: "destructive",
      });
      return;
    }
    navigate('/style');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold gradient-text">Choose Video Duration</h2>
        <p className="text-gray-400">Select the perfect length for your video</p>
      </div>

      <RadioGroup
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        value={selectedSize?.name}
        onValueChange={(value) => {
          const size = VIDEO_SIZES.find((s) => s.name === value);
          if (size) handleSizeSelect(size);
        }}
      >
        {VIDEO_SIZES.map((size) => {
          const isLocked = userTier === 'basic' && size.tier !== 'basic';
          
          return (
            <div
              key={size.name}
              className={`relative group ${
                isLocked ? 'opacity-75' : ''
              }`}
            >
              <div
                className={`
                  p-6 rounded-xl border transition-all duration-200
                  ${selectedSize?.name === size.name
                    ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20'
                    : 'border-editor-border bg-editor-panel/50 hover:border-purple-500/50'}
                  ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}
                  relative overflow-hidden
                `}
              >
                {isLocked && (
                  <div className="absolute inset-0 backdrop-blur-sm bg-editor-bg/50 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Lock className="w-4 h-4" />
                      <span>Pro Feature</span>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-purple-300">{size.name}</span>
                      {size.tier !== 'basic' && (
                        <Diamond className={`w-4 h-4 ${
                          size.tier === 'pro' ? 'text-gray-300' : 'text-yellow-400'
                        }`} />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-400">{size.label}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{size.min} - {size.max} minutes</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Music className="w-4 h-4" />
                      <span>{size.musicTracks} music tracks</span>
                    </div>
                  </div>
                </div>
              </div>
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
