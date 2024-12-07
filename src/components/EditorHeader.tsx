import React from 'react';
import { EditingMode } from './EditingModeSelector';
import { VideoSizeRange } from './VideoSizeSelector';

interface EditorHeaderProps {
  editingMode: EditingMode;
  targetDuration: VideoSizeRange;
}

const EditorHeader = ({ editingMode, targetDuration }: EditorHeaderProps) => {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400 animate-pulse">
        WEDDING TEMPLATEZ AI
      </h1>
      <p className="text-gray-400">
        {editingMode === 'ai' 
          ? 'Upload up to 3 reference videos for AI-powered wedding editing'
          : 'Choose from our professional wedding templates'}
      </p>
      <p className="text-sm text-purple-300">
        Target Duration: {targetDuration.min}-{targetDuration.max} minutes
      </p>
    </div>
  );
};

export default EditorHeader;