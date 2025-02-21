
import React from 'react';
import { motion } from 'framer-motion';
import TrackItem from './TrackItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from 'lucide-react';

export interface Track {
  file: File;
  duration: string;
  intensity: number;
  waveform?: number[];
  bpm?: number;
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
  if (tracks.length === 0) {
    return (
      <Alert className="bg-purple-500/10 border-purple-500/30">
        <Info className="h-4 w-4 text-purple-400" />
        <AlertDescription className="text-purple-200">
          Adicione músicas para começar. O sistema irá analisar automaticamente o ritmo e intensidade para sincronização com os vídeos.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <ScrollArea className="h-[400px] pr-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="grid grid-cols-1 gap-4"
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
    </ScrollArea>
  );
};

export default TrackList;
