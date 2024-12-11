import React, { useState } from 'react';
import { Music } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from "@/components/ui/button";
import TrackList from './music/TrackList';
import MusicUploadSection from './music/MusicUploadSection';
import { createAudioElement, cleanupAudioElement, validateAudioFile } from '@/utils/audioUtils';
import { detectBeats } from '@/utils/audioProcessing';
import { useNavigate } from 'react-router-dom';
import { APP_CONFIG, ERROR_MESSAGES } from '@/config/appConfig';

interface MusicTrackSelectorProps {
  onMusicSelect: (file: File, beats: any[]) => void;
}

const MusicTrackSelector = ({ onMusicSelect }: MusicTrackSelectorProps) => {
  const [selectedMusic, setSelectedMusic] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<{ [key: string]: HTMLAudioElement }>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleMusicUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files).filter(validateAudioFile);
    
    if (selectedMusic.length + newFiles.length > APP_CONFIG.music.maxTracks) {
      toast({
        variant: "destructive",
        title: "Too many tracks",
        description: `Maximum ${APP_CONFIG.music.maxTracks} tracks allowed`,
      });
      return;
    }

    if (newFiles.length === 0) {
      toast({
        variant: "destructive",
        title: "Invalid file format",
        description: "Please upload WAV or MP3 files only",
      });
      return;
    }

    setSelectedMusic(prev => [...prev, ...newFiles]);
    setIsAnalyzing(true);
    
    try {
      for (const file of newFiles) {
        const beats = await detectBeats(file);
        onMusicSelect(file, beats);
        
        const audio = createAudioElement(file);
        setAudioElements(prev => ({
          ...prev,
          [file.name]: audio
        }));
      }
      toast({
        title: "Music Analysis Complete",
        description: "Beat patterns detected and ready for AI processing",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Unable to analyze music beats. Please try another track.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const togglePlayPause = (fileName: string) => {
    const audio = audioElements[fileName];
    if (!audio) return;

    if (playingTrack === fileName) {
      audio.pause();
      setPlayingTrack(null);
    } else {
      if (playingTrack && audioElements[playingTrack]) {
        audioElements[playingTrack].pause();
      }
      audio.play();
      setPlayingTrack(fileName);
    }
  };

  const removeTrack = (index: number) => {
    const removedFile = selectedMusic[index];
    if (audioElements[removedFile.name]) {
      cleanupAudioElement(audioElements[removedFile.name]);
      const newAudioElements = { ...audioElements };
      delete newAudioElements[removedFile.name];
      setAudioElements(newAudioElements);
    }
    setSelectedMusic(prev => prev.filter((_, i) => i !== index));
    if (playingTrack === removedFile.name) {
      setPlayingTrack(null);
    }
    toast({
      title: "Track Removed",
      description: "Music track has been removed from the selection",
    });
  };

  const handleContinue = () => {
    if (selectedMusic.length === 0) {
      toast({
        variant: "destructive",
        title: "No music selected",
        description: "Please upload at least one music track before continuing.",
      });
      return;
    }
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
              {selectedMusic.length} / {APP_CONFIG.music.maxTracks} tracks
            </span>
          </div>

          <MusicUploadSection 
            onMusicUpload={handleMusicUpload}
            maxTracks={APP_CONFIG.music.maxTracks}
          />

          <TrackList
            selectedMusic={selectedMusic}
            playingTrack={playingTrack}
            isAnalyzing={isAnalyzing}
            onTogglePlay={togglePlayPause}
            onRemoveTrack={removeTrack}
          />

          {selectedMusic.length > 0 && (
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
