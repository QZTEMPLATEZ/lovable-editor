import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Music, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface MusicAnalysis {
  id: string;
  title: string;
  duration: string;
  bpm: number;
}

const MusicSelector = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);

  const handleMusicSelect = (analysis: MusicAnalysis) => {
    toast({
      title: "Music Selected",
      description: `Selected ${analysis.title}`,
    });
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
        id: Math.random().toString(),
        title: file.name,
        duration: '0:00', // You would calculate this from the actual file
        bpm: 120, // You would analyze this from the actual file
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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Select Music</h2>
      
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

      <Alert className="bg-purple-500/10 border-purple-500/30">
        <AlertDescription className="text-purple-200">
          Upload your music files to create a synchronized video edit. We'll analyze the beats and tempo automatically.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {/* Example tracks section - kept for reference */}
        <div
          className="bg-editor-panel p-4 rounded-lg border border-purple-500/20"
        >
          <h3 className="text-lg font-semibold mb-2">Example Track</h3>
          <p className="text-sm text-gray-400">Duration: 3:45</p>
          <p className="text-sm text-gray-400">BPM: 128</p>
          <Button
            onClick={() => handleMusicSelect({
              id: '1',
              title: 'Example Track',
              duration: '3:45',
              bpm: 128
            })}
            className="mt-4"
          >
            <Music className="w-4 h-4 mr-2" />
            Select Track
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MusicSelector;