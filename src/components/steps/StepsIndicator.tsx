
import React from 'react';
import { Upload, BarChart3, Download } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  icon: React.ReactNode;
}

interface StepsIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
}

const StepsIndicator: React.FC<StepsIndicatorProps> = ({ 
  steps, 
  currentStep, 
  onStepClick 
}) => {
  return (
    <div className="max-w-3xl mx-auto mb-12">
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Circle */}
            <div 
              className={`relative z-10 flex flex-col items-center ${currentStep === step.id ? 'scale-110 transition-transform duration-300' : ''}`}
              onClick={() => {
                // Only allow going back to previous steps or current step
                if (step.id <= currentStep) {
                  onStepClick(step.id);
                }
              }}
            >
              <div 
                className={`w-16 h-16 rounded-full flex items-center justify-center 
                  ${currentStep === step.id 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30' 
                    : currentStep > step.id 
                      ? 'bg-gradient-to-r from-purple-700 to-purple-500 opacity-90' 
                      : 'bg-gray-800 opacity-60'} 
                  transition-all duration-300 cursor-pointer hover:scale-105`}
              >
                {step.icon}
              </div>
              <span className={`mt-2 font-medium ${currentStep === step.id ? 'text-white' : 'text-gray-400'}`}>
                {step.title}
              </span>
            </div>
            
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="h-1 flex-1 mx-2 rounded-full bg-gray-800 relative z-0">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  style={{ 
                    width: currentStep > index + 1 
                      ? '100%' 
                      : currentStep === index + 1 
                        ? '50%' 
                        : '0%',
                    transition: 'width 0.5s ease-in-out'
                  }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepsIndicator;
