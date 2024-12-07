import React, { useState } from 'react';
import { Upload, Wand2, Type, Clock, Sparkles, Timer, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import LoadingScreen from './LoadingScreen';
import EditingInterface from './EditingInterface';
import EditingProgress from './EditingProgress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const VideoEditor = () => {
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [command, setCommand] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [currentStep, setCurrentStep] = useState('loading');
  const [editingProgress, setEditingProgress] = useState(0);
  const { toast } = useToast();

  const templates = [
    { id: 'cinematic', name: 'Cinematic Wedding', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'minimal', name: 'Minimal Clean', icon: <Type className="w-4 h-4" /> },
    { id: 'timelapse', name: 'Dynamic Timelapse', icon: <Clock className="w-4 h-4" /> },
    { id: 'magical', name: 'Magical Moments', icon: <Wand2 className="w-4 h-4" /> },
  ];

  const durations = [
    { id: 'short', name: '3-5 minutes', range: '3-5' },
    { id: 'medium', name: '8-12 minutes', range: '8-12' },
    { id: 'long', name: '15-20 minutes', range: '15-20' },
    { id: 'extended', name: '30-40 minutes', range: '30-40' },
  ];

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('video/'));
    if (files.length > 0) {
      setVideoFiles(prev => [...prev, ...files]);
      toast({
        title: "Videos uploaded",
        description: `Successfully loaded ${files.length} video(s)`,
      });
      setCurrentStep('preview');
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please upload valid video files",
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleCommand = () => {
    if (!command.trim()) return;
    
    setCurrentStep('processing');
    
    // Simulate editing progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setEditingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        toast({
          title: "Processing complete",
          description: "Your video has been edited successfully!",
        });
      }
    }, 100);

    toast({
      title: "Processing command",
      description: `Applying: ${command}`,
    });
  };

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value);
    toast({
      title: "Template Selected",
      description: `Applied ${templates.find(t => t.id === value)?.name} template`,
    });
  };

  const handleDurationChange = (value: string) => {
    setSelectedDuration(value);
    toast({
      title: "Duration Selected",
      description: `Target duration: ${durations.find(d => d.id === value)?.range} minutes`,
    });
    setCurrentStep('upload');
  };

  const goBack = () => {
    switch (currentStep) {
      case 'upload':
        setCurrentStep('duration');
        break;
      case 'preview':
        setCurrentStep('upload');
        setVideoFiles([]);
        break;
      case 'edit':
        setCurrentStep('preview');
        break;
      case 'processing':
        setCurrentStep('edit');
        setEditingProgress(0);
        break;
      default:
        break;
    }
  };

  if (currentStep === 'loading') {
    return <LoadingScreen onComplete={() => setCurrentStep('duration')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-editor-bg to-editor-bg/95 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {currentStep !== 'loading' && (
          <Button
            onClick={goBack}
            variant="ghost"
            className="absolute top-4 left-4 text-gray-400 hover:text-white"
            disabled={currentStep === 'duration'}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}

        <h1 className="text-4xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
          QZ TEMPLATEZ VIDEO EDITOR
        </h1>
        <p className="text-center text-gray-400 mb-8">Transform your videos with AI-powered editing</p>
        
        {currentStep === 'duration' && (
          <div className="max-w-md mx-auto space-y-6 animate-fade-in">
            <h2 className="text-2xl font-semibold text-center mb-6">Select Target Duration</h2>
            <Select onValueChange={handleDurationChange} value={selectedDuration}>
              <SelectTrigger className="bg-editor-timeline/40 border-purple-500/20 backdrop-blur-sm">
                <SelectValue placeholder="Choose target duration" />
              </SelectTrigger>
              <SelectContent>
                {durations.map((duration) => (
                  <SelectItem 
                    key={duration.id} 
                    value={duration.id}
                    className="flex items-center gap-2"
                  >
                    <Clock className="w-4 h-4" />
                    {duration.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {currentStep === 'upload' && (
          <div 
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-purple-500/50 rounded-xl p-12 text-center cursor-pointer hover:bg-purple-500/5 transition-all duration-300 backdrop-blur-sm animate-fade-in"
          >
            <Upload className="w-16 h-16 mx-auto mb-6 text-purple-400 animate-bounce" />
            <p className="text-xl mb-2 font-medium">Drag and drop your videos here</p>
            <p className="text-sm text-gray-400">or click to browse</p>
          </div>
        )}

        {currentStep === 'preview' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-editor-timeline/40 rounded-xl p-4 backdrop-blur-md border border-purple-500/20">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  <span className="font-medium text-purple-400">{videoFiles.length}</span> video{videoFiles.length !== 1 ? 's' : ''} selected
                </div>
                <Timer className="w-4 h-4 text-purple-400" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {videoFiles.map((file, index) => (
                  <video 
                    key={index}
                    src={URL.createObjectURL(file)} 
                    controls
                    className="w-full rounded-lg"
                  />
                ))}
              </div>
              <Button 
                className="mt-4 w-full bg-purple-500 hover:bg-purple-600"
                onClick={() => setCurrentStep('edit')}
              >
                Continue to Editing
              </Button>
            </div>
          </div>
        )}

        {currentStep === 'edit' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 gap-4">
              <Select onValueChange={handleTemplateChange} value={selectedTemplate}>
                <SelectTrigger className="bg-editor-timeline/40 border-purple-500/20 backdrop-blur-sm">
                  <SelectValue placeholder="Choose editing template or use AI commands below" />
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

              <EditingInterface
                command={command}
                onCommandChange={setCommand}
                onSubmit={handleCommand}
              />
            </div>
          </div>
        )}

        {currentStep === 'processing' && (
          <EditingProgress
            videoFiles={videoFiles}
            progress={editingProgress}
          />
        )}
      </div>
    </div>
  );
};

export default VideoEditor;