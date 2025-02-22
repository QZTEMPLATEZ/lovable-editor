
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileCheck2, Settings, Download } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { usePremiereExport } from '@/hooks/usePremiereExport';
import { motion } from 'framer-motion';
import { VideoStyle } from '@/types/video';

interface ReviewStepProps {
  projectName: string;
  categorizedFiles: Map<string, File[]>;
  musicTracks: File[];
  onFinish: () => void;
  rawFiles: File[];
  selectedMusic: File[];
  selectedStyle: VideoStyle;
}

const ReviewStep: React.FC<ReviewStepProps> = ({
  projectName,
  categorizedFiles,
  musicTracks,
  onFinish,
  rawFiles,
  selectedMusic,
  selectedStyle
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'premiere' | 'resolve' | 'fcpx'>('premiere');
  const { isExporting, exportToPremiereProject } = usePremiereExport();

  const handleExport = async () => {
    try {
      await exportToPremiereProject(categorizedFiles, musicTracks, projectName);
      onFinish();
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="bg-editor-panel/50 rounded-xl p-6 border border-purple-500/20">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FileCheck2 className="w-5 h-5 text-purple-400" />
          Revisão Final
        </h3>
        
        <ScrollArea className="h-[300px] rounded-md border border-purple-500/20 p-4">
          <div className="space-y-4">
            <div className="p-4 bg-purple-500/10 rounded-lg">
              <h4 className="font-medium mb-2">Estilo Selecionado</h4>
              <p className="text-sm text-gray-300">{selectedStyle.name}</p>
            </div>

            <div className="p-4 bg-purple-500/10 rounded-lg">
              <h4 className="font-medium mb-2">Arquivos Processados</h4>
              {Array.from(categorizedFiles.entries()).map(([category, files]) => (
                <div key={category} className="flex items-center justify-between text-sm text-gray-300">
                  <span>{category}</span>
                  <span>{files.length} arquivos</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-purple-500/10 rounded-lg">
              <h4 className="font-medium mb-2">Trilha Sonora</h4>
              <p className="text-sm text-gray-300">
                {selectedMusic.length} músicas selecionadas
              </p>
            </div>
          </div>
        </ScrollArea>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-purple-500/10 rounded-lg">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-purple-400" />
              <span>Formato de Exportação</span>
            </div>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value as typeof selectedFormat)}
              className="bg-purple-500/20 border border-purple-500/30 rounded px-2 py-1 text-sm"
            >
              <option value="premiere">Adobe Premiere Pro</option>
              <option value="resolve">DaVinci Resolve</option>
              <option value="fcpx">Final Cut Pro</option>
            </select>
          </div>

          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
          >
            {isExporting ? (
              "Exportando..."
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Exportar Projeto
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewStep;
