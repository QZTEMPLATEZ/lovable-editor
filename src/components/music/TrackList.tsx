import React from 'react';
import { motion } from 'framer-motion';
import TrackItem from './TrackItem';

export interface Track {
  file: File;
  duration: string;
  bpm?: number;
  key?: string;
  intensity: number;
  audioElement?: HTMLAudioElement;
}

export interface TrackListProps {
  selectedMusic: File[];
  playingTrack: string | null;
  isAnalyzing: boolean;
  onTogglePlay: (fileName: string) => void;
  onRemoveTrack: (index: number) => void;
}

const TrackList = ({
  selectedMusic,
  playingTrack,
  isAnalyzing,
  onTogglePlay,
  onRemoveTrack,
}: TrackListProps) => {
  if (selectedMusic.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mt-6 grid grid-cols-1 gap-4"
    >
      {selectedMusic.map((file, index) => (
        <TrackItem
          key={file.name}
          file={file}
          isPlaying={playingTrack === file.name}
          isAnalyzing={isAnalyzing}
          onTogglePlay={() => onTogglePlay(file.name)}
          onRemove={() => onRemoveTrack(index)}
        />
      ))}
    </motion.div>
  );
};

export default TrackList;