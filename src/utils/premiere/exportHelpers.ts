import { EditingProject } from '../videoEditingLogic';
import { logger } from '../logger';
import { validateXMLStructure, validatePaths, validateEncoding } from './xmlValidation';

export interface ExportOptions {
  format: 'premiere' | 'finalcut' | 'resolve';
  version?: 'legacy' | 'current' | 'compatible';
}

export const createExportBlob = (xmlString: string): Blob => {
  // Ensure UTF-8 encoding without BOM
  const encoder = new TextEncoder();
  const xmlData = encoder.encode(xmlString);
  
  return new Blob([xmlData], { 
    type: 'application/xml',
    endings: 'native'
  });
};

export const validateProject = (project: EditingProject): boolean => {
  logger.info('Starting project validation');

  if (!project.clips || project.clips.length === 0) {
    logger.error('Project validation failed: No clips found');
    return false;
  }

  const hasValidClips = project.clips.every((clip, index) => {
    const hasValidFile = clip.file && clip.file.name;
    if (!hasValidFile) {
      logger.error(`Invalid file found in clip at index ${index}:`, clip);
      return false;
    }
    
    logger.debug(`Validated clip ${index + 1}`, {
      name: clip.file.name,
      duration: clip.endTime - clip.startTime
    });
    
    return true;
  });

  if (!hasValidClips) {
    return false;
  }

  logger.info('Project validation passed', {
    clipCount: project.clips.length,
    hasMusic: !!project.music
  });
  
  return true;
};

export const validateExport = (xmlString: string): boolean => {
  logger.info('Starting export validation');

  const structureValidation = validateXMLStructure(xmlString);
  if (!structureValidation.isValid) {
    logger.error('XML structure validation failed:', structureValidation.errors);
    return false;
  }

  const pathValidation = validatePaths(xmlString);
  if (!pathValidation.isValid) {
    logger.error('Path validation failed:', pathValidation.errors);
    return false;
  }

  const encodingValidation = validateEncoding(xmlString);
  if (!encodingValidation.isValid) {
    logger.error('Encoding validation failed:', encodingValidation.errors);
    return false;
  }

  logger.info('Export validation passed');
  return true;
};