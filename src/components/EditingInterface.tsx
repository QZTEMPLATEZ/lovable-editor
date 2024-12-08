import React from 'react';
import MusicTrackSelector from './MusicTrackSelector';
import VideoPreview from './VideoPreview';
import ProcessingStatus from './ProcessingStatus';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface EditingInterfaceProps {
  onMusicSelect: (file: File, beats: any[]) => void;
}

const EditingInterface: React.FC<EditingInterfaceProps> = ({
  onMusicSelect
}) => {
  const recommendedTracks = [
    { id: 1, name: "Track 1", url: "..." },
    { id: 2, name: "Track 2", url: "..." },
    { id: 3, name: "Track 3", url: "..." }
  ];

  return (
    <div className="space-y-8">
      <div className="adobe-style-panel">
        <AspectRatio ratio={16/9}>
          <VideoPreview />
        </AspectRatio>
      </div>
      
      <div className="adobe-style-panel">
        <MusicTrackSelector 
          onMusicSelect={onMusicSelect}
          recommendedTracks={recommendedTracks}
        />
      </div>

      <ProcessingStatus />
    </div>
  );
};

export default EditingInterface;
