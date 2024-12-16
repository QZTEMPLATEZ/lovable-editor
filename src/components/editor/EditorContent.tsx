import React from 'react';
import EditorHeader from '../EditorHeader';
import VideoStyleSelector from './VideoStyleSelector';
import RawFilesSection from '../RawFilesSection';
import AIEditStep from './AIEditStep';
import ReviewStep from './review/ReviewStep';
import { EditingMode } from '../EditingModeSelector';
import { VideoSizeRange } from '../../types';
import { VideoStyle } from '../../types/video';
import ReviewClassificationStep from './review/ReviewClassificationStep';

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

const EditorContent = ({
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
}: EditorContentProps) => {
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type.startsWith('video/')
    );
    setRawFiles(prevFiles => [...prevFiles, ...files]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    return false;
  };

  // Create a mock organization result for the review step
  const mockOrganizationResult = {
    categorizedFiles: new Map([['Main', rawFiles]]),
    unorganizedFiles: [],
    stats: {
      totalFiles: rawFiles.length,
      categorizedCount: rawFiles.length,
      uncategorizedCount: 0
    }
  };

  return (
    <>
      {currentStep === 0 && (
        <EditorHeader 
          editingMode={editingMode}
          targetDuration={targetDuration}
          onDurationChange={onDurationChange}
        />
      )}
      
      {currentStep === 1 && (
        <VideoStyleSelector
          selectedStyle={selectedStyle}
          onStyleSelect={onStyleSelect}
          onCustomVideoUpload={onCustomVideoUpload}
        />
      )}
      
      {currentStep === 2 && (
        <RawFilesSection
          videoFiles={rawFiles}
          onFileSelect={setRawFiles}
        />
      )}
      
      {currentStep === 3 && (
        <AIEditStep 
          aiScript={aiScript}
          onChange={onAIScriptChange}
          onStartEditing={onStartEditing}
          rawFiles={rawFiles}
          musicFile={selectedMusic[0]}
        />
      )}

      {currentStep === 4 && (
        <ReviewClassificationStep 
          rawFiles={rawFiles}
          onClassificationUpdate={(fileId: string, newCategory: string) => {
            // Here we would update the classification in the backend
            console.log(`File ${fileId} moved to category ${newCategory}`);
          }}
        />
      )}

      {currentStep === 5 && (
        <ReviewStep 
          rawFiles={rawFiles}
          selectedMusic={selectedMusic}
          selectedStyle={selectedStyle}
          organizationResult={mockOrganizationResult}
        />
      )}
    </>
  );
};

export default EditorContent;