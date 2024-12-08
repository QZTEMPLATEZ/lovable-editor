import React, { useState } from 'react';
import { Music, AudioWaveform, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { detectBeats } from '@/utils/audioProcessing';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface MusicTrackSelectorProps {
  onMusicSelect: (file: File, beats: any[]) => void;
  recommendedTracks: number;
}

const MusicTrackSelector = ({ onMusicSelect, recommendedTracks }: MusicTrackSelectorProps) => {
  const [selectedMusic, setSelectedMusic] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleMusicUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).filter(file => file.type.startsWith('audio/'));
      
      if (selectedMusic.length + newFiles.length > recommendedTracks) {
        toast({
          variant: "destructive",
          title: "Too many tracks",
          description: `Maximum ${recommendedTracks} tracks allowed for this video duration`,
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
          description: "Beat patterns detected and ready for synchronization",
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

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 p-8 rounded-2xl backdrop-blur-lg border border-purple-500/30 shadow-2xl relative overflow-hidden mb-6">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none" />
      
      <div className="relative space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <Music className="w-5 h-5 text-purple-400" />
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            Select Music Tracks
          </h3>
        </div>

        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Recommended number of tracks for this video duration: {recommendedTracks}
          </AlertDescription>
        </Alert>

        <div className="relative">
          <input
            type="file"
            accept="audio/*"
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
                  Upload music tracks for AI-powered beat synchronization
                </p>
                <p className="text-sm text-gray-500">
                  {selectedMusic.length} / {recommendedTracks} tracks uploaded
                </p>
              </div>
            </div>
          </label>
        </div>

        {selectedMusic.length > 0 && (
          <div className="mt-4 space-y-2">
            {selectedMusic.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <AudioWaveform className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-300">{file.name}</span>
                </div>
                {isAnalyzing && (
                  <span className="text-sm text-gray-400">Analyzing...</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicTrackSelector;