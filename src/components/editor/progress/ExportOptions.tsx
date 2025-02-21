
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { OrganizationResult } from '@/types/organizer';

interface ExportOptionsProps {
  organizationResult: OrganizationResult;
  onExport: (format: string) => void;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ organizationResult, onExport }) => {
  const { stats } = organizationResult;
  
  return (
    <div className="space-y-4 p-4 bg-black/20 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Export Options</h3>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-400">
          Files ready for export: {stats.categorizedCount} of {stats.totalFiles}
        </p>
        
        <div className="flex gap-2">
          <Button
            onClick={() => onExport('fcpxml')}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            <FileDown className="mr-2 h-4 w-4" />
            Export to Final Cut Pro
          </Button>
          
          <Button
            onClick={() => onExport('premiere')}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <FileDown className="mr-2 h-4 w-4" />
            Export to Premiere Pro
          </Button>
          
          <Button
            onClick={() => onExport('davinci')}
            className="w-full bg-orange-600 hover:bg-orange-700"
          >
            <FileDown className="mr-2 h-4 w-4" />
            Export to DaVinci Resolve
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;
