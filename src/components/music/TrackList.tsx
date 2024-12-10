import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TrackItem from './TrackItem';

interface TrackListProps {
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
  onRemoveTrack
}: TrackListProps) => {
  if (selectedMusic.length === 0) return null;

  return (
    <AnimatePresence>
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
            onTogglePlay={onTogglePlay}
            onRemove={onRemoveTrack}
            index={index}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default TrackList;