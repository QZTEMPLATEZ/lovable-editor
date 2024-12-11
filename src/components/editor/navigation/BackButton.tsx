import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      onClick={() => navigate(-1)}
      className="absolute left-6 top-6 p-2 hover:bg-purple-500/10"
    >
      <ChevronLeft className="h-5 w-5 text-purple-400" />
      <span className="ml-2 text-purple-400">Back</span>
    </Button>
  );
};

export default BackButton;