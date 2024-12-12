import React, { useState } from 'react';
import { VideoStyle } from '../../types/video';
import { VIDEO_STYLES } from '@/constants/videoStyles';
import StyleGrid from './style/StyleGrid';
import ReferenceVideoBanner from './ReferenceVideoBanner';
import { useToast } from '../ui/use-toast';

interface VideoStyleSelectorProps {
  selectedStyle: VideoStyle | null;
  onStyleSelect: (style: VideoStyle) => void;
  onCustomVideoUpload: (file: File) => void;
}

const VideoStyleSelector = ({ selectedStyle, onStyleSelect, onCustomVideoUpload }: VideoStyleSelectorProps) => {
  const { toast } = useToast();

  const handleStyleSelect = (style: VideoStyle) => {
    onStyleSelect(style);
    toast({
      title: "Style Selected",
      description: `${style.name} style has been selected for your video.`,
    });
  };

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
      <StyleGrid onStyleSelect={handleStyleSelect} />

      <ReferenceVideoBanner onFileInputClick={() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'video/*';
        input.onchange = (e) => {
          if (e.target instanceof HTMLInputElement) {
            handleFileUpload(e as React.ChangeEvent<HTMLInputElement>);
          }
        };
        input.click();
      }} />
    </div>
  );
};

export default VideoStyleSelector;