
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import TrackList from '../music/TrackList';
import MusicUploadSection from '../music/MusicUploadSection';
import { createAudioElement, cleanupAudioElement, validateAudioFile } from '@/utils/audioUtils';
import { detectBeats } from '@/utils/audioProcessing';
import { APP_CONFIG } from '@/config/appConfig';
import { useVideoType } from '@/contexts/VideoTypeContext';
import MusicHeader from './music/MusicHeader';
import ContinueButton from './music/ContinueButton';

interface MusicTrackSelectorProps {
  onMusicSelect: (file: File, beats: any[]) => void;
}

interface SelectedTrack {
  file: File;
  beats: any[];
}

const MusicSelector = ({ onMusicSelect }: MusicTrackSelectorProps) => {
  const [selectedTracks, setSelectedTracks] = useState<SelectedTrack[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<{ [key: string]: HTMLAudioElement }>({});
  const { toast } = useToast();
  const { setSelectedMusic } = useVideoType();

  const handleMusicUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files).filter(validateAudioFile);
    
    if (selectedTracks.length + newFiles.length > APP_CONFIG.music.maxTracks) {
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

    setIsAnalyzing(true);
    
    try {
      const analyzedTracks: SelectedTrack[] = [];
      
      for (const file of newFiles) {
        const beats = await detectBeats(file);
        onMusicSelect(file, beats);
        
        const audio = createAudioElement(file);
        setAudioElements(prev => ({
          ...prev,
          [file.name]: audio
        }));

        analyzedTracks.push({ file, beats });
      }

      const updatedTracks = [...selectedTracks, ...analyzedTracks];
      setSelectedTracks(updatedTracks);
      setSelectedMusic(updatedTracks.map(track => track.file));

      toast({
        title: "Music Analysis Complete",
        description: `${newFiles.length} track${newFiles.length === 1 ? '' : 's'} analyzed. Total tracks: ${updatedTracks.length}`,
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
    const removedFile = selectedTracks[index];
    if (audioElements[removedFile.file.name]) {
      cleanupAudioElement(audioElements[removedFile.file.name]);
      const newAudioElements = { ...audioElements };
      delete newAudioElements[removedFile.file.name];
      setAudioElements(newAudioElements);
    }
    
    const updatedTracks = selectedTracks.filter((_, i) => i !== index);
    setSelectedTracks(updatedTracks);
    setSelectedMusic(updatedTracks.map(track => track.file));
    
    if (playingTrack === removedFile.file.name) {
      setPlayingTrack(null);
    }
    toast({
      title: "Track Removed",
      description: "Music track has been removed from the selection",
    });
  };

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 p-8 rounded-2xl backdrop-blur-lg border border-purple-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none" />
        
        <div className="relative space-y-4">
          <div className="flex items-center justify-between">
            <MusicHeader 
              trackCount={selectedTracks.length} 
              maxTracks={APP_CONFIG.music.maxTracks} 
            />
            <ContinueButton hasSelectedTracks={selectedTracks.length > 0} />
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
            playingTrack={playingTrack}
            isAnalyzing={isAnalyzing}
            onTogglePlay={togglePlayPause}
            onRemoveTrack={removeTrack}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicSelector;
