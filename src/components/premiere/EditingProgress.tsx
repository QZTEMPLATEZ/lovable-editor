
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, RefreshCcw, Edit } from 'lucide-react';

interface EditingProgressProps {
  progress: number;
  timeRemaining: string;
  onReEdit?: () => void;
  onCorrect?: () => void;
  isProcessing: boolean;
}

const EditingProgress: React.FC<EditingProgressProps> = ({
  progress,
  timeRemaining,
  onReEdit,
  onCorrect,
  isProcessing
}) => {
  return (
    <div className="bg-editor-bg/50 border border-editor-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-editor-glow-purple" />
          <span className="text-sm text-white">Tempo restante: {timeRemaining}</span>
        </div>
        <span className="text-sm text-editor-glow-pink">{progress}% concluído</span>
      </div>

      <Progress value={progress} className="h-2" />
      
      <div className="flex gap-4 mt-4">
        <Button
          variant="outline"
          className="flex-1 bg-editor-panel hover:bg-editor-panel/80"
          onClick={onReEdit}
          disabled={isProcessing}
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Re-editar
        </Button>

        <Button
          variant="outline"
          className="flex-1 bg-editor-panel hover:bg-editor-panel/80"
          onClick={onCorrect}
          disabled={isProcessing}
        >
          <Edit className="w-4 h-4 mr-2" />
          Corrigir
        </Button>
      </div>

      {isProcessing && (
        <p className="text-sm text-editor-text text-center animate-pulse">
          Processando edição automatizada...
        </p>
      )}
    </div>
  );
};

export default EditingProgress;
