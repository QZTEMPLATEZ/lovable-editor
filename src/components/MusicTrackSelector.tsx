import React, { useState } from 'react';
import { Music } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import TrackList from './music/TrackList';
import MusicUploadSection from './music/MusicUploadSection';
import { useNavigate } from 'react-router-dom';
import { APP_CONFIG } from '@/config/appConfig';
import { useVideoType } from '@/contexts/VideoTypeContext';
import { TrackAnalyzer } from './music/TrackAnalyzer';
import { useAudioController } from './music/AudioController';

interface MusicTrackSelectorProps {
  onMusicSelect: (file: File, beats: any[]) => void;
}

interface SelectedTrack {
  file: File;
  beats: any[];
}

const MusicTrackSelector = ({ onMusicSelect }: MusicTrackSelectorProps) => {
  const [selectedTracks, setSelectedTracks] = useState<SelectedTrack[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setSelectedMusic } = useVideoType();

  const { handleMusicUpload, isAnalyzing } = TrackAnalyzer({
    onAnalysisComplete: (file, beats) => {
      onMusicSelect(file, beats);
      setSelectedTracks(prev => [...prev, { file, beats }]);
      audioController.addAudioElement(file);
    },
    selectedTracksCount: selectedTracks.length
  });

  const audioController = useAudioController({
    onTrackRemoved: (index) => {
      const updatedTracks = selectedTracks.filter((_, i) => i !== index);
      setSelectedTracks(updatedTracks);
      setSelectedMusic(updatedTracks.map(track => track.file));
      toast({
        title: "Track Removed",
        description: "Music track has been removed from the selection",
      });
    }
  });

  const handleContinue = () => {
    if (selectedTracks.length === 0) {
      toast({
        variant: "destructive",
        title: "No music selected",
        description: "Please upload at least one music track before continuing.",
      });
      return;
    }
    
    setSelectedMusic(selectedTracks.map(track => track.file));
    navigate('/organize');
  };

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 p-8 rounded-2xl backdrop-blur-lg border border-purple-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none" />
        
        <div className="relative space-y-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Music className="w-5 h-5 text-purple-400" />
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                Select Your Soundtrack
              </h3>
            </div>
            <span className="text-sm text-purple-300">
              {selectedTracks.length} / {APP_CONFIG.music.maxTracks} tracks
            </span>
          </div>

          <MusicUploadSection 
            onMusicUpload={handleMusicUpload}
            maxTracks={APP_CONFIG.music.maxTracks}
          />

          <TrackList
            tracks={selectedTracks.map(track => ({
              file: track.file,
              duration: '',
              intensity: 1
            }))}
            playingTrack={audioController.playingTrack}
            isAnalyzing={isAnalyzing}
            onTogglePlay={audioController.togglePlayPause}
            onRemoveTrack={audioController.removeTrack}
          />

          {selectedTracks.length > 0 && (
            <div className="flex justify-end mt-6">
              <Button
                onClick={handleContinue}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
              >
                Continue to Organize
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicTrackSelector;