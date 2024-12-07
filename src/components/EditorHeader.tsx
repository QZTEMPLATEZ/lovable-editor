import React from 'react';
import { EditingMode } from './EditingModeSelector';
import { VideoSizeRange } from './VideoSizeSelector';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock } from 'lucide-react';

interface EditorHeaderProps {
  editingMode: EditingMode;
  targetDuration: VideoSizeRange;
  onDurationChange: (duration: VideoSizeRange) => void;
}

const VIDEO_DURATIONS: VideoSizeRange[] = [
  { min: 4, max: 6, label: "4-6 minutes", description: "Perfect for social media highlights", icon: null },
  { min: 8, max: 12, label: "8-12 minutes", description: "Ideal for ceremony highlights", icon: null },
  { min: 15, max: 20, label: "15-20 minutes", description: "Complete ceremony coverage", icon: null },
  { min: 30, max: 40, label: "30-40 minutes", description: "Full wedding documentary", icon: null }
];

const EditorHeader = ({ editingMode, targetDuration, onDurationChange }: EditorHeaderProps) => {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400 animate-pulse">
        WEDDING TEMPLATEZ AI
      </h1>
      <p className="text-gray-400">
        {editingMode === 'ai' 
          ? 'Upload up to 3 reference videos for AI-powered wedding editing'
          : 'Choose from our professional wedding templates'}
      </p>
      
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-sm text-purple-300">
          <Clock className="w-4 h-4" />
          <span>Target Duration</span>
        </div>
        <Tabs 
          defaultValue={`${targetDuration.min}-${targetDuration.max}`}
          className="w-full max-w-md"
          onValueChange={(value) => {
            const [min, max] = value.split('-').map(Number);
            const newDuration = VIDEO_DURATIONS.find(d => d.min === min && d.max === max);
            if (newDuration) onDurationChange(newDuration);
          }}
        >
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full bg-purple-950/50">
            {VIDEO_DURATIONS.map((duration) => (
              <TabsTrigger
                key={`${duration.min}-${duration.max}`}
                value={`${duration.min}-${duration.max}`}
                className="data-[state=active]:bg-purple-500"
              >
                {duration.min}-{duration.max}m
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default EditorHeader;