import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface StyleActionsProps {
  onSelect: () => void;
  features: string[];
}

const StyleActions = ({ onSelect, features }: StyleActionsProps) => {
  const { toast } = useToast();

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex items-center gap-4"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toast({
                  title: "Style Details",
                  description: features.join(' • '),
                });
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Info className="w-5 h-5 text-white/70" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>View style details</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white px-8 py-3 rounded-md transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10"
      >
        Select Style
      </motion.button>
    </motion.div>
  );
};

export default StyleActions;