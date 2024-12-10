import React, { useState } from 'react';
import VideoSizeSelector from './VideoSizeSelector';
import { VideoSizeRange } from '../types';
import EditingModeSelector, { EditingMode } from './EditingModeSelector';
import VideoEditor from './VideoEditor';

const VideoEditorContainer = () => {
  const [selectedSize, setSelectedSize] = useState<VideoSizeRange>({
    min: 0.5,
    max: 1.5,
    name: "Social",
    label: "30s - 1:30min",
    description: "Quick, high-energy edit for social media",
    icon: null,
    recommendedTracks: 1,
    tier: 'basic'
  });
  const [editingMode, setEditingMode] = useState<EditingMode>('ai');

  const handleSizeSelect = (size: VideoSizeRange) => {
    setSelectedSize(size);
  };

  const handleModeSelect = (mode: EditingMode) => {
    setEditingMode(mode);
  };

  if (!selectedSize) {
    return <VideoSizeSelector selectedSize={selectedSize} onSizeSelect={handleSizeSelect} />;
  }

  if (!editingMode) {
    return <EditingModeSelector selectedMode={editingMode} onModeSelect={handleModeSelect} />;
  }

  return (
    <div className="bg-editor-bg/95 rounded-3xl border border-purple-500/20 shadow-xl backdrop-blur-lg overflow-hidden">
      <VideoEditor
        targetDuration={selectedSize}
        editingMode={editingMode}
        onDurationChange={handleSizeSelect}
      />
    </div>
  );
};

export default VideoEditorContainer;