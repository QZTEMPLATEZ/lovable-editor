import React from 'react';
import { Music } from 'lucide-react';

const MusicHeader = () => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <Music className="w-5 h-5 text-purple-400" />
      <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
        Select Your Soundtrack
      </h3>
    </div>
  );
};

export default MusicHeader;