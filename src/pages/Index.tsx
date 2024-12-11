import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import RecentProjects from '../components/dashboard/RecentProjects';
import TutorialSection from '../components/dashboard/TutorialSection';

const Index = () => {
  const navigate = useNavigate();

  // Sample data for recent projects
  const recentProjects = [
    {
      id: '1',
      name: "Summer Vacation Edit",
      lastModified: "2024-03-15",
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      videoUrl: "#"
    },
    {
      id: '2',
      name: "Product Launch",
      lastModified: "2024-03-14",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      videoUrl: "#"
    },
    {
      id: '3',
      name: "Wedding Highlights",
      lastModified: "2024-03-13",
      thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      videoUrl: "#"
    }
  ];

  // Sample data for tutorials
  const tutorials = [
    {
      id: '1',
      title: "Getting Started with Video Editing",
      description: "Learn the basics of video editing with our comprehensive guide.",
      duration: "5:30",
      thumbnail: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c",
      videoUrl: "#"
    },
    {
      id: '2',
      title: "Advanced Transitions",
      description: "Master the art of smooth transitions between clips.",
      duration: "8:45",
      thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      videoUrl: "#"
    },
    {
      id: '3',
      title: "Color Grading Masterclass",
      description: "Perfect your color grading skills with professional techniques.",
      duration: "12:20",
      thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      videoUrl: "#"
    }
  ];

  const handleResumeProject = (project: any) => {
    console.log('Resuming project:', project);
    // Navigate to editor with project ID
    navigate('/duration');
  };

  const handleTutorialClick = (videoUrl: string) => {
    console.log('Opening tutorial:', videoUrl);
    // Implement tutorial video playback logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-editor-bg to-editor-bg/95">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb')`,
            filter: 'brightness(0.3)'
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 text-center space-y-8 px-4">
          <h1 className="text-4xl md:text-6xl font-cinzel tracking-wider text-white">
            Create Your Next Masterpiece
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Transform your raw footage into stunning videos with our AI-powered editor
          </p>
          <Button
            onClick={() => navigate('/duration')}
            className="bg-gradient-to-r from-editor-glow-purple to-editor-glow-pink hover:opacity-90 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start New Project
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
        {/* Recent Projects Section */}
        <RecentProjects 
          projects={recentProjects}
          onResumeProject={handleResumeProject}
        />

        {/* Tutorial Section */}
        <TutorialSection 
          tutorials={tutorials}
          onTutorialClick={handleTutorialClick}
        />
      </div>
    </div>
  );
};

export default Index;