import { EditingProject } from './videoEditingLogic';
import { logger } from './logger';
import { 
  generatePremiereXMLLegacy, 
  generatePremiereXMLCurrent, 
  generatePremiereXMLCompatible 
} from './premiere/premiereXMLGenerators';
import { validateXMLStructure, validatePaths } from './premiere/xmlValidation';
import { ExportOptions, createExportBlob, validateProject } from './premiere/exportHelpers';

const generateFinalCutXML = (project: EditingProject): string => {
  logger.info('Generating Final Cut Pro XML');
  return `<?xml version="1.0" encoding="UTF-8"?>
    <fcpxml version="1.9">
      <project>
        <sequence>
          ${project.clips.map((clip, index) => `
            <clip>
              <source>${clip.file.name}</source>
              <type>${clip.type}</type>
            </clip>
          `).join('')}
        </sequence>
      </project>
    </fcpxml>`;
};

const generateResolveXML = (project: EditingProject): string => {
  logger.info('Generating DaVinci Resolve XML');
  return `<?xml version="1.0" encoding="UTF-8"?>
    <DaVinciResolve>
      <Timeline>
        ${project.clips.map((clip, index) => `
          <Clip>
            <Source>${clip.file.name}</Source>
            <Type>${clip.type}</Type>
          </Clip>
        `).join('')}
      </Timeline>
    </DaVinciResolve>`;
};

export const exportProject = async (
  project: EditingProject,
  options: ExportOptions
): Promise<Blob> => {
  logger.info('Starting project export with options:', options);

  if (!validateProject(project)) {
    throw new Error('Invalid project structure');
  }

  let exportData: string;

  if (options.format === 'premiere') {
    switch (options.version) {
      case 'legacy':
        exportData = generatePremiereXMLLegacy(project);
        break;
      case 'compatible':
        exportData = generatePremiereXMLCompatible(project);
        break;
      default:
        exportData = generatePremiereXMLCurrent(project);
    }
  } else if (options.format === 'finalcut') {
    exportData = generateFinalCutXML(project);
  } else {
    exportData = generateResolveXML(project);
  }

  // Validate XML structure and paths
  if (!validateXMLStructure(exportData)) {
    logger.error('XML structure validation failed');
    throw new Error('Generated XML is invalid');
  }

  if (!validatePaths(exportData)) {
    logger.error('Path validation failed');
    throw new Error('Invalid file paths detected');
  }

  logger.info('Export successful');
  return createExportBlob(exportData);
};