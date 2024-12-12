import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Film, Music, Palette, CheckCircle2, AlertCircle } from 'lucide-react';
import { useVideoType } from '@/contexts/VideoTypeContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ReviewStep = () => {
  const { selectedVideoType, selectedStyle, selectedMusic } = useVideoType();
  const { toast } = useToast();
  const [remainingTime, setRemainingTime] = useState(300); // 5 minutes in seconds
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
      
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + (100 / 300); // Increase by percentage per second
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartEditing = () => {
    toast({
      title: "Starting Edit Process",
      description: "Your video will be ready in approximately 5 minutes",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-editor-panel border border-editor-border rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Review Your Selections</h2>
        <p className="text-gray-400">Confirm your choices before we start the editing process</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Selections */}
        <div className="space-y-4">
          {/* Duration Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-editor-panel border border-editor-border rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold">Duration</h3>
              {selectedVideoType && <CheckCircle2 className="w-5 h-5 text-green-500" />}
            </div>
            <p className="text-gray-400">
              {selectedVideoType ? selectedVideoType.label : "No duration selected"}
            </p>
          </motion.div>

          {/* Style Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-editor-panel border border-editor-border rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold">Style</h3>
              {selectedStyle && <CheckCircle2 className="w-5 h-5 text-green-500" />}
            </div>
            <p className="text-gray-400">
              {selectedStyle ? selectedStyle.name : "No style selected"}
            </p>
          </motion.div>

          {/* Music Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-editor-panel border border-editor-border rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Music className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold">Music</h3>
              {selectedMusic?.length > 0 && <CheckCircle2 className="w-5 h-5 text-green-500" />}
            </div>
            <p className="text-gray-400">
              {selectedMusic?.length 
                ? `${selectedMusic.length} track${selectedMusic.length > 1 ? 's' : ''} selected` 
                : "No music selected"}
            </p>
          </motion.div>
        </div>

        {/* Right Column - Preview & Progress */}
        <div className="space-y-6">
          {/* Preview Window */}
          <div className="bg-editor-panel border border-editor-border rounded-xl p-6 aspect-video relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Film className="w-12 h-12 text-gray-600" />
            </div>
          </div>

          {/* Progress Section */}
          <div className="bg-editor-panel border border-editor-border rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">Estimated Time</h3>
                <p className="text-gray-400">{formatTime(remainingTime)} remaining</p>
              </div>
              <div className="text-2xl font-bold text-purple-400">
                {Math.round(progress)}%
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-purple-500"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Start Button */}
          <Button
            onClick={handleStartEditing}
            className="w-full py-6 text-lg font-semibold bg-purple-500 hover:bg-purple-600 transition-colors"
            disabled={!selectedVideoType || !selectedStyle || !selectedMusic?.length}
          >
            Start Editing Process
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;