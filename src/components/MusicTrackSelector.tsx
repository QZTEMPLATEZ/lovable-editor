import React, { useState } from 'react';
import { Music, AudioWaveform, AlertCircle, X, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { detectBeats } from '@/utils/audioProcessing';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

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
    if (files) {
      const newFiles = Array.from(files).filter(file => 
        file.type === 'audio/wav' || file.type === 'audio/mpeg'
      );
      
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
          
          // Create audio element for the new track
          const audio = new Audio(URL.createObjectURL(file));
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
    }
  };

  const togglePlayPause = (fileName: string) => {
    const audio = audioElements[fileName];
    if (!audio) return;

    if (playingTrack === fileName) {
      audio.pause();
      setPlayingTrack(null);
    } else {
      // Stop any currently playing track
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
      audioElements[removedFile.name].pause();
      URL.revokeObjectURL(audioElements[removedFile.name].src);
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

          <AnimatePresence>
            {selectedMusic.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 grid grid-cols-1 gap-4"
              >
                {selectedMusic.map((file, index) => (
                  <motion.div
                    key={file.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative p-4 bg-purple-500/10 rounded-lg border border-purple-500/20 group hover:border-purple-500/40 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-purple-500/20 hover:bg-purple-500/30"
                        onClick={() => togglePlayPause(file.name)}
                      >
                        {playingTrack === file.name ? (
                          <Pause className="h-4 w-4 text-purple-300" />
                        ) : (
                          <Play className="h-4 w-4 text-purple-300" />
                        )}
                      </Button>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <AudioWaveform className="w-4 h-4 text-purple-400 flex-shrink-0" />
                          <span className="text-purple-300 truncate font-medium">
                            {file.name}
                          </span>
                        </div>
                        {playingTrack === file.name && (
                          <div className="mt-2">
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
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => removeTrack(index)}
                        className="text-purple-300/70 hover:text-red-400 transition-colors p-1"
                        aria-label="Remove track"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {isAnalyzing && (
                      <div className="mt-2">
                        <Progress value={Math.random() * 100} className="h-1" />
                        <p className="text-xs text-purple-300/70 mt-1">Analyzing beats...</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MusicTrackSelector;