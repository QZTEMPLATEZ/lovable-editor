import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import LoadingScreen from './LoadingScreen';
import EditingInterface from './EditingInterface';
import EditingProgress from './EditingProgress';
import ProcessingStatus from './ProcessingStatus';
import VideoPreview from './VideoPreview';
import PreApprovalView from './PreApprovalView';
import ReferenceFilmsSection from './ReferenceFilmsSection';
import RawFilesSection from './RawFilesSection';
import EditorHeader from './EditorHeader';
import { VideoSizeRange } from './VideoSizeSelector';
import { EditingMode } from './EditingModeSelector';
import { analyzeVideoStability, calculateSlowMotionSpeed, getVideoMetadata, type VideoMetadata } from '@/utils/videoProcessing';

interface VideoEditorProps {
  targetDuration: VideoSizeRange;
  editingMode: EditingMode;
  onDurationChange: (duration: VideoSizeRange) => void;
}

const VideoEditor = ({ targetDuration, editingMode, onDurationChange }: VideoEditorProps) => {
  const [referenceFiles, setReferenceFiles] = useState<File[]>([]);
  const [rawFiles, setRawFiles] = useState<File[]>([]);
  const [command, setCommand] = useState('');
  const [currentStep, setCurrentStep] = useState('upload');
  const [editingProgress, setEditingProgress] = useState(0);
  const [videoMetadata, setVideoMetadata] = useState<VideoMetadata[]>([]);
  const [finalVideoUrl, setFinalVideoUrl] = useState<string>('');
  const [musicTrack, setMusicTrack] = useState<File | null>(null);
  const [musicBeats, setMusicBeats] = useState<any[]>([]);
  const { toast } = useToast();

  const handleReferenceDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('video/'));
    
    if (files.length > 0) {
      if (referenceFiles.length >= 3) {
        toast({
          variant: "destructive",
          title: "Maximum reference videos reached",
          description: "You can only upload up to 3 reference videos",
        });
        return;
      }

      setReferenceFiles(prev => [...prev, ...files].slice(0, 3));
      toast({
        title: "Reference videos uploaded",
        description: `Successfully loaded ${files.length} reference video(s)`,
      });
    }
  };

  const handleRawDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('video/'));
    
    if (files.length > 0) {
      setRawFiles(prev => [...prev, ...files]);
      toast({
        title: "Raw footage uploaded",
        description: `Successfully loaded ${files.length} raw video file(s)`,
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleContinue = () => {
    setCurrentStep('raw');
    toast({
      title: "Moving to Raw Footage",
      description: "Please upload your raw wedding footage for editing",
    });
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
        setFinalVideoUrl(URL.createObjectURL(rawFiles[0]));
        toast({
          title: "Processing complete",
          description: "Your video is ready for review!",
        });
      }
    }, 100);

    // Process videos with music beats
    for (const file of rawFiles) {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-editor-bg to-editor-bg/95 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <EditorHeader 
          editingMode={editingMode}
          targetDuration={targetDuration}
          onDurationChange={onDurationChange}
        />

        {currentStep === 'upload' && (
          <div className="space-y-8">
            <ReferenceFilmsSection
              onDrop={handleReferenceDrop}
              onDragOver={handleDragOver}
              videoFiles={referenceFiles}
              onContinue={handleContinue}
            />
          </div>
        )}

        {currentStep === 'raw' && (
          <RawFilesSection
            onDrop={handleRawDrop}
            onDragOver={handleDragOver}
            videoFiles={rawFiles}
          />
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
              videoFiles={rawFiles}
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
