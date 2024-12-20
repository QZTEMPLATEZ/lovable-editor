import React from 'react';
import { Button } from "@/components/ui/button";
import { Play } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface FileProcessingProps {
  files: File[];
  isProcessing: boolean;
  onProcessStart: (files: File[]) => void;
}

const FileProcessing = ({ files, isProcessing, onProcessStart }: FileProcessingProps) => {
  const { toast } = useToast();

  const handleProcessClick = () => {
    if (!files || files.length === 0) {
      toast({
        variant: "destructive",
        title: "No files selected",
        description: "Please select files to analyze.",
      });
      return;
    }
    onProcessStart(files);
  };

  return (
    <div className="flex justify-center">
      {files.length > 0 && !isProcessing && (
        <Button
          onClick={handleProcessClick}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
        >
          <Play className="w-4 h-4 mr-2" />
          Start Organization Process
        </Button>
      )}
    </div>
  );
};

export default FileProcessing;