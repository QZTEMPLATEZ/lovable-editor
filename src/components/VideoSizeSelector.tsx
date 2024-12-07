import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export interface VideoSizeRange {
  min: number;
  max: number;
  label: string;
}

const VIDEO_SIZES: VideoSizeRange[] = [
  { min: 4, max: 6, label: "4-6 minutes" },
  { min: 8, max: 12, label: "8-12 minutes" },
  { min: 15, max: 20, label: "15-20 minutes" },
  { min: 30, max: 40, label: "30-40 minutes" }
];

interface VideoSizeSelectorProps {
  selectedSize: VideoSizeRange | null;
  onSizeSelect: (size: VideoSizeRange) => void;
}

const VideoSizeSelector = ({ selectedSize, onSizeSelect }: VideoSizeSelectorProps) => {
  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 p-8 rounded-2xl backdrop-blur-lg border border-purple-500/30 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-3 w-3 rounded-full bg-purple-500 animate-pulse" />
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
          Select Video Duration
        </h3>
      </div>
      
      <RadioGroup
        className="grid grid-cols-2 gap-4"
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
              className="flex flex-col items-center justify-center rounded-xl border-2 border-purple-500/30 bg-editor-bg/50 p-4 hover:bg-editor-bg/70 hover:border-purple-500/50 peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:bg-purple-500/20 transition-all cursor-pointer"
            >
              <span className="text-lg font-semibold text-purple-300">{size.label}</span>
              <span className="text-sm text-gray-400">Duration Range</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default VideoSizeSelector;