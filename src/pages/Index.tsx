import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import TutorialVideo from '../components/TutorialVideo';
import IntroScreen from '../components/IntroScreen';
import SearchBar from '../components/dashboard/SearchBar';
import RecentProjects, { Project } from '../components/dashboard/RecentProjects';
import TutorialSection, { Tutorial } from '../components/dashboard/TutorialSection';
import PricingPlans from '../components/pricing/PricingPlans';

const RECENT_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'OSÍRIZ EDITION - Highlights',
    lastModified: '2024-03-10',
    thumbnail: `https://img.youtube.com/vi/z5yG4nAb80M/maxresdefault.jpg`,
    videoUrl: 'https://www.youtube.com/watch?v=z5yG4nAb80M'
  },
  {
    id: '2',
    name: 'OSÍRIZ EDITION - Showcase',
    lastModified: '2024-03-09',
    thumbnail: `https://img.youtube.com/vi/kWTyUKEbKNk/maxresdefault.jpg`,
    videoUrl: 'https://www.youtube.com/watch?v=kWTyUKEbKNk'
  },
  {
    id: '3',
    name: 'OSÍRIZ EDITION - Demo',
    lastModified: '2024-03-08',
    thumbnail: `https://img.youtube.com/vi/QPjWfYW8LWk/maxresdefault.jpg`,
    videoUrl: 'https://www.youtube.com/watch?v=QPjWfYW8LWk'
  }
];

const TUTORIAL_VIDEOS: Tutorial[] = [
  {
    id: '1',
    title: 'Getting Started with OSÍRIZ',
    description: 'Learn the basics of our video editor',
    duration: '5:30',
    thumbnail: '/placeholder.svg',
    videoUrl: 'https://www.youtube.com/watch?v=txBOuZWJcXg'
  },
  {
    id: '2',
    title: 'Advanced Features Tutorial',
    description: 'Master advanced editing techniques',
    duration: '5:30',
    thumbnail: '/placeholder.svg',
    videoUrl: 'https://www.youtube.com/watch?v=txBOuZWJcXg'
  },
  {
    id: '3',
    title: 'Professional Editing Guide',
    description: 'Professional editing workflow',
    duration: '5:30',
    thumbnail: '/placeholder.svg',
    videoUrl: 'https://www.youtube.com/watch?v=txBOuZWJcXg'
  }
];

interface IndexProps {
  showIntro: boolean;
  onDontShowAgain: (checked: boolean) => void;
}

const Index = ({ showIntro, onDontShowAgain }: IndexProps) => {
  const navigate = useNavigate();
  const [showTutorial, setShowTutorial] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMainContent, setShowMainContent] = useState(!showIntro);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showPricing, setShowPricing] = useState(false);

  const handleNewProject = () => {
    navigate('/duration');
  };

  const handleResumeProject = (project: Project) => {
    window.open(project.videoUrl, '_blank');
  };

  const handleTutorialClick = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    setShowTutorial(true);
  };

  const handleIntroComplete = () => {
    setShowPricing(true);
  };

  const handlePricingComplete = () => {
    setShowMainContent(true);
  };

  const filteredProjects = RECENT_PROJECTS.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!showMainContent && !showPricing) {
    return (
      <div className="space-y-4">
        <IntroScreen onComplete={handleIntroComplete} />
      </div>
    );
  }

  if (showPricing) {
    return <PricingPlans onComplete={handlePricingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-editor-bg to-editor-bg/95">
      <div className="max-w-6xl mx-auto p-6">
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <div className="space-y-12">
          <div className="text-center">
            <Button
              onClick={handleNewProject}
              className="bg-gradient-to-r from-editor-glow-purple to-editor-glow-pink hover:opacity-90 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start New Project
            </Button>
          </div>

          <RecentProjects 
            projects={filteredProjects} 
            onResumeProject={handleResumeProject} 
          />

          <TutorialSection 
            tutorials={TUTORIAL_VIDEOS} 
            onTutorialClick={handleTutorialClick} 
          />
        </div>
      </div>

      {showTutorial && selectedVideo && (
        <TutorialVideo 
          onComplete={() => {
            setShowTutorial(false);
            setSelectedVideo(null);
          }} 
          videoUrl={selectedVideo}
        />
      )}
    </div>
  );
};

export default Index;
