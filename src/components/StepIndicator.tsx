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
    <div className="relative mb-6">
      {/* Background line */}
      <div className="absolute top-4 left-0 right-0 h-[2px] bg-editor-border/30 rounded-full" />
      
      {/* Progress line */}
      <motion.div 
        className="absolute top-4 left-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full"
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
                className={`w-8 h-8 rounded-full flex items-center justify-center relative
                  ${index <= currentStep 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/20' 
                    : 'bg-editor-panel border border-editor-border'}
                  transition-all duration-300 hover:scale-110`}
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
                  <span className={`text-xs font-medium ${index === currentStep ? 'text-white' : 'text-gray-400'}`}>
                    {index + 1}
                  </span>
                )}

                {/* Pulse effect for current step */}
                {index === currentStep && (
                  <div className="absolute inset-0 rounded-full animate-ping bg-purple-500/30" />
                )}
              </div>
            </motion.div>

            {/* Step title and description */}
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="mt-3 text-center"
            >
              <h3 className={`text-xs font-medium mb-0.5
                ${index <= currentStep ? 'text-purple-300' : 'text-gray-400'}`}
              >
                {step.title}
              </h3>
              <p className="text-[10px] text-gray-400 max-w-[100px] mx-auto leading-tight">
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