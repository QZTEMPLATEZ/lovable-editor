
import React, { createContext, useContext, useState } from 'react';
import { CloudLink } from '@/components/editor/types';
import { VideoSizeRange } from '@/types';
import { VideoStyle } from '@/types/video';

interface VideoTypeContextProps {
  selectedMusic: File[] | null;
  setSelectedMusic: (files: File[] | null) => void;
  videoLinks: CloudLink[];
  setVideoLinks: (links: CloudLink[]) => void;
  musicLinks: CloudLink[];
  setMusicLinks: (links: CloudLink[]) => void;
  selectedVideoType: VideoSizeRange | null;
  setSelectedVideoType: (type: VideoSizeRange | null) => void;
  selectedStyle: VideoStyle | null;
  setSelectedStyle: (style: VideoStyle | null) => void;
}

const VideoTypeContext = createContext<VideoTypeContextProps>({
  selectedMusic: null,
  setSelectedMusic: () => {},
  videoLinks: [],
  setVideoLinks: () => {},
  musicLinks: [],
  setMusicLinks: () => {},
  selectedVideoType: null,
  setSelectedVideoType: () => {},
  selectedStyle: null,
  setSelectedStyle: () => {},
});

export const VideoTypeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedMusic, setSelectedMusic] = useState<File[] | null>(null);
  const [videoLinks, setVideoLinks] = useState<CloudLink[]>([]);
  const [musicLinks, setMusicLinks] = useState<CloudLink[]>([]);
  const [selectedVideoType, setSelectedVideoType] = useState<VideoSizeRange | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<VideoStyle | null>(null);

  return (
    <VideoTypeContext.Provider value={{
      selectedMusic,
      setSelectedMusic,
      videoLinks,
      setVideoLinks,
      musicLinks,
      setMusicLinks,
      selectedVideoType,
      setSelectedVideoType,
      selectedStyle,
      setSelectedStyle,
    }}>
      {children}
    </VideoTypeContext.Provider>
  );
};

export const useVideoType = () => useContext(VideoTypeContext);
