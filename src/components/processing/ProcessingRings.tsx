import React from 'react';
import { motion } from 'framer-motion';

const ProcessingRings = () => {
  return (
    <div className="relative">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-32 h-32 border-4 border-editor-glow-purple/30 rounded-full"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 w-24 h-24 border-4 border-editor-glow-pink/30 rounded-full"
      />
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-8 w-16 h-16 border-4 border-editor-glow-blue/30 rounded-full"
      />
    </div>
  );
};

export default ProcessingRings;