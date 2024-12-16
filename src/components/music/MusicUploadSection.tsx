import React from 'react';
import { Music, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface MusicUploadSectionProps {
  onMusicUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxTracks: number;
}

const MusicUploadSection = ({ onMusicUpload, maxTracks }: MusicUploadSectionProps) => {
  return (
    <div className="relative">
      <input
        type="file"
        accept=".wav,.mp3,audio/wav,audio/mpeg"
        onChange={onMusicUpload}
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

      <Alert className="mt-4 bg-purple-500/10 border-purple-500/30">
        <AlertCircle className="h-4 w-4 text-purple-400" />
        <AlertDescription className="text-purple-200">
          Choose the perfect soundtrack for your video. Upload up to {maxTracks} music tracks (WAV or MP3).
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default MusicUploadSection;