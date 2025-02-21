
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-editor-bg to-editor-bg/95">
      {/* Hero Section */}
      <div className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          >
            <source src="https://www.dropbox.com/scl/fi/rxab2rc98t7ox9hxcrb4b/251219_Urban-Couple-Photoshoot-Photography_By_Azulroto_Artlist_4K.mp4?raw=1" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-editor-bg" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-cinzel font-bold mb-6 tracking-wider">
              Edição Automatizada de
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                {" "}Vídeos de Casamento
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Transforme suas filmagens em uma história envolvente usando inteligência artificial. 
              Upload simples, organização automática e exportação profissional para o Adobe Premiere.
            </p>
            <Button
              onClick={() => navigate('/duration')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 px-8 py-6 text-lg"
            >
              Começar Novo Projeto
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Upload Inteligente",
              description: "Faça upload de grandes arquivos com facilidade. Suporte a múltiplos formatos e integração com serviços de nuvem.",
              icon: "📤"
            },
            {
              title: "Organização Automática",
              description: "IA classifica seus vídeos em categorias relevantes para casamentos, como preparativos, cerimônia e festa.",
              icon: "🤖"
            },
            {
              title: "Sincronização Musical",
              description: "Seus vídeos são automaticamente sincronizados com a música escolhida, criando transições dinâmicas.",
              icon: "🎵"
            },
            {
              title: "Edição Profissional",
              description: "Gere arquivos XML compatíveis com Adobe Premiere para refinamentos finais em sua edição.",
              icon: "🎬"
            },
            {
              title: "Análise Inteligente",
              description: "Detecção automática de momentos importantes, rostos e cenas de destaque.",
              icon: "👁️"
            },
            {
              title: "Preview em Tempo Real",
              description: "Visualize sua edição antes de exportar, com controles para ajustes finos.",
              icon: "👀"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-editor-panel/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
