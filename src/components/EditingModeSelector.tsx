import React from 'react';
import { motion } from 'framer-motion';
import { Wand2, LayoutTemplate } from 'lucide-react';

export type EditingMode = 'ai' | 'template';

interface EditingModeSelectorProps {
  selectedMode: EditingMode | null;
  onModeSelect: (mode: EditingMode) => void;
}

const EditingModeSelector = ({ selectedMode, onModeSelect }: EditingModeSelectorProps) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-editor-glow.purple/10 via-editor-glow.pink/5 to-editor-glow.blue/10 blur-3xl" />
      
      <div className="relative space-y-8 backdrop-blur-xl bg-editor-glass.dark p-8 rounded-2xl border border-editor-border shadow-2xl">
        <div className="flex items-center gap-4">
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-3 w-3 rounded-full bg-editor-glow.purple shadow-lg shadow-editor-glow.purple/50"
          />
          <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-editor-glow.purple via-editor-glow.pink to-editor-glow.blue animate-gradient">
            Choose Editing Mode
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.button
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onModeSelect('ai')}
            className={`group relative overflow-hidden p-8 rounded-xl border-2 transition-all duration-300
              ${selectedMode === 'ai'
                ? 'border-editor-glow.purple bg-editor-glow.purple/10 shadow-lg shadow-editor-glow.purple/20'
                : 'border-editor-border hover:border-editor-glow.purple/50 bg-editor-glass.light'
              }`}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-editor-glow.purple/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <Wand2 className="w-8 h-8 text-editor-glow.purple" />
                <div className="h-px flex-1 bg-gradient-to-r from-editor-glow.purple/50 to-transparent" />
              </div>
              
              <h4 className="text-2xl font-semibold text-white mb-3">AI-Powered Editing</h4>
              <p className="text-editor-text">
                Upload reference videos and let AI learn your style preferences
              </p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onModeSelect('template')}
            className={`group relative overflow-hidden p-8 rounded-xl border-2 transition-all duration-300
              ${selectedMode === 'template'
                ? 'border-editor-glow.pink bg-editor-glow.pink/10 shadow-lg shadow-editor-glow.pink/20'
                : 'border-editor-border hover:border-editor-glow.pink/50 bg-editor-glass.light'
              }`}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-editor-glow.pink/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <LayoutTemplate className="w-8 h-8 text-editor-glow.pink" />
                <div className="h-px flex-1 bg-gradient-to-r from-editor-glow.pink/50 to-transparent" />
              </div>
              
              <h4 className="text-2xl font-semibold text-white mb-3">QZ Templates</h4>
              <p className="text-editor-text">
                Choose from our collection of pre-designed professional templates
              </p>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default EditingModeSelector;