
import React, { createContext, useContext, useState } from 'react';
import { CloudLink } from '@/components/editor/types';

interface VideoTypeContextProps {
  selectedMusic: File | null;
  setSelectedMusic: (file: File | null) => void;
  videoLinks: CloudLink[];
  setVideoLinks: (links: CloudLink[]) => void;
  musicLinks: CloudLink[];
  setMusicLinks: (links: CloudLink[]) => void;
}

const VideoTypeContext = createContext<VideoTypeContextProps>({
  selectedMusic: null,
  setSelectedMusic: () => {},
  videoLinks: [],
  setVideoLinks: () => {},
  musicLinks: [],
  setMusicLinks: () => {},
});

export const VideoTypeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedMusic, setSelectedMusic] = useState<File | null>(null);
  const [videoLinks, setVideoLinks] = useState<CloudLink[]>([]);
  const [musicLinks, setMusicLinks] = useState<CloudLink[]>([]);

  return (
    <VideoTypeContext.Provider value={{
      selectedMusic,
      setSelectedMusic,
      videoLinks,
      setVideoLinks,
      musicLinks,
      setMusicLinks,
    }}>
      {children}
    </VideoTypeContext.Provider>
  );
};

export const useVideoType = () => useContext(VideoTypeContext);
