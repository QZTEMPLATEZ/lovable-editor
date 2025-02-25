
import { useState, useEffect } from 'react';
import { CloudLink } from '@/components/editor/types';
import { analyzeAudio } from '@/utils/audioAnalysis';
import { useToast } from '@/components/ui/use-toast';

interface SyncPoint {
  videoTime: number;
  beatTime: number;
}

export const useAudioSync = (videoLink: CloudLink | null, audioLink: CloudLink | null) => {
  const [syncPoints, setSyncPoints] = useState<SyncPoint[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const analyzeMusicAndSync = async () => {
    if (!audioLink || !videoLink) {
      toast({
        title: "Erro de Sincronização",
        description: "É necessário ter um vídeo e uma música selecionados.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);

    try {
      // Analisar o áudio
      const audioAnalysis = await analyzeAudio(audioLink);
      setProgress(50);

      // Gerar pontos de sincronização
      const points = audioAnalysis.beats.map(beat => ({
        videoTime: beat.timestamp,
        beatTime: beat.timestamp
      }));

      setSyncPoints(points);
      setProgress(100);

      toast({
        title: "Sincronização Concluída",
        description: `Detectadas ${points.length} batidas para sincronização.`
      });
    } catch (error) {
      console.error('Erro na sincronização:', error);
      toast({
        title: "Erro na Sincronização",
        description: "Não foi possível analisar o áudio. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Limpar pontos de sincronização quando mudar o vídeo ou áudio
  useEffect(() => {
    setSyncPoints([]);
  }, [videoLink, audioLink]);

  return {
    syncPoints,
    isAnalyzing,
    progress,
    analyzeMusicAndSync
  };
};
