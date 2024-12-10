import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface StepIndicatorProps {
  currentStep: number;
  steps: {
    title: string;
    description: string;
  }[];
}

const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  const navigate = useNavigate();

  const getStepPath = (index: number) => {
    switch (index) {
      case 0: return '/duration';
      case 1: return '/style';
      case 2: return '/music';
      case 3: return '/upload';
      case 4: return '/edit';
      default: return '/duration';
    }
  };

  const handleStepClick = (index: number) => {
    if (index <= currentStep) {
      navigate(getStepPath(index));
    }
  };

  return (
    <div className="relative mb-8">
      {/* Background with futuristic glass effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5 rounded-xl backdrop-blur-xl" />
      
      <div className="relative p-8">
        {/* Progress line */}
        <div className="absolute top-[4.5rem] left-0 w-full h-[2px] bg-editor-border/30" />
        <motion.div 
          className="absolute top-[4.5rem] left-0 h-[2px] bg-gradient-to-r from-editor-glow-purple via-editor-glow-pink to-editor-glow-blue"
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
                className="relative mb-6"
              >
                <div 
                  className={`w-12 h-12 flex items-center justify-center relative transition-all duration-300
                    ${index <= currentStep 
                      ? 'bg-gradient-to-br from-editor-glow-purple to-editor-glow-pink shadow-lg shadow-editor-glow-pink/30' 
                      : 'bg-editor-panel border border-editor-border'}
                    rounded-xl transform hover:scale-110 hover:-translate-y-1`}
                >
                  {index < currentStep ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                      <Check className="w-6 h-6 text-white" />
                    </motion.div>
                  ) : (
                    <span className={`text-lg font-bold ${index === currentStep ? 'text-white' : 'text-gray-400'}`}>
                      {index + 1}
                    </span>
                  )}

                  {/* Animated glow effect for current step */}
                  {index === currentStep && (
                    <>
                      <div className="absolute inset-0 rounded-xl animate-pulse bg-editor-glow-pink/20" />
                      <div className="absolute -inset-2 rounded-xl animate-pulse bg-editor-glow-pink/10" />
                    </>
                  )}
                </div>
              </motion.div>

              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="text-center group relative"
              >
                <h3 className={`text-sm font-medium mb-1 transition-colors duration-300
                  ${index <= currentStep ? 'text-white' : 'text-gray-400'}
                  group-hover:text-white`}
                >
                  {step.title}
                </h3>
                <p className="text-xs text-editor-text max-w-[120px] mx-auto leading-tight 
                             opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                  {step.description}
                </p>

                {/* Hover effect line */}
                <motion.div 
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 
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