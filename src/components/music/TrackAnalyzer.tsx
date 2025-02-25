
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { detectBeats } from '@/utils/audioProcessing';
import { validateAudioFile } from '@/utils/audioUtils';
import { APP_CONFIG } from '@/config/appConfig';

interface TrackAnalyzerProps {
  onAnalysisComplete: (file: File, beats: any[]) => void;
  selectedTracksCount: number;
}

export const TrackAnalyzer = ({ onAnalysisComplete, selectedTracksCount }: TrackAnalyzerProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleMusicUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files).filter(validateAudioFile);
    
    if (selectedTracksCount + newFiles.length > APP_CONFIG.music.maxTracks) {
      toast({
        variant: "destructive",
        title: "Too many tracks",
        description: `Maximum ${APP_CONFIG.music.maxTracks} tracks allowed`,
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

    setIsAnalyzing(true);
    
    try {
      for (const file of newFiles) {
        const beats = await detectBeats(file);
        onAnalysisComplete(file, beats);
      }

      toast({
        title: "Music Analysis Complete",
        description: `${newFiles.length} track${newFiles.length === 1 ? '' : 's'} analyzed.`,
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

  return { handleMusicUpload, isAnalyzing };
};
