import React, { useState, useEffect } from 'react';
import { Upload, Film, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import LoadingScreen from './LoadingScreen';
import EditingInterface from './EditingInterface';
import EditingProgress from './EditingProgress';
import ProcessingStatus from './ProcessingStatus';
import VideoPreview from './VideoPreview';
import PreApprovalView from './PreApprovalView';
import ReferenceFilmsSection from './ReferenceFilmsSection';
import { VideoSizeRange } from './VideoSizeSelector';
import { EditingMode } from './EditingModeSelector';
import { analyzeVideoStability, calculateSlowMotionSpeed, getVideoMetadata, type VideoMetadata } from '@/utils/videoProcessing';

interface VideoEditorProps {
  targetDuration: VideoSizeRange;
  editingMode: EditingMode;
}

const VideoEditor = ({ targetDuration, editingMode }: VideoEditorProps) => {
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [command, setCommand] = useState('');
  const [currentStep, setCurrentStep] = useState('loading');
  const [editingProgress, setEditingProgress] = useState(0);
  const [videoMetadata, setVideoMetadata] = useState<VideoMetadata[]>([]);
  const [finalVideoUrl, setFinalVideoUrl] = useState<string>('');
  const [musicTrack, setMusicTrack] = useState<File | null>(null);
  const [musicBeats, setMusicBeats] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const analyzeVideos = async () => {
      if (videoFiles.length > 0 && currentStep === 'preview') {
        const metadataPromises = videoFiles.map(file => getVideoMetadata(file));
        const metadata = await Promise.all(metadataPromises);
        setVideoMetadata(metadata);
      }
    };
    analyzeVideos();
  }, [videoFiles, currentStep]);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('video/'));
    
    if (files.length > 0) {
      if (editingMode === 'ai' && videoFiles.length >= 3) {
        toast({
          variant: "destructive",
          title: "Maximum videos reached",
          description: "You can only upload up to 3 reference videos",
        });
        return;
      }

      setVideoFiles(prev => [...prev, ...files]);
      toast({
        title: "Videos uploaded",
        description: `Successfully loaded ${files.length} video(s)`,
      });
      setCurrentStep('preview');

      const stabilityAnalysis = await Promise.all(files.map(analyzeVideoStability));
      console.log('Stability analysis complete:', stabilityAnalysis);
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

  const handleMusicSelect = (file: File, beats: any[]) => {
    setMusicTrack(file);
    setMusicBeats(beats);
    toast({
      title: "Music Track Added",
      description: "The AI will synchronize video cuts with the music beats",
    });
  };

  const handleCommand = async () => {
    if (!command.trim()) return;
    if (!musicTrack && currentStep === 'edit') {
      toast({
        variant: "destructive",
        title: "Music Required",
        description: "Please select a music track for beat synchronization",
      });
      return;
    }
    
    setCurrentStep('processing');
    let progress = 0;

    const interval = setInterval(() => {
      progress += 1;
      setEditingProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setCurrentStep('pre-approval');
        setFinalVideoUrl(URL.createObjectURL(videoFiles[0]));
        toast({
          title: "Processing complete",
          description: "Your video is ready for review!",
        });
      }
    }, 100);

    // Process videos with music beats
    for (const file of videoFiles) {
      const metadata = await getVideoMetadata(file);
      const slowMotionFactor = calculateSlowMotionSpeed(metadata.fps);
      console.log(`Processing ${file.name} with slow motion factor: ${slowMotionFactor}`);
      console.log('Synchronizing with music beats:', musicBeats.length);
    }

    toast({
      title: "Processing command",
      description: `Applying: ${command}`,
    });
  };

  const handleApprove = () => {
    toast({
      title: "Video Approved",
      description: "Your video will now be rendered in full quality.",
    });
    // Handle final rendering and download
  };

  const handleReject = () => {
    toast({
      title: "Video Rejected",
      description: "Please start over with new settings.",
    });
    setCurrentStep('upload');
  };

  const handleRequestChanges = () => {
    toast({
      title: "Changes Requested",
      description: "Please provide new instructions for editing.",
    });
    setCurrentStep('edit');
  };

  if (currentStep === 'loading') {
    return <LoadingScreen onComplete={() => setCurrentStep('upload')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-editor-bg to-editor-bg/95 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            QZ TEMPLATEZ VIDEO EDITOR
          </h1>
          <p className="text-gray-400">
            {editingMode === 'ai' 
              ? 'Upload up to 3 reference videos for AI-powered editing'
              : 'Choose from our professional templates'}
          </p>
          <p className="text-sm text-purple-300">
            Target Duration: {targetDuration.min}-{targetDuration.max} minutes
          </p>
        </div>

        {currentStep === 'upload' && (
          <ReferenceFilmsSection
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            videoFiles={videoFiles}
          />
        )}

        {currentStep === 'preview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoFiles.map((file, index) => (
                <VideoPreview
                  key={index}
                  file={file}
                  metadata={{
                    stability: Math.random(),
                    slowMotionFactor: videoMetadata[index]?.fps ? calculateSlowMotionSpeed(videoMetadata[index].fps) : undefined
                  }}
                />
              ))}
            </div>
            <Button 
              className="w-full bg-purple-500 hover:bg-purple-600"
              onClick={() => setCurrentStep('edit')}
            >
              Continue to Editing
            </Button>
          </div>
        )}

        {currentStep === 'edit' && (
          <EditingInterface
            command={command}
            onCommandChange={setCommand}
            onSubmit={handleCommand}
            onMusicSelect={handleMusicSelect}
          />
        )}

        {currentStep === 'processing' && (
          <div className="space-y-8">
            <EditingProgress
              videoFiles={videoFiles}
              progress={editingProgress}
            />
            <ProcessingStatus
              currentStep="Analyzing and Processing Videos"
              progress={editingProgress}
              metadata={videoMetadata[0]}
            />
          </div>
        )}

        {currentStep === 'pre-approval' && (
          <PreApprovalView
            videoUrl={finalVideoUrl}
            onApprove={handleApprove}
            onReject={handleReject}
            onRequestChanges={handleRequestChanges}
          />
        )}
      </div>
    </div>
  );
};

export default VideoEditor;
