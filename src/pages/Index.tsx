import { useState, useEffect } from "react";
import VideoEditorContainer from "@/components/VideoEditorContainer";
import IntroScreen from "@/components/IntroScreen";
import TutorialVideo from "@/components/TutorialVideo";
import { motion } from "framer-motion";
import WelcomeHeader from "@/components/welcome/WelcomeHeader";
import StepsGrid from "@/components/welcome/StepsGrid";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const [greeting, setGreeting] = useState("Good evening");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
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
    <div className="min-h-screen bg-editor-bg relative">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-editor-bg via-editor-bg/95 to-editor-bg" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {showIntro && (
          <IntroScreen onComplete={handleIntroComplete} />
        )}
        {!showIntro && showTutorial && (
          <TutorialVideo onComplete={handleTutorialComplete} />
        )}
        {!showIntro && !showTutorial && (
          <div className="p-6 space-y-8">
            <WelcomeHeader greeting={greeting} />
            <StepsGrid />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <VideoEditorContainer />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;