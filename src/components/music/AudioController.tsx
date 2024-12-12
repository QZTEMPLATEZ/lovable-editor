import { useState } from 'react';
import { createAudioElement, cleanupAudioElement } from '@/utils/audioUtils';

interface AudioControllerProps {
  onTrackRemoved: (index: number) => void;
}

export const useAudioController = ({ onTrackRemoved }: AudioControllerProps) => {
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<{ [key: string]: HTMLAudioElement }>({});

  const addAudioElement = (file: File) => {
    const audio = createAudioElement(file);
    setAudioElements(prev => ({
      ...prev,
      [file.name]: audio
    }));
  };

  const togglePlayPause = (fileName: string) => {
    const audio = audioElements[fileName];
    if (!audio) return;

    if (playingTrack === fileName) {
      audio.pause();
      setPlayingTrack(null);
    } else {
      if (playingTrack && audioElements[playingTrack]) {
        audioElements[playingTrack].pause();
      }
      audio.play();
      setPlayingTrack(fileName);
    }
  };

  const removeTrack = (index: number, fileName: string) => {
    if (audioElements[fileName]) {
      cleanupAudioElement(audioElements[fileName]);
      const newAudioElements = { ...audioElements };
      delete newAudioElements[fileName];
      setAudioElements(newAudioElements);
    }
    
    if (playingTrack === fileName) {
      setPlayingTrack(null);
    }

    onTrackRemoved(index);
  };

  return {
    playingTrack,
    addAudioElement,
    togglePlayPause,
    removeTrack
  };
};