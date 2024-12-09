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
      {/* Futuristic background line with glow effect */}
      <div className="absolute top-4 left-0 right-0">
        <div className="h-[1px] bg-editor-border/30 rounded-full" />
        <div className="h-[1px] bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 blur-sm" />
      </div>
      
      {/* Animated progress line */}
      <motion.div 
        className="absolute top-4 left-0 h-[1px] bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
        style={{
          boxShadow: '0 0 10px rgba(155, 135, 245, 0.5)',
        }}
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
              {/* Hexagonal step indicator */}
              <div 
                className={`w-7 h-7 flex items-center justify-center relative
                  ${index <= currentStep 
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                    : 'bg-editor-panel border border-editor-border'}
                  clip-path-hexagon transform transition-all duration-300 hover:scale-110`}
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  boxShadow: index <= currentStep ? '0 0 15px rgba(155, 135, 245, 0.5)' : 'none',
                }}
              >
                {index < currentStep ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <Check className="w-3.5 h-3.5 text-white" />
                  </motion.div>
                ) : (
                  <span className={`text-[10px] font-medium ${index === currentStep ? 'text-white' : 'text-gray-400'}`}>
                    {index + 1}
                  </span>
                )}

                {/* Futuristic pulse effect for current step */}
                {index === currentStep && (
                  <>
                    <div className="absolute inset-0 animate-ping opacity-20"
                         style={{
                           clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                           background: 'linear-gradient(45deg, #9b87f5, #d946ef)',
                         }} />
                    <div className="absolute -inset-1 animate-pulse opacity-10"
                         style={{
                           clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                           background: 'linear-gradient(45deg, #9b87f5, #d946ef)',
                         }} />
                  </>
                )}
              </div>
            </motion.div>

            {/* Step title and description with hover effect */}
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="mt-3 text-center group relative"
            >
              <h3 className={`text-[10px] font-medium mb-0.5 transition-colors duration-300
                ${index <= currentStep ? 'text-purple-300' : 'text-gray-400'}
                group-hover:text-purple-200`}
              >
                {step.title}
              </h3>
              <p className="text-[8px] text-gray-400 max-w-[80px] mx-auto leading-tight opacity-70 
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