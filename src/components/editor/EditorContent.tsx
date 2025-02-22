
import React from 'react';
import { VideoStyle } from '@/types/video';
import { OrganizationResult } from '@/types/organizer';
import { MusicAnalysis } from '@/utils/audioProcessing';
import { VideoSizeRange } from '@/types';
import { EditingMode } from '../EditingModeSelector';
import AIEditStep from './AIEditStep';
import ReviewStep from './review/ReviewStep';

interface EditorContentProps {
  currentStep: number;
  editingMode: EditingMode;
  targetDuration: VideoSizeRange;
  onDurationChange: (duration: VideoSizeRange) => void;
  selectedStyle: VideoStyle | null;
  onStyleSelect: (style: VideoStyle) => void;
  onCustomVideoUpload: (file: File) => void;
  rawFiles: File[];
  selectedMusic: File[];
  aiScript: string;
  onAIScriptChange: (script: string) => void;
  onStartEditing: () => void;
  setRawFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setSelectedMusic: React.Dispatch<React.SetStateAction<File[]>>;
}

const EditorContent: React.FC<EditorContentProps> = ({
  currentStep,
  editingMode,
  targetDuration,
  onDurationChange,
  selectedStyle,
  onStyleSelect,
  onCustomVideoUpload,
  rawFiles,
  selectedMusic,
  aiScript,
  onAIScriptChange,
  onStartEditing,
  setRawFiles,
  setSelectedMusic,
}) => {
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

  const handleFinishReview = () => {
    console.log('Review finished');
  };

  if (currentStep === 4 && selectedStyle) {
    return (
      <AIEditStep
        organizationResult={mockOrganizationResult}
        musicAnalysis={mockMusicAnalysis}
        aiScript={aiScript}
        onChange={onAIScriptChange}
        onStartEditing={onStartEditing}
        rawFiles={rawFiles}
        musicFile={selectedMusic[0]}
      />
    );
  }

  if (currentStep === 5 && selectedStyle) {
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
