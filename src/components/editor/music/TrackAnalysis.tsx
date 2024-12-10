import React from 'react';
import { AudioWaveform, Music } from 'lucide-react';

interface TrackAnalysisProps {
  bpm: number;
  key: string;
}

const TrackAnalysis = ({ bpm, key }: TrackAnalysisProps) => {
  return (
    <>
      <span className="flex items-center gap-1">
        <AudioWaveform className="h-4 w-4" />
        {bpm} BPM
      </span>
      <span className="flex items-center gap-1">
        <Music className="h-4 w-4" />
        {key}
      </span>
    </>
  );
};

export default TrackAnalysis;