import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Film, Music, Upload, Wand2, Zap } from 'lucide-react';
import EditorStepsLayout from './editor/EditorStepsLayout';
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
  { 
    title: 'Duration',
    description: 'Choose your ideal video length',
    icon: <Film className="w-5 h-5" />
  },
  { 
    title: 'References',
    description: 'Add style examples',
    icon: <Upload className="w-5 h-5" />
  },
  { 
    title: 'Music',
    description: 'Select soundtrack',
    icon: <Music className="w-5 h-5" />
  },
  { 
    title: 'Raw Files',
    description: 'Upload footage',
    icon: <Film className="w-5 h-5" />
  },
  { 
    title: 'AI Edit',
    description: 'Magic happens',
    icon: <Wand2 className="w-5 h-5" />
  }
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
      <div className="space-y-8">
        {currentStep === 0 && (
          <EditorHeader 
            editingMode={editingMode}
            targetDuration={targetDuration}
            onDurationChange={onDurationChange}
          />
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
          <>
            <AIScriptWindow 
              value={aiScript}
              onChange={setAiScript}
            />
            <StartEditingButton 
              onClick={handleStartEditing}
              disabled={!aiScript}
            />
          </>
        )}

        {!isProcessing && currentStep < EDITOR_STEPS.length && (
          <div className="flex justify-between pt-6 border-t border-editor-border/30">
            <Button
              onClick={handlePreviousStep}
              disabled={currentStep === 0}
              variant="outline"
              className="bg-editor-panel/50 hover:bg-editor-panel"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            {currentStep < EDITOR_STEPS.length - 1 && (
              <Button
                onClick={handleNextStep}
                disabled={!isStepCompleted(currentStep)}
                className="bg-gradient-to-r from-editor-glow-purple to-editor-glow-pink hover:opacity-90"
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
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