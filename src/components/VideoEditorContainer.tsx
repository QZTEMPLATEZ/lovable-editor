import React, { useState } from 'react';
import VideoSizeSelector, { VideoSizeRange } from './VideoSizeSelector';
import EditingModeSelector, { EditingMode } from './EditingModeSelector';
import VideoEditor from './VideoEditor';

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