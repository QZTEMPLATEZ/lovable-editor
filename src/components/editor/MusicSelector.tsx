import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, Upload, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Track {
  id: string;
  name: string;
  duration: string;
  preview: string;
}

const SAMPLE_TRACKS: Track[] = [
  {
    id: '1',
    name: 'Cinematic Epic',
    duration: '3:45',
    preview: 'https://example.com/preview1.mp3'
  },
  {
    id: '2',
    name: 'Emotional Journey',
    duration: '4:20',
    preview: 'https://example.com/preview2.mp3'
  },
  {
    id: '3',
    name: 'Dynamic Energy',
    duration: '3:15',
    preview: 'https://example.com/preview3.mp3'
  }
];

const MusicSelector = () => {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleTrackSelect = (trackId: string) => {
    setSelectedTrack(trackId);
    toast({
      title: "Track Selected",
      description: "You can preview the track or continue to the next step.",
    });
  };

  const handleTrackPlay = (trackId: string) => {
    if (isPlaying === trackId) {
      setIsPlaying(null);
      // Stop playing logic here
    } else {
      setIsPlaying(trackId);
      // Start playing logic here
    }
  };

  const handleCustomUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          toast({
            title: "Upload Complete",
            description: "Your custom track has been uploaded successfully.",
          });
        }
      }, 500);
    }
  };

  const handleContinue = () => {
    if (selectedTrack) {
      navigate('/duration');
      toast({
        title: "Music Saved",
        description: "Your music selection has been saved.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Selection Required",
        description: "Please select a track before continuing.",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid gap-6">
        {SAMPLE_TRACKS.map((track) => (
          <div
            key={track.id}
            className={`p-6 rounded-lg border transition-all duration-300 ${
              selectedTrack === track.id
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${
                    isPlaying === track.id ? 'text-purple-500' : 'text-gray-400'
                  }`}
                  onClick={() => handleTrackPlay(track.id)}
                >
                  <Music className="h-6 w-6" />
                </Button>
                <div>
                  <h3 className="font-semibold text-white">{track.name}</h3>
                  <p className="text-sm text-gray-400">{track.duration}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full ${
                  selectedTrack === track.id ? 'text-purple-500' : 'text-gray-400'
                }`}
                onClick={() => handleTrackSelect(track.id)}
              >
                <Check className={`h-6 w-6 ${selectedTrack === track.id ? 'opacity-100' : 'opacity-0'}`} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border border-dashed border-gray-700 rounded-lg p-8">
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold text-white">Custom Track Upload</h3>
          <p className="mt-2 text-sm text-gray-400">
            Upload your own music track in MP3 format
          </p>
          <label className="mt-4 inline-block">
            <input
              type="file"
              className="hidden"
              accept="audio/mp3"
              onChange={handleCustomUpload}
            />
            <Button variant="outline" className="mt-4">
              Choose File
            </Button>
          </label>
          {uploadProgress > 0 && uploadProgress < 100 && (
            <Progress value={uploadProgress} className="mt-4" />
          )}
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button
          onClick={handleContinue}
          className="bg-purple-500 hover:bg-purple-600 text-white"
          disabled={!selectedTrack && uploadProgress < 100}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default MusicSelector;