import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, AlertCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

type ExportFormat = 'premiere' | 'finalcut' | 'resolve';

interface ProjectExportOptionsProps {
  onExport: (format: ExportFormat) => void;
  isProcessing: boolean;
}

const ProjectExportOptions: React.FC<ProjectExportOptionsProps> = ({
  onExport,
  isProcessing
}) => {
  const [selectedFormat, setSelectedFormat] = React.useState<ExportFormat>('premiere');
  const { toast } = useToast();

  const handleExport = () => {
    if (isProcessing) {
      toast({
        variant: "destructive",
        title: "Processing in Progress",
        description: "Please wait for the current processing to complete."
      });
      return;
    }
    onExport(selectedFormat);
  };

  return (
    <div className="space-y-4">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Export your project to continue editing in your preferred professional software.
          No final rendering will be performed in this app.
        </AlertDescription>
      </Alert>

      <div className="flex flex-col sm:flex-row gap-4">
        <Select
          value={selectedFormat}
          onValueChange={(value: ExportFormat) => setSelectedFormat(value)}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select software" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="premiere">Adobe Premiere Pro</SelectItem>
            <SelectItem value="finalcut">Final Cut Pro</SelectItem>
            <SelectItem value="resolve">DaVinci Resolve</SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={handleExport}
          disabled={isProcessing}
          className="w-full sm:w-auto"
        >
          <Download className="mr-2 h-4 w-4" />
          Export Project File
        </Button>
      </div>
    </div>
  );
};

export default ProjectExportOptions;