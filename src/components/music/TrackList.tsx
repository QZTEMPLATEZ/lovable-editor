import React from 'react';
import { motion } from 'framer-motion';
import TrackItem from './TrackItem';

export interface Track {
  file: File;
  duration: string;
  intensity: number;
}

export interface TrackListProps {
  tracks: Track[];
  playingTrack: string | null;
  isAnalyzing: boolean;
  onTogglePlay: (fileName: string) => void;
  onRemoveTrack: (index: number, fileName: string) => void;
}

const TrackList = ({
  tracks,
  playingTrack,
  isAnalyzing,
  onTogglePlay,
  onRemoveTrack,
}: TrackListProps) => {
  if (tracks.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mt-6 grid grid-cols-1 gap-4"
    >
      {tracks.map((track, index) => (
        <TrackItem
          key={track.file.name}
          track={track}
          isPlaying={playingTrack === track.file.name}
          isAnalyzing={isAnalyzing}
          onTogglePlay={() => onTogglePlay(track.file.name)}
          onRemove={() => onRemoveTrack(index, track.file.name)}
        />
      ))}
    </motion.div>
  );
};

export default TrackList;