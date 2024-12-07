import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const VideoEditor = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [command, setCommand] = useState('');
  const { toast } = useToast();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      toast({
        title: "Video uploaded",
        description: `Successfully loaded ${file.name}`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please upload a valid video file",
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleCommand = () => {
    if (!command.trim()) return;
    
    toast({
      title: "Processing command",
      description: `Applying: ${command}`,
    });
    setCommand('');
  };

  return (
    <div className="min-h-screen bg-editor-bg text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">AI Video Editor</h1>
        
        {!videoFile ? (
          <div 
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-editor-accent rounded-lg p-12 text-center cursor-pointer hover:bg-editor-accent/5 transition-colors"
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-editor-accent" />
            <p className="text-lg mb-2">Drag and drop your video here</p>
            <p className="text-sm text-gray-400">or click to browse</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-editor-timeline rounded-lg p-4">
              <video 
                src={URL.createObjectURL(videoFile)} 
                controls
                className="w-full rounded-lg"
              />
            </div>
            
            <div className="flex gap-4">
              <Input
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Enter editing command (e.g., 'trim first 5 seconds')"
                className="flex-1 bg-editor-timeline border-editor-accent"
              />
              <Button 
                onClick={handleCommand}
                className="bg-editor-accent hover:bg-editor-accent/90"
              >
                Apply
              </Button>
            </div>

            <div className="bg-editor-timeline rounded-lg p-4 min-h-[100px]">
              <div className="h-2 bg-editor-accent/30 rounded-full">
                <div className="h-full w-1/3 bg-editor-accent rounded-full" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoEditor;