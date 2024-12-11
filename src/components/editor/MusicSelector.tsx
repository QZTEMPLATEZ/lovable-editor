import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronRight } from 'lucide-react';
import { detectBeats, analyzeMusicTrack } from '@/utils/audioProcessing';
import { createAudioElement, cleanupAudioElement, validateAudioFile } from '@/utils/audioUtils';
import TrackList from './music/TrackList';
import UploadSection from './music/UploadSection';
import MusicHeader from './music/MusicHeader';
import BackButton from './navigation/BackButton';

interface Track {
  file: File;
  duration: string;
  bpm?: number;
  key?: string;
  intensity: number;
  audioElement?: HTMLAudioElement;
}

const MusicSelector = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoDuration] = useState(5); // In minutes, should be passed from previous step
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    if (tracks.length + files.length > 3) {
      toast({
        variant: "destructive",
        title: "Upload limit reached",
        description: "Maximum 3 tracks allowed per project",
      });
      return;
    }

    setIsAnalyzing(true);
    setUploadProgress(0);

    for (const file of Array.from(files)) {
      if (!validateAudioFile(file)) {
        toast({
          variant: "destructive",
          title: "Invalid file format",
          description: "Please upload MP3, WAV, or AAC files only",
        });
        continue;
      }

      try {
        // Simulate upload progress
        const interval = setInterval(() => {
          setUploadProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 10;
          });
        }, 200);

        const audioElement = createAudioElement(file);
        const beats = await detectBeats(file);
        const analysis = await analyzeMusicTrack(file);

        setTracks(prev => [...prev, {
          file,
          duration: formatDuration(audioElement.duration),
          bpm: analysis.bpm,
          key: 'C Major', // Placeholder - would come from actual analysis
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
    setUploadProgress(0);
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

  const getTotalMusicDuration = () => {
    return tracks.reduce((total, track) => {
      const [minutes, seconds] = track.duration.split(':').map(Number);
      return total + minutes + seconds / 60;
    }, 0);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getRequiredSongs = () => {
    const totalDuration = getTotalMusicDuration();
    return Math.max(0, Math.ceil(videoDuration - totalDuration));
  };

  return (
    <div className="min-h-screen bg-editor-bg">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(to_bottom,black_0%,black_50%,transparent_100%)] opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-br from-editor-glow-purple/5 via-transparent to-editor-glow-pink/5" />
      <div className="absolute inset-0 backdrop-blur-sm bg-[#0A0A0A]/80" />
      
      <div className="relative max-w-4xl mx-auto space-y-8 p-6">
        <BackButton />
        <MusicHeader />

        {/* Upload Section with updated styling */}
        <div className="relative glass-panel rounded-2xl p-6 border border-editor-border/30">
          <UploadSection onUpload={handleFileUpload} />
        </div>

        {/* Tracks List */}
        <TrackList
          tracks={tracks}
          playingTrack={playingTrack}
          isAnalyzing={isAnalyzing}
          onTogglePlay={handleTrackPlay}
          onRemoveTrack={handleTrackRemove}
          onIntensityChange={handleIntensityChange}
        />

        {/* Duration Info */}
        {tracks.length > 0 && (
          <div className="glass-panel rounded-2xl p-6 border border-editor-border/30 backdrop-blur-sm">
            <h3 className="font-medium text-editor-glow-purple mb-4">Music Coverage</h3>
            <div className="space-y-4">
              <Progress 
                value={(getTotalMusicDuration() / videoDuration) * 100} 
                className="h-2 bg-editor-glow-purple/20"
              />
              <div className="flex justify-between text-sm text-editor-glow-purple">
                <span>{formatDuration(getTotalMusicDuration() * 60)} / {videoDuration}:00</span>
                {getRequiredSongs() > 0 && (
                  <span className="text-editor-glow-pink">
                    Need {getRequiredSongs()} more song{getRequiredSongs() > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-end mt-8">
          <Button
            onClick={() => navigate('/style')}
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
