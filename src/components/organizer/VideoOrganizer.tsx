import React, { useState, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { FileVideo, FolderOpen, Loader2 } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { pipeline } from '@huggingface/transformers';
import { useNavigate } from 'react-router-dom';

interface VideoFile {
  id: string;
  file: File;
  category: string | null;
  analyzing: boolean;
}

const CATEGORIES = [
  { id: 'bride-prep', name: 'Bride Making Of', color: 'from-pink-500/20 to-pink-400/20' },
  { id: 'groom-prep', name: 'Groom Making Of', color: 'from-blue-500/20 to-blue-400/20' },
  { id: 'decoration', name: 'Decoration', color: 'from-purple-500/20 to-purple-400/20' },
  { id: 'ceremony', name: 'Ceremony', color: 'from-amber-500/20 to-amber-400/20' },
  { id: 'reception', name: 'Reception', color: 'from-green-500/20 to-green-400/20' },
  { id: 'drone', name: 'Drone', color: 'from-sky-500/20 to-sky-400/20' },
  { id: 'untagged', name: 'Untagged', color: 'from-gray-500/20 to-gray-400/20' }
];

const VideoOrganizer = () => {
  const [files, setFiles] = useState<VideoFile[]>([]);
  const [classifier, setClassifier] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const initializeClassifier = async () => {
    try {
      const model = await pipeline(
        'image-classification',
        'Xenova/vit-base-patch16-224'
      );
      setClassifier(model);
      return model;
    } catch (error) {
      console.error('Failed to initialize classifier:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to initialize video analyzer. Please try again.",
      });
      return null;
    }
  };

  const analyzeFrame = async (frame: HTMLCanvasElement) => {
    if (!classifier) return null;
    
    try {
      const results = await classifier(frame);
      console.log('Frame analysis results:', results);
      
      // Map predictions to categories
      for (const prediction of results) {
        const label = prediction.label.toLowerCase();
        
        if (label.includes('bride') || label.includes('dress') || label.includes('makeup')) {
          return 'bride-prep';
        }
        if (label.includes('groom') || label.includes('suit') || label.includes('tie')) {
          return 'groom-prep';
        }
        if (label.includes('flower') || label.includes('chair') || label.includes('table')) {
          return 'decoration';
        }
        if (label.includes('church') || label.includes('altar') || label.includes('ceremony')) {
          return 'ceremony';
        }
        if (label.includes('party') || label.includes('dance') || label.includes('celebration')) {
          return 'reception';
        }
        if (label.includes('aerial') || label.includes('sky') || label.includes('landscape')) {
          return 'drone';
        }
      }
      
      return 'untagged';
    } catch (error) {
      console.error('Error analyzing frame:', error);
      return 'untagged';
    }
  };

  const extractFrameFromVideo = async (file: File): Promise<HTMLCanvasElement | null> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      video.src = URL.createObjectURL(file);
      
      video.onloadeddata = () => {
        video.currentTime = video.duration / 2; // Get middle frame
      };
      
      video.onseeked = () => {
        if (ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0);
          URL.revokeObjectURL(video.src);
          resolve(canvas);
        } else {
          resolve(null);
        }
      };
      
      video.onerror = () => {
        URL.revokeObjectURL(video.src);
        resolve(null);
      };
    });
  };

  const analyzeVideo = async (videoFile: VideoFile) => {
    if (!classifier) {
      const newClassifier = await initializeClassifier();
      if (!newClassifier) return;
    }

    setFiles(prev => prev.map(f => 
      f.id === videoFile.id ? { ...f, analyzing: true } : f
    ));

    const frame = await extractFrameFromVideo(videoFile.file);
    if (!frame) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to analyze ${videoFile.file.name}`,
      });
      return;
    }

    const category = await analyzeFrame(frame);
    
    setFiles(prev => prev.map(f => 
      f.id === videoFile.id ? { ...f, category, analyzing: false } : f
    ));
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files)
      .filter(file => file.type.startsWith('video/'))
      .map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        category: null,
        analyzing: false
      }));

    setFiles(prev => [...prev, ...droppedFiles]);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleContinue = () => {
    if (files.some(f => !f.category)) {
      toast({
        variant: "destructive",
        title: "Incomplete Analysis",
        description: "Please wait for all videos to be analyzed before continuing.",
      });
      return;
    }
    navigate('/style');
  };

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    for (const file of files) {
      if (!file.category) {
        await analyzeVideo(file);
      }
    }
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">Organize Wedding Footage</h2>
        <Button
          onClick={startAnalysis}
          disabled={isAnalyzing || files.length === 0}
          className="bg-gradient-to-r from-purple-500 to-pink-500"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing Videos
            </>
          ) : (
            'Start Analysis'
          )}
        </Button>
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-purple-500/30 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500/50 transition-all duration-300"
      >
        <FileVideo className="w-12 h-12 mx-auto text-purple-400 mb-4" />
        <p className="text-lg text-purple-200 mb-2">
          Drag and drop your wedding videos here
        </p>
        <p className="text-sm text-purple-300/70">
          Videos will be automatically analyzed and categorized
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {CATEGORIES.map((category) => (
          <div
            key={category.id}
            className={`bg-gradient-to-br ${category.color} rounded-xl p-4 border border-white/10`}
          >
            <div className="flex items-center gap-2 mb-4">
              <FolderOpen className="w-5 h-5" />
              <h3 className="font-semibold">{category.name}</h3>
              <span className="ml-auto bg-black/20 px-2 py-1 rounded-full text-xs">
                {files.filter(f => f.category === category.id).length}
              </span>
            </div>

            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {files
                  .filter(f => f.category === category.id)
                  .map((file) => (
                    <div
                      key={file.id}
                      className="bg-black/20 rounded-lg p-2 text-sm"
                    >
                      {file.analyzing ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Analyzing...</span>
                        </div>
                      ) : (
                        <span className="truncate block">{file.file.name}</span>
                      )}
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <Button
          onClick={handleContinue}
          disabled={isAnalyzing || files.some(f => !f.category)}
          className="bg-gradient-to-r from-purple-500 to-pink-500"
        >
          Continue to Style Selection
        </Button>
      </div>
    </div>
  );
};

export default VideoOrganizer;