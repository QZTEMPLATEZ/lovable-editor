import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Music, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useVideoType } from '../../contexts/VideoTypeContext';
import { MusicAnalysis } from '@/types';

const MusicSelector = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const { selectedVideoType } = useVideoType();
  const [selectedTracks, setSelectedTracks] = useState<MusicAnalysis[]>([]);

  const getRecommendedTracks = () => {
    if (!selectedVideoType) return 1;
    return selectedVideoType.recommendedTracks;
  };

  const handleMusicSelect = (analysis: MusicAnalysis) => {
    setSelectedTracks(prev => [...prev, analysis]);
    toast({
      title: "Music Selected",
      description: `Track added to selection`,
    });
  };

  const handleContinue = () => {
    if (selectedTracks.length === 0) {
      toast({
        variant: "destructive",
        title: "No Music Selected",
        description: "Please select at least one music track before continuing.",
      });
      return;
    }
    navigate('/organize');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => 
      file.type === 'audio/mpeg' || file.type === 'audio/wav'
    );

    if (validFiles.length === 0) {
      toast({
        variant: "destructive",
        title: "Invalid Files",
        description: "Please upload MP3 or WAV files only",
      });
      return;
    }

    validFiles.forEach(file => {
      const analysis: MusicAnalysis = {
        bpm: 120,
        key: 'C',
        tempo: 120,
        duration: 180,
        energy: 0.8,
        danceability: 0.7,
        valence: 0.6
      };
      handleMusicSelect(analysis);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const removeTrack = (index: number) => {
    setSelectedTracks(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "Track Removed",
      description: "Music track has been removed from selection",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Select Music</h2>
      
      <Alert className="bg-purple-500/10 border-purple-500/30 mb-4">
        <AlertDescription className="text-purple-200">
          For your {selectedVideoType?.name || 'video'}, we recommend {getRecommendedTracks()} music track{getRecommendedTracks() > 1 ? 's' : ''}.
          Total duration should be around {selectedVideoType?.label || 'the selected duration'}.
        </AlertDescription>
      </Alert>

      <div
        className={`relative border-2 border-dashed rounded-lg p-8 transition-all duration-200 ${
          dragActive 
            ? 'border-purple-500 bg-purple-500/10' 
            : 'border-purple-500/30 hover:border-purple-500/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".mp3,.wav,audio/mpeg,audio/wav"
          onChange={handleFileInput}
          className="hidden"
          id="music-upload"
          multiple
        />
        <label
          htmlFor="music-upload"
          className="flex flex-col items-center cursor-pointer"
        >
          <Upload className="w-12 h-12 text-purple-400 mb-4" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-lg text-purple-200 mb-2">
              Drag and drop your music files here
            </p>
            <p className="text-sm text-purple-300/70">
              or click to browse
            </p>
            <p className="text-xs text-purple-300/50 mt-2">
              Supported formats: MP3, WAV
            </p>
          </motion.div>
        </label>
      </div>

      {selectedTracks.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-200">Selected Tracks</h3>
          {selectedTracks.map((track, index) => (
            <div key={index} className="flex items-center justify-between bg-purple-500/10 p-4 rounded-lg">
              <div>
                <p className="text-purple-200">Track {index + 1}</p>
                <p className="text-sm text-purple-300/70">
                  BPM: {track.bpm} | Key: {track.key} | Duration: {track.duration}s
                </p>
              </div>
              <Button
                variant="ghost"
                onClick={() => removeTrack(index)}
                className="text-red-400 hover:text-red-300"
              >
                Remove
              </Button>
            </div>
          ))}
          
          <div className="flex justify-end mt-6">
            <Button
              onClick={handleContinue}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
            >
              Continue to Organize
            </Button>
          </div>
        </div>
      )}

      <Alert className="bg-purple-500/10 border-purple-500/30">
        <AlertDescription className="text-purple-200">
          Upload your music files to create a synchronized video edit. We'll analyze the beats and tempo automatically.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default MusicSelector;