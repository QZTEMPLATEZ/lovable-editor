import React from 'react';
import { motion } from 'framer-motion';
import IntroText from './intro/IntroText';
import GeometricShapes from './intro/GeometricShapes';
import NeuralNetwork from './intro/NeuralNetwork';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  return (
    <div className="min-h-screen bg-editor-bg relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <GeometricShapes />
        <NeuralNetwork />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img
              src="/lovable-uploads/d5e27b14-ae6c-4a12-8420-a543cf67665b.png"
              alt="Wedding Dress"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Text overlay with enhanced animations */}
          <div className="relative z-20 text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-white mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.span
                  className="bg-clip-text text-transparent bg-gradient-to-r from-editor-glow-purple via-editor-glow-pink to-editor-glow-blue animate-gradient"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                    delay: 0.7
                  }}
                >
                  Unlimited AI Wedding Editor
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <IntroText onComplete={onComplete} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;