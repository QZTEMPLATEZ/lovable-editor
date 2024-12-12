import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { exportProject } from '@/utils/projectExport';

interface ExportOptionsProps {
  onExport: (format: 'premiere' | 'finalcut' | 'resolve') => void;
  isGenerating: boolean;
}

const ExportOptions = ({ onExport, isGenerating }: ExportOptionsProps) => {
  const { toast } = useToast();

  const handleExport = async (format: 'premiere' | 'finalcut' | 'resolve') => {
    try {
      await onExport(format);
      toast({
        title: "Export Successful",
        description: `Your project has been exported for ${
          format === 'premiere' ? 'Adobe Premiere Pro' : 
          format === 'finalcut' ? 'Final Cut Pro' : 
          'DaVinci Resolve'
        }.`,
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
    <div className="space-y-4">
      <Button
        onClick={() => handleExport('premiere')}
        disabled={isGenerating}
        className="w-full bg-blue-500 hover:bg-blue-600"
      >
        Export for Premiere Pro
      </Button>
      <Button
        onClick={() => handleExport('finalcut')}
        disabled={isGenerating}
        className="w-full bg-purple-500 hover:bg-purple-600"
      >
        Export for Final Cut Pro
      </Button>
      <Button
        onClick={() => handleExport('resolve')}
        disabled={isGenerating}
        className="w-full bg-pink-500 hover:bg-pink-600"
      >
        Export for DaVinci Resolve
      </Button>
    </div>
  );
};

export default ExportOptions;