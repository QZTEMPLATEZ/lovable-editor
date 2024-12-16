import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import RawFilesSection from '../RawFilesSection';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const VideoOrganizer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [videoFiles, setVideoFiles] = useState<File[]>([
    new File([], "clip1.mp4"),
    new File([], "clip2.mp4"),
    new File([], "clip3.mp4"),
    // Simulated files from Premiere Pro
  ]);

  const handleContinue = () => {
    navigate('/review');
  };

  const handleOrganize = () => {
    // This would integrate with Premiere Pro's API to organize files
    console.log('Organizing files in Premiere Pro bins...');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="space-y-6">
        <RawFilesSection
          videoFiles={videoFiles}
          onOrganize={handleOrganize}
          onContinue={handleContinue}
          onFileSelect={setVideoFiles}
        />
        
        <div className="flex justify-end mt-6">
          <Button
            onClick={handleContinue}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
          >
            Continue to Review
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoOrganizer;