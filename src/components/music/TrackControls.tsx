
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import WaveformAnimation from './WaveformAnimation';
import { Clock, Scissors, Play, Pause, X } from 'lucide-react';

interface TrackControlsProps {
  file: File;
  duration: number;
  onCutPointsChange: (points: number[]) => void;
}

const TrackControls = ({ file, duration, onCutPointsChange }: TrackControlsProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [cutPoints, setCutPoints] = useState<number[]>([]);
  const [currentTime, setCurrentTime] = useState(0);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleAddCutPoint = (time: number) => {
    const newCutPoints = [...cutPoints, time].sort((a, b) => a - b);
    setCutPoints(newCutPoints);
    onCutPointsChange(newCutPoints);
  };

  const handleRemoveCutPoint = (index: number) => {
    const newCutPoints = cutPoints.filter((_, i) => i !== index);
    setCutPoints(newCutPoints);
    onCutPointsChange(newCutPoints);
  };

  return (
    <div className="space-y-4 p-4 bg-black/10 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handlePlayPause}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock className="h-4 w-4" />
            <span>{Math.floor(currentTime)}s / {Math.floor(duration)}s</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Scissors className="h-4 w-4 text-purple-400" />
          <span className="text-sm text-gray-400">{cutPoints.length} cut points</span>
        </div>
      </div>

      <WaveformAnimation
        audioFile={file}
        isPlaying={isPlaying}
        cutPoints={cutPoints}
        onCutPointAdd={handleAddCutPoint}
      />

      <div className="space-y-2">
        {cutPoints.map((time, index) => (
          <div 
            key={index}
            className="flex items-center justify-between bg-black/20 p-2 rounded"
          >
            <span className="text-sm text-gray-400">Cut at {time.toFixed(2)}s</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveCutPoint(index)}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <Slider
        value={[currentTime]}
        max={duration}
        step={0.1}
        onValueChange={([value]) => setCurrentTime(value)}
        className="mt-2"
      />
    </div>
  );
};

export default TrackControls;
