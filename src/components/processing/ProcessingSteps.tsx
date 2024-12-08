import React from 'react';
import { Film, Music, Wand2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProcessingStepsProps {
  progress: number;
}

const ProcessingSteps = ({ progress }: ProcessingStepsProps) => {
  const steps = [
    { icon: Film, label: 'Analyzing Footage', description: 'Identifying stable scenes and key moments' },
    { icon: Music, label: 'Processing Audio', description: 'Detecting beats and synchronizing clips' },
    { icon: Wand2, label: 'Applying Effects', description: 'Enhancing colors and transitions' },
    { icon: Zap, label: 'Finalizing Edit', description: 'Rendering high-quality output' }
  ];

  const currentStep = Math.floor((progress / 100) * steps.length);

  return (
    <div className="bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 rounded-2xl p-8 backdrop-blur-lg border border-purple-500/30 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none" />
      
      <div className="relative space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            AI Processing
          </h3>
          <span className="text-xl font-bold text-purple-300">{Math.round(progress)}%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isComplete = index < currentStep;
            const Icon = step.icon;
            
            return (
              <div
                key={index}
                className={`relative p-4 rounded-xl border ${
                  isActive ? 'border-purple-500 bg-purple-500/10' : 
                  isComplete ? 'border-green-500 bg-green-500/10' : 
                  'border-gray-700 bg-gray-800/50'
                } backdrop-blur-sm`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className={`w-5 h-5 ${
                    isActive ? 'text-purple-400 animate-pulse' :
                    isComplete ? 'text-green-400' :
                    'text-gray-400'
                  }`} />
                  <span className={`font-medium ${
                    isActive ? 'text-purple-300' :
                    isComplete ? 'text-green-300' :
                    'text-gray-400'
                  }`}>{step.label}</span>
                </div>
                <p className="text-sm text-gray-400">{step.description}</p>
              </div>
            );
          })}
        </div>

        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProcessingSteps;