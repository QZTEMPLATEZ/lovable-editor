import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";

export interface VideoSizeRange {
  min: number;
  max: number;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const VIDEO_SIZES: VideoSizeRange[] = [
  {
    min: 4,
    max: 6,
    label: "4-6 minutes",
    description: "Perfect for social media highlights\n• Quick overview of key moments\n• Ideal for Instagram and TikTok\n• Fast-paced, engaging edits\n• Captures ceremony highlights\n• Perfect for sharing with friends",
    icon: <Clock className="w-5 h-5 text-purple-400" />
  },
  {
    min: 8,
    max: 12,
    label: "8-12 minutes",
    description: "Ideal for ceremony highlights\n• Complete ceremony coverage\n• Key reception moments included\n• Special family moments captured\n• Guest interviews and wishes\n• Perfect blend of emotions",
    icon: <Clock className="w-5 h-5 text-purple-400" />
  },
  {
    min: 15,
    max: 20,
    label: "15-20 minutes",
    description: "Complete ceremony coverage\n• Full ceremony with vows\n• Extended reception highlights\n• Detailed family moments\n• All important speeches\n• Beautiful venue coverage",
    icon: <Clock className="w-5 h-5 text-purple-400" />
  },
  {
    min: 30,
    max: 40,
    label: "30-40 minutes",
    description: "Full wedding documentary\n• Complete event documentation\n• Behind-the-scenes footage\n• Multiple camera perspectives\n• Extended family interviews\n• Comprehensive storytelling",
    icon: <Clock className="w-5 h-5 text-purple-400" />
  }
];

interface VideoSizeSelectorProps {
  selectedSize: VideoSizeRange | null;
  onSizeSelect: (size: VideoSizeRange) => void;
}

const VideoSizeSelector = ({ selectedSize, onSizeSelect }: VideoSizeSelectorProps) => {
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
              className="flex items-start gap-4 rounded-xl border-2 border-purple-500/30 bg-editor-bg/50 p-6 hover:bg-editor-bg/70 hover:border-purple-500/50 peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:bg-purple-500/20 transition-all cursor-pointer h-full"
            >
              {size.icon}
              <div className="flex-1">
                <span className="block text-lg font-semibold text-purple-300 mb-2">{size.label}</span>
                <span className="block text-sm text-gray-400 whitespace-pre-line">{size.description}</span>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default VideoSizeSelector;