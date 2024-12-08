import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wand2 } from 'lucide-react';

interface StepLayoutProps {
  currentStep: number;
  children: React.ReactNode;
  title: string;
  description: string;
}

const StepLayout = ({ currentStep, children, title, description }: StepLayoutProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-[600px] relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 rounded-3xl" />
      
      <div className="relative p-8 space-y-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <span className="text-2xl font-bold text-purple-300">{currentStep + 1}</span>
            </div>
            <Sparkles className="w-4 h-4 text-purple-400 absolute -top-1 -right-1 animate-pulse" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
              {title}
            </h2>
            <p className="text-gray-400">{description}</p>
          </div>
        </div>

        <div className="relative">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default StepLayout;