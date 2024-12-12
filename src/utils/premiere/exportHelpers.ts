import { EditingProject } from '../videoEditingLogic';
import { logger } from '../logger';

export interface ExportOptions {
  format: 'premiere' | 'finalcut' | 'resolve';
  version?: 'legacy' | 'current' | 'compatible';
}

export const createExportBlob = (xmlString: string): Blob => {
  return new Blob([xmlString], { 
    type: 'application/xml',
    endings: 'native'
  });
};

export const validateProject = (project: EditingProject): boolean => {
  if (!project.clips || project.clips.length === 0) {
    logger.error('Project validation failed: No clips found');
    return false;
  }

  const hasValidClips = project.clips.every(clip => {
    const hasValidFile = clip.file && clip.file.name;
    if (!hasValidFile) {
      logger.error(`Invalid file found in clip: ${JSON.stringify(clip)}`);
      return false;
    }
    return true;
  });

  if (!hasValidClips) {
    return false;
  }

  logger.info('Project validation passed');
  return true;
};