import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Play } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const FileOrganizer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStartOrganization = () => {
    toast({
      title: "Creating Premiere Bins",
      description: "Organizing your files into the appropriate bins..."
    });
    
    // After organization is complete
    setTimeout(() => {
      toast({
        title: "Organization Complete",
        description: "All bins have been created and files organized."
      });
      navigate('/review');
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 space-y-8"
    >
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
          Organize in Premiere Pro
        </h2>
        <p className="text-gray-400 text-center max-w-md">
          Click below to create bins and organize your files in Premiere Pro
        </p>
        <Button
          onClick={handleStartOrganization}
          size="lg"
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
        >
          <Play className="w-5 h-5 mr-2" />
          Start Organization
        </Button>
      </div>
    </motion.div>
  );
};

export default FileOrganizer;