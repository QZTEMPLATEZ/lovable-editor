import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface MusicAnalysis {
  id: string;
  title: string;
  duration: string;
  bpm: number;
}

const MusicSelector = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleMusicSelect = (analysis: MusicAnalysis) => {
    toast({
      title: "Music Selected",
      description: `Selected ${analysis.title}`,
    });
    navigate('/organize');
  };

  const dummyAnalyses: MusicAnalysis[] = [
    {
      id: '1',
      title: 'Upbeat Wedding',
      duration: '3:45',
      bpm: 128
    },
    {
      id: '2',
      title: 'Romantic Ballad',
      duration: '4:15',
      bpm: 72
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Select Music</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dummyAnalyses.map((analysis) => (
          <div
            key={analysis.id}
            className="bg-editor-panel p-4 rounded-lg border border-purple-500/20"
          >
            <h3 className="text-lg font-semibold mb-2">{analysis.title}</h3>
            <p className="text-sm text-gray-400">Duration: {analysis.duration}</p>
            <p className="text-sm text-gray-400">BPM: {analysis.bpm}</p>
            <Button
              onClick={() => handleMusicSelect(analysis)}
              className="mt-4"
            >
              Select Track
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicSelector;