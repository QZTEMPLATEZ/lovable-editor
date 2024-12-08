import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Film, Music, Zap, Terminal } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface EditingProgressProps {
  videoFiles: File[];
  progress: number;
}

const EditingProgress = ({ videoFiles, progress }: EditingProgressProps) => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [aiInstructions, setAiInstructions] = useState('');
  
  const steps = [
    { icon: Film, label: 'Analyzing Footage', description: 'Identifying stable scenes and key moments' },
    { icon: Music, label: 'Processing Audio', description: 'Detecting beats and synchronizing clips' },
    { icon: Wand2, label: 'Applying Effects', description: 'Enhancing colors and transitions' },
    { icon: Zap, label: 'Finalizing Edit', description: 'Rendering high-quality output' }
  ];

  const currentStep = Math.floor((progress / 100) * steps.length);

  useEffect(() => {
    if (videoFiles.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentFrameIndex((prev) => (prev + 1) % videoFiles.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [videoFiles.length]);

  return (
    <div className="space-y-8 w-full max-w-6xl mx-auto">
      {/* AI Instructions Input */}
      <div className="bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 rounded-2xl p-8 backdrop-blur-lg border border-purple-500/30 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <Terminal className="w-5 h-5 text-purple-400" />
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            AI Instructions
          </h3>
        </div>
        <Textarea
          value={aiInstructions}
          onChange={(e) => setAiInstructions(e.target.value)}
          placeholder="Describe how you want the AI to edit your video (e.g., 'Create a dynamic montage with smooth transitions and color grading similar to movie trailers')"
          className="min-h-[100px] bg-black/20 border-purple-500/30 focus:border-purple-500/50 text-purple-100 placeholder:text-purple-300/50"
        />
      </div>

      {/* Preview Window */}
      <div className="relative h-64 overflow-hidden rounded-xl border border-purple-500/30 bg-editor-bg shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-50" />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFrameIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {videoFiles[currentFrameIndex] && (
              <video 
                src={URL.createObjectURL(videoFiles[currentFrameIndex])} 
                className="w-full h-full object-cover opacity-90"
                autoPlay
                muted
                playsInline
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-lg font-medium">
                  Processing Frame {currentFrameIndex + 1} of {videoFiles.length}
                </p>
                <p className="text-purple-300 text-sm">
                  Enhancing video quality and applying AI effects
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Futuristic UI Elements */}
        <div className="absolute top-4 right-4 flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div 
              key={i}
              className="w-2 h-2 rounded-full bg-purple-500/50 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      {/* Processing Status */}
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
    </div>
  );
};

export default EditingProgress;