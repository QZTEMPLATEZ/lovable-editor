import React, { useState } from 'react';
import { Upload, Wand2, Type, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const VideoEditor = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [command, setCommand] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const { toast } = useToast();

  const templates = [
    { id: 'cinematic', name: 'Cinematic Wedding', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'minimal', name: 'Minimal Clean', icon: <Type className="w-4 h-4" /> },
    { id: 'timelapse', name: 'Dynamic Timelapse', icon: <Clock className="w-4 h-4" /> },
    { id: 'magical', name: 'Magical Moments', icon: <Wand2 className="w-4 h-4" /> },
  ];

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

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value);
    toast({
      title: "Template Selected",
      description: `Applied ${templates.find(t => t.id === value)?.name} template`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-editor-bg to-editor-bg/95 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
          QZ TEMPLATEZ VIDEO EDITOR
        </h1>
        <p className="text-center text-gray-400 mb-8">Transform your videos with AI-powered editing</p>
        
        {!videoFile ? (
          <div 
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-purple-500/50 rounded-xl p-12 text-center cursor-pointer hover:bg-purple-500/5 transition-all duration-300 backdrop-blur-sm"
          >
            <Upload className="w-16 h-16 mx-auto mb-6 text-purple-400 animate-bounce" />
            <p className="text-xl mb-2 font-medium">Drag and drop your video here</p>
            <p className="text-sm text-gray-400">or click to browse</p>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-editor-timeline/40 rounded-xl p-4 backdrop-blur-md border border-purple-500/20">
              <video 
                src={URL.createObjectURL(videoFile)} 
                controls
                className="w-full rounded-lg"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select onValueChange={handleTemplateChange} value={selectedTemplate}>
                <SelectTrigger className="bg-editor-timeline/40 border-purple-500/20 backdrop-blur-sm">
                  <SelectValue placeholder="Choose editing template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem 
                      key={template.id} 
                      value={template.id}
                      className="flex items-center gap-2"
                    >
                      {template.icon}
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-4">
                <Input
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  placeholder="Enter editing command..."
                  className="flex-1 bg-editor-timeline/40 border-purple-500/20 backdrop-blur-sm"
                />
                <Button 
                  onClick={handleCommand}
                  className="bg-purple-500 hover:bg-purple-600 transition-colors"
                >
                  Apply
                </Button>
              </div>
            </div>

            <div className="bg-editor-timeline/40 rounded-xl p-4 backdrop-blur-md border border-purple-500/20">
              <div className="h-2 bg-purple-500/20 rounded-full">
                <div className="h-full w-1/3 bg-purple-500 rounded-full" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoEditor;