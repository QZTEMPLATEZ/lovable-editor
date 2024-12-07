import React, { useState } from 'react';
import VideoSizeSelector, { VideoSizeRange } from './VideoSizeSelector';
import EditingModeSelector, { EditingMode } from './EditingModeSelector';
import VideoEditor from './VideoEditor';
import { useToast } from '@/components/ui/use-toast';

const VideoEditorContainer = () => {
  const [selectedSize, setSelectedSize] = useState<VideoSizeRange | null>(null);
  const [editingMode, setEditingMode] = useState<EditingMode | null>(null);
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
    />
  );
};

export default VideoEditorContainer;