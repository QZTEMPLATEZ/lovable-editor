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
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-6">
      <div className="w-full max-w-7xl mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-950/10 to-purple-900/5 backdrop-blur-lg rounded-3xl border border-purple-500/20 shadow-2xl">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-purple-500/5 animate-gradient" />
          
          <div className="relative p-12 space-y-12">
            {/* Header Section */}
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-purple-500/10 rounded-full">
                <Clock className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                  Select Video Duration
                </h2>
              </div>
              
              <p className="text-base text-purple-200/70 max-w-2xl mx-auto">
                {editingMode === 'ai' 
                  ? 'Choose the perfect duration for your wedding video. Each option is carefully crafted to suit different storytelling needs.'
                  : 'Select a duration template that best fits your wedding story. We offer various lengths to capture every special moment.'}
              </p>
            </div>

            {/* Duration Selection Tabs */}
            <Tabs 
              defaultValue={`${targetDuration.min}-${targetDuration.max}`}
              className="w-full"
              onValueChange={(value) => {
                const [min, max] = value.split('-').map(Number);
                const newDuration = VIDEO_DURATIONS.find(d => d.min === min && d.max === max);
                if (newDuration) onDurationChange(newDuration);
              }}
            >
              <TabsList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full bg-transparent">
                {VIDEO_DURATIONS.map((duration) => (
                  <TabsTrigger
                    key={`${duration.min}-${duration.max}`}
                    value={`${duration.min}-${duration.max}`}
                    className="relative group p-8 data-[state=active]:bg-purple-500/90 data-[state=active]:shadow-xl data-[state=active]:backdrop-blur-sm data-[state=active]:scale-105 transition-all duration-300 rounded-2xl hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/40"
                  >
                    <div className="flex flex-col items-center gap-4">
                      {/* Badge Section */}
                      {duration.min === 4 && (
                        <Badge variant="secondary" className="absolute -top-3 text-[10px] bg-gradient-to-r from-purple-400 to-pink-400 text-white font-medium px-3 py-0.5 shadow-lg rounded-full border border-white/10 animate-pulse">
                          PRO
                        </Badge>
                      )}
                      {duration.min === 8 && (
                        <Badge variant="secondary" className="absolute -top-3 text-[10px] bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium px-3 py-0.5 shadow-lg rounded-full border border-white/10">
                          PRO MAX
                        </Badge>
                      )}
                      {(duration.min === 15 || duration.min === 30) && (
                        <Badge variant="secondary" className="absolute -top-3 text-[10px] bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-medium px-3 py-0.5 shadow-lg rounded-full border border-white/10">
                          BUSINESS
                        </Badge>
                      )}
                      
                      {/* Duration Info */}
                      <span className="text-2xl font-semibold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 group-hover:from-white group-hover:to-white transition-colors">
                        {duration.min}-{duration.max}m
                      </span>
                      <span className="text-sm text-purple-200/80 group-hover:text-white/90 transition-colors text-center max-w-[200px]">
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
    </div>
  );
};

export default EditorHeader;