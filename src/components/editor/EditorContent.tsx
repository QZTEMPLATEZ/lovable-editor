
import React, { useState } from 'react';
import { VideoStyle } from '@/types/video';
import { OrganizationResult } from '@/types/organizer';
import { MusicAnalysis } from '@/utils/audioProcessing';
import AIEditStep from './AIEditStep';
import ReviewStep from './review/ReviewStep';

interface EditorContentProps {
  currentStep: number;
  selectedStyle: VideoStyle;
  rawFiles: File[];
  selectedMusic: File[];
}

const EditorContent: React.FC<EditorContentProps> = ({
  currentStep,
  selectedStyle,
  rawFiles,
  selectedMusic,
}) => {
  const [aiScript, setAiScript] = useState('');
  
  // Mock data for demo purposes - in production these would come from actual processing
  const mockOrganizationResult: OrganizationResult = {
    categorizedFiles: new Map([['videos', rawFiles]]),
    unorganizedFiles: [],
    stats: {
      totalFiles: rawFiles.length,
      categorizedCount: rawFiles.length,
      uncategorizedCount: 0
    }
  };

  const mockMusicAnalysis: MusicAnalysis = {
    beats: [],
    bpm: 120,
    segments: [],
    duration: 0,
    energyProfile: {
      average: 0,
      peak: 0,
      valleys: [],
      peaks: []
    }
  };

  const handleStartEditing = () => {
    console.log('Starting editing process...');
  };

  const handleFinishReview = () => {
    console.log('Review finished');
  };

  if (currentStep === 4) {
    return (
      <AIEditStep
        organizationResult={mockOrganizationResult}
        musicAnalysis={mockMusicAnalysis}
        aiScript={aiScript}
        onChange={setAiScript}
        onStartEditing={handleStartEditing}
        rawFiles={rawFiles}
        musicFile={selectedMusic[0]}
      />
    );
  }

  if (currentStep === 5) {
    return (
      <ReviewStep
        projectName="wedding-video"
        categorizedFiles={mockOrganizationResult.categorizedFiles}
        musicTracks={selectedMusic}
        onFinish={handleFinishReview}
        rawFiles={rawFiles}
        selectedMusic={selectedMusic}
        selectedStyle={selectedStyle}
      />
    );
  }

  return null;
};

export default EditorContent;
