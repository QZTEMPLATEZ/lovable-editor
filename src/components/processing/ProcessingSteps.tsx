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
    <div className="relative w-full min-h-[600px] bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 rounded-3xl p-8 backdrop-blur-lg border border-purple-500/30 shadow-2xl overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
      
      <div className="relative space-y-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            Processing Status
          </h3>
          <span className="text-2xl font-bold text-purple-300">{Math.round(progress)}%</span>
        </div>

        {/* Main processing window */}
        <div className="relative aspect-video w-full bg-black/40 rounded-2xl overflow-hidden mb-8 border border-purple-500/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Animated processing rings */}
              <div className="absolute inset-0 w-32 h-32 border-4 border-purple-500/30 rounded-full animate-spin" 
                   style={{ animationDuration: '3s' }} />
              <div className="absolute inset-4 w-24 h-24 border-4 border-pink-500/30 rounded-full animate-spin" 
                   style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
              <div className="absolute inset-8 w-16 h-16 border-4 border-purple-400/30 rounded-full animate-spin" 
                   style={{ animationDuration: '1.5s' }} />
            </div>
          </div>
        </div>

        {/* Processing steps grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isComplete = index < currentStep;
            const Icon = step.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-4 rounded-xl border backdrop-blur-sm ${
                  isActive ? 'border-purple-500 bg-purple-500/10' : 
                  isComplete ? 'border-green-500 bg-green-500/10' : 
                  'border-gray-700 bg-gray-800/50'
                }`}
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
              </motion.div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden mt-8">
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