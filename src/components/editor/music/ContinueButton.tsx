import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface ContinueButtonProps {
  hasSelectedTracks: boolean;
}

const ContinueButton = ({ hasSelectedTracks }: ContinueButtonProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    if (!hasSelectedTracks) {
      toast({
        variant: "destructive",
        title: "No music selected",
        description: "Please upload at least one music track before continuing.",
      });
      return;
    }
    navigate('/organize');
  };

  return (
    <Button
      onClick={handleContinue}
      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
    >
      Continue to Organize
    </Button>
  );
};

export default ContinueButton;