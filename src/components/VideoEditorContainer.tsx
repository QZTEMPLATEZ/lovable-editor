import React, { useState } from 'react';
import VideoSizeSelector, { VideoSizeRange } from './VideoSizeSelector';
import EditingModeSelector, { EditingMode } from './EditingModeSelector';
import VideoEditor from './VideoEditor';
import { useToast } from '@/components/ui/use-toast';

const VideoEditorContainer = () => {
  const [selectedSize, setSelectedSize] = useState<VideoSizeRange>({
    min: 4,
    max: 6,
    label: "4-6 minutes",
    description: "Perfect for social media highlights",
    icon: null,
    recommendedTracks: 2
  });
  const [editingMode, setEditingMode] = useState<EditingMode>('ai');
  const { toast } = useToast();

  const handleSizeSelect = (size: VideoSizeRange) => {
    setSelectedSize(size);
    toast({
      title: "Duration Selected",
      description: `Target video duration: ${size.min}-${size.max} minutes`,
    });
  };

  const handleModeSelect = (mode: EditingMode) => {
    setEditingMode(mode);
    toast({
      title: "Editing Mode Selected",
      description: mode === 'ai' ? "AI-powered editing enabled" : "Template mode enabled",
    });
  };

  if (!selectedSize) {
    return <VideoSizeSelector selectedSize={selectedSize} onSizeSelect={handleSizeSelect} />;
  }

  if (!editingMode) {
    return <EditingModeSelector selectedMode={editingMode} onModeSelect={handleModeSelect} />;
  }

  return (
    <VideoEditor
      targetDuration={selectedSize}
      editingMode={editingMode}
      onDurationChange={handleSizeSelect}
    />
  );
};

export default VideoEditorContainer;