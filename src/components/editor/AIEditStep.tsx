
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { generateEditSequence } from '@/utils/premiere/sequenceGenerator';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { OrganizationResult } from '@/types/organizer';
import { MusicAnalysis } from '@/utils/audioProcessing';

interface AIEditStepProps {
  organizationResult: OrganizationResult;
  musicAnalysis: MusicAnalysis | null;
  aiScript: string;
  onChange: (script: string) => void;
  onStartEditing: () => void;
  rawFiles: File[];
  musicFile: File;
}

const AIEditStep: React.FC<AIEditStepProps> = ({ 
  organizationResult, 
  musicAnalysis,
  aiScript,
  onChange,
  onStartEditing,
  rawFiles,
  musicFile
}) => {
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

      onStartEditing();
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
        <textarea
          value={aiScript}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-32 bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-4 text-purple-100"
          placeholder="Instruções adicionais para a IA..."
        />
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
