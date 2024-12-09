import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Wand2, Download, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import { createHighlightReel } from '@/utils/videoEditingLogic';
import { exportProject } from '@/utils/projectExport';

interface AIEditStepProps {
  aiScript: string;
  onChange: (script: string) => void;
  onStartEditing: () => void;
  rawFiles?: File[];
  musicFile?: File;
}

const AIEditStep: React.FC<AIEditStepProps> = ({
  aiScript,
  onChange,
  onStartEditing,
  rawFiles = [],
  musicFile
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const { toast } = useToast();

  const handleStartEditing = async () => {
    if (!musicFile || rawFiles.length === 0) {
      toast({
        variant: "destructive",
        title: "Missing Files",
        description: "Please ensure you have uploaded both raw footage and music.",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const project = await createHighlightReel(
        rawFiles,
        musicFile,
        { min: 4, max: 6 }
      );
      setEditingProject(project);
      onStartEditing();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Processing Error",
        description: "Failed to process video files. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExport = async () => {
    if (!editingProject) return;

    try {
      const projectBlob = await exportProject(editingProject, { format: 'premiere' });
      const url = URL.createObjectURL(projectBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'wedding_highlights.prproj';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: "Your project has been exported for Adobe Premiere Pro.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: error.message,
      });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 rounded-2xl p-8 backdrop-blur-lg border border-purple-500/30"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
              AI Edit Configuration
            </h3>
            <textarea
              value={aiScript}
              onChange={(e) => onChange(e.target.value)}
              className="w-full h-40 bg-editor-bg/50 border border-purple-500/30 rounded-xl p-4 text-white resize-none focus:outline-none focus:border-purple-500/50"
              placeholder="Describe your editing preferences..."
            />
          </div>

          <div className="space-y-6">
            <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/30">
              <h4 className="text-lg font-semibold text-purple-300 mb-4">4-6 Minutes Highlight Reel</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-purple-400" />
                  Dynamic editing synced with music
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-purple-400" />
                  Key moments automatically selected
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-purple-400" />
                  Export to Adobe Premiere Pro
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <Button
                onClick={handleStartEditing}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-opacity"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                {isProcessing ? "Processing..." : "Start AI Edit"}
              </Button>

              {editingProject && (
                <Button
                  onClick={handleExport}
                  variant="outline"
                  className="w-full border-purple-500/30 hover:bg-purple-500/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export for Premiere Pro
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIEditStep;