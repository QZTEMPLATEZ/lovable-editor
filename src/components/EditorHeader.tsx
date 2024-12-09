import React from 'react';
import { EditingMode } from './EditingModeSelector';
import { VideoSizeRange } from './VideoSizeSelector';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Crown } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface EditorHeaderProps {
  editingMode: EditingMode;
  targetDuration: VideoSizeRange;
  onDurationChange: (duration: VideoSizeRange) => void;
  userTier?: 'basic' | 'pro' | 'business';
}

const VIDEO_DURATIONS: VideoSizeRange[] = [
  {
    min: 0.5,
    max: 1.5,
    name: "Social",
    label: "30s - 1:30min",
    description: "Quick, high-energy edit for social media",
    icon: null,
    recommendedTracks: 1,
    tier: 'basic'
  },
  {
    min: 3,
    max: 5,
    name: "Trailer",
    label: "3-5 minutes",
    description: "Dynamic event summary",
    icon: null,
    recommendedTracks: 2,
    tier: 'pro'
  },
  {
    min: 8,
    max: 12,
    name: "Short Film",
    label: "8-12 minutes",
    description: "Detailed artistic edit",
    icon: null,
    recommendedTracks: 3,
    tier: 'pro'
  },
  {
    min: 15,
    max: 20,
    name: "Wedding Movie",
    label: "15-20 minutes",
    description: "Comprehensive coverage",
    icon: null,
    recommendedTracks: 4,
    tier: 'business'
  },
  {
    min: 30,
    max: 40,
    name: "Cinematic Wedding",
    label: "30-40 minutes",
    description: "Full cinematic experience",
    icon: null,
    recommendedTracks: 6,
    tier: 'business'
  }
];

const EditorHeader = ({ editingMode, targetDuration, onDurationChange, userTier = 'basic' }: EditorHeaderProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-editor-bg to-editor-bg/95 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/5 rounded-full border border-purple-500/10">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">
              Duration Selection
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            Select Video Duration
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            Choose the ideal length for your wedding film. Each option is carefully crafted to capture the essence of your special day.
          </p>
        </div>

        <Tabs 
          defaultValue={`${targetDuration.min}-${targetDuration.max}`}
          className="w-full"
          onValueChange={(value) => {
            const [min, max] = value.split('-').map(Number);
            const newDuration = VIDEO_DURATIONS.find(d => d.min === min && d.max === max);
            if (newDuration && (userTier !== 'basic' || newDuration.tier === 'basic')) {
              onDurationChange(newDuration);
            }
          }}
        >
          <TabsList className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full bg-transparent">
            {VIDEO_DURATIONS.map((duration, index) => {
              const isLocked = userTier === 'basic' && duration.tier !== 'basic';
              
              return (
                <TabsTrigger
                  key={`${duration.min}-${duration.max}`}
                  value={`${duration.min}-${duration.max}`}
                  disabled={isLocked}
                  className={`group relative p-6 transition-all duration-500 rounded-xl border border-purple-500/20 
                    ${isLocked ? 'opacity-50' : 'hover:border-purple-500/30'} 
                    data-[state=active]:scale-[1.02] data-[state=active]:bg-purple-500/10 
                    data-[state=active]:shadow-[0_0_30px_rgba(168,85,247,0.15)] data-[state=active]:backdrop-blur-sm
                    data-[state=inactive]:opacity-50 data-[state=inactive]:hover:opacity-75 h-full`}
                >
                  <div className="flex flex-col items-start text-left w-full">
                    <div className="w-full mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-yellow-300">
                          {duration.name}
                        </h3>
                        <Badge 
                          variant="outline" 
                          className="px-3 py-1 text-sm font-medium uppercase tracking-wider bg-yellow-500/10 text-yellow-300 border-yellow-500/20"
                        >
                          {duration.tier}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-medium text-gray-400">
                          {duration.label}
                        </span>
                        {duration.tier !== 'basic' && (
                          <Crown className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                    </div>
                    
                    <div className="w-full pt-4 border-t border-purple-500/20">
                      <p className="text-sm text-gray-400 mb-3">
                        {duration.description}
                      </p>
                      <div className="flex items-center text-gray-400 text-sm">
                        <span className="w-1.5 h-1.5 bg-yellow-400/50 rounded-full mr-2"></span>
                        Recommended Tracks: {duration.recommendedTracks}
                      </div>
                    </div>
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default EditorHeader;