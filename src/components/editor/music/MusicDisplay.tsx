import React from 'react';
import { useVideoType } from '@/contexts/VideoTypeContext';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Music } from 'lucide-react';
import TrackList, { Track } from './TrackList';

const MusicDisplay = () => {
  const { selectedMusic } = useVideoType();

  if (!selectedMusic || selectedMusic.length === 0) {
    return (
      <div className="text-center p-8">
        <Music className="w-12 h-12 mx-auto text-purple-400 mb-4" />
        <h3 className="text-xl font-semibold text-purple-200 mb-2">No tracks selected</h3>
        <p className="text-purple-300/70">Upload your music files to get started</p>
      </div>
    );
  }

  const tracks: Track[] = selectedMusic.map(file => ({
    file,
    duration: '',
    intensity: 1
  }));

  return (
    <div className="space-y-4">
      <Alert className="bg-purple-500/10 border-purple-500/30">
        <AlertDescription className="text-purple-200">
          {selectedMusic.length} track{selectedMusic.length === 1 ? '' : 's'} selected
        </AlertDescription>
      </Alert>
      <TrackList
        tracks={tracks}
        playingTrack={null}
        isAnalyzing={false}
        onTogglePlay={() => {}}
        onRemoveTrack={() => {}}
        onIntensityChange={() => {}}
      />
    </div>
  );
};

export default MusicDisplay;