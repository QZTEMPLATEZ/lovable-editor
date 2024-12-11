import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface NavigationButtonsProps {
  showContinueButton: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ showContinueButton }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-8">
      <Button
        variant="ghost"
        onClick={() => navigate('/music')}
        className="text-purple-400 hover:text-purple-300"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Music
      </Button>
      
      {showContinueButton && (
        <Button
          onClick={() => navigate('/edit')}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
        >
          Continue to Edit
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;