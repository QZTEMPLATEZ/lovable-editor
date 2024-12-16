import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Wand2, Settings2, Film, Clock } from "lucide-react";

interface PremiereAutoEditProps {
  organizationResult: {
    categorizedFiles: Map<string, File[]>;
    stats: {
      totalFiles: number;
      categorizedCount: number;
    };
  };
}

declare global {
  interface Window {
    createPremiereSequence: (config: any) => Promise<string>;
    importAndOrganizeFootage: (files: any[], bins: any) => Promise<string>;
    generatePremiereEdit: (settings: any) => Promise<string>;
  }
}

const PremiereAutoEdit: React.FC<PremiereAutoEditProps> = ({ organizationResult }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleGenerateEdit = async () => {
    try {
      setIsGenerating(true);
      
      // Connect to Premiere Pro through CEP
      toast({
        title: "Connecting to Premiere Pro",
        description: "Establishing connection with Adobe Premiere Pro...",
      });

      // Create new sequence
      await window.createPremiereSequence({
        name: "Wedding Highlights",
        timebase: 30,
        width: 1920,
        height: 1080
      });
      await simulateProgress(0, 20);
      
      toast({
        title: "Creating Sequence",
        description: "Setting up new sequence with optimal settings...",
      });

      // Import and organize footage
      const files = Array.from(organizationResult.categorizedFiles.entries())
        .flatMap(([category, files]) => 
          files.map(file => ({
            path: URL.createObjectURL(file),
            name: file.name,
            category
          }))
        );

      const bins = Object.fromEntries(
        Array.from(organizationResult.categorizedFiles.keys())
          .map(category => [category, []])
      );

      await window.importAndOrganizeFootage(files, bins);
      await simulateProgress(20, 40);
      
      toast({
        title: "Organizing Footage",
        description: "Creating bins and importing footage...",
      });

      // Generate edit
      await window.generatePremiereEdit({
        duration: "auto",
        style: "cinematic",
        categories: Array.from(organizationResult.categorizedFiles.keys())
      });
      await simulateProgress(40, 100);
      
      toast({
        title: "Edit Complete",
        description: "Your automated edit is ready in Premiere Pro!",
      });

    } catch (error) {
      console.error('Generation error:', error);
      toast({
        variant: "destructive",
        title: "Generation Error",
        description: "Failed to generate edit. Please ensure Premiere Pro is running.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const simulateProgress = async (start: number, end: number) => {
    for (let i = start; i <= end; i++) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  };

  return (
    <div className="space-y-6 max-w-[400px] mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 rounded-2xl p-8 backdrop-blur-lg border border-purple-500/30"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
              Automatic Edit Generation
            </h3>
            <Settings2 className="w-6 h-6 text-purple-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
              <Film className="w-5 h-5 text-purple-400 mb-2" />
              <div className="text-sm text-purple-200">
                {organizationResult.stats.categorizedCount} Clips Ready
              </div>
            </div>
            
            <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
              <Clock className="w-5 h-5 text-purple-400 mb-2" />
              <div className="text-sm text-purple-200">
                Estimated Duration: 5-7 min
              </div>
            </div>

            <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
              <Wand2 className="w-5 h-5 text-purple-400 mb-2" />
              <div className="text-sm text-purple-200">
                AI-Powered Editing
              </div>
            </div>
          </div>

          {isGenerating ? (
            <div className="space-y-4">
              <Progress value={progress} className="h-2" />
              <p className="text-center text-sm text-purple-200">
                Generating your edit... {progress}%
              </p>
            </div>
          ) : (
            <Button
              onClick={handleGenerateEdit}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 h-12"
            >
              <Wand2 className="w-5 h-5 mr-2" />
              Generate Edit in Premiere Pro
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PremiereAutoEdit;