import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import IntroText from './intro/IntroText';
import GeometricShapes from './intro/GeometricShapes';
import NeuralNetwork from './intro/NeuralNetwork';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-editor-bg via-editor-bg/95 to-editor-bg relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
      
      {/* Content Container */}
      <div className="relative container mx-auto px-4 py-12 min-h-screen flex flex-col items-center justify-center">
        <GeometricShapes />
        <NeuralNetwork />
        <IntroText />
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="mt-8"
        >
          <Button
            onClick={onComplete}
            className="bg-editor-glow-purple hover:bg-editor-glow-purple/90 text-white px-8 py-4 rounded-xl text-lg font-medium shadow-lg shadow-purple-500/20 transition-all duration-300"
          >
            Get Started
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default IntroScreen;