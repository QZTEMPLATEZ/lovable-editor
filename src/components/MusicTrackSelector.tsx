import React, { useState } from 'react';
import { Music, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from "@/components/ui/alert";
import TrackList from './music/TrackList';
import { createAudioElement, cleanupAudioElement, validateAudioFile } from '@/utils/audioUtils';
import { detectBeats } from '@/utils/audioProcessing';

interface MusicTrackSelectorProps {
  onMusicSelect: (file: File, beats: any[]) => void;
}

const MAX_TRACKS = 10;

const MusicTrackSelector = ({ onMusicSelect }: MusicTrackSelectorProps) => {
  const [selectedMusic, setSelectedMusic] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<{ [key: string]: HTMLAudioElement }>({});
  const { toast } = useToast();

  const handleMusicUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files).filter(validateAudioFile);
    
    if (selectedMusic.length + newFiles.length > MAX_TRACKS) {
      toast({
        variant: "destructive",
        title: "Too many tracks",
        description: `Maximum ${MAX_TRACKS} tracks allowed`,
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
              {selectedMusic.length} / {MAX_TRACKS} tracks
            </span>
          </div>

          <Alert className="mb-4 bg-purple-500/10 border-purple-500/30">
            <AlertCircle className="h-4 w-4 text-purple-400" />
            <AlertDescription className="text-purple-200">
              Choose the perfect soundtrack for your video. Upload up to {MAX_TRACKS} music tracks (WAV or MP3).
            </AlertDescription>
          </Alert>

          <div className="relative">
            <input
              type="file"
              accept=".wav,.mp3,audio/wav,audio/mpeg"
              onChange={handleMusicUpload}
              className="hidden"
              id="music-upload"
              multiple
            />
            <label
              htmlFor="music-upload"
              className="block w-full"
            >
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="border-2 border-dashed border-purple-500/30 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500/50 transition-all duration-300 bg-purple-500/5"
              >
                <div className="space-y-2">
                  <Music className="w-12 h-12 mx-auto text-purple-400 mb-2" />
                  <p className="text-base text-purple-200">
                    Drag and drop your music files here or click to browse
                  </p>
                  <p className="text-sm text-purple-300/70">
                    Supported formats: WAV, MP3
                  </p>
                </div>
              </motion.div>
            </label>
          </div>

          <TrackList
            selectedMusic={selectedMusic}
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

export default MusicTrackSelector;