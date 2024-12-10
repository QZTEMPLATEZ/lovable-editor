import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import IntroScreen from '../components/IntroScreen';
import TutorialVideo from '../components/TutorialVideo';

const Index = () => {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
    const skipTutorial = localStorage.getItem('skipTutorial');
    if (!skipTutorial) {
      setShowTutorial(true);
    } else {
      navigate('/duration');
    }
  };

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    navigate('/duration');
  };

  if (showIntro) {
    return <IntroScreen onComplete={handleIntroComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-editor-bg to-editor-bg/95">
      {showTutorial && (
        <TutorialVideo onComplete={handleTutorialComplete} />
      )}
      <div className="max-w-6xl mx-auto p-6">
        <div className="space-y-12">
          <div className="text-center">
            <Button
              onClick={() => navigate('/duration')}
              className="bg-gradient-to-r from-editor-glow-purple to-editor-glow-pink hover:opacity-90 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start New Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;