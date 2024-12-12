import React from 'react';
import { useVideoType } from '@/contexts/VideoTypeContext';
import { Clock, Palette } from 'lucide-react';

interface EditorStepsLayoutProps {
  currentStep: number;
  steps: Array<{
    title: string;
    description: string;
  }>;
  children: React.ReactNode;
}

const EditorStepsLayout = ({ currentStep, steps, children }: EditorStepsLayoutProps) => {
  const { selectedVideoType, selectedStyle } = useVideoType();

  return (
    <div className="min-h-screen bg-editor-background">
      {/* Timeline */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-editor-panel border-b border-editor-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 py-2">
            {selectedVideoType && (
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Clock className="w-4 h-4" />
                <span>{selectedVideoType.name} ({selectedVideoType.label})</span>
              </div>
            )}
            {selectedStyle && (
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Palette className="w-4 h-4" />
                <span>{selectedStyle.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default EditorStepsLayout;