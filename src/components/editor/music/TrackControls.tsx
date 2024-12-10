import React from 'react';
import { Play, Pause, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface TrackControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onRemove: () => void;
}

const TrackControls = ({ isPlaying, onPlay, onRemove }: TrackControlsProps) => {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-full"
        onClick={onPlay}
      >
        {isPlaying ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5" />
        )}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-red-400/70 hover:text-red-400"
        onClick={onRemove}
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </>
  );
};

export default TrackControls;