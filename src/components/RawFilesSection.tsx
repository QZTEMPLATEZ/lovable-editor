import React, { useRef, useState } from 'react';
import { Upload, Heart, Video, Image, Plane, PartyPopper, HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProcessingStatus from './ProcessingStatus';
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from 'framer-motion';

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
        }, index * 2000); // Process each file with a delay
      });
    }
  }, [videoFiles, toast]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {FOLDERS.map((folder) => (
          <motion.div
            key={folder.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative flex items-center justify-between p-4 rounded-xl border border-purple-500/20 bg-black/40 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="text-purple-400">
                {folder.icon}
              </div>
              <span className="text-white font-medium">{folder.name}</span>
            </div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/60 text-white">
              {categorizedFiles[folder.name]}
            </div>
          </motion.div>
        ))}
      </div>

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
          <div 
            onDrop={onDrop}
            onDragOver={onDragOver}
            onClick={handleClick}
            className="border-2 border-dashed border-purple-500/50 rounded-xl p-12 text-center cursor-pointer hover:bg-purple-500/5 transition-all duration-300 backdrop-blur-sm relative overflow-hidden group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="video/*"
              multiple
              className="hidden"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 transform group-hover:scale-105 transition-transform duration-300" />
            <Upload className="w-16 h-16 mx-auto mb-6 text-purple-400 animate-bounce" />
            <p className="text-xl mb-2 font-medium relative z-10">
              Drag and drop your raw wedding footage here
            </p>
            <p className="text-sm text-gray-400 relative z-10">or click to browse</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RawFilesSection;