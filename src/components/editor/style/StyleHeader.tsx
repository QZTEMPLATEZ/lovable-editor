import React from 'react';
import { ChevronLeft, Sparkles, Wand2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StyleHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative py-12 px-4 border-b border-editor-border/20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(to_bottom,black_0%,black_50%,transparent_100%)] opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-br from-editor-glow-purple/5 via-transparent to-editor-glow-pink/5" />
      <div className="absolute inset-0 backdrop-blur-sm bg-[#0A0A0A]/80" />
      
      {/* Header Content */}
      <div className="relative flex items-center gap-6 max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/duration')}
          className="p-3 rounded-2xl bg-editor-panel/50 backdrop-blur-sm border border-editor-border/20 
                   hover:bg-editor-panel/70 transition-all duration-300 group"
        >
          <ChevronLeft className="w-6 h-6 text-editor-glow-purple group-hover:text-editor-glow-pink transition-colors" />
        </button>

        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl glass-panel flex items-center justify-center border border-editor-border">
                <Wand2 className="w-6 h-6 text-editor-glow-purple" />
              </div>
              <Sparkles className="w-4 h-4 text-editor-glow-pink absolute -top-1 -right-1 animate-pulse" />
            </div>
            
            <div>
              <h1 className="text-3xl font-cinzel tracking-wider bg-clip-text text-transparent 
                           bg-gradient-to-r from-editor-glow-purple via-editor-glow-pink to-editor-glow-blue">
                Choose Your Cinematic Style
              </h1>
              <p className="text-sm font-italiana tracking-wider mt-1 text-editor-text/70">
                Each style is carefully crafted to tell your story with a unique cinematic approach
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleHeader;