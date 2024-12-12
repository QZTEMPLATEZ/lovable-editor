import React, { useRef, useState } from 'react';
import { Upload, Heart, Video, Image, Plane, PartyPopper, HelpCircle } from 'lucide-react';
import ProcessingStatus from './ProcessingStatus';
import { useToast } from "@/hooks/use-toast";
import DropZone from './organizer/DropZone';
import FolderGrid from './organizer/FolderGrid';

interface RawFilesSectionProps {
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  videoFiles: File[];
  onContinue?: () => void;
}

const FOLDERS = [
  { name: 'BridePrep', icon: <Heart className="w-5 h-5" /> },
  { name: 'GroomPrep', icon: <Video className="w-5 h-5" /> },
  { name: 'Ceremony', icon: <Heart className="w-5 h-5" /> },
  { name: 'Decoration', icon: <Image className="w-5 h-5" /> },
  { name: 'DroneFootage', icon: <Plane className="w-5 h-5" /> },
  { name: 'Reception', icon: <PartyPopper className="w-5 h-5" /> },
  { name: 'Untagged', icon: <HelpCircle className="w-5 h-5" /> },
];

const RawFilesSection = ({ onDrop, onDragOver, videoFiles }: RawFilesSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentFile, setCurrentFile] = useState<string>();
  const [currentCategory, setCurrentCategory] = useState<string>();
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [categorizedFiles, setCategorizedFiles] = useState<Record<string, number>>(
    FOLDERS.reduce((acc, folder) => ({ ...acc, [folder.name]: 0 }), {})
  );
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const dragEvent = new DragEvent('drop');
      Object.defineProperty(dragEvent, 'dataTransfer', {
        value: {
          files: e.target.files
        }
      });
      onDrop(dragEvent as unknown as React.DragEvent);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Start processing automatically when files are added
  React.useEffect(() => {
    if (videoFiles.length > 0 && !isProcessing) {
      setIsProcessing(true);
      setProgress(0);
      setIsComplete(false);
      setCategorizedFiles(FOLDERS.reduce((acc, folder) => ({ ...acc, [folder.name]: 0 }), {}));

      // Simulate processing each file
      videoFiles.forEach((file, index) => {
        setTimeout(() => {
          setCurrentFile(file.name);
          // Simulate category detection
          const categories = FOLDERS.map(f => f.name).filter(f => f !== 'Untagged');
          const randomCategory = categories[Math.floor(Math.random() * categories.length)];
          setCurrentCategory(randomCategory);
          
          // Update categorized files count
          setCategorizedFiles(prev => ({
            ...prev,
            [randomCategory]: prev[randomCategory] + 1
          }));
          
          setProgress(((index + 1) / videoFiles.length) * 100);

          if (index === videoFiles.length - 1) {
            setTimeout(() => {
              setIsComplete(true);
              setIsProcessing(false);
              toast({
                title: "Organization Complete",
                description: "All files have been successfully categorized.",
              });
            }, 1000);
          }
        }, index * 2000);
      });
    }
  }, [videoFiles, toast]);

  return (
    <div className="space-y-6">
      <FolderGrid 
        folders={FOLDERS}
        categorizedFiles={categorizedFiles}
      />

      <div className="bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 rounded-xl p-8 border border-purple-500/30">
        {isProcessing || isComplete ? (
          <ProcessingStatus
            currentStep="organizing"
            progress={progress}
            currentFile={currentFile}
            currentCategory={currentCategory}
            isComplete={isComplete}
          />
        ) : (
          <DropZone
            onDrop={onDrop}
            onDragOver={onDragOver}
            onClick={handleClick}
            fileInputRef={fileInputRef}
            handleFileSelect={handleFileSelect}
          />
        )}
      </div>
    </div>
  );
};

export default RawFilesSection;