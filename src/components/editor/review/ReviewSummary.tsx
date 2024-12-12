import React from 'react';
import { Clock, Film, Music, Palette } from 'lucide-react';
import { useVideoType } from '@/contexts/VideoTypeContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const ReviewSummary = () => {
  const { selectedVideoType, selectedStyle, selectedMusic } = useVideoType();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStartEditing = () => {
    if (!selectedStyle || !selectedMusic?.length) {
      toast({
        variant: "destructive",
        title: "Missing Requirements",
        description: "Please ensure you have selected a style and music before starting.",
      });
      return;
    }
    
    toast({
      title: "Starting Edit",
      description: "Preparing your video edit...",
    });
    navigate('/edit');
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-editor-panel border border-editor-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold">Duration</h3>
          </div>
          <p className="text-gray-400">
            {selectedVideoType?.label || "No duration selected"}
          </p>
        </div>

        <div className="bg-editor-panel border border-editor-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold">Style</h3>
          </div>
          <p className="text-gray-400">
            {selectedStyle?.name || "No style selected"}
          </p>
          {selectedStyle && (
            <p className="text-sm text-gray-500 mt-2">
              {selectedStyle.description}
            </p>
          )}
        </div>

        <div className="bg-editor-panel border border-editor-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Music className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold">Music</h3>
          </div>
          {selectedMusic && selectedMusic.length > 0 ? (
            <div className="space-y-2">
              {selectedMusic.map((music, index) => (
                <p key={index} className="text-gray-400">
                  {music.name}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No music selected</p>
          )}
        </div>

        <div className="bg-editor-panel border border-editor-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Film className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold">Preview</h3>
          </div>
          <div className="aspect-video bg-editor-panel/50 rounded-lg flex items-center justify-center">
            <Film className="w-12 h-12 text-gray-600" />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleStartEditing}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 px-8 py-4 text-lg"
        >
          Start Editing
        </Button>
      </div>
    </div>
  );
};

export default ReviewSummary;