import React from 'react';
import { EditingMode } from './EditingModeSelector';
import { VideoSizeRange } from './VideoSizeSelector';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Film, Star, Trophy, Crown } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-b from-editor-bg to-editor-bg/95 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 rounded-full">
            <Clock className="w-3 h-3 text-purple-400" />
            <span className="text-xs font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
              Create Your Perfect Wedding Film
            </span>
          </div>
          
          <h1 className="text-xl sm:text-2xl font-medium tracking-tight text-white max-w-lg mx-auto leading-relaxed">
            Choose the Perfect Duration for Your Story
          </h1>
          
          <p className="text-sm text-purple-200/70 max-w-md mx-auto">
            Select the ideal length for your wedding video. Each option is carefully designed to capture your special moments.
          </p>
        </div>

        {/* Duration Selection Grid */}
        <Tabs 
          defaultValue={`${targetDuration.min}-${targetDuration.max}`}
          className="w-full"
          onValueChange={(value) => {
            const [min, max] = value.split('-').map(Number);
            const newDuration = VIDEO_DURATIONS.find(d => d.min === min && d.max === max);
            if (newDuration) onDurationChange(newDuration);
          }}
        >
          <TabsList className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full bg-transparent max-w-4xl mx-auto">
            {VIDEO_DURATIONS.map((duration, index) => (
              <TabsTrigger
                key={`${duration.min}-${duration.max}`}
                value={`${duration.min}-${duration.max}`}
                className="relative group p-6 data-[state=active]:bg-purple-500/90 data-[state=active]:shadow-lg data-[state=active]:backdrop-blur-sm data-[state=active]:scale-[1.02] transition-all duration-300 rounded-xl hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/40 h-full flex flex-col items-center justify-between"
              >
                <div className="flex flex-col items-center gap-4 w-full">
                  {/* Package Icons */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    {index === 0 && (
                      <div className="p-2 bg-gradient-to-r from-purple-500/90 to-pink-500/90 rounded-full shadow-lg">
                        <Film className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {index === 1 && (
                      <div className="p-2 bg-gradient-to-r from-purple-600/90 to-pink-600/90 rounded-full shadow-lg">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {index === 2 && (
                      <div className="p-2 bg-gradient-to-r from-purple-700/90 to-pink-700/90 rounded-full shadow-lg">
                        <Trophy className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {index === 3 && (
                      <div className="p-2 bg-gradient-to-r from-purple-800/90 to-pink-800/90 rounded-full shadow-lg">
                        <Crown className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Package Labels */}
                  <Badge variant="secondary" className="absolute -top-2 right-2 text-[10px] bg-gradient-to-r from-purple-400/90 to-pink-400/90 text-white font-medium px-2 py-0.5 shadow-sm rounded-full">
                    {index === 0 && "STARTER"}
                    {index === 1 && "PREMIUM"}
                    {index === 2 && "LUXURY"}
                    {index === 3 && "ULTIMATE"}
                  </Badge>
                  
                  {/* Duration Info */}
                  <div className="mt-8 text-center">
                    <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 group-hover:from-white group-hover:to-white transition-colors">
                      {duration.min}-{duration.max}
                    </span>
                    <span className="text-sm text-white/90 ml-1">min</span>
                  </div>
                  
                  <span className="text-xs text-purple-200/80 group-hover:text-white/90 transition-colors text-center mt-2 px-2">
                    {duration.description}
                  </span>

                  {/* Features List */}
                  <ul className="mt-4 space-y-2 text-xs w-full px-2">
                    {index === 0 && (
                      <>
                        <li className="flex items-center text-purple-200/70">
                          <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                          <span className="line-clamp-1">Social media optimized</span>
                        </li>
                        <li className="flex items-center text-purple-200/70">
                          <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                          <span className="line-clamp-1">Key moments highlight</span>
                        </li>
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <li className="flex items-center text-purple-200/70">
                          <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                          <span className="line-clamp-1">Extended highlights</span>
                        </li>
                        <li className="flex items-center text-purple-200/70">
                          <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                          <span className="line-clamp-1">Ceremony coverage</span>
                        </li>
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <li className="flex items-center text-purple-200/70">
                          <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                          <span className="line-clamp-1">Full ceremony</span>
                        </li>
                        <li className="flex items-center text-purple-200/70">
                          <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                          <span className="line-clamp-1">Reception highlights</span>
                        </li>
                      </>
                    )}
                    {index === 3 && (
                      <>
                        <li className="flex items-center text-purple-200/70">
                          <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                          <span className="line-clamp-1">Complete coverage</span>
                        </li>
                        <li className="flex items-center text-purple-200/70">
                          <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                          <span className="line-clamp-1">Multiple angles</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Bottom Section */}
        <div className="mt-8 text-center">
          <p className="text-purple-200/60 text-xs">
            All packages include professional editing, color grading, and licensed music
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditorHeader;