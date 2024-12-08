import React from 'react';
import { EditingMode } from './EditingModeSelector';
import { VideoSizeRange } from './VideoSizeSelector';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

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
    <div className="text-center space-y-8">
      <div className="max-w-3xl mx-auto bg-purple-950/5 backdrop-blur-sm rounded-2xl p-10 border border-purple-500/10 shadow-xl">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-purple-400/80" />
            <h2 className="text-xl font-medium text-purple-300/90">Select Video Duration</h2>
          </div>
          
          <p className="text-sm text-gray-400/90">
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
            <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full bg-purple-950/20 p-1.5 rounded-xl">
              {VIDEO_DURATIONS.map((duration) => (
                <TabsTrigger
                  key={`${duration.min}-${duration.max}`}
                  value={`${duration.min}-${duration.max}`}
                  className="relative group py-6 px-4 data-[state=active]:bg-purple-500/90 data-[state=active]:backdrop-blur-sm data-[state=active]:text-white transition-all duration-300 rounded-lg"
                >
                  <div className="flex flex-col items-center gap-2">
                    {duration.min === 4 && (
                      <Badge variant="secondary" className="absolute -top-2.5 text-[10px] bg-gradient-to-r from-purple-400 to-pink-400 text-white font-medium px-2.5 py-0.5 shadow-lg rounded-full border border-white/10">
                        PRO
                      </Badge>
                    )}
                    {duration.min === 8 && (
                      <Badge variant="secondary" className="absolute -top-2.5 text-[10px] bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium px-2.5 py-0.5 shadow-lg rounded-full border border-white/10">
                        PRO MAX
                      </Badge>
                    )}
                    {(duration.min === 15 || duration.min === 30) && (
                      <Badge variant="secondary" className="absolute -top-2.5 text-[10px] bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-medium px-2.5 py-0.5 shadow-lg rounded-full border border-white/10">
                        BUSINESS
                      </Badge>
                    )}
                    <span className="text-lg font-medium mt-2">{duration.min}-{duration.max}m</span>
                    <span className="text-xs text-gray-400/90 group-hover:text-gray-300 transition-colors duration-300">
                      {duration.description}
                    </span>
                  </div>
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