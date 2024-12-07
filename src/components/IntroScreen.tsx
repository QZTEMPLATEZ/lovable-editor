import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NeuralNetwork from './intro/NeuralNetwork';
import GeometricShapes from './intro/GeometricShapes';
import IntroText from './intro/IntroText';

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

  return (
    <motion.div 
      className="fixed inset-0 bg-editor-bg flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Neural Network Background */}
      <NeuralNetwork />

      {/* Geometric Shapes */}
      <GeometricShapes />

      <div className="relative z-10 max-w-4xl mx-auto p-8 text-center">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <IntroText 
              text="Where Creativity Meets Intelligence"
              className="space-y-6"
            />
          )}

          {currentStep === 1 && (
            <motion.div
              key="features"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-8"
            >
              {["Smart Editing", "Futuristic Workflow", "Flawless Results", "AI-Powered"].map((text, index) => (
                <IntroText
                  key={text}
                  text={text}
                  delay={index * 0.2}
                  className="p-8 rounded-2xl bg-black/20 backdrop-blur-xl border border-editor-accent/10"
                />
              ))}
            </motion.div>
          )}

          {currentStep === 2 && (
            <IntroText 
              text="Your Vision, Perfectly Crafted"
              delay={0.2}
              className="space-y-8"
            />
          )}

          {currentStep === 3 && (
            <IntroText 
              text="Edit Smarter. Create Faster."
              delay={0.2}
              className="space-y-6"
            />
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