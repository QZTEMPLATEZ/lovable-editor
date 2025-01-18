import React from 'react';
import { Button } from "@/components/ui/button";
import { Save } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { EditingProject } from '../../../utils/videoEditingLogic';
import { generatePremiereSequence } from '../../../utils/premiere/sequenceGenerator';
import { OrganizationResult } from '../../../types/organizer';

interface ExportOptionsProps {
  isComplete: boolean;
  videoFiles: File[];
  onStopProcessing: () => void;
}

const ExportOptions = ({ isComplete, videoFiles, onStopProcessing }: ExportOptionsProps) => {
  const { toast } = useToast();

  const handleExportToPremiere = async () => {
    const mockProject: EditingProject = {
      clips: videoFiles.map((file, index) => ({
        file,
        type: 'preparation',
        startTime: index * 10,
        endTime: (index + 1) * 10,
        significance: Math.random()
      })),
      duration: { min: 5, max: 10 },
      music: {
        file: new File([], "background_music.mp3"),
        beats: []
      }
    };

    // Generate three versions for compatibility
    const versions = ['legacy', 'current', 'compatible'] as const;
    
    for (const version of versions) {
      const mockOrganizationResult: OrganizationResult = {
        categorizedFiles: new Map(),
        stats: { totalFiles: videoFiles.length }
      };

      await generatePremiereSequence(mockOrganizationResult, { version });
    }

    toast({
      title: "Project Exported",
      description: "Three versions have been exported for maximum compatibility",
    });
  };

  return (
    <div className="flex justify-between items-center mt-8">
      {isComplete ? (
        <Button
          onClick={handleExportToPremiere}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
        >
          <Save className="w-4 h-4 mr-2" />
          Export to Premiere Pro
        </Button>
      ) : (
        <Button variant="destructive" onClick={onStopProcessing}>
          Stop Processing
        </Button>
      )}
    </div>
  );
};

export default ExportOptions;