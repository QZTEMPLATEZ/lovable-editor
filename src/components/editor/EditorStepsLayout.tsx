import React from 'react';
import { motion } from 'framer-motion';
import StepIndicator from '../StepIndicator';

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
        {/* Steps Progress using consolidated StepIndicator */}
        <div className="mb-12">
          <StepIndicator currentStep={currentStep} steps={steps} />
        </div>

        {/* Content Area with optimized animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
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