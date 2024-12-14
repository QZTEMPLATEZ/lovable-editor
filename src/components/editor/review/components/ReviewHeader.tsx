import React from 'react';
import { Button } from "@/components/ui/button";
import { Undo } from 'lucide-react';

interface ReviewHeaderProps {
  lastMove: { fileId: string; fromCategory: string; toCategory: string } | null;
  onUndo: () => void;
}

const ReviewHeader: React.FC<ReviewHeaderProps> = ({ lastMove, onUndo }) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-white">Review Classifications</h2>
      {lastMove && (
        <Button
          variant="outline"
          size="sm"
          onClick={onUndo}
          className="flex items-center gap-2"
        >
          <Undo className="w-4 h-4" />
          Undo Last Move
        </Button>
      )}
    </div>
  );
};

export default ReviewHeader;