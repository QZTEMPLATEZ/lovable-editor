import { useState, useEffect } from "react";
import VideoEditorContainer from "@/components/VideoEditorContainer";
import IntroScreen from "@/components/IntroScreen";
import TutorialVideo from "@/components/TutorialVideo";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const skipTutorial = localStorage.getItem('skipTutorial') === 'true';
    if (skipTutorial) {
      setShowTutorial(false);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    const skipTutorial = localStorage.getItem('skipTutorial') === 'true';
    if (!skipTutorial) {
      setShowTutorial(true);
    }
  };

  const handleTutorialComplete = () => {
    setShowTutorial(false);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {showIntro ? (
          <IntroScreen onComplete={handleIntroComplete} />
        ) : showTutorial ? (
          <TutorialVideo onComplete={handleTutorialComplete} />
        ) : (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
              Professional Wedding Editor
            </h1>
            <p className="text-center text-gray-400 max-w-2xl mx-auto">
              Create stunning wedding videos with our AI-powered editor
            </p>
            <VideoEditorContainer />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;