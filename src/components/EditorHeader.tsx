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
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-8 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20 backdrop-blur-sm">
            <Clock className="w-4 h-4 text-purple-300" />
            <span className="text-sm font-medium text-purple-200">
              Duration Selection
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white animate-gradient">
            Select Video Duration
          </h1>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
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
          <TabsList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full bg-transparent">
            {VIDEO_DURATIONS.map((duration, index) => {
              const isLocked = userTier === 'basic' && duration.tier !== 'basic';
              
              return (
                <TabsTrigger
                  key={`${duration.min}-${duration.max}`}
                  value={`${duration.min}-${duration.max}`}
                  disabled={isLocked}
                  className={`group relative p-8 transition-all duration-500 rounded-2xl border-2
                    ${isLocked ? 'opacity-50 border-purple-500/10' : 'hover:border-purple-400/50 border-purple-500/20'} 
                    data-[state=active]:scale-[1.02] data-[state=active]:bg-purple-500/10 
                    data-[state=active]:shadow-[0_0_40px_rgba(168,85,247,0.2)] data-[state=active]:backdrop-blur-lg
                    data-[state=inactive]:opacity-70 data-[state=inactive]:hover:opacity-90 h-full
                    hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300`}
                >
                  <div className="flex flex-col items-center text-center w-full space-y-6">
                    <div className="w-full space-y-4">
                      <div className="flex flex-col items-center gap-3">
                        <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200 animate-gradient">
                          {duration.name}
                        </h3>
                        <Badge 
                          variant="outline" 
                          className="px-4 py-1 text-sm font-medium uppercase tracking-wider bg-yellow-500/5 text-yellow-200/90 border-yellow-500/20"
                        >
                          {duration.tier}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg font-medium text-gray-300">
                          {duration.label}
                        </span>
                        {duration.tier !== 'basic' && (
                          <Crown className="w-5 h-5 text-yellow-400/80" />
                        )}
                      </div>
                    </div>
                    
                    <div className="w-full pt-6 border-t border-purple-500/20">
                      <p className="text-base text-gray-300/90 mb-4 leading-relaxed">
                        {duration.description}
                      </p>
                      <div className="flex items-center justify-center text-gray-300/80 text-sm gap-2">
                        <span className="w-2 h-2 bg-yellow-400/50 rounded-full"></span>
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