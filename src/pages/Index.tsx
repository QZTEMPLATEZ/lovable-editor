import { useState, useEffect } from "react";
import VideoEditorContainer from "@/components/VideoEditorContainer";
import IntroScreen from "@/components/IntroScreen";
import TutorialVideo from "@/components/TutorialVideo";
import { motion } from "framer-motion";
import WelcomeHeader from "@/components/welcome/WelcomeHeader";
import StepsGrid from "@/components/welcome/StepsGrid";
import PricingPlans from "@/components/pricing/PricingPlans";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [greeting, setGreeting] = useState("Good evening");
  const { toast } = useToast();

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
    setShowWelcome(true);
  };

  const handleStartTutorial = () => {
    setShowWelcome(false);
    setShowTutorial(true);
  };

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    toast({
      title: "Welcome to the Editor",
      description: "Let's start creating your amazing wedding video!",
    });
  };

  const handleSkipTutorial = () => {
    setShowWelcome(false);
    setShowTutorial(false);
    toast({
      title: "Welcome to the Editor",
      description: "Let's start creating your amazing wedding video!",
    });
  };

  if (showIntro) {
    return <IntroScreen onComplete={handleIntroComplete} />;
  }

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-editor-bg flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl w-full mx-auto text-center space-y-12"
        >
          <div className="space-y-6">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-editor-glow-purple via-editor-glow-pink to-editor-glow-blue animate-gradient"
            >
              TREASURE YOUR TIME
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <p className="text-xl text-gray-300">
                Create stunning wedding videos with our AI-powered editor
              </p>
              <p className="text-lg text-gray-400">
                Choose your plan to get started today
              </p>
            </motion.div>
          </div>

          <PricingPlans />
        </motion.div>
      </div>
    );
  }

  if (showTutorial) {
    return <TutorialVideo onComplete={handleTutorialComplete} />;
  }

  return (
    <div className="min-h-screen bg-editor-bg relative">
      <div className="absolute inset-0 bg-gradient-to-b from-editor-bg via-editor-bg/95 to-editor-bg" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="p-6 space-y-8">
          <WelcomeHeader greeting={greeting} />
          <StepsGrid />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-editor-panel/50 backdrop-blur-xl rounded-3xl border border-editor-border/50 overflow-hidden shadow-2xl"
          >
            <VideoEditorContainer />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;