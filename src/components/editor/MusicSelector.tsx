import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, Clock, AlertCircle, ChevronRight, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { detectBeats, analyzeMusicTrack } from '@/utils/audioProcessing';
import { createAudioElement, cleanupAudioElement, validateAudioFile } from '@/utils/audioUtils';
import TrackAnalysis from './music/TrackAnalysis';
import TrackControls from './music/TrackControls';
import UploadSection from './music/UploadSection';
import WaveformAnimation from './music/WaveformAnimation';

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
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      {/* Header Section with new gradient background */}
      <div className="relative text-center space-y-4 p-8 rounded-2xl bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 backdrop-blur-sm border border-purple-500/20">
        <WaveformAnimation />
        <h1 className="relative z-10 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Select Your Music to Guide the Magic!
        </h1>
        <p className="relative z-10 text-gray-400">
          Choose up to 3 songs to shape the rhythm and emotion of your video
        </p>
      </div>

      {/* Upload Section with updated styling */}
      <div className="relative bg-purple-500/5 rounded-2xl p-6 border border-purple-500/20">
        <WaveformAnimation />
        <UploadSection onUpload={handleFileUpload} />
      </div>

      {/* Tracks List with new harmonic colors */}
      <AnimatePresence>
        {tracks.map((track, index) => (
          <motion.div
            key={track.file.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20 backdrop-blur-sm"
          >
            <div className="flex items-center gap-4 mb-4">
              <TrackControls 
                isPlaying={playingTrack === track.file.name}
                onPlay={() => handleTrackPlay(track.file.name)}
                onRemove={() => handleTrackRemove(index)}
              />

              <div className="flex-1">
                <h3 className="font-medium text-purple-200">{track.file.name}</h3>
                <div className="flex items-center gap-4 text-sm text-purple-300/70">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {track.duration}
                  </span>
                  <TrackAnalysis bpm={track.bpm || 0} key={track.key || ''} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-purple-300">
                <span>Intensity</span>
                <span>{Math.round(track.intensity * 100)}%</span>
              </div>
              <Slider
                value={[track.intensity]}
                onValueChange={(value) => handleIntensityChange(index, value)}
                max={1}
                step={0.01}
                className="w-full"
              />
            </div>

            {playingTrack === track.file.name && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4"
              >
                <div className="h-1 bg-purple-500/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    animate={{
                      width: ["0%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Duration Info with updated styling */}
      {tracks.length > 0 && (
        <div className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl p-6 border border-purple-500/20 backdrop-blur-sm">
          <h3 className="font-medium text-purple-200 mb-4">Music Coverage</h3>
          <div className="space-y-4">
            <Progress 
              value={(getTotalMusicDuration() / videoDuration) * 100} 
              className="h-2 bg-purple-500/20"
            />
            <div className="flex justify-between text-sm text-purple-300">
              <span>{formatDuration(getTotalMusicDuration() * 60)} / {videoDuration}:00</span>
              {getRequiredSongs() > 0 && (
                <span className="text-pink-400">
                  Need {getRequiredSongs()} more song{getRequiredSongs() > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation with gradient button */}
      <div className="flex justify-end mt-8">
        <Button
          onClick={() => navigate('/style')}
          disabled={tracks.length === 0}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 disabled:opacity-50"
        >
          <span>Continue</span>
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MusicSelector;