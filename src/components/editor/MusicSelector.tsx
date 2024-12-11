import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { detectBeats, analyzeMusicTrack } from '@/utils/audioProcessing';
import { createAudioElement, cleanupAudioElement, validateAudioFile } from '@/utils/audioUtils';
import TrackList from './music/TrackList';
import UploadSection from './music/UploadSection';
import MusicHeader from './music/MusicHeader';
import { Track } from './music/TrackList';

const MAX_TRACKS = 3;

const MusicSelector = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    if (tracks.length + files.length > MAX_TRACKS) {
      toast({
        variant: "destructive",
        title: "Upload limit reached",
        description: `Maximum ${MAX_TRACKS} tracks allowed per project`,
      });
      return;
    }

    setIsAnalyzing(true);

    for (const file of Array.from(files)) {
      if (!validateAudioFile(file)) {
        toast({
          variant: "destructive",
          title: "Invalid file format",
          description: "Please upload MP3 or WAV files only",
        });
        continue;
      }

      try {
        const audioElement = createAudioElement(file);
        const beats = await detectBeats(file);
        const analysis = await analyzeMusicTrack(file);

        setTracks(prev => [...prev, {
          file,
          duration: formatDuration(audioElement.duration),
          bpm: analysis.bpm,
          key: analysis.key || 'Unknown',
          intensity: 0.5,
          audioElement
        }]);

        toast({
          title: "Track uploaded successfully",
          description: `${file.name} has been analyzed and added to your project.`,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Analysis failed",
          description: "Unable to analyze the music track. Please try another file.",
        });
      }
    }

    setIsAnalyzing(false);
  };

  const handleTrackPlay = (fileName: string) => {
    const track = tracks.find(t => t.file.name === fileName);
    if (!track?.audioElement) return;

    if (playingTrack === fileName) {
      track.audioElement.pause();
      setPlayingTrack(null);
    } else {
      if (playingTrack) {
        const currentTrack = tracks.find(t => t.file.name === playingTrack);
        currentTrack?.audioElement?.pause();
      }
      track.audioElement.play();
      setPlayingTrack(fileName);
    }
  };

  const handleTrackRemove = (index: number) => {
    const track = tracks[index];
    if (track.audioElement) {
      cleanupAudioElement(track.audioElement);
    }
    setTracks(prev => prev.filter((_, i) => i !== index));
    if (playingTrack === track.file.name) {
      setPlayingTrack(null);
    }
  };

  const handleIntensityChange = (index: number, value: number[]) => {
    setTracks(prev => prev.map((track, i) => 
      i === index ? { ...track, intensity: value[0] } : track
    ));
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleContinue = () => {
    if (tracks.length === 0) {
      toast({
        variant: "destructive",
        title: "No tracks selected",
        description: "Please upload at least one music track before continuing.",
      });
      return;
    }
    navigate('/organize');
  };

  return (
    <div className="min-h-screen bg-editor-bg">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
      
      <div className="relative max-w-4xl mx-auto space-y-8 p-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/style')}
          className="absolute left-6 top-6 p-2 hover:bg-purple-500/10"
        >
          <ChevronLeft className="h-5 w-5 text-purple-400" />
          <span className="ml-2 text-purple-400">Back</span>
        </Button>

        <MusicHeader />

        <div className="relative glass-panel rounded-2xl p-6 border border-editor-border/30">
          <UploadSection onUpload={handleFileUpload} maxTracks={MAX_TRACKS} />
        </div>

        <TrackList
          tracks={tracks}
          playingTrack={playingTrack}
          isAnalyzing={isAnalyzing}
          onTogglePlay={handleTrackPlay}
          onRemoveTrack={handleTrackRemove}
          onIntensityChange={handleIntensityChange}
        />

        <div className="flex justify-end mt-8">
          <Button
            onClick={handleContinue}
            disabled={tracks.length === 0}
            className="bg-gradient-to-r from-editor-glow-purple to-editor-glow-pink hover:opacity-90 disabled:opacity-50"
          >
            <span>Continue</span>
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MusicSelector;
