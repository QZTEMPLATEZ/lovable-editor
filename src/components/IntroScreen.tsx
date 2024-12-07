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
      if (currentStep < 4) {
        setCurrentStep(prev => prev + 1);
      } else {
        setTimeout(onComplete, 1000);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      text: "Intelligence"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      text: "Creativity"
    },
    {
      icon: <Film className="w-8 h-8" />,
      text: "Simplicity"
    },
    {
      icon: <Wand2 className="w-8 h-8" />,
      text: "Perfection"
    }
  ];

  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "linear-gradient(to right, rgba(59,130,246,0.1), rgba(147,51,234,0.1))",
            "linear-gradient(to right, rgba(147,51,234,0.1), rgba(59,130,246,0.1))",
          ],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-3xl"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [1, 1.2, 1],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
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
                className="text-6xl font-light tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
                animate={{ 
                  backgroundPosition: ["0%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                Welcome to the Future of Video Editing
              </motion.h1>
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
                  className="flex flex-col items-center space-y-4 p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="text-blue-400"
                  >
                    {feature.icon}
                  </motion.div>
                  <p className="text-xl font-light tracking-wide text-gray-200">{feature.text}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="workflow"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-8"
            >
              <div className="relative w-full h-64 rounded-2xl overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-3xl font-light text-white/90">
                    Crafting Masterpieces, Effortlessly
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Intelligence Meets Simplicity
              </h2>
              <motion.div
                className="w-32 h-1 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1 }}
              />
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <motion.p
                className="text-2xl font-light tracking-wide text-gray-300"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                Let's Get Started
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default IntroScreen;