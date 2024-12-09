import React, { useState } from 'react';
import { Music, AudioWaveform, AlertCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';
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

  const removeTrack = (index: number) => {
    setSelectedMusic(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "Track Removed",
      description: "Music track has been removed from the selection",
    });
  };

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 p-8 rounded-2xl backdrop-blur-lg border border-purple-500/30 shadow-2xl relative overflow-hidden mb-6">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none" />
      
      <div className="relative space-y-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Music className="w-5 h-5 text-purple-400" />
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
              Upload Music Tracks
            </h3>
          </div>
          <span className="text-sm text-purple-300">
            {selectedMusic.length} / {MAX_TRACKS} tracks
          </span>
        </div>

        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Upload up to {MAX_TRACKS} music tracks (WAV or MP3). Our AI will analyze and select the best moments for your video.
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
            <div className="border-2 border-dashed border-purple-500/30 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500/50 transition-all duration-300">
              <div className="space-y-2">
                <Music className="w-12 h-12 mx-auto text-purple-400 mb-2" />
                <p className="text-base text-gray-400">
                  Drag and drop your music files here or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  Supported formats: WAV, MP3
                </p>
              </div>
            </div>
          </label>
        </div>

        {selectedMusic.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedMusic.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative p-4 bg-purple-500/10 rounded-lg border border-purple-500/20 group hover:border-purple-500/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <AudioWaveform className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span className="text-purple-300 truncate">{file.name}</span>
                  </div>
                  <button
                    onClick={() => removeTrack(index)}
                    className="text-gray-400 hover:text-red-400 transition-colors p-1"
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
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicTrackSelector;
