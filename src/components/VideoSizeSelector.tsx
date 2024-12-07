import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clock, Film } from 'lucide-react';

export interface VideoSizeRange {
  min: number;
  max: number;
  label: string;
  description: string;
}

const VIDEO_SIZES: VideoSizeRange[] = [
  { 
    min: 4, 
    max: 6, 
    label: "4-6 minutes",
    description: "Perfect for social media highlights and quick sharing"
  },
  { 
    min: 8, 
    max: 12, 
    label: "8-12 minutes",
    description: "Ideal for ceremony highlights and key moments"
  },
  { 
    min: 15, 
    max: 20, 
    label: "15-20 minutes",
    description: "Complete ceremony coverage with extended highlights"
  },
  { 
    min: 30, 
    max: 40, 
    label: "30-40 minutes",
    description: "Full wedding documentary with all special moments"
  }
];

interface VideoSizeSelectorProps {
  selectedSize: VideoSizeRange | null;
  onSizeSelect: (size: VideoSizeRange) => void;
}

const VideoSizeSelector = ({ selectedSize, onSizeSelect }: VideoSizeSelectorProps) => {
  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 p-8 rounded-2xl backdrop-blur-lg border border-purple-500/30 shadow-2xl">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Clock className="w-6 h-6 text-pink-400 animate-pulse" />
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            Select Your Wedding Film Duration
          </h3>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Choose the perfect duration for your wedding film. Each option is carefully crafted to capture your special moments in the most meaningful way.
        </p>
      </div>
      
      <RadioGroup
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        value={selectedSize ? `${selectedSize.min}-${selectedSize.max}` : undefined}
        onValueChange={(value) => {
          const [min, max] = value.split('-').map(Number);
          const size = VIDEO_SIZES.find(s => s.min === min && s.max === max);
          if (size) onSizeSelect(size);
        }}
      >
        {VIDEO_SIZES.map((size) => (
          <div key={`${size.min}-${size.max}`} className="relative">
            <RadioGroupItem
              value={`${size.min}-${size.max}`}
              id={`size-${size.min}-${size.max}`}
              className="peer sr-only"
            />
            <Label
              htmlFor={`size-${size.min}-${size.max}`}
              className="flex flex-col items-center justify-center rounded-xl border-2 border-purple-500/30 bg-editor-bg/50 p-6 hover:bg-editor-bg/70 hover:border-purple-500/50 peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:bg-purple-500/20 transition-all cursor-pointer group"
            >
              <span className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400 mb-2">
                {size.label}
              </span>
              <span className="text-sm text-gray-400 text-center group-hover:text-gray-300 transition-colors">
                {size.description}
              </span>
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="mt-8 p-6 bg-editor-bg/40 rounded-xl border border-purple-500/20">
        <div className="flex items-center gap-3 mb-4">
          <Film className="w-5 h-5 text-pink-400" />
          <h4 className="text-lg font-semibold text-purple-300">Reference Films Guide</h4>
        </div>
        <p className="text-gray-400 mb-4">
          Upload up to 3 reference wedding films that inspire you. Our AI will analyze:
        </p>
        <ul className="space-y-2 text-sm text-gray-400">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-400"></span>
            Visual style and color grading preferences
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            Transition types and pacing
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-400"></span>
            Music synchronization patterns
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VideoSizeSelector;