import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Wand2 } from 'lucide-react';
import RecentProjects from '../components/dashboard/RecentProjects';
import TutorialSection from '../components/dashboard/TutorialSection';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Sample data for recent projects
  const recentProjects = [
    {
      id: '1',
      name: "Summer Wedding",
      lastModified: "2024-03-15",
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      videoUrl: "#"
    },
    {
      id: '2',
      name: "Beach Wedding",
      lastModified: "2024-03-14",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      videoUrl: "#"
    },
    {
      id: '3',
      name: "Garden Wedding",
      lastModified: "2024-03-13",
      thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      videoUrl: "#"
    }
  ];

  // Sample data for tutorials
  const tutorials = [
    {
      id: '1',
      title: "Wedding Video Basics",
      description: "Learn the essentials of wedding video editing.",
      duration: "5:30",
      thumbnail: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c",
      videoUrl: "#"
    },
    {
      id: '2',
      title: "Ceremony Transitions",
      description: "Master smooth transitions between ceremony moments.",
      duration: "8:45",
      thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      videoUrl: "#"
    },
    {
      id: '3',
      title: "Reception Highlights",
      description: "Create engaging reception highlight reels.",
      duration: "12:20",
      thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      videoUrl: "#"
    }
  ];

  const handleResumeProject = (project: any) => {
    try {
      navigate('/duration');
      toast({
        title: "Resuming Project",
        description: `Opening ${project.name}...`,
      });
    } catch (error) {
      console.error('Navigation error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not open project. Please try again.",
      });
    }
  };

  const handleTutorialClick = (videoUrl: string) => {
    console.log('Opening tutorial:', videoUrl);
  };

  const handleStartProject = () => {
    console.log('Starting new project...');
    try {
      // Forçar a navegação usando window.location
      window.location.href = '/duration';
      console.log('Navigation triggered to /duration');
      toast({
        title: "Starting New Project",
        description: "Preparing your wedding video editor...",
      });
    } catch (error) {
      console.error('Navigation error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not start new project. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-editor-bg to-editor-bg/95">
      <div className={`relative flex items-center justify-center overflow-hidden ${isMobile ? 'h-[40vh]' : 'h-[60vh]'}`}>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb')`,
            filter: 'brightness(0.3)'
          }}
        />
        
        <div className="relative z-10 text-center space-y-4 md:space-y-8 px-4">
          <h1 className="text-2xl md:text-5xl font-inter font-semibold tracking-wide text-white leading-tight">
            CREATE YOUR WEDDING FILM
          </h1>
          <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto">
            Transform your wedding footage into a beautiful story
          </p>
          <Button
            onClick={handleStartProject}
            className="relative px-6 py-4 md:px-8 md:py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-base md:text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95"
          >
            <Wand2 className="w-4 h-4 md:w-5 md:h-5 mr-2 animate-pulse" />
            <span>Start New Project</span>
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 space-y-12 md:space-y-20">
        <div className={isMobile ? "space-y-4" : "space-y-8"}>
          <RecentProjects 
            projects={recentProjects.slice(0, isMobile ? 2 : 3)}
            onResumeProject={handleResumeProject}
          />
        </div>

        {!isMobile && (
          <TutorialSection 
            tutorials={tutorials}
            onTutorialClick={handleTutorialClick}
          />
        )}
      </div>
    </div>
  );
};

export default Index;