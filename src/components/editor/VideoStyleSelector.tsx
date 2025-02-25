
import React, { useCallback, useState } from 'react';
import { VideoStyle } from '@/types/video';
import StyleGrid from './style/StyleGrid';
import AudioSyncPreview from './AudioSyncPreview';
import { CloudLink } from './types';

interface VideoStyleSelectorProps {
  selectedStyle: VideoStyle | null;
  onStyleSelect: (style: VideoStyle) => void;
  onCustomVideoUpload: (file: File) => void;
}

const VideoStyleSelector = ({ selectedStyle, onStyleSelect, onCustomVideoUpload }: VideoStyleSelectorProps) => {
  const [videoLink, setVideoLink] = useState<CloudLink | null>(null);
  const [audioLink, setAudioLink] = useState<CloudLink | null>(null);

  const handleStyleSelect = useCallback((style: VideoStyle) => {
    onStyleSelect(style);
    // Quando um estilo é selecionado, configuramos o videoLink
    setVideoLink({
      url: style.videoUrl,
      id: style.id
    });
  }, [onStyleSelect]);

  const handleSyncComplete = (syncPoints: { videoTime: number; beatTime: number }[]) => {
    console.log('Pontos de sincronização:', syncPoints);
    // Aqui implementaremos a lógica para usar os pontos de sincronização
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Escolha um Estilo</h1>
        <p className="text-gray-400">
          Selecione um estilo de vídeo para começar. Cada estilo tem suas próprias características únicas.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <StyleGrid onStyleSelect={handleStyleSelect} />
        
        {videoLink && (
          <AudioSyncPreview 
            videoLink={videoLink}
            audioLink={audioLink}
            onSyncComplete={handleSyncComplete}
          />
        )}
      </div>
    </div>
  );
};

export default VideoStyleSelector;
