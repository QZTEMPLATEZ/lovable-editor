import React from 'react';
import { Terminal } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";

interface AIInstructionsInputProps {
  value: string;
  onChange: (value: string) => void;
}

const AIInstructionsInput = ({ value, onChange }: AIInstructionsInputProps) => {
  return (
    <div className="bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 rounded-2xl p-8 backdrop-blur-lg border border-purple-500/30 shadow-2xl">
      <div className="flex items-center gap-3 mb-4">
        <Terminal className="w-5 h-5 text-purple-400" />
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
          AI Instructions
        </h3>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe how you want the AI to edit your video (e.g., 'Create a dynamic montage with smooth transitions and color grading similar to movie trailers')"
        className="min-h-[100px] bg-black/20 border-purple-500/30 focus:border-purple-500/50 text-purple-100 placeholder:text-purple-300/50"
      />
    </div>
  );
};

export default AIInstructionsInput;