import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TrackItem from './TrackItem';

interface Track {
  file: File;
  duration: string;
  bpm?: number;
  key?: string;
  intensity: number;
  audioElement?: HTMLAudioElement;
}

interface TrackListProps {
  tracks: Track[];
  playingTrack: string | null;
  isAnalyzing: boolean;
  onTogglePlay: (fileName: string) => void;
  onRemoveTrack: (index: number) => void;
  onIntensityChange: (index: number, value: number[]) => void;
}

const TrackList = ({
  tracks,
  playingTrack,
  isAnalyzing,
  onTogglePlay,
  onRemoveTrack,
  onIntensityChange
}: TrackListProps) => {
  if (tracks.length === 0) return null;

  return (
    <AnimatePresence>
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
            onTogglePlay={onTogglePlay}
            onRemove={() => onRemoveTrack(index)}
            onIntensityChange={(value) => onIntensityChange(index, value)}
            index={index}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default TrackList;