import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useVideoType } from '../contexts/VideoTypeContext';

interface StepIndicatorProps {
  currentStep: number;
  steps: {
    title: string;
    description: string;
  }[];
}

const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  const navigate = useNavigate();
  const { selectedVideoType, selectedStyle, selectedMusic } = useVideoType();

  const getStepPath = (index: number) => {
    switch (index) {
      case 0: return '/duration';
      case 1: return '/style';
      case 2: return '/music';
      case 3: return '/organize';
      default: return '/duration';
    }
  };

  const handleStepClick = (index: number) => {
    if (index <= currentStep) {
      navigate(getStepPath(index));
    }
  };

  const getTrackCountText = (count: number | undefined) => {
    if (!count || count === 0) return "No tracks selected";
    return `${count} track${count === 1 ? '' : 's'} selected`;
  };

  return (
    <div className="relative mb-4">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5 rounded-lg backdrop-blur-sm" />
      
      <div className="relative p-4">
        <div className="absolute top-[2.5rem] left-0 w-full h-[1px] bg-editor-border/20" />
        <motion.div 
          className="absolute top-[2.5rem] left-0 h-[1px] bg-gradient-to-r from-editor-glow-purple via-editor-glow-pink to-editor-glow-blue"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        <div className="relative flex justify-between">
          {steps.map((step, index) => (
            <div 
              key={step.title} 
              className={`flex flex-col items-center cursor-pointer group
                ${index <= currentStep ? 'opacity-100' : 'opacity-50 hover:opacity-75 transition-opacity'}`}
              onClick={() => handleStepClick(index)}
            >
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative mb-3"
              >
                <div 
                  className={`w-8 h-8 flex items-center justify-center relative transition-all duration-300
                    ${index <= currentStep 
                      ? 'bg-gradient-to-br from-editor-glow-purple to-editor-glow-pink shadow-sm shadow-editor-glow-pink/30' 
                      : 'bg-editor-panel border border-editor-border'}
                    rounded-lg transform hover:scale-105`}
                >
                  {index < currentStep ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  ) : (
                    <span className={`text-sm font-medium ${index === currentStep ? 'text-white' : 'text-gray-400'}`}>
                      {index + 1}
                    </span>
                  )}

                  {index === currentStep && (
                    <div className="absolute -inset-1 rounded-lg animate-pulse bg-editor-glow-pink/10" />
                  )}
                </div>
              </motion.div>

              <motion.div 
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="text-center group relative"
              >
                <h3 className={`text-xs font-medium mb-0.5 transition-colors duration-300
                  ${index <= currentStep ? 'text-white' : 'text-gray-400'}
                  group-hover:text-white`}
                >
                  {step.title}
                </h3>
                <p className="text-[10px] text-editor-text max-w-[80px] mx-auto leading-tight 
                             opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                  {step.description}
                </p>

                {index <= currentStep && (
                  <>
                    {index === 0 && selectedVideoType && (
                      <p className="text-sm text-purple-300 mt-1 font-medium">
                        {selectedVideoType.name}
                      </p>
                    )}
                    {index === 1 && selectedStyle && (
                      <p className="text-sm text-purple-300 mt-1 font-medium">
                        {selectedStyle.name}
                      </p>
                    )}
                    {index === 2 && (
                      <div className="mt-1">
                        <p className="text-sm text-purple-300 font-medium">
                          {getTrackCountText(selectedMusic?.length)}
                        </p>
                      </div>
                    )}
                  </>
                )}

                <motion.div 
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-[1px] 
                             bg-gradient-to-r from-editor-glow-purple to-editor-glow-pink 
                             group-hover:w-full transition-all duration-300"
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;