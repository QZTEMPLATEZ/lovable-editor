import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import LoadingScreen from './LoadingScreen';
import EditingInterface from './EditingInterface';
import EditingProgress from './EditingProgress';
import ProcessingStatus from './ProcessingStatus';
import VideoPreview from './VideoPreview';
import PreApprovalView from './PreApprovalView';
import ReferenceFilmsSection from './ReferenceFilmsSection';
import RawFilesSection from './RawFilesSection';
import EditorHeader from './EditorHeader';
import StepIndicator from './StepIndicator';
import { VideoSizeRange } from './VideoSizeSelector';
import { EditingMode } from './EditingModeSelector';
import { analyzeVideoStability, calculateSlowMotionSpeed, getVideoMetadata, type VideoMetadata } from '@/utils/videoProcessing';

const EDITOR_STEPS = [
  {
    title: 'Duration',
    description: 'Choose video length'
  },
  {
    title: 'References',
    description: 'Add style examples'
  },
  {
    title: 'Music',
    description: 'Select soundtrack'
  },
  {
    title: 'Raw Files',
    description: 'Upload footage'
  },
  {
    title: 'Edit',
    description: 'AI processing'
  }
];

interface VideoEditorProps {
  targetDuration: VideoSizeRange;
  editingMode: EditingMode;
  onDurationChange: (duration: VideoSizeRange) => void;
}

const VideoEditor = ({ targetDuration, editingMode, onDurationChange }: VideoEditorProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [referenceFiles, setReferenceFiles] = useState<File[]>([]);
  const [rawFiles, setRawFiles] = useState<File[]>([]);
  const [command, setCommand] = useState('');
  const [editingProgress, setEditingProgress] = useState(0);
  const [videoMetadata, setVideoMetadata] = useState<VideoMetadata[]>([]);
  const [finalVideoUrl, setFinalVideoUrl] = useState<string>('');
  const [musicTrack, setMusicTrack] = useState<File | null>(null);
  const [musicBeats, setMusicBeats] = useState<any[]>([]);
  const { toast } = useToast();

  const handleReferenceDrop = async (e: React.DragEvent<Element>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('video/'));
    
    if (files.length > 0) {
      if (referenceFiles.length >= 1) {
        toast({
          variant: "destructive",
          title: "Reference video already added",
          description: "You can only upload one reference video",
        });
        return;
      }

      setReferenceFiles([files[0]]);
      toast({
        title: "Reference video added",
        description: "Your inspiration video has been uploaded successfully.",
      });
    }
  };

  const handleRawDrop = async (e: React.DragEvent<Element>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('video/'));
    
    if (files.length > 0) {
      setRawFiles(prev => [...prev, ...files]);
      toast({
        title: "Raw footage uploaded",
        description: `Successfully loaded ${files.length} raw video file(s)`,
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 0:
        return true; // Duration is always selected
      case 1:
        return referenceFiles.length > 0;
      case 2:
        return true; // Music is optional
      case 3:
        return rawFiles.length > 0;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (currentStep < EDITOR_STEPS.length - 1 && canProceedToNextStep()) {
      setCurrentStep(prev => prev + 1);
      toast({
        title: `Step ${currentStep + 2}: ${EDITOR_STEPS[currentStep + 1].title}`,
        description: EDITOR_STEPS[currentStep + 1].description,
      });
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      toast({
        title: `Step ${currentStep}: ${EDITOR_STEPS[currentStep - 1].title}`,
        description: EDITOR_STEPS[currentStep - 1].description,
      });
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8">
            <EditorHeader 
              editingMode={editingMode}
              targetDuration={targetDuration}
              onDurationChange={(duration) => {
                onDurationChange(duration);
              }}
            />
          </div>
        );
      case 1:
        return (
          <ReferenceFilmsSection
            onDrop={handleReferenceDrop}
            onDragOver={handleDragOver}
            videoFiles={referenceFiles}
          />
        );
      case 2:
        return (
          <RawFilesSection
            onDrop={handleRawDrop}
            onDragOver={handleDragOver}
            videoFiles={rawFiles}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-editor-bg to-editor-bg/95 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <StepIndicator currentStep={currentStep} steps={EDITOR_STEPS} />
        {renderCurrentStep()}
        
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePreviousStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          {currentStep < EDITOR_STEPS.length - 1 && (
            <Button
              onClick={handleNextStep}
              disabled={!canProceedToNextStep()}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Next Step
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoEditor;