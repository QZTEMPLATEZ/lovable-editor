import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Zap, Brain, Cpu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import AIScriptWindow from './AIScriptWindow';

interface AIEditStepProps {
  aiScript: string;
  onChange: (value: string) => void;
  onStartEditing: () => void;
}

const AIEditStep = ({ aiScript, onChange, onStartEditing }: AIEditStepProps) => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="relative inline-block">
          <Bot className="w-12 h-12 text-editor-glow-purple animate-pulse" />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="w-6 h-6 text-editor-glow-pink" />
          </motion.div>
        </div>
        <h2 className="text-3xl font-bold gradient-text">AI Video Editor</h2>
        <p className="text-editor-text/70 max-w-2xl mx-auto">
          Describe your vision and let our AI transform your footage into a masterpiece
        </p>
      </motion.div>

      {/* AI Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { icon: Brain, title: "Smart Scene Detection", desc: "Automatically identifies key moments" },
          { icon: Cpu, title: "Advanced Processing", desc: "Real-time video enhancement" },
          { icon: Zap, title: "Quick Rendering", desc: "Lightning-fast processing" }
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel p-6 rounded-xl space-y-3 hover:glow-purple transition-all duration-300"
          >
            <feature.icon className="w-8 h-8 text-editor-glow-purple" />
            <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
            <p className="text-sm text-editor-text/70">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* AI Script Editor */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        <AIScriptWindow 
          value={aiScript}
          onChange={onChange}
        />
      </motion.div>

      {/* Start Editing Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center"
      >
        <Button
          onClick={onStartEditing}
          disabled={!aiScript}
          className="relative group px-8 py-4 bg-gradient-to-r from-editor-glow-purple via-editor-glow-pink to-editor-glow-blue 
                     hover:opacity-90 transition-all duration-300 rounded-xl font-medium text-lg shadow-lg"
        >
          <span className="relative z-10 flex items-center gap-2">
            Start AI Processing
            <Zap className="w-5 h-5 animate-pulse" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-editor-glow-purple via-editor-glow-pink to-editor-glow-blue 
                        opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl blur-xl" />
        </Button>
      </motion.div>
    </div>
  );
};

export default AIEditStep;