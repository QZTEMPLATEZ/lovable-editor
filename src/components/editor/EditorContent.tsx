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
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import ProjectExportOptions from './ProjectExportOptions';

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
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const handleOrganize = () => {
    if (rawFiles.length === 0) {
      toast({
        variant: "destructive",
        title: "No files",
        description: "Please add some video files first."
      });
      return;
    }
    navigate('/organize');
  };

  // Create organization result for the review step
  const organizationResult = {
    categorizedFiles: new Map([['Main', rawFiles]]),
    unorganizedFiles: [],
    stats: {
      totalFiles: rawFiles.length,
      categorizedCount: rawFiles.length,
      uncategorizedCount: 0
    }
  };

  return (
    <div className="min-h-screen bg-editor-background">
      <div className="container mx-auto px-4 py-8">
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
            onOrganize={handleOrganize}
            onContinue={() => navigate('/organize')}
          />
        )}
        
        {currentStep === 3 && (
          <ReviewClassificationStep 
            rawFiles={rawFiles}
            onClassificationUpdate={(fileId: string, newCategory: string) => {
              console.log(`File ${fileId} moved to category ${newCategory}`);
            }}
          />
        )}

        {currentStep === 4 && (
          <div className="space-y-8">
            <ReviewStep 
              rawFiles={rawFiles}
              selectedMusic={selectedMusic}
              selectedStyle={selectedStyle}
              organizationResult={organizationResult}
            />
            <ProjectExportOptions
              onExport={(format) => {
                toast({
                  title: "Exporting Project",
                  description: `Preparing ${format} project file...`
                });
              }}
              isProcessing={false}
              organizationResult={organizationResult}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorContent;