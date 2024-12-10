import React from 'react';
import { VideoSizeRange } from '../types';
import DurationGrid from './editor/DurationGrid';
import DurationCard from './editor/DurationCard';

interface VideoSizeSelectorProps {
  selectedSize: VideoSizeRange | null;
  onSizeSelect: (size: VideoSizeRange) => void;
}

const VideoSizeSelector: React.FC<VideoSizeSelectorProps> = ({
  selectedSize,
  onSizeSelect,
}) => {
  return (
    <div className="w-full">
      {/* Banner with 21:9 aspect ratio */}
      <div className="relative [aspect-ratio:21/9] bg-editor-panel overflow-hidden mb-8">
        {/* Background grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl md:text-5xl font-cinzel tracking-[0.2em] text-white/90 uppercase">
            Select Duration
          </h1>
        </div>
      </div>

      <DurationGrid>
        <DurationCard
          title="Short Form"
          description="Perfect for social media"
          duration="15-60s"
          isSelected={selectedSize === 'short'}
          onClick={() => onSizeSelect('short')}
        />
        <DurationCard
          title="Medium Form"
          description="Ideal for detailed content"
          duration="1-5min"
          isSelected={selectedSize === 'medium'}
          onClick={() => onSizeSelect('medium')}
        />
        <DurationCard
          title="Long Form"
          description="Best for in-depth videos"
          duration="5-15min"
          isSelected={selectedSize === 'long'}
          onClick={() => onSizeSelect('long')}
        />
      </DurationGrid>
    </div>
  );
};

export default VideoSizeSelector;