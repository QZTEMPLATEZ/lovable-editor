import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import RecentProjects from '../components/dashboard/RecentProjects';
import TutorialSection from '../components/dashboard/TutorialSection';
import TutorialVideo from '../components/TutorialVideo';

const Index = () => {
  const navigate = useNavigate();
  const [showTutorial, setShowTutorial] = useState(true);

  // Sample data for recent projects
  const recentProjects = [
    {
      id: '1',
      name: "Wedding Highlights",
      lastModified: "2024-03-15",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      videoUrl: "https://example.com/video1"
    },
    {
      id: '2',
      name: "Anniversary Edit",
      lastModified: "2024-03-14",
      thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
      videoUrl: "https://example.com/video2"
    },
    {
      id: '3',
      name: "Engagement Session",
      lastModified: "2024-03-13",
      thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552",
      videoUrl: "https://example.com/video3"
    }
  ];

  // Sample data for tutorials
  const tutorials = [
    {
      id: '1',
      title: "Getting Started with QZ TEMPLATEZ",
      description: "Learn the basics of our video editing platform.",
      duration: "5:30",
      thumbnail: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb",
      videoUrl: "https://example.com/tutorial1"
    },
    {
      id: '2',
      title: "Advanced Editing Techniques",
      description: "Master professional editing techniques.",
      duration: "8:45",
      thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
      videoUrl: "https://example.com/tutorial2"
    },
    {
      id: '3',
      title: "Creating Cinematic Effects",
      description: "Learn to add cinematic effects to your videos.",
      duration: "12:20",
      thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
      videoUrl: "https://example.com/tutorial3"
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
    <div className="min-h-screen bg-editor-bg">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />

      {showTutorial && (
        <TutorialVideo onComplete={() => setShowTutorial(false)} />
      )}
      
      <div className="relative max-w-7xl mx-auto px-4 py-12 space-y-20">
        {/* Hero Section with New Project Button */}
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-cinzel tracking-wider text-white">
            Create Your Next Masterpiece
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-italiana">
            Transform your wedding footage into stunning cinematic experiences
          </p>
          <Button
            onClick={() => navigate('/duration')}
            className="bg-editor-accent hover:bg-editor-accent/80 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start New Project
          </Button>
        </div>

        {/* Recent Projects Section */}
        <div className="glass-panel rounded-3xl p-8">
          <RecentProjects 
            projects={recentProjects}
            onResumeProject={handleResumeProject}
          />
        </div>

        {/* Tutorial Section */}
        <div className="glass-panel rounded-3xl p-8">
          <TutorialSection 
            tutorials={tutorials}
            onTutorialClick={handleTutorialClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;