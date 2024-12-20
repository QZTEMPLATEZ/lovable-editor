import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import FileUploadZone from './FileUploadZone';
import { organizeFiles } from '@/utils/organizerUtils';
import { DEFAULT_CATEGORIES } from '@/utils/organizerUtils';
import { OrganizationResult } from '@/types/organizer';
import CategoryGrid from './categories/CategoryGrid';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ProcessStatus from './ProcessStatus';

interface FileOrganizerProps {
  isEditMode?: boolean;
}

const FileOrganizer: React.FC<FileOrganizerProps> = ({ isEditMode = false }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [organizationResult, setOrganizationResult] = useState<OrganizationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    await processFiles(droppedFiles);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      await processFiles(selectedFiles);
    }
  };

  const processFiles = async (newFiles: File[]) => {
    setFiles(newFiles);
    setIsProcessing(true);

    try {
      const result = await organizeFiles(newFiles, DEFAULT_CATEGORIES);
      setOrganizationResult(result);
      
      toast({
        title: "Files Processed Successfully",
        description: `${result.stats.categorizedCount} files categorized, ${result.stats.uncategorizedCount} need review.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Processing Error",
        description: "Failed to process files. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCategoryUpdate = (fileId: string, newCategory: string) => {
    if (!organizationResult) return;

    const updatedFiles = new Map(organizationResult.categorizedFiles);
    
    updatedFiles.forEach((files, category) => {
      const fileIndex = files.findIndex(f => f.name === fileId);
      if (fileIndex !== -1) {
        const file = files[fileIndex];
        files.splice(fileIndex, 1);
        
        const categoryFiles = updatedFiles.get(newCategory) || [];
        categoryFiles.push(file);
        updatedFiles.set(newCategory, categoryFiles);
      }
    });

    setOrganizationResult({
      ...organizationResult,
      categorizedFiles: updatedFiles,
    });

    toast({
      title: "Category Updated",
      description: `File moved to ${newCategory}`,
    });
  };

  const handleContinue = () => {
    if (!organizationResult || organizationResult.stats.totalFiles === 0) {
      toast({
        variant: "destructive",
        title: "No Files Processed",
        description: "Please upload and process files before continuing.",
      });
      return;
    }
    navigate('/edit');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 space-y-6"
    >
      {!organizationResult && !isEditMode && (
        <FileUploadZone
          onDrop={handleDrop}
          onFileSelect={handleFileSelect}
        />
      )}

      {isProcessing && (
        <ProcessStatus
          totalFiles={files.length}
          processedFiles={0}
          successCount={0}
          errorCount={0}
        />
      )}

      {organizationResult && !isProcessing && (
        <>
          <CategoryGrid
            categories={DEFAULT_CATEGORIES}
            organizationResult={organizationResult}
            onCategoryUpdate={handleCategoryUpdate}
          />

          <div className="flex justify-end mt-8">
            <Button
              onClick={handleContinue}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
            >
              Continue to Edit
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default FileOrganizer;