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
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`relative w-full max-w-md group ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-editor-glow-purple via-editor-glow-pink to-editor-glow-blue rounded-xl blur-2xl opacity-30 group-hover:opacity-70 transition-opacity" />
      
      {/* Button content */}
      <div className="relative flex items-center justify-center gap-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 px-8 py-6 rounded-xl border border-purple-500/50 backdrop-blur-xl shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-xl animate-pulse" />
        
        <Wand2 className="w-8 h-8 text-purple-300 animate-bounce" />
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 tracking-wide">
          Start AI Editing
        </span>
        <Sparkles className="w-6 h-6 text-pink-300 absolute -top-2 right-4 animate-pulse" />
      </div>
    </motion.button>
  );
};

export default StartEditingButton;