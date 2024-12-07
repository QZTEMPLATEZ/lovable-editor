import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { theme } = useTheme();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < 3) {
        setCurrentStep(prev => prev + 1);
      } else {
        setTimeout(onComplete, 1000);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 bg-editor-bg flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Dynamic Light Trails */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-full h-full"
          animate={{
            background: [
              'radial-gradient(circle at 30% 30%, rgba(155, 135, 245, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 70%, rgba(155, 135, 245, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Ethereal Energy Sphere */}
      <motion.div
        className="absolute"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-editor-accent/20 to-purple-500/20 backdrop-blur-xl border border-editor-accent/30" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto p-8 text-center">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <motion.h2 
                className="text-4xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-editor-accent to-purple-400"
              >
                The Future of Video Editing
              </motion.h2>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="sphere"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="relative"
            >
              <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-editor-accent/30 to-purple-500/30 backdrop-blur-3xl border border-editor-accent/40 animate-pulse" />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="logo"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="space-y-6"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-editor-accent to-purple-500 shadow-lg shadow-purple-500/20" />
              <motion.p
                className="text-2xl font-light tracking-wide text-editor-accent"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                The Future of Video Editing
              </motion.p>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <motion.p
                className="text-2xl font-light tracking-wide text-editor-accent"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                Get Started Today
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default IntroScreen;