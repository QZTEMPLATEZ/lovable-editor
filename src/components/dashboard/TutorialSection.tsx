import React from 'react';
import { Play, Clock } from 'lucide-react';

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
}

interface TutorialSectionProps {
  tutorials: Tutorial[];
  onTutorialClick: (videoUrl: string) => void;
}

const TutorialSection = ({ tutorials, onTutorialClick }: TutorialSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white mb-6">Get Started with Tutorials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((video) => (
          <div
            key={video.id}
            onClick={() => onTutorialClick(video.videoUrl)}
            className="bg-editor-glass-dark border border-editor-border rounded-xl p-4 cursor-pointer hover:border-editor-glow-purple/50 transition-all duration-300"
          >
            <div className="relative mb-4">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                <Play className="w-12 h-12 text-white" />
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded-md flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{video.duration}</span>
              </div>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">{video.title}</h3>
            <p className="text-sm text-gray-400">{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorialSection;