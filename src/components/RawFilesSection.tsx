import React, { useRef, useState } from 'react';
import { Upload, Folder, Video, FileVideo, Ring, Heart, PartyPopper, Camera, Users, Music } from 'lucide-react';
import ProcessingStatus from './ProcessingStatus';
import { useToast } from "@/hooks/use-toast";
import DropZone from './organizer/DropZone';
import FolderGrid from './organizer/FolderGrid';
import VideoThumbnailGrid from './organizer/VideoThumbnailGrid';
import { FolderCategory } from '@/types';
import { ScrollArea } from './ui/scroll-area';
import { Alert, AlertDescription } from './ui/alert';

interface RawFilesSectionProps {
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  videoFiles: File[];
  onContinue?: () => void;
}

const FOLDERS: FolderCategory[] = [
  { 
    name: 'Alianca Beijo e Saida', 
    icon: <Ring className="w-5 h-5" />, 
    description: 'Momentos da aliança, beijo e saída', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-purple-500/20 to-purple-400/20' 
  },
  { 
    name: 'Cenas do Casal', 
    icon: <Heart className="w-5 h-5" />, 
    description: 'Cenas exclusivas do casal', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-cyan-500/20 to-cyan-400/20' 
  },
  { 
    name: 'Danca do Casal', 
    icon: <Music className="w-5 h-5" />, 
    description: 'Primeira dança e momentos de dança', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-purple-500/20 to-purple-400/20' 
  },
  { 
    name: 'Decoracao', 
    icon: <FileVideo className="w-5 h-5" />, 
    description: 'Detalhes da decoração', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-orange-500/20 to-orange-400/20' 
  },
  { 
    name: 'Entrada da Noiva', 
    icon: <Heart className="w-5 h-5" />, 
    description: 'Entrada da noiva na cerimônia', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-green-500/20 to-green-400/20' 
  },
  { 
    name: 'Entrada do Noivo', 
    icon: <Heart className="w-5 h-5" />, 
    description: 'Entrada do noivo na cerimônia', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-red-500/20 to-red-400/20' 
  },
  { 
    name: 'Entrada Padrinhos', 
    icon: <Users className="w-5 h-5" />, 
    description: 'Entrada dos padrinhos', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-red-500/20 to-red-400/20' 
  },
  { 
    name: 'Making Of da Noiva', 
    icon: <Camera className="w-5 h-5" />, 
    description: 'Preparação da noiva', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-pink-500/20 to-pink-400/20' 
  },
  { 
    name: 'Making Of do Noivo', 
    icon: <Camera className="w-5 h-5" />, 
    description: 'Preparação do noivo', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-teal-500/20 to-teal-400/20' 
  },
  { 
    name: 'Cenas Extras', 
    icon: <Video className="w-5 h-5" />, 
    description: 'Cenas adicionais', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-purple-500/20 to-purple-400/20' 
  },
  { 
    name: 'Noiva Pronta', 
    icon: <Heart className="w-5 h-5" />, 
    description: 'Momentos da noiva pronta', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-teal-500/20 to-teal-400/20' 
  },
  { 
    name: 'Takes da Cerimonia', 
    icon: <Video className="w-5 h-5" />, 
    description: 'Momentos da cerimônia', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-orange-500/20 to-orange-400/20' 
  },
  { 
    name: 'Festa', 
    icon: <PartyPopper className="w-5 h-5" />, 
    description: 'Momentos da festa e recepção', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-green-500/20 to-green-400/20' 
  }
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

  // Simulated categories for each video (in real app, this would come from AI analysis)
  const [fileCategories, setFileCategories] = useState<Record<string, string>>({});

  // Start processing automatically when files are added
  React.useEffect(() => {
    if (videoFiles.length > 0 && !isProcessing) {
      setIsProcessing(true);
      setProgress(0);
      setIsComplete(false);
      setCategorizedFiles(FOLDERS.reduce((acc, folder) => ({ ...acc, [folder.name]: 0 }), {}));

      // Simulate lightweight analysis for each file
      videoFiles.forEach((file, index) => {
        setTimeout(() => {
          setCurrentFile(file.name);
          // Simulate category detection (replace with actual AI analysis)
          const categories = FOLDERS.map(f => f.name).filter(f => f !== 'Untagged');
          const randomCategory = categories[Math.floor(Math.random() * categories.length)];
          setCurrentCategory(randomCategory);
          
          // Update categorized files count
          setCategorizedFiles(prev => ({
            ...prev,
            [randomCategory]: prev[randomCategory] + 1
          }));

          // Store category for this file
          setFileCategories(prev => ({
            ...prev,
            [file.name]: randomCategory
          }));
          
          setProgress(((index + 1) / videoFiles.length) * 100);

          if (index === videoFiles.length - 1) {
            setTimeout(() => {
              setIsComplete(true);
              setIsProcessing(false);
              toast({
                title: "Organização Completa",
                description: "Todos os vídeos foram classificados. Revise as categorias se necessário.",
              });
            }, 1000);
          }
        }, index * 500); // Reduced delay for faster processing
      });
    }
  }, [videoFiles, toast]);

  const handleReclassify = (videoIndex: number, newCategory: string) => {
    const file = videoFiles[videoIndex];
    if (file) {
      const oldCategory = fileCategories[file.name];
      
      // Update categories count
      setCategorizedFiles(prev => ({
        ...prev,
        [oldCategory]: prev[oldCategory] - 1,
        [newCategory]: prev[newCategory] + 1
      }));

      // Update file category
      setFileCategories(prev => ({
        ...prev,
        [file.name]: newCategory
      }));

      toast({
        title: "Vídeo Reclassificado",
        description: `Movido para ${newCategory}`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <FolderGrid 
        categories={FOLDERS}
        categorizedFiles={categorizedFiles}
      />

      <div className="bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 rounded-xl p-8 border border-purple-500/30">
        {isProcessing ? (
          <ProcessingStatus
            currentStep="organizing"
            progress={progress}
            currentFile={currentFile}
            currentCategory={currentCategory}
            isComplete={isComplete}
          />
        ) : isComplete ? (
          <div className="space-y-6">
            <Alert>
              <AlertDescription>
                Revise a classificação dos vídeos abaixo. Arraste e solte para reclassificar se necessário.
              </AlertDescription>
            </Alert>
            
            <ScrollArea className="h-[600px] rounded-lg">
              <VideoThumbnailGrid 
                videos={videoFiles}
                categories={fileCategories}
                onReclassify={handleReclassify}
              />
            </ScrollArea>
          </div>
        ) : (
          <DropZone
            onDrop={onDrop}
            onDragOver={onDragOver}
            onClick={() => fileInputRef.current?.click()}
            fileInputRef={fileInputRef}
            handleFileSelect={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                const dragEvent = new DragEvent('drop');
                Object.defineProperty(dragEvent, 'dataTransfer', {
                  value: {
                    files: e.target.files
                  }
                });
                onDrop(dragEvent as unknown as React.DragEvent);
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default RawFilesSection;