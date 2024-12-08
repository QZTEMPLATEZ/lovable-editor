import React from 'react';
import { EditingMode } from './EditingModeSelector';
import { VideoSizeRange } from './VideoSizeSelector';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock } from 'lucide-react';
import Logo from './Logo';

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
    <div className="text-center space-y-6">
      <div className="flex items-center justify-center gap-3">
        <Logo className="animate-pulse" />
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400">
          WEDDING TEMPLATEZ
        </h1>
      </div>
      
      <div className="max-w-2xl mx-auto bg-purple-950/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-purple-400 animate-pulse" />
            <h2 className="text-xl font-semibold text-purple-300">Select Video Duration</h2>
          </div>
          
          <p className="text-sm text-gray-400 mb-4">
            {editingMode === 'ai' 
              ? 'Choose the perfect duration for your wedding video'
              : 'Select a duration template for your wedding video'}
          </p>
          
          <Tabs 
            defaultValue={`${targetDuration.min}-${targetDuration.max}`}
            className="w-full"
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
                  className="data-[state=active]:bg-purple-500 data-[state=active]:text-white relative group"
                >
                  <span>{duration.min}-{duration.max}m</span>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {duration.description}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EditorHeader;