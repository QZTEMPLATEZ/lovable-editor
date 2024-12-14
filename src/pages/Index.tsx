import React from 'react';
import { useNavigate } from 'react-router-dom';
import RecentProjects from '../components/dashboard/RecentProjects';
import TutorialSection from '../components/dashboard/TutorialSection';

const Index = () => {
  const navigate = useNavigate();

  // Sample data for recent projects
  const recentProjects = [
    {
      id: '1',
      name: "Summer Wedding Edit",
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
      title: "Getting Started with Wedding Video Editing",
      description: "Learn the basics of wedding video editing with our comprehensive guide.",
      duration: "5:30",
      thumbnail: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c",
      videoUrl: "#"
    },
    {
      id: '2',
      title: "Advanced Wedding Transitions",
      description: "Master the art of smooth transitions between wedding moments.",
      duration: "8:45",
      thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      videoUrl: "#"
    },
    {
      id: '3',
      title: "Wedding Color Grading",
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