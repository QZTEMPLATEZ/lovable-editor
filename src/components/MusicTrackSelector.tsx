import React, { useState } from 'react';
import { Music, Waveform } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { detectBeats } from '@/utils/audioProcessing';
import { useToast } from '@/components/ui/use-toast';

interface MusicTrackSelectorProps {
  onMusicSelect: (file: File, beats: any[]) => void;
}

const MusicTrackSelector = ({ onMusicSelect }: MusicTrackSelectorProps) => {
  const [selectedMusic, setSelectedMusic] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleMusicUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setSelectedMusic(file);
      setIsAnalyzing(true);
      
      try {
        const beats = await detectBeats(file);
        onMusicSelect(file, beats);
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
            Select Music Track
          </h3>
        </div>

        <div className="relative">
          <input
            type="file"
            accept="audio/*"
            onChange={handleMusicUpload}
            className="hidden"
            id="music-upload"
          />
          <label
            htmlFor="music-upload"
            className="block w-full"
          >
            <div className="border-2 border-dashed border-purple-500/30 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500/50 transition-all duration-300">
              {selectedMusic ? (
                <div className="space-y-2">
                  <p className="text-purple-300 font-medium">{selectedMusic.name}</p>
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center gap-2">
                      <Waveform className="w-4 h-4 text-purple-400 animate-pulse" />
                      <span className="text-sm text-gray-400">Analyzing beats...</span>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-center"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('music-upload')?.click()}
                      >
                        Change Track
                      </Button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <Music className="w-12 h-12 mx-auto text-purple-400 mb-2" />
                  <p className="text-base text-gray-400">
                    Upload a music track for AI-powered beat synchronization
                  </p>
                  <p className="text-sm text-gray-500">
                    Supported formats: MP3, WAV
                  </p>
                </div>
              )}
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default MusicTrackSelector;