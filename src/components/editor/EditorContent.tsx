import React from 'react';
import EditorHeader from '../EditorHeader';
import VideoStyleSelector from './VideoStyleSelector';
import EditingInterface from '../EditingInterface';
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
        <EditingInterface />
      )}
      
      {currentStep === 3 && (
        <RawFilesSection
          onDrop={(e) => {
            e.preventDefault();
            const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('video/'));
            setRawFiles(prevFiles => [...prevFiles, ...files]);
          }}
          onDragOver={(e) => e.preventDefault()}
          videoFiles={rawFiles}
        />
      )}
      
      {currentStep === 4 && (
        <AIEditStep 
          aiScript={aiScript}
          onChange={onAIScriptChange}
          onStartEditing={onStartEditing}
          rawFiles={rawFiles}
          musicFile={selectedMusic[0]}
        />
      )}

      {currentStep === 5 && (
        <ReviewClassificationStep 
          rawFiles={rawFiles}
          onClassificationUpdate={(fileId: string, newCategory: string) => {
            console.log(`File ${fileId} moved to category ${newCategory}`);
          }}
        />
      )}

      {currentStep === 6 && (
        <ReviewStep 
          rawFiles={rawFiles}
          selectedMusic={selectedMusic}
          selectedStyle={selectedStyle}
          organizationResult={{
            categorizedFiles: new Map([['Main', rawFiles]]),
            unorganizedFiles: [],
            stats: {
              totalFiles: rawFiles.length,
              categorizedCount: rawFiles.length,
              uncategorizedCount: 0
            }
          }}
        />
      )}
    </>
  );
};

export default EditorContent;