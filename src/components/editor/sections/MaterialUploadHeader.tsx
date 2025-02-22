
import React from 'react';
import { Video, Music } from 'lucide-react';

interface MaterialUploadHeaderProps {
  icon: 'video' | 'music';
  title: string;
}

const MaterialUploadHeader = ({ icon, title }: MaterialUploadHeaderProps) => {
  return (
    <h4 className="text-lg font-semibold text-purple-200 flex items-center gap-2">
      {icon === 'video' ? <Video className="w-4 h-4" /> : <Music className="w-4 h-4" />}
      {title}
    </h4>
  );
};

export default MaterialUploadHeader;
