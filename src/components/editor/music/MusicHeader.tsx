import React from 'react';
import { Music } from 'lucide-react';

interface MusicHeaderProps {
  trackCount: number;
  maxTracks: number;
}

const MusicHeader = ({ trackCount, maxTracks }: MusicHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <Music className="w-5 h-5 text-purple-400" />
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
          Select Your Soundtrack
        </h3>
      </div>
      <span className="text-sm text-purple-300">
        {trackCount} / {maxTracks} tracks
      </span>
    </div>
  );
};

export default MusicHeader;