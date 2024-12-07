import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2, Film, Brain } from 'lucide-react';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < 3) {
        setCurrentStep(prev => prev + 1);
      } else {
        setTimeout(onComplete, 1000);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      text: "AI-Powered Editing"
    },
    {
      icon: <Wand2 className="w-8 h-8" />,
      text: "Effortless Workflow"
    },
    {
      icon: <Film className="w-8 h-8" />,
      text: "Cinematic Results"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      text: "Intelligent Processing"
    }
  ];

  return (
    <motion.div 
      className="fixed inset-0 bg-editor-bg flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(155,135,245,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(155,135,245,0.1)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"
          animate={{
            background: [
              "linear-gradient(to right, rgba(155,135,245,0.1), rgba(236,72,153,0.1))",
              "linear-gradient(to right, rgba(236,72,153,0.1), rgba(155,135,245,0.1))",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-8 text-center">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <motion.h1 
                className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300"
                animate={{ 
                  backgroundPosition: ["0%", "100%"],
                  opacity: [0.5, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                QZ TEMPLATEZ
              </motion.h1>
              <p className="text-2xl text-gray-400 font-light">Where the future of video editing begins</p>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="features"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex flex-col items-center space-y-4 p-6 rounded-xl bg-purple-500/10 backdrop-blur-lg border border-purple-500/20"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="text-purple-400"
                  >
                    {feature.icon}
                  </motion.div>
                  <p className="text-xl font-medium text-gray-300">{feature.text}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="tagline"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-bold text-purple-300">
                Effortless • Intelligent • Inspired
              </h2>
              <p className="text-xl text-gray-400">
                Transform your raw footage into cinematic masterpieces
              </p>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                <Wand2 className="w-16 h-16 mx-auto text-purple-400" />
              </motion.div>
              <p className="text-2xl text-gray-300">
                Let's begin your creative journey
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default IntroScreen;