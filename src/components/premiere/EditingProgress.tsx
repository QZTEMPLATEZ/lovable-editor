
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface EditingProgressProps {
  currentStep: string;
  progress: number;
  error?: string;
  isComplete?: boolean;
}

const EditingProgress: React.FC<EditingProgressProps> = ({
  currentStep,
  progress,
  error,
  isComplete
}) => {
  return (
    <div className="space-y-4 p-4 bg-slate-950/10 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">{currentStep}</h3>
        {isComplete && (
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        )}
      </div>

      <Progress value={progress} className="h-2" />

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default EditingProgress;
