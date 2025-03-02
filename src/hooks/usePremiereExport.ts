import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/utils/logger';
import { generatePremiereSequence } from '@/utils/premiere/sequenceGenerator';
import { OrganizationResult } from '@/types/organizer';

export const usePremiereExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async (format: 'premiere' | 'finalcut' | 'resolve', organizationResult: OrganizationResult) => {
    if (organizationResult.stats.categorizedCount === 0) {
      toast({
        variant: "destructive",
        title: "No files to export",
        description: "Please process some files before exporting.",
      });
      return;
    }

    setIsExporting(true);
    try {
      toast({
        title: "Generating Sequence",
        description: "Please wait while we prepare your sequence file...",
      });

      if (format === 'premiere') {
        const versions = ['legacy', 'current', 'compatible'] as const;
        
        for (const version of versions) {
          logger.info(`Generating ${version} version of Premiere sequence`);
          
          const sequenceXML = await generatePremiereSequence(organizationResult, {
            version,
            projectName: 'Wedding Highlights'
          });

          const blob = new Blob([sequenceXML], { type: 'application/xml' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `wedding_highlights_${version}.prproj`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }

        toast({
          title: "Export Successful",
          description: "Three versions have been exported. Please try each version to find the most compatible one with your Premiere Pro.",
        });
      }
    } catch (error) {
      logger.error('Export error:', error);
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "There was an error exporting your sequence. Please try again.",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return {
    isExporting,
    handleExport
  };
};