
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { generateEditSequence } from '@/utils/premiere/sequenceGenerator';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { OrganizationResult } from '@/types/organizer';
import { MusicAnalysis } from '@/utils/audioProcessing';

interface AIEditStepProps {
  organizationResult: OrganizationResult;
  musicAnalysis: MusicAnalysis | null;
}

const AIEditStep: React.FC<AIEditStepProps> = ({ organizationResult, musicAnalysis }) => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateEdit = async () => {
    setIsGenerating(true);
    try {
      const sequence = generateEditSequence(
        organizationResult,
        musicAnalysis,
        {
          preferredClipDuration: 3,
          transitionDuration: 30,
          beatSyncEnabled: true
        }
      );

      console.log('Generated sequence:', sequence);
      toast({
        title: "Edição Gerada",
        description: "A edição base foi gerada com sucesso!"
      });

      navigate('/review');
    } catch (error) {
      console.error('Error generating edit:', error);
      toast({
        variant: "destructive",
        title: "Erro na Geração",
        description: "Não foi possível gerar a edição. Tente novamente."
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-editor-panel/50 rounded-xl p-6 border border-purple-500/20">
        <h3 className="text-xl font-semibold mb-4">Geração de Edição Automática</h3>
        <p className="text-gray-400 mb-6">
          O sistema irá analisar seus arquivos e gerar uma edição base inteligente,
          considerando a narrativa ideal para vídeos de casamento.
        </p>
        <Button
          onClick={handleGenerateEdit}
          disabled={isGenerating}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
        >
          {isGenerating ? "Gerando Edição..." : "Gerar Edição Base"}
        </Button>
      </div>
    </div>
  );
};

export default AIEditStep;
