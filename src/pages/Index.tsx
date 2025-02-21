
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building, Sparkles, UserSquare2, PartyPopper, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  const categories = [
    {
      icon: <UserSquare2 className="w-6 h-6" />,
      title: "Making Of",
      description: "Cenas de preparação dos noivos",
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "Cerimônia",
      description: "Momentos da cerimônia religiosa/civil",
      color: "from-purple-500/20 to-purple-600/20"
    },
    {
      icon: <PartyPopper className="w-6 h-6" />,
      title: "Festa",
      description: "Momentos da celebração e recepção",
      color: "from-pink-500/20 to-pink-600/20"
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Extras",
      description: "Drone, detalhes e momentos especiais",
      color: "from-amber-500/20 to-amber-600/20"
    }
  ];

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
          <p className="text-lg text-purple-200/70 max-w-2xl mx-auto">
            Organize e monte seus vídeos automaticamente usando inteligência artificial. 
            Importe seus arquivos e deixe a IA criar uma edição base profissional.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: { delay: index * 0.1 }
              }}
              className={`p-6 rounded-xl border border-purple-500/20 bg-gradient-to-br ${category.color}`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-purple-500/20">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-purple-100 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-purple-200/70">
                    {category.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
          className="text-center"
        >
          <Button
            onClick={() => navigate('/duration')}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Começar Novo Projeto
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
