import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FileAudio, Download, Settings2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoType } from '@/contexts/VideoTypeContext';

interface PreDownloadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PreDownloadModal = ({ open, onOpenChange }: PreDownloadModalProps) => {
  const [selectedFormat, setSelectedFormat] = React.useState<'mp3' | 'wav' | 'flac'>('mp3');
  const [isDownloading, setIsDownloading] = React.useState(false);
  const { selectedMusic } = useVideoType();
  const { toast } = useToast();

  const handleDownload = async () => {
    if (!selectedMusic?.length) {
      toast({
        variant: "destructive",
        title: "No music selected",
        description: "Please select music tracks before downloading.",
      });
      return;
    }

    setIsDownloading(true);
    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Download Complete",
        description: `Your tracks have been downloaded in ${selectedFormat.toUpperCase()} format.`,
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "There was an error downloading your tracks. Please try again.",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-editor-bg border border-purple-500/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            Download Pre-Separated Tracks
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Download your tracks before editing. Choose your preferred format and quality settings.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-purple-300">Format Selection</h3>
            <div className="grid grid-cols-3 gap-3">
              {(['mp3', 'wav', 'flac'] as const).map((format) => (
                <Button
                  key={format}
                  variant={selectedFormat === format ? "default" : "outline"}
                  className={`h-20 ${
                    selectedFormat === format 
                      ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50' 
                      : 'border-purple-500/30'
                  }`}
                  onClick={() => setSelectedFormat(format)}
                >
                  <div className="text-center">
                    <FileAudio className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm uppercase">{format}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-purple-300">Advanced Settings</h3>
              <Settings2 className="w-4 h-4 text-purple-400" />
            </div>
            <div className="bg-editor-panel/50 rounded-lg p-4 border border-purple-500/20">
              <p className="text-sm text-gray-400">
                Quality settings and advanced options will be available in a future update.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-purple-500/30"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
          >
            {isDownloading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white mr-2" />
                Processing...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreDownloadModal;