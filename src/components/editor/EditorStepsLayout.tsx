import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export interface EditorStepsLayoutProps {
  currentStep: number;
  children: React.ReactNode;
  steps: {
    title: string;
    description: string;
    icon?: React.ReactNode;
  }[];
}

const EditorStepsLayout = ({ currentStep, children, steps }: EditorStepsLayoutProps) => {
  return (
    <div className="min-h-screen bg-editor-bg">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
      
      <div className="relative max-w-7xl mx-auto p-6">
        {/* Steps Progress */}
        <div className="mb-12">
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 w-full h-0.5 bg-editor-border" />
            <motion.div 
              className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-editor-glow-purple to-editor-glow-pink"
              style={{
                width: `${(currentStep / (steps.length - 1)) * 100}%`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Steps */}
            <div className="relative flex justify-between">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center relative
                      ${index <= currentStep 
                        ? 'bg-gradient-to-br from-editor-glow-purple to-editor-glow-pink shadow-lg shadow-editor-glow-purple/50' 
                        : 'bg-editor-panel border border-editor-border'
                      }`}
                  >
                    {index < currentStep ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <span className={`text-sm font-medium ${
                        index === currentStep ? 'text-white' : 'text-gray-400'
                      }`}>
                        {index + 1}
                      </span>
                    )}
                  </motion.div>
                  
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
                    <p className="text-xs text-editor-text/70 max-w-[120px] mx-auto">
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 rounded-3xl" />
          <div className="relative bg-editor-panel/50 backdrop-blur-xl rounded-3xl border border-editor-border/50 p-8">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EditorStepsLayout;