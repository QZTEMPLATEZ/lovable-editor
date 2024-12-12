import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Music } from 'lucide-react';
import { motion } from 'framer-motion';
import MusicUploadSection from './music/MusicUploadSection';
import MusicDisplay from './music/MusicDisplay';
import { useVideoType } from '../../contexts/VideoTypeContext';
import { APP_CONFIG } from '@/config/appConfig';

const MusicSelector = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { selectedMusic, setSelectedMusic } = useVideoType();

  const handleMusicUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    
    if (selectedMusic.length + newFiles.length > APP_CONFIG.music.maxTracks) {
      toast({
        variant: "destructive",
        title: "Too many tracks",
        description: `Maximum ${APP_CONFIG.music.maxTracks} tracks allowed`,
      });
      return;
    }

    // Update context with new files
    setSelectedMusic([...selectedMusic, ...newFiles]);
    
    toast({
      title: "Music Added",
      description: `${newFiles.length} track${newFiles.length === 1 ? '' : 's'} added successfully`,
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

          <MusicDisplay />

          {selectedMusic.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end mt-6"
            >
              <Button
                onClick={handleContinue}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
              >
                Continue to Organize
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicSelector;