
import React from 'react';
import { motion } from 'framer-motion';
import { Video, FileVideo, Film, Download } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ExportStepProps {
  rawFilesCount: number;
  onExport: (format: 'xml' | 'edl' | 'fcpxml') => void;
  onStartNewProject: () => void;
}

const ExportStep: React.FC<ExportStepProps> = ({
  rawFilesCount,
  onExport,
  onStartNewProject
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="p-6 bg-black/20 backdrop-blur-md border border-purple-500/20 rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-purple-200">Export Your Project</h2>
        
        <div className="bg-purple-900/20 p-4 rounded-xl mb-6">
          <h3 className="text-lg font-semibold mb-3 text-purple-200">Project Summary</h3>
          <ul className="space-y-2 text-purple-300">
            <li className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              <span>1 reference video analyzed</span>
            </li>
            <li className="flex items-center gap-2">
              <FileVideo className="w-4 h-4" />
              <span>{rawFilesCount} raw footage files categorized</span>
            </li>
            <li className="flex items-center gap-2">
              <Film className="w-4 h-4" />
              <span>4 different wedding event categories identified</span>
            </li>
          </ul>
        </div>
        
        <h3 className="text-lg font-medium mb-4 text-purple-200">Export Format</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Button 
            variant="outline" 
            className="border-purple-500/30 hover:bg-purple-500/10 flex items-center justify-center gap-2 py-6"
            onClick={() => onExport('xml')}
          >
            <Download className="w-5 h-5" />
            <div>
              <p className="font-medium">Adobe Premiere</p>
              <p className="text-xs text-purple-400">XML</p>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="border-purple-500/30 hover:bg-purple-500/10 flex items-center justify-center gap-2 py-6"
            onClick={() => onExport('fcpxml')}
          >
            <Download className="w-5 h-5" />
            <div>
              <p className="font-medium">Final Cut Pro</p>
              <p className="text-xs text-purple-400">FCPXML</p>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="border-purple-500/30 hover:bg-purple-500/10 flex items-center justify-center gap-2 py-6"
            onClick={() => onExport('edl')}
          >
            <Download className="w-5 h-5" />
            <div>
              <p className="font-medium">DaVinci Resolve</p>
              <p className="text-xs text-purple-400">EDL</p>
            </div>
          </Button>
        </div>
        
        <Button 
          variant="outline"
          className="w-full border-purple-500/30 hover:bg-purple-500/10"
          onClick={onStartNewProject}
        >
          Start New Project
        </Button>
      </Card>
    </motion.div>
  );
};

export default ExportStep;
