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
      <motion.div 
        className="absolute top-4 left-0 h-[2px] bg-gradient-to-r from-editor-glow.purple via-editor-glow.pink to-editor-glow.purple"
        style={{
          boxShadow: '0 0 20px rgba(155, 135, 245, 0.5)',
        }}
        initial={{ width: 0 }}
        animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      <div className="relative flex justify-between">
        {steps.map((step, index) => (
          <div key={step.title} className="flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div 
                className={`w-8 h-8 flex items-center justify-center relative transition-all duration-300
                  ${index <= currentStep 
                    ? 'bg-gradient-to-br from-editor-glow.purple to-editor-glow.pink shadow-lg shadow-editor-glow.purple/50' 
                    : 'bg-editor-panel border border-editor-border'}
                  transform hover:scale-110`}
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
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

                {index === currentStep && (
                  <>
                    <div className="absolute inset-0 animate-ping opacity-20 bg-gradient-to-br from-editor-glow.purple to-editor-glow.pink"
                         style={{
                           clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                         }} />
                    <div className="absolute -inset-1 animate-pulse opacity-10 bg-gradient-to-br from-editor-glow.purple to-editor-glow.pink"
                         style={{
                           clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                         }} />
                  </>
                )}
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="mt-4 text-center group"
            >
              <h3 className={`text-sm font-medium mb-1 transition-colors duration-300
                ${index <= currentStep ? 'text-editor-glow.purple' : 'text-gray-400'}
                group-hover:text-editor-glow.pink`}
              >
                {step.title}
              </h3>
              <p className="text-xs text-editor-text max-w-[120px] mx-auto leading-tight opacity-70 
                           transition-opacity duration-300 group-hover:opacity-100">
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