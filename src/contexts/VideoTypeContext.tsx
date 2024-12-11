import React, { createContext, useContext, useState } from 'react';
import { VideoSizeRange } from '../types';
import { VideoStyle } from '../types/video';

interface VideoTypeContextType {
  selectedVideoType: VideoSizeRange | null;
  setSelectedVideoType: (type: VideoSizeRange | null) => void;
  selectedStyle: VideoStyle | null;
  setSelectedStyle: (style: VideoStyle | null) => void;
}

const VideoTypeContext = createContext<VideoTypeContextType | undefined>(undefined);

export const VideoTypeProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedVideoType, setSelectedVideoType] = useState<VideoSizeRange | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<VideoStyle | null>(null);

  return (
    <VideoTypeContext.Provider value={{ 
      selectedVideoType, 
      setSelectedVideoType,
      selectedStyle,
      setSelectedStyle
    }}>
      {children}
    </VideoTypeContext.Provider>
  );
};

export const useVideoType = () => {
  const context = useContext(VideoTypeContext);
  if (context === undefined) {
    throw new Error('useVideoType must be used within a VideoTypeProvider');
  }
  return context;
};