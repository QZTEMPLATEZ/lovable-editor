import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ProcessingStatus from './processing/ProcessingStatus';

const VideoOrganizer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const startOrganization = () => {
    setIsProcessing(true);
    toast({
      title: "Iniciando Organização",
      description: "Analisando e classificando seus vídeos...",
    });

    // Simulação do progresso
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setIsProcessing(false);
          toast({
            title: "Organização Concluída!",
            description: "Seus vídeos foram classificados com sucesso.",
          });
          return 100;
        }
        return prev + 1;
      });
    }, 100);
  };

  const goToReview = () => {
    navigate('/review');
  };

  const remainingTimeMinutes = Math.ceil((100 - progress) * 0.3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 min-h-screen"
    >
      <div className="max-w-2xl mx-auto space-y-8">
        {!isProcessing && !isComplete && (
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-center space-y-6"
          >
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
              Organização de Vídeos
            </h2>
            <p className="text-gray-400">
              Clique abaixo para iniciar a classificação automática dos seus vídeos
            </p>
            <Button
              onClick={startOrganization}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
            >
              <Play className="w-5 h-5 mr-2" />
              Iniciar Organização
            </Button>
          </motion.div>
        )}

        {isProcessing && (
          <ProcessingStatus
            isProcessing={isProcessing}
            currentFile={currentFile}
            totalProgress={progress}
            remainingTimeMinutes={remainingTimeMinutes}
            onStopProcessing={() => setIsProcessing(false)}
          />
        )}

        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-green-400 mb-4">
                Organização Concluída!
              </h3>
              <p className="text-gray-300 mb-6">
                Seus vídeos foram classificados com sucesso. Agora você pode revisar e ajustar as categorias se necessário.
              </p>
              <Button
                onClick={goToReview}
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90"
              >
                Ir para Revisão
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default VideoOrganizer;