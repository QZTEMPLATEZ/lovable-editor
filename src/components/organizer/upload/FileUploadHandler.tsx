import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { logger } from '../../../utils/logger';
import { ORGANIZER_CONFIG } from '../../../config/organizerConfig';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload } from 'lucide-react';

interface FileUploadHandlerProps {
  onFilesSelected: (files: File[]) => void;
  isProcessing: boolean;
}

const FileUploadHandler: React.FC<FileUploadHandlerProps> = ({
  onFilesSelected,
  isProcessing
}) => {
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const validateFiles = (files: File[]): File[] => {
    return files.filter(file => {
      if (!ORGANIZER_CONFIG.analysis.supportedFileTypes.includes(file.type)) {
        toast({
          variant: "destructive",
          title: "Unsupported file type",
          description: `${file.name} is not a supported file type.`
        });
        return false;
      }

      if (file.size > ORGANIZER_CONFIG.analysis.maxFileSize) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: `${file.name} exceeds the maximum file size of ${ORGANIZER_CONFIG.analysis.maxFileSize / (1024 * 1024)}MB.`
        });
        return false;
      }

      return true;
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (isProcessing) return;

    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = validateFiles(droppedFiles);
    
    if (validFiles.length > 0) {
      logger.info(`${validFiles.length} valid files dropped`);
      onFilesSelected(validFiles);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isProcessing || !e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const validFiles = validateFiles(selectedFiles);
    
    if (validFiles.length > 0) {
      logger.info(`${validFiles.length} valid files selected`);
      onFilesSelected(validFiles);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
        ${isProcessing 
          ? 'border-gray-500/30 bg-gray-500/5 cursor-not-allowed' 
          : 'border-purple-500/30 hover:border-purple-500/50 cursor-pointer'}`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        multiple
        accept={ORGANIZER_CONFIG.analysis.supportedFileTypes.join(',')}
        disabled={isProcessing}
      />
      <div className={isProcessing ? 'cursor-not-allowed' : 'cursor-pointer'}>
        <Upload className="w-12 h-12 mx-auto text-purple-400 mb-4" />
        <p className="text-lg text-purple-200 mb-2">
          {isProcessing 
            ? 'Processing files...' 
            : 'Drag and drop your files here or click to browse'}
        </p>
        <p className="text-sm text-purple-300/70">
          Supported formats: Video (MP4, MOV)
        </p>
      </div>

      <Alert className="mt-4 bg-purple-500/10 border-purple-500/30">
        <AlertDescription className="text-purple-200">
          Maximum file size: {ORGANIZER_CONFIG.analysis.maxFileSize / (1024 * 1024)}MB
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default FileUploadHandler;