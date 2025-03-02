
import { useState } from 'react';

export const useStepNavigation = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleStepClick = (stepId: number) => {
    // Only allow going back to previous steps or current step
    if (stepId <= currentStep) {
      setCurrentStep(stepId);
    }
  };

  return {
    currentStep,
    setCurrentStep,
    handleStepClick
  };
};
