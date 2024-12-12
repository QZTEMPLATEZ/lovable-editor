import React from 'react';
import { motion } from 'framer-motion';
import { Download, Wand2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ActionButtonsProps {
  onStartEditing: () => void;
  onPreDownload: () => void;
  isProcessing: boolean;
}

const ActionButtons = ({ onStartEditing, onPreDownload, isProcessing }: ActionButtonsProps) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-md"
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onStartEditing}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 h-16 text-lg relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 transform group-hover:scale-105 transition-transform duration-300" />
                <Wand2 className="w-6 h-6 mr-3" />
                {isProcessing ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                    Processing...
                  </div>
                ) : (
                  "Start AI Editing"
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Begin the AI-powered editing process</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          variant="outline"
          onClick={onPreDownload}
          className="gap-2 text-purple-300 border-purple-500/30 hover:bg-purple-500/10"
        >
          <Download className="w-4 h-4" />
          Download Pre-Separated Tracks
        </Button>
      </motion.div>
    </div>
  );
};

export default ActionButtons;