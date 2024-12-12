import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VideoSizeRange } from '@/types';
import DurationOption from './editor/duration/DurationOption';
import { VIDEO_SIZES } from '@/constants/videoStyles';
import { useVideoType } from '@/contexts/VideoTypeContext';
import RawFilesBanner from './editor/duration/RawFilesBanner';
import { useNavigate } from 'react-router-dom';

interface VideoSizeSelectorProps {
  selectedSize: VideoSizeRange | null;
  onSizeSelect: (size: VideoSizeRange) => void;
}

const VideoSizeSelector = ({ selectedSize, onSizeSelect }: VideoSizeSelectorProps) => {
  const navigate = useNavigate();
  const { setVideoType } = useVideoType();
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleSizeSelect = (size: VideoSizeRange) => {
    onSizeSelect(size);
  };

  const handleContinue = () => {
    if (selectedSize) {
      setVideoType('highlight');
      navigate('/style');
    }
  };

  const handleRawUpload = () => {
    setShowUploadModal(true);
    setVideoType('raw');
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-editor-glow-purple to-editor-glow-pink bg-clip-text text-transparent">
          Choose Your Video Duration
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Select the perfect duration for your wedding video. Each option is tailored to capture your special moments in just the right amount of time.
        </p>
      </motion.div>

      <div className="grid gap-6">
        {VIDEO_SIZES.map((size) => (
          <DurationOption
            key={`${size.min}-${size.max}`}
            duration={size}
            isSelected={selectedSize?.min === size.min && selectedSize?.max === size.max}
            onSelect={handleSizeSelect}
          />
        ))}
      </div>

      <RawFilesBanner onUploadClick={handleRawUpload} />

      {selectedSize && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
        >
          <button
            onClick={handleContinue}
            className="bg-editor-accent hover:bg-editor-accent/80 text-white px-8 py-3 rounded-xl shadow-lg transition-all duration-300"
          >
            Continue
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default VideoSizeSelector;