import React from 'react';
import { Upload } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FileUploadZoneProps {
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({ onDrop, onFileSelect }) => {
  return (
    <>
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-purple-500/30 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500/50 transition-all duration-300 mb-8"
      >
        <input
          type="file"
          onChange={onFileSelect}
          className="hidden"
          id="file-upload"
          multiple
          accept="image/*,audio/*,video/*"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="w-12 h-12 mx-auto text-purple-400 mb-4" />
          <p className="text-lg text-purple-200 mb-2">
            Drag and drop your files here or click to browse
          </p>
          <p className="text-sm text-purple-300/70">
            Supported formats: Images (JPG, PNG), Audio (WAV, MP3), Video (MP4, MOV)
          </p>
        </label>
      </div>

      <Alert className="mb-6 bg-purple-500/10 border-purple-500/30">
        <AlertDescription className="text-purple-200">
          Your files will be organized into the following categories using AI image recognition:
        </AlertDescription>
      </Alert>
    </>
  );
};

export default FileUploadZone;