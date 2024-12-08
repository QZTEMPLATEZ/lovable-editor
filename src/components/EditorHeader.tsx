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
  { min: 4, max: 6, label: "4-6 minutes", description: "Perfect for social media highlights", icon: null, recommendedTracks: 2 },
  { min: 8, max: 12, label: "8-12 minutes", description: "Ideal for ceremony highlights", icon: null, recommendedTracks: 3 },
  { min: 15, max: 20, label: "15-20 minutes", description: "Complete ceremony coverage", icon: null, recommendedTracks: 4 },
  { min: 30, max: 40, label: "30-40 minutes", description: "Full wedding documentary", icon: null, recommendedTracks: 6 }
];

const EditorHeader = ({ editingMode, targetDuration, onDurationChange }: EditorHeaderProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-editor-bg to-editor-bg/95 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/5 rounded-full border border-purple-500/10">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">
              Duration Selection
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Select Video Duration
          </h1>
          
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            Choose the ideal length for your wedding film. Each option is carefully crafted to capture the essence of your special day.
          </p>
        </div>

        <Tabs 
          defaultValue={`${targetDuration.min}-${targetDuration.max}`}
          className="w-full"
          onValueChange={(value) => {
            const [min, max] = value.split('-').map(Number);
            const newDuration = VIDEO_DURATIONS.find(d => d.min === min && d.max === max);
            if (newDuration) onDurationChange(newDuration);
          }}
        >
          <TabsList className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full bg-transparent">
            {VIDEO_DURATIONS.map((duration, index) => (
              <TabsTrigger
                key={`${duration.min}-${duration.max}`}
                value={`${duration.min}-${duration.max}`}
                className="group relative p-6 transition-all duration-500 rounded-xl border border-purple-500/20 hover:border-purple-500/30 h-full
                  data-[state=active]:scale-[1.02] data-[state=active]:bg-purple-500/10 data-[state=active]:shadow-[0_0_30px_rgba(168,85,247,0.15)] data-[state=active]:backdrop-blur-sm
                  data-[state=inactive]:opacity-50 data-[state=inactive]:hover:opacity-75"
              >
                <div className="flex flex-col items-start text-left space-y-4 w-full">
                  <div className="flex justify-between items-center w-full">
                    <Badge variant="secondary" className="bg-pink-500/10 text-pink-300 border-pink-500/20 group-data-[state=active]:bg-pink-500/20 group-data-[state=active]:border-pink-500/30">
                      {index === 0 && "PRO"}
                      {index === 1 && "PRO MAX"}
                      {index === 2 && "BUSINESS"}
                      {index === 3 && "BUSINESS PLUS"}
                    </Badge>
                    <span className="text-lg font-medium text-white group-data-[state=active]:text-purple-300 transition-colors">
                      {duration.min}-{duration.max}
                      <span className="text-sm ml-1 text-gray-400">min</span>
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-base font-medium text-gray-200 group-data-[state=active]:text-purple-200">
                      {duration.description}
                    </h3>
                    <ul className="space-y-2 text-sm">
                      {index === 0 && (
                        <>
                          <li className="flex items-center text-gray-400">
                            <span className="w-1 h-1 bg-purple-400/50 rounded-full mr-2"></span>
                            Social media optimized
                          </li>
                          <li className="flex items-center text-gray-400">
                            <span className="w-1 h-1 bg-purple-400/50 rounded-full mr-2"></span>
                            Key moments highlight
                          </li>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <li className="flex items-center text-gray-400">
                            <span className="w-1 h-1 bg-purple-400/50 rounded-full mr-2"></span>
                            Extended highlights
                          </li>
                          <li className="flex items-center text-gray-400">
                            <span className="w-1 h-1 bg-purple-400/50 rounded-full mr-2"></span>
                            Ceremony coverage
                          </li>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <li className="flex items-center text-gray-400">
                            <span className="w-1 h-1 bg-purple-400/50 rounded-full mr-2"></span>
                            Full ceremony
                          </li>
                          <li className="flex items-center text-gray-400">
                            <span className="w-1 h-1 bg-purple-400/50 rounded-full mr-2"></span>
                            Reception highlights
                          </li>
                        </>
                      )}
                      {index === 3 && (
                        <>
                          <li className="flex items-center text-gray-400">
                            <span className="w-1 h-1 bg-purple-400/50 rounded-full mr-2"></span>
                            Complete coverage
                          </li>
                          <li className="flex items-center text-gray-400">
                            <span className="w-1 h-1 bg-purple-400/50 rounded-full mr-2"></span>
                            Multiple angles
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default EditorHeader;