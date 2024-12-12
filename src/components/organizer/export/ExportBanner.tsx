import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileVideo, Download } from 'lucide-react';

interface ExportBannerProps {
  successCount: number;
  onExport: (format: 'premiere' | 'finalcut' | 'resolve') => void;
}

const ExportBanner = ({ successCount, onExport }: ExportBannerProps) => {
  if (successCount === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-editor-bg/95 backdrop-blur-sm border-t border-purple-500/20"
    >
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-cinzel bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Export Your Sequence
            </h3>
            <p className="text-gray-400">
              Download your organized sequence for professional editing software
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => onExport('premiere')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4 mr-2" />
              Adobe Premiere Pro
            </Button>

            <Button
              onClick={() => onExport('finalcut')}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4 mr-2" />
              Final Cut Pro
            </Button>

            <Button
              onClick={() => onExport('resolve')}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4 mr-2" />
              DaVinci Resolve
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExportBanner;