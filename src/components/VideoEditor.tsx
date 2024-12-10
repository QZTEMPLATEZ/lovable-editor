import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import EditorStepsLayout from './editor/EditorStepsLayout';
import { VideoSizeRange } from '../types';
import { EditingMode } from './EditingModeSelector';
import EditingProgress from './EditingProgress';
import EditorHeader from './EditorHeader';
import VideoStyleSelector from './editor/VideoStyleSelector';
import { VideoStyle } from '../types/video';
import RawFilesSection from './RawFilesSection';
import EditingInterface from './EditingInterface';
import AIEditStep from './editor/AIEditStep';
import { EDITOR_STEPS } from './editor/EditorSteps';
import { applyStyleToProject } from '@/utils/videoStyleProcessing';

interface VideoEditorProps {
  targetDuration: VideoSizeRange;
  editingMode: EditingMode;
  onDurationChange: (duration: VideoSizeRange) => void;
}

const VideoEditor = ({ targetDuration, editingMode, onDurationChange }: VideoEditorProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [aiScript, setAiScript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [referenceFiles, setReferenceFiles] = useState<File[]>([]);
  const [rawFiles, setRawFiles] = useState<File[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<File[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<VideoStyle | null>(null);
  const [customReferenceVideo, setCustomReferenceVideo] = useState<File | null>(null);
  const { toast } = useToast();

  // Always return true since we're simulating pro user access
  const isStepCompleted = (step: number): boolean => true;

  const handleNextStep = () => {
    if (currentStep < EDITOR_STEPS.length - 1) {
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
    }
  };

  const handleStyleSelect = async (style: VideoStyle) => {
    setSelectedStyle(style);
    toast({
      title: "Style Selected",
      description: `${style.charAt(0).toUpperCase() + style.slice(1)} style has been selected.`,
    });
  };

  const handleCustomVideoUpload = (file: File) => {
    setCustomReferenceVideo(file);
    toast({
      title: "Reference Video Uploaded",
      description: "Your custom reference video will be used for style guidance.",
    });
  };

  const handleStartEditing = async () => {
    if (!selectedStyle) return;

    setIsProcessing(true);
    try {
      const result = await applyStyleToProject(rawFiles, selectedStyle, customReferenceVideo || undefined);
      toast({
        title: "Style Applied",
        description: `${selectedStyle} style has been applied to your project.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Processing Error",
        description: "Failed to apply the selected style. Please try again.",
      });
    }
    setIsProcessing(false);
  };

  const renderCurrentStep = () => {
    if (isProcessing) {
      return (
        <EditingProgress 
          videoFiles={rawFiles} 
          progress={0} 
          onStopProcessing={() => setIsProcessing(false)}
        />
      );
    }

    return (
      <div className="space-y-8">
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
            onStyleSelect={handleStyleSelect}
            onCustomVideoUpload={handleCustomVideoUpload}
          />
        )}
        
        {currentStep === 2 && (
          <EditingInterface onMusicSelect={(file, beats) => {
            setSelectedMusic([file]);
          }} />
        )}
        
        {currentStep === 3 && (
          <RawFilesSection
            onDrop={(e) => {
              e.preventDefault();
              const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('video/'));
              setRawFiles(prev => [...prev, ...files]);
            }}
            onDragOver={(e) => e.preventDefault()}
            videoFiles={rawFiles}
          />
        )}
        
        {currentStep === 4 && (
          <AIEditStep 
            aiScript={aiScript}
            onChange={setAiScript}
            onStartEditing={handleStartEditing}
            rawFiles={rawFiles}
            musicFile={selectedMusic[0]}
          />
        )}

        {!isProcessing && currentStep < EDITOR_STEPS.length && (
          <EditorSteps
            currentStep={currentStep}
            isStepCompleted={isStepCompleted}
            onNextStep={handleNextStep}
            onPreviousStep={handlePreviousStep}
            isProcessing={isProcessing}
          />
        )}
      </div>
    );
  };

  return (
    <EditorStepsLayout
      currentStep={currentStep}
      steps={EDITOR_STEPS}
    >
      {renderCurrentStep()}
    </EditorStepsLayout>
  );
};

export default VideoEditor;