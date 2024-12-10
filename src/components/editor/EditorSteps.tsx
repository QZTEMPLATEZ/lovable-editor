import React from 'react';
import { Film, Music, Upload, Wand2 } from 'lucide-react';
import { VideoSizeRange } from '../../types';
import { VideoStyle } from './VideoStyleSelector';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const EDITOR_STEPS = [
  { 
    title: 'Duration',
    description: 'Choose your ideal video length',
    icon: <Film className="w-5 h-5" />
  },
  { 
    title: 'Style',
    description: 'Select editing style',
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

interface EditorStepsProps {
  currentStep: number;
  isStepCompleted: (step: number) => boolean;
  onNextStep: () => void;
  onPreviousStep: () => void;
  isProcessing: boolean;
}

const EditorSteps: React.FC<EditorStepsProps> = ({
  currentStep,
  isStepCompleted,
  onNextStep,
  onPreviousStep,
  isProcessing
}) => {
  return (
    <div className="flex justify-between pt-6 border-t border-editor-border/30">
      {currentStep > 0 && (
        <Button
          onClick={onPreviousStep}
          variant="outline"
          className="bg-editor-panel/50 hover:bg-editor-panel"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      )}
      
      {currentStep === 0 && <div />}
      
      {currentStep < EDITOR_STEPS.length - 1 && (
        <Button
          onClick={onNextStep}
          disabled={!isStepCompleted(currentStep)}
          className="bg-gradient-to-r from-editor-glow-purple to-editor-glow-pink hover:opacity-90"
        >
          Next Step
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </div>
  );
};

export default EditorSteps;