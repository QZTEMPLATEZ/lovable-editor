import { useState, useEffect } from "react";
import VideoEditorContainer from "@/components/VideoEditorContainer";
import IntroScreen from "@/components/IntroScreen";
import TutorialVideo from "@/components/TutorialVideo";
import { motion } from "framer-motion";
import WelcomeHeader from "@/components/welcome/WelcomeHeader";
import StepsGrid from "@/components/welcome/StepsGrid";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Crown, Check } from "lucide-react";

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

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Basic Plan */}
            <div className="relative p-8 rounded-2xl border border-editor-border bg-editor-panel/50 backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-editor-glow-purple/5 via-transparent to-editor-glow-pink/5 rounded-2xl" />
              <div className="relative space-y-6">
                <h3 className="text-2xl font-bold text-white">Basic</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-editor-accent" />
                    30s - 1:30min videos
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-editor-accent" />
                    Basic editing features
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-editor-accent" />
                    720p export quality
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-editor-accent" />
                    5 video uploads
                  </li>
                </ul>
                <Button onClick={handleStartTutorial} className="w-full bg-editor-accent hover:bg-editor-accent/80">
                  Start Free
                </Button>
              </div>
            </div>

            {/* MAX Plan */}
            <div className="relative p-8 rounded-2xl border-2 border-editor-accent bg-editor-panel/50 backdrop-blur-xl transform scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-editor-glow-purple/10 via-transparent to-editor-glow-pink/10 rounded-2xl" />
              <div className="relative space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">MAX</h3>
                  <Crown className="w-5 h-5 text-editor-accent" />
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-editor-accent" />
                    8-12 minutes films
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-editor-accent" />
                    Unlimited edits
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-editor-accent" />
                    10 premium movie styles
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-editor-accent" />
                    4K sequence export
                  </li>
                </ul>
                <Button onClick={handleSkipTutorial} className="w-full bg-editor-accent hover:bg-editor-accent/80">
                  Choose MAX
                </Button>
              </div>
            </div>

            {/* Business Plan */}
            <div className="relative p-8 rounded-2xl border border-editor-border bg-editor-panel/50 backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-editor-glow-purple/5 via-transparent to-editor-glow-pink/5 rounded-2xl" />
              <div className="relative space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">Business</h3>
                  <Crown className="w-5 h-5 text-editor-accent" />
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-editor-accent" />
                    Up to 40min videos
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-editor-accent" />
                    Premium features
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-editor-accent" />
                    4K HDR quality
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-editor-accent" />
                    Priority support
                  </li>
                </ul>
                <Button onClick={handleSkipTutorial} className="w-full bg-editor-accent hover:bg-editor-accent/80">
                  Contact Sales
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