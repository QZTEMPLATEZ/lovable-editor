import { useState, useEffect } from "react";
import VideoEditorContainer from "@/components/VideoEditorContainer";
import IntroScreen from "@/components/IntroScreen";
import TutorialVideo from "@/components/TutorialVideo";
import { motion } from "framer-motion";
import WelcomeHeader from "@/components/welcome/WelcomeHeader";
import StepsGrid from "@/components/welcome/StepsGrid";
import { Button } from "@/components/ui/button";
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
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Create stunning wedding videos with our AI-powered editor. Choose your plan to get started.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto"
          >
            {/* Free Plan */}
            <div className="relative p-8 rounded-2xl border border-editor-border bg-editor-panel/50 backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-editor-glow-purple/5 via-transparent to-editor-glow-pink/5 rounded-2xl" />
              <div className="relative space-y-6">
                <h3 className="text-2xl font-bold text-white">Free Plan</h3>
                <ul className="space-y-4 text-left text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-editor-glow-purple rounded-full" />
                    Basic editing features
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-editor-glow-purple rounded-full" />
                    720p export quality
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-editor-glow-purple rounded-full" />
                    5 video uploads per project
                  </li>
                </ul>
                <Button
                  onClick={handleStartTutorial}
                  className="w-full bg-editor-accent hover:bg-editor-accent/80 text-white"
                >
                  Start with Free
                </Button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="relative p-8 rounded-2xl border border-editor-glow-purple bg-editor-panel/50 backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-editor-glow-purple/10 via-transparent to-editor-glow-pink/10 rounded-2xl" />
              <div className="relative space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">Pro Plan</h3>
                  <span className="px-3 py-1 text-sm bg-editor-glow-purple/20 text-editor-glow-purple rounded-full">
                    Popular
                  </span>
                </div>
                <ul className="space-y-4 text-left text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-editor-glow-purple rounded-full" />
                    Advanced AI features
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-editor-glow-purple rounded-full" />
                    4K export quality
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-editor-glow-purple rounded-full" />
                    Unlimited video uploads
                  </li>
                </ul>
                <Button
                  onClick={handleSkipTutorial}
                  className="w-full bg-editor-accent hover:bg-editor-accent/80 text-white"
                >
                  Upgrade to Pro
                </Button>
              </div>
            </div>
          </motion.div>
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