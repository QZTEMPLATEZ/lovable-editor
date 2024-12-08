import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  steps: {
    title: string;
    description: string;
  }[];
}

const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  return (
    <div className="mb-8">
      <div className="relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-purple-500/20" />
        <div 
          className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
        <div className="relative flex justify-between">
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-col items-center">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center relative z-10 transition-colors duration-300 ${
                  index < currentStep 
                    ? 'bg-purple-500 text-white' 
                    : index === currentStep 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-purple-500/20 text-purple-300'
                }`}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-medium">Step</span>
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-bold">{index + 1}</span>
                      <span className="text-xs">/ {steps.length}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-3 text-center">
                <h3 className={`font-medium ${index <= currentStep ? 'text-purple-300' : 'text-gray-400'}`}>
                  {step.title}
                </h3>
                <p className="text-xs text-gray-400 max-w-[120px] mt-1">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;