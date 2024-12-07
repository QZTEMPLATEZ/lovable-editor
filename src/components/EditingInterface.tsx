import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
import MusicTrackSelector from './MusicTrackSelector';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EditingInterfaceProps {
  command: string;
  onCommandChange: (value: string) => void;
  onSubmit: () => void;
  onMusicSelect?: (file: File, beats: any[]) => void;
}

const EditingInterface = ({ 
  command, 
  onCommandChange, 
  onSubmit,
  onMusicSelect 
}: EditingInterfaceProps) => {
  const examples = [
    {
      en: "Create a romantic film with natural transitions, focusing on authentic moments and cinematic compositions. Enhance the ambiance with soft lighting and gentle color grading",
      pt: "Crie um filme romântico com transições naturais, focando em momentos autênticos e composições cinematográficas. Realce o ambiente com iluminação suave e correção de cor delicada"
    },
    {
      en: "Tell a story through intimate close-ups and wide scenic shots, maintaining a natural pace with smooth transitions between scenes",
      pt: "Conte uma história através de close-ups íntimos e cenas panorâmicas, mantendo um ritmo natural com transições suaves entre as cenas"
    }
  ];

  return (
    <div className="space-y-6">
      {onMusicSelect && <MusicTrackSelector onMusicSelect={onMusicSelect} />}
      
      <div className="space-y-6 w-full max-w-4xl mx-auto bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 p-8 rounded-2xl backdrop-blur-lg border border-purple-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none" />
        <div className="relative space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-3 w-3 rounded-full bg-purple-500 animate-pulse" />
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
              AI Editing Command
            </h3>
          </div>
          
          <p className="text-gray-400 text-lg">Describe how you want your video to be edited. Try these examples:</p>
          
          <div className="space-y-3 mt-4">
            {examples.map((example, index) => (
              <div key={index} className="space-y-2 bg-editor-timeline/20 p-4 rounded-xl border border-purple-500/20">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button 
                        onClick={() => onCommandChange(example.en)}
                        className="text-base text-purple-300 hover:text-purple-200 transition-colors text-left block w-full"
                      >
                        🇺🇸 {example.en}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click to use this example</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button 
                        onClick={() => onCommandChange(example.pt)}
                        className="text-base text-purple-300 hover:text-purple-200 transition-colors text-left block w-full"
                      >
                        🇧🇷 {example.pt}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Clique para usar este exemplo</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <textarea
            value={command}
            onChange={(e) => onCommandChange(e.target.value)}
            placeholder="Enter your editing instructions..."
            className="w-full h-40 bg-editor-bg/80 border-purple-500/30 rounded-xl p-6 text-lg text-white placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 hover:border-purple-500/50"
          />
          <Button 
            onClick={onSubmit}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 py-6 text-lg font-medium flex items-center justify-center gap-3 rounded-xl shadow-lg"
          >
            <Wand2 className="w-5 h-5" />
            Start AI Editing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditingInterface;