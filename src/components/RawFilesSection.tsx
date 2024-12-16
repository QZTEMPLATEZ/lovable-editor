import React, { useState } from 'react';
import { FolderOpen, Heart, Video, Image, Plane, PartyPopper, HelpCircle } from 'lucide-react';
import ProcessingStatus from './ProcessingStatus';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import FolderGrid from './organizer/FolderGrid';
import { FolderCategory } from '@/types';

interface RawFilesSectionProps {
  onOrganize?: () => void;
  videoFiles: File[];
  onContinue?: () => void;
  onFileSelect: React.Dispatch<React.SetStateAction<File[]>>;
}

const FOLDERS: FolderCategory[] = [
  { name: 'BridePrep', icon: <Heart className="w-5 h-5" />, description: 'Bride preparation footage', expectedTypes: '.mp4,.mov', color: 'from-pink-500/20 to-rose-500/20' },
  { name: 'GroomPrep', icon: <Video className="w-5 h-5" />, description: 'Groom preparation footage', expectedTypes: '.mp4,.mov', color: 'from-blue-500/20 to-indigo-500/20' },
  { name: 'Ceremony', icon: <Heart className="w-5 h-5" />, description: 'Wedding ceremony footage', expectedTypes: '.mp4,.mov', color: 'from-purple-500/20 to-violet-500/20' },
  { name: 'Decoration', icon: <Image className="w-5 h-5" />, description: 'Venue and decoration details', expectedTypes: '.mp4,.mov', color: 'from-amber-500/20 to-yellow-500/20' },
  { name: 'DroneFootage', icon: <Plane className="w-5 h-5" />, description: 'Aerial footage', expectedTypes: '.mp4,.mov', color: 'from-sky-500/20 to-blue-500/20' },
  { name: 'Reception', icon: <PartyPopper className="w-5 h-5" />, description: 'Reception and party footage', expectedTypes: '.mp4,.mov', color: 'from-green-500/20 to-emerald-500/20' },
  { name: 'Untagged', icon: <HelpCircle className="w-5 h-5" />, description: 'Uncategorized footage', expectedTypes: '.mp4,.mov', color: 'from-gray-500/20 to-slate-500/20' },
];

const RawFilesSection = ({ onOrganize, videoFiles, onFileSelect }: RawFilesSectionProps) => {
  const [currentFile, setCurrentFile] = useState<string>();
  const [currentCategory, setCurrentCategory] = useState<string>();
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [categorizedFiles, setCategorizedFiles] = useState<Record<string, number>>(
    FOLDERS.reduce((acc, folder) => ({ ...acc, [folder.name]: 0 }), {})
  );
  const { toast } = useToast();

  const handleOrganizeClick = async () => {
    setIsProcessing(true);
    setProgress(0);
    setIsComplete(false);
    setCategorizedFiles(FOLDERS.reduce((acc, folder) => ({ ...acc, [folder.name]: 0 }), {}));

    // Simulate processing each file from Premiere Pro
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
              description: "All files have been successfully categorized in Premiere Pro bins.",
            });
          }, 1000);
        }
      }, index * 2000);
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 rounded-xl p-8 border border-purple-500/30">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-white">Organize Files in Premiere Pro</h2>
          <p className="text-gray-400">
            Click the button below to analyze and organize your imported files into appropriate bins
          </p>
          <Button
            onClick={handleOrganizeClick}
            disabled={isProcessing}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
          >
            <FolderOpen className="w-5 h-5 mr-2" />
            {isProcessing ? "Organizing..." : "Organize Files"}
          </Button>
        </div>

        {(isProcessing || isComplete) && (
          <ProcessingStatus
            currentStep="organizing"
            progress={progress}
            currentFile={currentFile}
            currentCategory={currentCategory}
            isComplete={isComplete}
          />
        )}
      </div>

      <FolderGrid 
        categories={FOLDERS}
        categorizedFiles={categorizedFiles}
      />
    </div>
  );
};

export default RawFilesSection;