
import { useState } from 'react';

interface UseFileHandlingProps {
  setRawFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setReferenceVideo: React.Dispatch<React.SetStateAction<File | null>>;
  toast: any;
}

export const useFileHandling = ({ 
  setRawFiles, 
  setReferenceVideo, 
  toast 
}: UseFileHandlingProps) => {
  
  const handleRawFileSelection = (files: File[]) => {
    setRawFiles(files);
    toast({
      title: "Success",
      description: `${files.length} raw video files selected`,
    });
  };

  const handleReferenceSelection = (file: File) => {
    setReferenceVideo(file);
    toast({
      title: "Success",
      description: "Reference video selected: " + file.name,
    });
  };

  return {
    handleRawFileSelection,
    handleReferenceSelection
  };
};
