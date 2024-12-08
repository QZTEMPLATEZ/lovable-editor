import { useState, useEffect } from "react";
import VideoEditorContainer from "@/components/VideoEditorContainer";
import IntroScreen from "@/components/IntroScreen";
import TutorialVideo from "@/components/TutorialVideo";
import { PageOpeningDialog } from "@/components/PageOpeningDialog";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const skipTutorial = localStorage.getItem('skipTutorial') === 'true';
    setShowTutorial(!skipTutorial);
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
    <>
      <PageOpeningDialog />
      {showIntro ? (
        <IntroScreen onComplete={handleIntroComplete} />
      ) : showTutorial ? (
        <TutorialVideo onComplete={handleTutorialComplete} />
      ) : (
        <VideoEditorContainer />
      )}
    </>
  );
};

export default Index;