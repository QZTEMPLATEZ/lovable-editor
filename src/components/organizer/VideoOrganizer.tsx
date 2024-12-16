import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import FileOrganizer from './FileOrganizer';

const VideoOrganizer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStartOrganization = () => {
    toast({
      title: "Organization Started",
      description: "Your files are being organized..."
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="space-y-6">
        <FileOrganizer />
      </div>
    </motion.div>
  );
};

export default VideoOrganizer;