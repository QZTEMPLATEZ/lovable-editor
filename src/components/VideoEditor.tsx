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
  { title: 'Duration', description: 'Choose video length' },
  { title: 'References', description: 'Add style examples' },
  { title: 'Music', description: 'Select soundtrack' },
  { title: 'Raw Files', description: 'Upload footage' },
  { title: 'Edit', description: 'AI processing' }
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
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      <div className="adobe-style-panel">
        <div className="adobe-style-header mb-6">
          <StepIndicator currentStep={currentStep} steps={EDITOR_STEPS} />
        </div>

        <div className="space-y-8">
          {renderCurrentStep()}
          
          <div className="flex justify-between mt-8 border-t border-[#2A2A2A] pt-4">
            <Button
              onClick={handlePreviousStep}
              disabled={currentStep === 0}
              className="adobe-style-button flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            
            {currentStep < EDITOR_STEPS.length - 1 && (
              <Button
                onClick={handleNextStep}
                disabled={!canProceedToNextStep()}
                className="adobe-style-button flex items-center gap-2"
              >
                Next Step
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="adobe-timeline mt-8 p-4">
        <div className="text-sm text-gray-400">Timeline</div>
        {/* Timeline placeholder for future implementation */}
        <div className="h-24 bg-[#2A2A2A] rounded-md mt-2"></div>
      </div>
    </div>
  );
};

export default VideoEditor;
