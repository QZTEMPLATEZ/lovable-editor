import React from 'react';
import { EDITOR_STEPS } from './EditorSteps';

interface EditorNavigationProps {
  currentStep: number;
  onPrevious: () => void;
  onNext: () => void;
}

const EditorNavigation = ({ currentStep, onPrevious, onNext }: EditorNavigationProps) => {
  return (
    <div className="flex justify-between mt-8">
      <button
        onClick={onPrevious}
        disabled={currentStep === 0}
        className="px-4 py-2 bg-editor-panel text-white rounded-lg disabled:opacity-50"
      >
        Previous
      </button>
      <button
        onClick={onNext}
        disabled={currentStep === EDITOR_STEPS.length - 1}
        className="px-4 py-2 bg-editor-panel text-white rounded-lg disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default EditorNavigation;