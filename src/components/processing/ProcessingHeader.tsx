import React from 'react';
import { Film, Clock, StopCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ProcessingHeaderProps {
  remainingTime: number;
}

const ProcessingHeader = ({ remainingTime }: ProcessingHeaderProps) => {
  const { toast } = useToast();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStopProcessing = () => {
    toast({
      title: "Processing Stopped",
      description: "Your video processing has been cancelled.",
      variant: "destructive",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Status Card */}
      <div className="bg-editor-panel/50 backdrop-blur-lg rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/30 transition-all duration-300">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <Film className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-purple-300">Processing Video</h2>
            <p className="text-sm text-gray-400">AI-powered editing in progress</p>
          </div>
        </div>
      </div>

      {/* Timer Card */}
      <div className="bg-editor-panel/50 backdrop-blur-lg rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/30 transition-all duration-300">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <Clock className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-purple-300">Remaining Time</h2>
            <p className="text-sm font-mono text-gray-400">{formatTime(remainingTime)}</p>
          </div>
        </div>
      </div>

      {/* Controls Card */}
      <div className="bg-editor-panel/50 backdrop-blur-lg rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/30 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center">
              <StopCircle className="h-6 w-6 text-red-400" />
            </div>
            <Button
              onClick={handleStopProcessing}
              variant="destructive"
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30"
            >
              Stop Processing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingHeader;