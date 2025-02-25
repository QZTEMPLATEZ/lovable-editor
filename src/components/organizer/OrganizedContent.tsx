
import { DragDropContext } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CategoryGrid from './CategoryGrid';
import ClassifiedFilesGrid from './ClassifiedFilesGrid';
import { WEDDING_CATEGORIES } from '@/constants/weddingCategories';
import { OrganizationResult } from '@/types/organizer';

interface OrganizedContentProps {
  organizationResult: OrganizationResult;
  onDragEnd: (result: any) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  isProcessing: boolean;
  gridColumns: string;
  onFrameLoad: (fileName: string) => void;
  onContinue: () => void;
}

const OrganizedContent = ({
  organizationResult,
  onDragEnd,
  onZoomIn,
  onZoomOut,
  isProcessing,
  gridColumns,
  onFrameLoad,
  onContinue
}: OrganizedContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 space-y-6"
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="space-y-8">
          <CategoryGrid
            categories={Object.values(WEDDING_CATEGORIES)}
            organizationResult={organizationResult}
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
            isProcessing={isProcessing}
          />

          <div className="bg-[#232323] rounded-lg p-4 border border-[#3F3F3F] shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-[#E8E8E8]">Arquivos Classificados</h3>
            <ClassifiedFilesGrid
              organizationResult={organizationResult}
              onFrameLoad={onFrameLoad}
              gridColumns={gridColumns}
            />
          </div>

          <div className="flex justify-end mt-8">
            <Button
              onClick={onContinue}
              className="bg-[#2D9CDB] hover:bg-[#2B8CC9] text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Continuar para Edição
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </DragDropContext>
    </motion.div>
  );
};

export default OrganizedContent;
