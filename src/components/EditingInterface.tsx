import React, { useState } from 'react';
import VideoPreview from './VideoPreview';
import ProcessingStatus from './ProcessingStatus';
import MusicTrackSelector from './MusicTrackSelector';

interface EditingInterfaceProps {
  // Add any props if needed
}

const EditingInterface: React.FC<EditingInterfaceProps> = () => {
  const [selectedTracks, setSelectedTracks] = useState<{ file: File; beats: any[] }[]>([]);

  const handleTrackSelect = (file: File, beats: any[]) => {
    setSelectedTracks(prev => [...prev, { file, beats }]);
  };

  return (
    <div className="space-y-6">
      <VideoPreview file={null} />
      <MusicTrackSelector 
        onMusicSelect={handleTrackSelect}
      />
      <ProcessingStatus 
        currentStep="1"
        progress={0}
      />
    </div>
  );
};

export default EditingInterface;