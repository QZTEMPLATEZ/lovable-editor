import { EditingProject } from './videoEditingLogic';

interface ExportOptions {
  format: 'premiere' | 'finalcut' | 'resolve';
}

const generatePremiereXML = (project: EditingProject): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <PremiereData Version="1">
      <Project>
        <Timeline>
          ${project.clips.map((clip, index) => `
            <ClipItem>
              <Source>${clip.file.name}</Source>
              <Type>${clip.type}</Type>
            </ClipItem>
          `).join('')}
        </Timeline>
      </Project>
    </PremiereData>`;
};

const generateFinalCutXML = (project: EditingProject): string => {
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
  let exportData: string;

  switch (options.format) {
    case 'premiere':
      exportData = generatePremiereXML(project);
      break;
    case 'finalcut':
      exportData = generateFinalCutXML(project);
      break;
    case 'resolve':
      exportData = generateResolveXML(project);
      break;
    default:
      throw new Error('Unsupported export format');
  }

  return new Blob([exportData], { type: 'application/xml' });
};