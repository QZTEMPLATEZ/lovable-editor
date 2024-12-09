import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface StepIndicatorProps {
  currentStep: number;
  steps: {
    title: string;
    description: string;
  }[];
}

const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  return (
    <div className="relative mb-12">
      {/* Background line */}
      <div className="absolute top-[45px] left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500/5 via-purple-500/10 to-purple-500/5" />
      
      {/* Progress line */}
      <motion.div 
        className="absolute top-[45px] left-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
        initial={{ width: 0 }}
        animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {/* Steps */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => (
          <div key={step.title} className="flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Outer ring with gradient */}
              <div 
                className={`w-24 h-24 rounded-full flex items-center justify-center relative
                  ${index <= currentStep ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-editor-panel'}
                  p-[2px]`}
              >
                {/* Inner circle */}
                <div 
                  className={`w-full h-full rounded-full flex flex-col items-center justify-center
                    ${index <= currentStep ? 'bg-editor-bg text-white' : 'bg-editor-panel text-gray-400'}
                    transition-colors duration-300`}
                >
                  {index < currentStep ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                      <Check className="w-8 h-8 text-purple-400" />
                    </motion.div>
                  ) : (
                    <>
                      <span className="text-sm font-medium opacity-60">Step</span>
                      <div className="flex items-center gap-1">
                        <span className="text-2xl font-bold">{index + 1}</span>
                        <span className="text-xs opacity-60">/ {steps.length}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Glowing effect for active step */}
              {index === currentStep && (
                <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-xl -z-10 animate-pulse" />
              )}
            </motion.div>

            {/* Step title and description */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="mt-6 text-center"
            >
              <h3 className={`font-medium text-lg mb-1
                ${index <= currentStep ? 'text-purple-300' : 'text-gray-400'}`}
              >
                {step.title}
              </h3>
              <p className="text-sm text-gray-400 max-w-[150px] mx-auto">
                {step.description}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;