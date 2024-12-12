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
      className="w-full bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 rounded-xl p-12 border border-purple-500/30 mt-12 mb-24 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="space-y-6 text-center">
            <h3 className="text-5xl font-cinzel tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-gray-400">
              Export Your Sequence
            </h3>
            <p className="text-2xl font-italiana text-gray-300 tracking-wide">
              Download your organized sequence for professional editing software
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            <Button
              onClick={() => onExport('premiere')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-all duration-300 transform hover:scale-105 py-8 text-lg font-cinzel tracking-wider shadow-lg"
            >
              <Download className="w-7 h-7 mr-4" />
              Adobe Premiere Pro
            </Button>

            <Button
              onClick={() => onExport('finalcut')}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 transition-all duration-300 transform hover:scale-105 py-8 text-lg font-cinzel tracking-wider shadow-lg"
            >
              <Download className="w-7 h-7 mr-4" />
              Final Cut Pro
            </Button>

            <Button
              onClick={() => onExport('resolve')}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all duration-300 transform hover:scale-105 py-8 text-lg font-cinzel tracking-wider shadow-lg"
            >
              <Download className="w-7 h-7 mr-4" />
              DaVinci Resolve
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExportBanner;