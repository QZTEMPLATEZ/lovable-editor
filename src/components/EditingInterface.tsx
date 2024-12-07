import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
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
}

const EditingInterface = ({ command, onCommandChange, onSubmit }: EditingInterfaceProps) => {
  const examples = [
    {
      en: "Create an exciting film with instrumental music and lots of slow motion, stabilize shaky footage and select the best scenes",
      pt: "Crie um filme emocionante com música instrumental e muito slow motion, estabilize imagens tremidas e selecione as melhores cenas"
    },
    {
      en: "Add dramatic transitions between scenes and enhance colors",
      pt: "Adicione transições dramáticas entre as cenas e realce as cores"
    }
  ];

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto bg-editor-timeline/40 p-6 rounded-xl backdrop-blur-sm border border-purple-500/20">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">AI Editing Command</h3>
        <p className="text-gray-400">Describe how you want your video to be edited. Try these examples:</p>
        <div className="space-y-2 mt-2">
          {examples.map((example, index) => (
            <div key={index} className="space-y-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      onClick={() => onCommandChange(example.en)}
                      className="text-sm text-purple-400 hover:text-purple-300 transition-colors text-left block"
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
                      className="text-sm text-purple-400 hover:text-purple-300 transition-colors text-left block"
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
          className="w-full h-32 bg-editor-bg/60 border-purple-500/20 rounded-lg p-4 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
        />
        <Button 
          onClick={onSubmit}
          className="w-full bg-purple-500 hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
        >
          <Wand2 className="w-4 h-4" />
          Start AI Editing
        </Button>
      </div>
    </div>
  );
};

export default EditingInterface;