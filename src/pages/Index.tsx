import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Wand2 } from 'lucide-react';
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
    navigate('/duration');
  };

  const handleTutorialClick = (videoUrl: string) => {
    console.log('Opening tutorial:', videoUrl);
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
          <h1 className="text-4xl md:text-6xl font-italiana tracking-wider text-white leading-tight">
            Create Your Next Masterpiece
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Transform your raw footage into stunning videos with our AI-powered editor
          </p>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <Button
              onClick={() => navigate('/duration')}
              className="relative px-8 py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <Wand2 className="w-5 h-5 mr-2 animate-pulse" />
              <span className="relative bg-clip-text">Start New Project</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl animate-pulse" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
        <RecentProjects 
          projects={recentProjects}
          onResumeProject={handleResumeProject}
        />

        <TutorialSection 
          tutorials={tutorials}
          onTutorialClick={handleTutorialClick}
        />
      </div>
    </div>
  );
};

export default Index;