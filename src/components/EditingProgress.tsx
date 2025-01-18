import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ProcessingHeader from './processing/ProcessingHeader';
import ProcessingPreview from './processing/ProcessingPreview';
import ProcessingSteps from './processing/ProcessingSteps';
import ProcessingProgressBar from './processing/ProcessingProgressBar';
import { useToast } from "@/components/ui/use-toast";
import { exportProject } from '@/utils/projectExport';
import { EditingProject } from '@/utils/videoEditingLogic';

interface EditingProgressProps {
  videoFiles: File[];
  progress: number;
  onStopProcessing: () => void;
}

const EditingProgress = ({ videoFiles, progress, onStopProcessing }: EditingProgressProps) => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(300); // 5 minutes in seconds
  const { toast } = useToast();
  
  useEffect(() => {
    if (videoFiles.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentFrameIndex((prev) => (prev + 1) % videoFiles.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [videoFiles.length]);

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [remainingTime]);

  const handleExportToPremiere = async () => {
    try {
      toast({
        title: "Preparing Project",
        description: "Generating Adobe Premiere Pro project files...",
      });

      // Create a mock project for demonstration
      const mockProject: EditingProject = {
        clips: videoFiles.map((file, index) => ({
          file,
          type: 'video',
          startTime: index * 10,
          endTime: (index + 1) * 10,
        })),
        duration: { min: 5, max: 10 },
      };

      // Generate three versions for compatibility
      const versions = ['legacy', 'current', 'compatible'] as const;
      
      for (const version of versions) {
        const result = await exportProject(mockProject, {
          format: 'premiere',
          version,
        });
        
        // Create download link
        const url = URL.createObjectURL(result);
        const a = document.createElement('a');
        a.href = url;
        a.download = `wedding_highlights_${version}.prproj`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      toast({
        title: "Export Complete",
        description: "Three versions have been exported. Please try each version to find the most compatible one with your Premiere Pro.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "There was an error exporting your project. Please try again.",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-editor-bg via-editor-bg/95 to-editor-bg relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
      
      <div className="relative max-w-[1920px] mx-auto p-6 space-y-8">
        {/* Header Section */}
        <ProcessingHeader 
          remainingTime={remainingTime} 
          onStopProcessing={onStopProcessing}
        />
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Preview Section */}
          <div className="lg:col-span-8 space-y-6">
            <ProcessingPreview 
              videoFiles={videoFiles}
              currentFrameIndex={currentFrameIndex}
            />
            <ProcessingProgressBar progress={progress} />
            
            {/* Export Button */}
            {progress === 100 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center"
              >
                <Button
                  onClick={handleExportToPremiere}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 px-8 py-6 text-lg"
                >
                  <Download className="w-6 h-6 mr-2" />
                  Export to Adobe Premiere Pro
                </Button>
              </motion.div>
            )}
          </div>
          
          {/* Steps Section */}
          <div className="lg:col-span-4">
            <ProcessingSteps progress={progress} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EditingProgress;