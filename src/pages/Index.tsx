
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RecentProjects from '@/components/dashboard/RecentProjects';

const Index = () => {
  const navigate = useNavigate();

  // Mock data for recent projects - in a real app this would come from your backend
  const recentProjects = [
    {
      id: '1',
      name: 'Casamento Ana & João',
      lastModified: '2024-03-15',
      thumbnail: '/placeholder.svg',
      videoUrl: '#'
    },
    {
      id: '2',
      name: 'Casamento Maria & Pedro',
      lastModified: '2024-03-10',
      thumbnail: '/placeholder.svg',
      videoUrl: '#'
    }
  ];

  const handleResumeProject = (project: any) => {
    console.log('Resuming project:', project);
    // Aqui você implementaria a lógica para retomar o projeto
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-editor-bg to-editor-bg/95 text-white">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
            Editor Inteligente de Vídeos de Casamento
          </h1>
          <p className="text-lg text-purple-200/70 max-w-2xl mx-auto mb-12">
            Organize e monte seus vídeos automaticamente usando inteligência artificial.
          </p>

          <Button
            onClick={() => navigate('/duration')}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Começar Novo Projeto
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <RecentProjects 
            projects={recentProjects}
            onResumeProject={handleResumeProject}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
