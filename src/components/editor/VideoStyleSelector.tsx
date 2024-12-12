import React, { useState } from 'react';
import { VideoStyle } from '../../types/video';
import { VIDEO_STYLES } from '@/constants/videoStyles';
import VideoStyleItem from './VideoStyleItem';
import ReferenceVideoBanner from './ReferenceVideoBanner';
import { useToast } from '../ui/use-toast';

interface VideoStyleSelectorProps {
  selectedStyle: VideoStyle | null;
  onStyleSelect: (style: VideoStyle) => void;
  onCustomVideoUpload: (file: File) => void;
}

const VideoStyleSelector = ({ selectedStyle, onStyleSelect, onCustomVideoUpload }: VideoStyleSelectorProps) => {
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        onCustomVideoUpload(file);
        toast({
          title: "Reference video uploaded",
          description: "Your custom reference video will be used for style guidance.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a video file.",
        });
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="w-full max-w-none px-0 space-y-0 bg-[#0A0A0A]/95 backdrop-blur-sm">
        {VIDEO_STYLES.map((style) => (
          <VideoStyleItem
            key={style.id}
            style={style}
            isHovered={hoveredStyle === style.id}
            onMouseEnter={() => setHoveredStyle(style.id)}
            onMouseLeave={() => setHoveredStyle(null)}
            onStyleSelect={() => onStyleSelect({
              id: style.id,
              name: style.title,
              description: style.description,
              thumbnail: style.previewVideo,
              videoUrl: style.previewVideo
            })}
          />
        ))}
      </div>

      <ReferenceVideoBanner onFileInputClick={() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'video/*';
        input.onchange = (e) => handleFileUpload(e as React.ChangeEvent<HTMLInputElement>);
        input.click();
      }} />
    </div>
  );
};

export default VideoStyleSelector;