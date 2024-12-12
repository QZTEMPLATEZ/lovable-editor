import React, { createContext, useContext, useState } from 'react';
import { VideoSizeRange } from '../types';
import { VideoStyle } from '../types/video';

interface VideoTypeContextType {
  selectedVideoType: VideoSizeRange | null;
  setSelectedVideoType: (type: VideoSizeRange | null) => void;
  selectedStyle: VideoStyle | null;
  setSelectedStyle: (style: VideoStyle | null) => void;
  selectedMusic: File[];
  setSelectedMusic: (music: File[]) => void;
}

const VideoTypeContext = createContext<VideoTypeContextType | undefined>(undefined);

export const VideoTypeProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedVideoType, setSelectedVideoType] = useState<VideoSizeRange | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<VideoStyle | null>(null);
  const [selectedMusic, setSelectedMusic] = useState<File[]>([]);

  return (
    <VideoTypeContext.Provider value={{ 
      selectedVideoType, 
      setSelectedVideoType,
      selectedStyle,
      setSelectedStyle,
      selectedMusic,
      setSelectedMusic
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

export default VideoTypeContext;