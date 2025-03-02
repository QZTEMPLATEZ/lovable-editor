import React from 'react';
import { Button } from "@/components/ui/button";
import { Play } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4">
      <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 md:mb-6">Recent Projects</h2>
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-4`}>
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-editor-glass-dark border border-editor-border rounded-xl p-3 md:p-4 hover:border-editor-glow-purple/50 transition-all duration-300"
          >
            <div className="relative">
              <img
                src={project.thumbnail}
                alt={project.name}
                className="w-full h-32 md:h-40 object-cover rounded-lg mb-3 md:mb-4"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="w-8 h-8 md:w-12 md:h-12 text-white opacity-70" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm md:text-lg font-medium text-white mb-1">{project.name}</h3>
                {!isMobile && (
                  <span className="text-xs md:text-sm text-gray-400">
                    {new Date(project.lastModified).toLocaleDateString()}
                  </span>
                )}
              </div>
              <Button
                onClick={() => onResumeProject(project)}
                variant="secondary"
                className="bg-editor-accent hover:bg-editor-accent/80 text-sm px-3 py-1"
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;