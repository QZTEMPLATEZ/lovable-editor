import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { VideoSizeRange } from '../types';
import { EditingMode } from './EditingModeSelector';
import EditorStepsLayout from './editor/EditorStepsLayout';
import ProcessingView from './editor/ProcessingView';
import EditorContent from './editor/EditorContent';
import EditorNavigation from './editor/EditorNavigation';
import { VideoStyle } from '../types/video';
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

  return (
    <EditorStepsLayout
      currentStep={currentStep}
      steps={EDITOR_STEPS}
    >
      <div className="space-y-8">
        {isProcessing ? (
          <ProcessingView 
            rawFiles={rawFiles}
            onStopProcessing={() => setIsProcessing(false)}
          />
        ) : (
          <>
            <EditorContent
              currentStep={currentStep}
              editingMode={editingMode}
              targetDuration={targetDuration}
              onDurationChange={onDurationChange}
              selectedStyle={selectedStyle}
              onStyleSelect={handleStyleSelect}
              onCustomVideoUpload={handleCustomVideoUpload}
              rawFiles={rawFiles}
              selectedMusic={selectedMusic}
              aiScript={aiScript}
              onAIScriptChange={setAiScript}
              onStartEditing={handleStartEditing}
              setRawFiles={setRawFiles}
              setSelectedMusic={setSelectedMusic}
            />
            
            <EditorNavigation
              currentStep={currentStep}
              onPrevious={handlePreviousStep}
              onNext={handleNextStep}
            />
          </>
        )}
      </div>
    </EditorStepsLayout>
  );
};

export default VideoEditor;