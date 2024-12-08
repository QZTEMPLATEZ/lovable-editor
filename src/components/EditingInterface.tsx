import React from 'react';
import VideoPreview from './VideoPreview';
import ProcessingStatus from './ProcessingStatus';
import MusicTrackSelector from './MusicTrackSelector';

interface EditingInterfaceProps {
  // Add any props if needed
}

const EditingInterface: React.FC<EditingInterfaceProps> = () => {
  // Sample data for demonstration
  const videoFile = {
    name: 'sample-video.mp4',
    size: 1024,
    type: 'video/mp4',
    // Add other required properties
  };

  const recommendedTracks = [
    { id: 1, name: 'Romantic Piano', url: '/music/romantic-piano.mp3' },
    { id: 2, name: 'Wedding March', url: '/music/wedding-march.mp3' },
    { id: 3, name: 'Classical Romance', url: '/music/classical-romance.mp3' },
  ];

  return (
    <div className="space-y-6">
      <VideoPreview file={videoFile} />
      <MusicTrackSelector 
        recommendedTracks={recommendedTracks}
        onTrackSelect={(track) => console.log('Selected track:', track)}
      />
      <ProcessingStatus 
        currentStep={1}
        progress={0}
      />
    </div>
  );
};

export default EditingInterface;