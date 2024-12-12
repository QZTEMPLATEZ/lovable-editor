import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { exportProject } from '@/utils/projectExport';
import { useVideoType } from '@/contexts/VideoTypeContext';
import { ClipType } from '@/types/video';
import { AnalysisResult } from '@/services/FileAnalysisService';

interface ExportBannerProps {
  analysisResults: AnalysisResult[];
}

const ExportBanner: React.FC<ExportBannerProps> = ({ analysisResults }) => {
  const { toast } = useToast();
  const { selectedVideoType } = useVideoType();

  const handleExport = async (format: 'premiere' | 'finalcut' | 'resolve') => {
    try {
      const processedClips = await Promise.all(
        analysisResults.map(async result => {
          const clipType = (result.category?.toLowerCase() || 'preparation') as ClipType;
          return {
            file: result.file,
            type: clipType,
            startTime: 0,
            endTime: 30,
            significance: 1
          };
        })
      );

      const project = {
        clips: processedClips,
        music: {
          file: new File([], "placeholder.mp3"),
          beats: []
        },
        duration: {
          min: selectedVideoType?.min || 3,
          max: selectedVideoType?.max || 6
        }
      };

      const exportedFile = await exportProject(project, { format });
      const fileExtension = format === 'premiere' ? 'prproj' : format === 'finalcut' ? 'fcpxml' : 'drp';
      const fileName = `organized_sequence.${fileExtension}`;
      
      const url = URL.createObjectURL(exportedFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Sequence Exported Successfully",
        description: `Your organized sequence has been exported for ${
          format === 'premiere' ? 'Adobe Premiere Pro' : 
          format === 'finalcut' ? 'Final Cut Pro' : 
          'DaVinci Resolve'
        }.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "There was an error exporting your sequence. Please try again.",
      });
    }
  };

  return (
    <div className="flex justify-center mb-8">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-purple-500 hover:bg-purple-600">
            <Download className="w-4 h-4 mr-2" />
            Export Sequence
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleExport('premiere')}>
            Adobe Premiere Pro
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport('finalcut')}>
            Final Cut Pro
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport('resolve')}>
            DaVinci Resolve
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ExportBanner;