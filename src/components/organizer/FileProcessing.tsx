import React from 'react';
import { useToast } from "@/components/ui/use-toast";

interface FileProcessingProps {
  files: File[];
  isProcessing: boolean;
  onProcessStart: (files: File[]) => void;
}

const FileProcessing = ({ files, isProcessing, onProcessStart }: FileProcessingProps) => {
  const { toast } = useToast();

  // Start processing automatically when files are received
  React.useEffect(() => {
    if (files.length > 0 && !isProcessing) {
      onProcessStart(files);
    }
  }, [files, isProcessing, onProcessStart]);

  return null; // No button needed anymore
};

export default FileProcessing;