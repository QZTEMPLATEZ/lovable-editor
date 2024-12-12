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
      className="w-full bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 rounded-xl p-8 border border-purple-500/30 mt-12 mb-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="space-y-4 text-center">
            <h3 className="text-4xl font-cinzel bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Export Your Sequence
            </h3>
            <p className="text-xl text-gray-400">
              Download your organized sequence for professional editing software
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            <Button
              onClick={() => onExport('premiere')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-all duration-300 transform hover:scale-105 py-6 text-lg"
            >
              <Download className="w-6 h-6 mr-3" />
              Adobe Premiere Pro
            </Button>

            <Button
              onClick={() => onExport('finalcut')}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 transition-all duration-300 transform hover:scale-105 py-6 text-lg"
            >
              <Download className="w-6 h-6 mr-3" />
              Final Cut Pro
            </Button>

            <Button
              onClick={() => onExport('resolve')}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all duration-300 transform hover:scale-105 py-6 text-lg"
            >
              <Download className="w-6 h-6 mr-3" />
              DaVinci Resolve
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExportBanner;