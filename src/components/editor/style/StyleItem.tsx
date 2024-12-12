import React, { useState } from 'react';
import { VideoStyle } from '@/types/video';
import ClassicBanner from './banners/ClassicBanner';
import ModernBanner from './banners/ModernBanner';
import DocumentaryBanner from './banners/DocumentaryBanner';
import DynamicBanner from './banners/DynamicBanner';

interface StyleItemProps {
  style: {
    id: string;
    title: string;
    description: string;
    previewVideo: string;
    features: string[];
  };
  onStyleSelect: (style: VideoStyle) => void;
}

const StyleItem = ({ style, onStyleSelect }: StyleItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleSelect = () => {
    const videoStyle: VideoStyle = {
      id: style.id,
      name: style.title,
      description: style.description,
      thumbnail: style.previewVideo,
      videoUrl: style.previewVideo
    };
    onStyleSelect(videoStyle);
  };

  const renderBanner = () => {
    const props = {
      style: {
        id: style.id,
        name: style.title,
        description: style.description,
        thumbnail: style.previewVideo,
        videoUrl: style.previewVideo
      },
      isHovered,
      onSelect: handleSelect
    };

    switch (style.id) {
      case 'classic':
        return <ClassicBanner {...props} />;
      case 'modern':
        return <ModernBanner {...props} />;
      case 'documentary':
        return <DocumentaryBanner {...props} />;
      case 'dynamic':
        return <DynamicBanner {...props} />;
      default:
        return <ClassicBanner {...props} />;
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleSelect}
    >
      {renderBanner()}
    </div>
  );
};

export default StyleItem;