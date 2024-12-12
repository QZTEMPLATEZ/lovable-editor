import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download } from 'lucide-react';

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
      className="w-full bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 rounded-xl p-16 border border-purple-500/20 mt-16 mb-24 shadow-xl"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-12">
          <div className="space-y-4 text-center">
            <h3 className="text-4xl font-light tracking-wide bg-gradient-to-r from-pink-500 to-pink-300 bg-clip-text text-transparent">
              Export Your Sequence
            </h3>
            <p className="text-lg text-white/60 font-light tracking-wider">
              Download your organized sequence for professional editing software
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            <Button
              onClick={() => onExport('premiere')}
              className="bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 py-6 text-base font-light tracking-wider shadow-sm"
            >
              <Download className="w-5 h-5 mr-3 opacity-70" />
              Adobe Premiere Pro
            </Button>

            <Button
              onClick={() => onExport('finalcut')}
              className="bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 py-6 text-base font-light tracking-wider shadow-sm"
            >
              <Download className="w-5 h-5 mr-3 opacity-70" />
              Final Cut Pro
            </Button>

            <Button
              onClick={() => onExport('resolve')}
              className="bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 py-6 text-base font-light tracking-wider shadow-sm"
            >
              <Download className="w-5 h-5 mr-3 opacity-70" />
              DaVinci Resolve
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExportBanner;