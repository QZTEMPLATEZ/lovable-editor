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
    <div className="relative mb-8">
      {/* Background line */}
      <div className="absolute top-[25px] left-0 right-0 h-[1px] bg-editor-border" />
      
      {/* Progress line */}
      <motion.div 
        className="absolute top-[25px] left-0 h-[1px] bg-gradient-to-r from-purple-500 to-pink-500"
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
              {/* Step circle */}
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center relative
                  ${index <= currentStep ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-editor-panel border border-editor-border'}
                  transition-colors duration-300`}
              >
                {index < currentStep ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                ) : (
                  <span className={`text-sm font-medium ${index === currentStep ? 'text-white' : 'text-gray-400'}`}>
                    {index + 1}
                  </span>
                )}
              </div>

              {/* Subtle glow for active step */}
              {index === currentStep && (
                <div className="absolute inset-0 rounded-full bg-purple-500/10 blur-md -z-10" />
              )}
            </motion.div>

            {/* Step title and description */}
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="mt-4 text-center"
            >
              <h3 className={`text-sm font-medium mb-1
                ${index <= currentStep ? 'text-purple-300' : 'text-gray-400'}`}
              >
                {step.title}
              </h3>
              <p className="text-xs text-gray-400 max-w-[120px] mx-auto">
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