import React from 'react';
import { motion } from 'framer-motion';

const DurationHeader: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-editor-glow-purple via-editor-glow-pink to-editor-glow-blue animate-gradient mb-4">
        Select Your Video Duration
      </h1>
      <p className="text-gray-400 text-lg max-w-2xl mx-auto">
        Choose the perfect duration for your wedding story. Each option is carefully crafted to deliver the best possible experience.
      </p>
    </motion.div>
  );
};

export default DurationHeader;