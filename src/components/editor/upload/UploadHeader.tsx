
import React from 'react';
import { Video, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface UploadHeaderProps {
  videoLinksCount: number;
  musicLinksCount: number;
}

const UploadHeader = ({ videoLinksCount, musicLinksCount }: UploadHeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    if (videoLinksCount === 0 && musicLinksCount === 0) {
      toast({
        variant: "destructive",
        title: "Nenhum material adicionado",
        description: "Por favor, adicione pelo menos um vídeo ou música antes de continuar.",
      });
      return;
    }
    navigate('/organize');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Video className="w-5 h-5 text-purple-400" />
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            Upload de Material
          </h3>
        </div>
        <Button
          onClick={handleContinue}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
        >
          Continuar para Organização
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <Alert className="bg-purple-500/10 border-purple-500/30">
        <AlertDescription className="text-purple-200">
          Adicione seus vídeos e músicas através de links da nuvem (Dropbox, Google Drive, etc).
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default UploadHeader;
