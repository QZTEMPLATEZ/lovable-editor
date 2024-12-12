import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VideoStyle } from '../../../types/video';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, FileVideo, Music, Download } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { OrganizationResult } from '@/types/organizer';

interface ReviewStepProps {
  rawFiles: File[];
  selectedMusic: File[];
  selectedStyle: VideoStyle | null;
  organizationResult: OrganizationResult;
}

const ReviewStep = ({ rawFiles, selectedMusic, selectedStyle, organizationResult }: ReviewStepProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const { toast } = useToast();

  const handleExport = async (format: 'premiere' | 'finalcut' | 'resolve') => {
    if (!selectedStyle || rawFiles.length === 0 || selectedMusic.length === 0) {
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "Please ensure you have selected a style, added raw files, and chosen music.",
      });
      return;
    }

    setIsExporting(true);
    setExportProgress(0);

    try {
      // Simulate export progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setExportProgress(i);
      }

      toast({
        title: "Export Successful",
        description: `Your project has been exported in ${format} format.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "An error occurred during export. Please try again.",
      });
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-editor-panel rounded-xl p-6 border border-purple-500/20">
        <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
          Project Review
        </h2>

        <Tabs defaultValue="summary" className="space-y-4">
          <TabsList>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="export">Export Options</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileVideo className="w-5 h-5 text-purple-400" />
                  <h3 className="font-semibold">Raw Files</h3>
                </div>
                <p className="text-sm text-gray-400">{rawFiles.length} files selected</p>
                <div className="mt-2 max-h-32 overflow-y-auto">
                  {rawFiles.map((file, index) => (
                    <div key={index} className="text-sm text-gray-300 py-1">
                      {file.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-black/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Music className="w-5 h-5 text-purple-400" />
                  <h3 className="font-semibold">Music Tracks</h3>
                </div>
                <p className="text-sm text-gray-400">{selectedMusic.length} tracks selected</p>
                <div className="mt-2">
                  {selectedMusic.map((file, index) => (
                    <div key={index} className="text-sm text-gray-300 py-1">
                      {file.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {selectedStyle && (
              <div className="bg-black/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Selected Style</h3>
                <p className="text-gray-300">{selectedStyle.name}</p>
                <p className="text-sm text-gray-400 mt-1">{selectedStyle.description}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            {isExporting ? (
              <div className="space-y-4">
                <Progress value={exportProgress} className="h-2" />
                <p className="text-center text-sm text-gray-400">
                  Exporting your project... {exportProgress}%
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => handleExport('premiere')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Export to Premiere
                </Button>

                <Button
                  onClick={() => handleExport('finalcut')}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Export to Final Cut
                </Button>

                <Button
                  onClick={() => handleExport('resolve')}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Export to DaVinci
                </Button>
              </div>
            )}

            <Alert className="bg-purple-500/10 border-purple-500/30">
              <AlertDescription className="text-purple-200">
                Choose your preferred editing software to export your project. The exported file will include all your selected clips, music, and style settings.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default ReviewStep;