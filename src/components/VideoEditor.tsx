import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import StepLayout from './editor/StepLayout';
import StartEditingButton from './editor/StartEditingButton';
import AIScriptWindow from './editor/AIScriptWindow';
import { VideoSizeRange } from './VideoSizeSelector';
import { EditingMode } from './EditingModeSelector';
import EditingProgress from './EditingProgress';
import EditorHeader from './EditorHeader';
import ReferenceFilmsSection from './ReferenceFilmsSection';
import EditingInterface from './EditingInterface';
import RawFilesSection from './RawFilesSection';

const EDITOR_STEPS = [
  { title: 'Duration', description: 'Choose your ideal video length' },
  { title: 'References', description: 'Add style examples for inspiration' },
  { title: 'Music', description: 'Select the perfect soundtrack' },
  { title: 'Raw Files', description: 'Upload your footage' },
  { title: 'AI Edit', description: 'Let AI work its magic' }
];

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
  const { toast } = useToast();

  // Track completion status for each step
  const isStepCompleted = (step: number): boolean => {
    switch (step) {
      case 0: // Duration
        return true; // Always allow proceeding from duration step
      case 1: // References
        return referenceFiles.length > 0;
      case 2: // Music
        return selectedMusic.length > 0;
      case 3: // Raw Files
        return rawFiles.length > 0;
      case 4: // AI Edit
        return aiScript.length > 0;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (currentStep < EDITOR_STEPS.length - 1 && isStepCompleted(currentStep)) {
      setCurrentStep(prev => prev + 1);
      toast({
        title: `Step ${currentStep + 2}: ${EDITOR_STEPS[currentStep + 1].title}`,
        description: EDITOR_STEPS[currentStep + 1].description,
      });
    } else if (!isStepCompleted(currentStep)) {
      toast({
        variant: "destructive",
        title: "Cannot Proceed",
        description: "Please complete the current step before continuing.",
      });
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStartEditing = () => {
    setIsProcessing(true);
    toast({
      title: "AI Processing Started",
      description: "Your video is being edited by our AI...",
    });
  };

  const handleStopProcessing = () => {
    setIsProcessing(false);
  };

  const handleReferenceDrop = async (e: React.DragEvent<Element>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('video/'));
    if (files.length > 0) {
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

  const handleMusicSelect = (file: File, beats: any[]) => {
    setSelectedMusic(prev => [...prev, file]);
  };

  const renderCurrentStep = () => {
    if (isProcessing) {
      return (
        <EditingProgress 
          videoFiles={rawFiles} 
          progress={0} 
          onStopProcessing={handleStopProcessing}
        />
      );
    }

    return (
      <StepLayout
        currentStep={currentStep}
        title={EDITOR_STEPS[currentStep].title}
        description={EDITOR_STEPS[currentStep].description}
      >
        {currentStep === 0 && (
          <div className="space-y-8">
            <EditorHeader 
              editingMode={editingMode}
              targetDuration={targetDuration}
              onDurationChange={onDurationChange}
            />
          </div>
        )}
        
        {currentStep === 1 && (
          <ReferenceFilmsSection
            onDrop={handleReferenceDrop}
            onDragOver={(e) => e.preventDefault()}
            videoFiles={referenceFiles}
            onContinue={handleNextStep}
          />
        )}
        
        {currentStep === 2 && (
          <EditingInterface onMusicSelect={handleMusicSelect} />
        )}
        
        {currentStep === 3 && (
          <RawFilesSection
            onDrop={handleRawDrop}
            onDragOver={(e) => e.preventDefault()}
            videoFiles={rawFiles}
            onContinue={handleNextStep}
          />
        )}
        
        {currentStep === 4 && (
          <div className="space-y-8">
            <AIScriptWindow 
              value={aiScript}
              onChange={setAiScript}
            />
            <StartEditingButton 
              onClick={handleStartEditing}
              disabled={!aiScript}
            />
          </div>
        )}
      </StepLayout>
    );
  };

  return (
    <div className="min-h-screen bg-editor-bg text-white">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {renderCurrentStep()}
        
        {!isProcessing && (
          <div className="flex justify-between mt-8 border-t border-purple-500/20 pt-6">
            <Button
              onClick={handlePreviousStep}
              disabled={currentStep === 0}
              className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30"
              variant="outline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            {currentStep < EDITOR_STEPS.length - 1 && (
              <Button
                onClick={handleNextStep}
                disabled={!isStepCompleted(currentStep)}
                className={`bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 ${
                  !isStepCompleted(currentStep) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                variant="outline"
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoEditor;
