import React from 'react';
import { VideoStyle } from '@/types/video';
import StyleContent from '../StyleContent';
import StyleActions from '../StyleActions';
import StylePreview from '../StylePreview';
import { useVideoPreview } from '@/hooks/useVideoPreview';

interface DynamicBannerProps {
  style: VideoStyle;
  isHovered: boolean;
  onSelect: () => void;
}

const DynamicBanner = ({ style, isHovered, onSelect }: DynamicBannerProps) => {
  const { videoRef, videoError, handleVideoError } = useVideoPreview(isHovered);
  
  return (
    <div className="relative w-full [aspect-ratio:3.84/1] group cursor-pointer bg-editor-panel isolate overflow-hidden">
      <div className="absolute inset-0 z-[1] bg-editor-panel" />
      <div className="absolute inset-0 z-[2] bg-[url('/grid.svg')] opacity-5" />
      
      <StylePreview
        videoUrl="https://www.dropbox.com/scl/fi/m75wtfagul3ui9qbi996b/DINAMICO-OK.mp4?raw=1"
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
          features={['Energetic transitions', 'Fast-paced editing', 'Vibrant colors', 'Dynamic movement']}
        />
        {isHovered && <StyleActions onSelect={onSelect} />}
      </div>
    </div>
  );
};

export default DynamicBanner;