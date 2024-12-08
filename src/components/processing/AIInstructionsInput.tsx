import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Sparkles } from 'lucide-react';

interface AIInstructionsInputProps {
  value: string;
  onChange: (value: string) => void;
}

const AIInstructionsInput = ({ value, onChange }: AIInstructionsInputProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <Wand2 className="w-6 h-6 text-purple-400 animate-pulse" />
          <Sparkles className="w-4 h-4 text-pink-400 absolute -top-2 -right-2 animate-bounce" />
        </div>
        <h3 className="text-xl font-semibold text-purple-300">
          AI Instructions
        </h3>
      </div>

      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Describe how you want your video to be edited..."
          className="min-h-[200px] bg-purple-500/5 border border-purple-500/20 rounded-xl p-4 text-purple-100 placeholder:text-purple-300/50 focus:border-purple-500/50 focus:ring-purple-500/20"
        />
        <div className="absolute inset-0 pointer-events-none rounded-xl bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {['Cinematic', 'Fast-paced', 'Dramatic', 'Smooth'].map((style) => (
          <button
            key={style}
            onClick={() => onChange(value + ' ' + style.toLowerCase())}
            className="px-4 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 transition-all duration-300"
          >
            {style}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AIInstructionsInput;