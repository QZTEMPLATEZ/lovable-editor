import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Play, Clock } from 'lucide-react';
import TutorialVideo from '../components/TutorialVideo';

interface Project {
  id: string;
  name: string;
  lastModified: string;
  thumbnail: string;
}

const RECENT_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Wedding Highlights',
    lastModified: '2024-03-10',
    thumbnail: '/placeholder.svg'
  },
  {
    id: '2',
    name: 'Anniversary Video',
    lastModified: '2024-03-09',
    thumbnail: '/placeholder.svg'
  },
  {
    id: '3',
    name: 'Birthday Compilation',
    lastModified: '2024-03-08',
    thumbnail: '/placeholder.svg'
  }
];

const TUTORIAL_VIDEOS = [
  {
    id: '1',
    title: 'Getting Started with Video Editing',
    description: 'Learn the basics of our video editor',
    duration: '5:30',
    thumbnail: '/placeholder.svg'
  },
  {
    id: '2',
    title: 'Advanced Transitions',
    description: 'Master smooth video transitions',
    duration: '8:45',
    thumbnail: '/placeholder.svg'
  },
  {
    id: '3',
    title: 'Audio Mixing Tips',
    description: 'Perfect your video sound',
    duration: '6:15',
    thumbnail: '/placeholder.svg'
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [showTutorial, setShowTutorial] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNewProject = () => {
    navigate('/duration');
  };

  const handleResumeProject = (projectId: string) => {
    console.log('Resuming project:', projectId);
    // Navigate to editor with project ID
    navigate(`/editor/${projectId}`);
  };

  const handleTutorialClick = () => {
    setShowTutorial(true);
  };

  const filteredProjects = RECENT_PROJECTS.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-editor-bg to-editor-bg/95">
      {/* Search Section */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search your projects..."
            className="pl-10 bg-editor-glass-dark border-editor-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* New Project Button */}
          <div className="text-center">
            <Button
              onClick={handleNewProject}
              className="bg-gradient-to-r from-editor-glow-purple to-editor-glow-pink hover:opacity-90 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start New Project
            </Button>
          </div>

          {/* Recent Projects */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white mb-6">Recent Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-editor-glass-dark border border-editor-border rounded-xl p-4 hover:border-editor-glow-purple/50 transition-all duration-300"
                >
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-medium text-white mb-2">{project.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      Last modified: {new Date(project.lastModified).toLocaleDateString()}
                    </span>
                    <Button
                      onClick={() => handleResumeProject(project.id)}
                      variant="secondary"
                      className="bg-editor-accent hover:bg-editor-accent/80"
                    >
                      Resume
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tutorial Videos */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white mb-6">Get Started with Tutorials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TUTORIAL_VIDEOS.map((video) => (
                <div
                  key={video.id}
                  onClick={handleTutorialClick}
                  className="bg-editor-glass-dark border border-editor-border rounded-xl p-4 cursor-pointer hover:border-editor-glow-purple/50 transition-all duration-300"
                >
                  <div className="relative mb-4">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded-md flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{video.duration}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">{video.title}</h3>
                  <p className="text-sm text-gray-400">{video.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tutorial Video Modal */}
      {showTutorial && (
        <TutorialVideo onComplete={() => setShowTutorial(false)} />
      )}
    </div>
  );
};

export default Index;