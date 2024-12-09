import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Zap, Brain, Cpu, Wand2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import AIScriptWindow from './AIScriptWindow';

interface AIEditStepProps {
  aiScript: string;
  onChange: (value: string) => void;
  onStartEditing: () => void;
}

const AIEditStep = ({ aiScript, onChange, onStartEditing }: AIEditStepProps) => {
  return (
    <div className="space-y-8 max-w-[1920px] mx-auto">
      {/* Enhanced Header Section with Gradient Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 relative"
      >
        <div className="relative inline-block">
          <motion.div
            animate={{ 
              boxShadow: ["0 0 20px #9b87f5", "0 0 40px #9b87f5", "0 0 20px #9b87f5"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-4 rounded-full bg-gradient-to-br from-editor-glow-purple/20 to-editor-glow-pink/20 backdrop-blur-xl"
          >
            <Bot className="w-16 h-16 text-editor-glow-purple" />
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="w-8 h-8 text-editor-glow-pink" />
            </motion.div>
          </motion.div>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-editor-glow-purple via-editor-glow-pink to-editor-glow-blue animate-gradient">
          AI Video Editor
        </h2>
        <p className="text-lg md:text-xl text-editor-text/70 max-w-2xl mx-auto font-light">
          Describe your vision and let our AI transform your footage into a masterpiece
        </p>
      </motion.div>

      {/* Enhanced Features Grid with Responsive Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          { icon: Brain, title: "Smart Scene Detection", desc: "Automatically identifies key moments and transitions" },
          { icon: Cpu, title: "Advanced Processing", desc: "Real-time video enhancement and optimization" },
          { icon: Wand2, title: "Magic Editing", desc: "Professional transitions & cinematic effects" }
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative p-6 rounded-xl border border-editor-border/30 
                     backdrop-blur-sm overflow-hidden
                     bg-gradient-to-br from-editor-bg/95 to-editor-bg/80"
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-editor-glow-purple/5 via-transparent to-editor-glow-pink/5 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            
            {/* Animated border glow */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0px #9b87f5",
                  "0 0 20px #9b87f5",
                  "0 0 0px #9b87f5"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
            />

            <feature.icon className="w-10 h-10 text-editor-glow-purple mb-4 transform group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-semibold text-white mb-2 relative z-10">{feature.title}</h3>
            <p className="text-sm text-editor-text/70 relative z-10">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Enhanced AI Script Editor with Glass Morphism */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative rounded-xl overflow-hidden backdrop-blur-xl
                 border border-editor-border/30 bg-editor-bg/30"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-editor-glow-purple/5 via-transparent to-editor-glow-pink/5 opacity-30" />
        <AIScriptWindow 
          value={aiScript}
          onChange={onChange}
        />
      </motion.div>

      {/* Enhanced Start Editing Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center py-6"
      >
        <Button
          onClick={onStartEditing}
          disabled={!aiScript}
          className="relative group px-8 py-6 bg-gradient-to-r from-editor-glow-purple via-editor-glow-pink to-editor-glow-blue 
                   hover:opacity-90 transition-all duration-300 rounded-xl text-lg shadow-lg
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <motion.span 
            className="relative z-10 flex items-center gap-3 font-medium"
            animate={{ scale: aiScript ? [1, 1.02, 1] : 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Start AI Processing
            <Zap className="w-6 h-6 animate-pulse" />
          </motion.span>
          <div className="absolute inset-0 bg-gradient-to-r from-editor-glow-purple via-editor-glow-pink to-editor-glow-blue 
                       opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl blur-xl" />
        </Button>
      </motion.div>
    </div>
  );
};

export default AIEditStep;