import React from 'react';
import { motion } from 'framer-motion';
import { Wand2, Sparkles } from 'lucide-react';

interface StartEditingButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const StartEditingButton = ({ onClick, disabled }: StartEditingButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className="relative w-full group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
      
      <div className="relative flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 px-8 py-4 rounded-xl border border-purple-500/30 backdrop-blur-sm transition-all duration-300">
        <Wand2 className="w-6 h-6 text-purple-400" />
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
          Start AI Editing
        </span>
        <Sparkles className="w-4 h-4 text-pink-400 absolute -top-1 right-4 animate-pulse" />
      </div>
    </motion.button>
  );
};

export default StartEditingButton;