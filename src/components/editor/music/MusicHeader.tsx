import React from 'react';
import { Music } from 'lucide-react';
import WaveformAnimation from './WaveformAnimation';

const MusicHeader = () => {
  return (
    <div className="relative glass-panel p-8 rounded-2xl border border-editor-border/30 shadow-2xl">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(to_bottom,black_0%,black_50%,transparent_100%)] opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-br from-editor-glow-purple/5 via-transparent to-editor-glow-pink/5" />
      <div className="absolute inset-0 backdrop-blur-sm bg-[#0A0A0A]/80" />
      
      <WaveformAnimation />
      
      <div className="relative z-10 text-center space-y-4">
        <h1 className="text-4xl font-cinzel font-bold bg-clip-text text-transparent bg-gradient-to-r from-editor-glow-purple to-editor-glow-pink">
          Select Your Music to Guide the Magic!
        </h1>
        <p className="font-italiana text-lg text-gray-300">
          Choose up to 3 songs to shape the rhythm and emotion of your video
        </p>
      </div>
    </div>
  );
};

export default MusicHeader;