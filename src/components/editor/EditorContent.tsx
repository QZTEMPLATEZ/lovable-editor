import React from 'react';
import EditorHeader from '../EditorHeader';
import VideoStyleSelector from './VideoStyleSelector';
import EditingInterface from '../EditingInterface';
import RawFilesSection from '../RawFilesSection';
import AIEditStep from './AIEditStep';
import { EditingMode } from '../EditingModeSelector';
import { VideoSizeRange } from '../../types';
import { VideoStyle } from '../../types/video';

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
        <EditingInterface 
          onMusicSelect={(file) => {
            setSelectedMusic([file]);
          }} 
        />
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
    </>
  );
};

export default EditorContent;