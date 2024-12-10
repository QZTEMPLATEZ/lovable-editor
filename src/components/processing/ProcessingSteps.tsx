import React, { useMemo } from 'react';
import { Film, Music, Wand2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import ProcessingRings from './ProcessingRings';

interface ProcessingStepsProps {
  progress: number;
}

const ProcessingSteps = ({ progress }: ProcessingStepsProps) => {
  const steps = useMemo(() => [
    { icon: Film, label: 'Analyzing Footage', description: 'Identifying stable scenes and key moments' },
    { icon: Music, label: 'Processing Audio', description: 'Detecting beats and synchronizing clips' },
    { icon: Wand2, label: 'Applying Effects', description: 'Enhancing colors and transitions' },
    { icon: Zap, label: 'Finalizing Edit', description: 'Rendering high-quality output' }
  ], []);

  const currentStep = Math.floor((progress / 100) * steps.length);

  return (
    <div className="relative w-full min-h-[600px] bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 rounded-3xl p-8 backdrop-blur-xl border border-editor-glow-purple/30 shadow-2xl overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-editor-glow-purple/10 via-editor-glow-pink/5 to-editor-glow-blue/10 animate-gradient" />
      <div className="absolute inset-0 backdrop-blur-3xl" />
      
      <div className="relative space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h3 className="text-3xl font-bold gradient-text">
            Processing Status
          </h3>
          <span className="text-2xl font-bold text-editor-glow-purple animate-pulse">
            {Math.round(progress)}%
          </span>
        </motion.div>

        <div className="relative aspect-video w-full bg-editor-panel/40 rounded-2xl overflow-hidden mb-8 border border-editor-glow-purple/20 shadow-lg">
          <div className="absolute inset-0 flex items-center justify-center">
            <ProcessingRings />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                className={`relative p-6 rounded-xl border backdrop-blur-xl transition-all duration-300 ${
                  isActive ? 'border-editor-glow-purple bg-editor-glow-purple/10 shadow-lg shadow-editor-glow-purple/20' : 
                  isComplete ? 'border-green-500/50 bg-green-500/5' : 
                  'border-editor-border bg-editor-panel/50'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Icon className={`w-6 h-6 ${
                      isActive ? 'text-editor-glow-purple animate-pulse' :
                      isComplete ? 'text-green-400' :
                      'text-editor-text'
                    }`} />
                  </motion.div>
                  <span className={`font-medium ${
                    isActive ? 'text-editor-glow-purple' :
                    isComplete ? 'text-green-300' :
                    'text-editor-text'
                  }`}>{step.label}</span>
                </div>
                <p className="text-sm text-editor-text/70">
                  {step.description}
                </p>
                
                {isActive && (
                  <motion.div
                    className="absolute -bottom-[2px] left-0 h-[2px] bg-gradient-to-r from-editor-glow-purple via-editor-glow-pink to-editor-glow-blue"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="h-2 bg-editor-panel rounded-full overflow-hidden mt-8">
          <motion.div 
            className="h-full bg-gradient-to-r from-editor-glow-purple via-editor-glow-pink to-editor-glow-blue"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProcessingSteps;