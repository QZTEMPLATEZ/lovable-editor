import React from 'react';
import { Button } from "@/components/ui/button";
import { Play } from 'lucide-react';

export interface Project {
  id: string;
  name: string;
  lastModified: string;
  thumbnail: string;
  videoUrl: string;
}

interface RecentProjectsProps {
  projects: Project[];
  onResumeProject: (project: Project) => void;
}

const RecentProjects = ({ projects, onResumeProject }: RecentProjectsProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white mb-6">Recent Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-editor-glass-dark border border-editor-border rounded-xl p-4 hover:border-editor-glow-purple/50 transition-all duration-300"
          >
            <div className="relative">
              <img
                src={project.thumbnail}
                alt={project.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="w-12 h-12 text-white opacity-70" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">{project.name}</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Last modified: {new Date(project.lastModified).toLocaleDateString()}
              </span>
              <Button
                onClick={() => onResumeProject(project)}
                variant="secondary"
                className="bg-editor-accent hover:bg-editor-accent/80"
              >
                Watch
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;