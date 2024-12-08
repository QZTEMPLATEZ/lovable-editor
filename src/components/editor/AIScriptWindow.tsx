import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";

interface AIScriptWindowProps {
  value: string;
  onChange: (value: string) => void;
}

const AIScriptWindow = ({ value, onChange }: AIScriptWindowProps) => {
  return (
    <div className="space-y-6 bg-editor-bg/80 backdrop-blur-xl rounded-xl border border-purple-500/20 p-6">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Bot className="w-6 h-6 text-purple-400" />
          <Sparkles className="w-4 h-4 text-pink-400 absolute -top-2 -right-2 animate-pulse" />
        </div>
        <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
          AI Script Editor
        </h3>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Describe how you want your video to be edited..."
          className="min-h-[200px] bg-purple-500/5 border border-purple-500/20 rounded-xl p-4 text-purple-100 placeholder:text-purple-300/50 focus:border-purple-500/50 focus:ring-purple-500/20"
        />
        <div className="absolute inset-0 pointer-events-none rounded-xl bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {['Cinematic', 'Fast-paced', 'Dramatic', 'Smooth'].map((style) => (
          <motion.button
            key={style}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(value + ' ' + style.toLowerCase())}
            className="px-4 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 transition-all duration-300"
          >
            {style}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default AIScriptWindow;