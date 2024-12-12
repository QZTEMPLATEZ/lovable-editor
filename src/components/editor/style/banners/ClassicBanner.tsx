import React from 'react';
import { VideoStyle } from '@/types/video';
import StyleContent from '../StyleContent';
import StyleActions from '../StyleActions';
import StylePreview from '../StylePreview';
import { useVideoPreview } from '@/hooks/useVideoPreview';

interface ClassicBannerProps {
  style: VideoStyle;
  isHovered: boolean;
  onSelect: () => void;
}

const ClassicBanner = ({ style, isHovered, onSelect }: ClassicBannerProps) => {
  const { videoRef, videoError, handleVideoError } = useVideoPreview(isHovered);
  
  return (
    <div className="relative w-full [aspect-ratio:3.84/1] group cursor-pointer bg-editor-panel isolate overflow-hidden">
      <div className="absolute inset-0 z-[1] bg-editor-panel" />
      <div className="absolute inset-0 z-[2] bg-[url('/grid.svg')] opacity-5" />
      
      <StylePreview
        videoUrl="https://www.dropbox.com/scl/fi/6qe8m4ab7nzjj14ne0h6u/CLASSIC-LONG-OK-OK.mp4?raw=1"
        isHovered={isHovered}
        videoRef={videoRef}
        onError={handleVideoError}
      />
      
      <div className="absolute inset-0 z-[4] bg-gradient-to-r from-black/30 to-black/50" />
      
      <div className="absolute inset-0 z-[5] flex items-center justify-between h-full w-full px-8 md:px-16">
        <StyleContent
          title={style.name}
          description={style.description}
          isHovered={isHovered}
          features={['Professional color grading', 'Cinematic transitions', 'Custom sound design', 'Emotional storytelling']}
        />
        {isHovered && <StyleActions onSelect={onSelect} />}
      </div>
    </div>
  );
};

export default ClassicBanner;