import React from 'react';
import { motion } from 'framer-motion';

interface StyleActionsProps {
  onSelect: () => void;
}

const StyleActions = ({ onSelect }: StyleActionsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="self-center"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        className="px-6 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white rounded-lg transition-all duration-300 hover:border-purple-500/30"
      >
        Select Style
      </button>
    </motion.div>
  );
};

export default StyleActions;