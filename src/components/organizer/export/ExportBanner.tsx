import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

interface ExportBannerProps {
  onExport: (format: 'premiere' | 'finalcut' | 'resolve') => void;
}

const ExportBanner = ({ onExport }: ExportBannerProps) => {
  const exportOptions = [
    {
      name: 'Adobe Premiere Pro',
      format: 'premiere' as const,
      icon: '/lovable-uploads/premiere-icon.png',
      description: 'Export for Adobe Premiere Pro',
      color: 'from-purple-500/20 to-blue-500/20'
    },
    {
      name: 'Final Cut Pro',
      format: 'finalcut' as const,
      icon: '/lovable-uploads/finalcut-icon.png',
      description: 'Export for Final Cut Pro',
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      name: 'DaVinci Resolve',
      format: 'resolve' as const,
      icon: '/lovable-uploads/resolve-icon.png',
      description: 'Export for DaVinci Resolve',
      color: 'from-orange-500/20 to-red-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {exportOptions.map((option) => (
        <motion.button
          key={option.format}
          onClick={() => onExport(option.format)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            relative p-6 rounded-xl border border-white/10
            bg-gradient-to-br ${option.color}
            backdrop-blur-sm transition-all
            hover:border-white/20 group
          `}
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          
          <div className="relative flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
              <Download className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {option.name}
              </h3>
              <p className="text-sm text-gray-300">
                {option.description}
              </p>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default ExportBanner;