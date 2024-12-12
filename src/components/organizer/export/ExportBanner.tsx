import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '../../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu';
import { useToast } from '../../ui/use-toast';

interface ExportBannerProps {
  successCount: number;
  onExport: (format: 'premiere' | 'finalcut' | 'resolve') => Promise<void>;
}

const ExportBanner = ({ successCount, onExport }: ExportBannerProps) => {
  const { toast } = useToast();

  if (successCount === 0) return null;

  const handleExport = async (format: 'premiere' | 'finalcut' | 'resolve') => {
    try {
      await onExport(format);
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