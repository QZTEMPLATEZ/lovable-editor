import { EditingProject } from './videoEditingLogic';
import { logger } from './logger';

interface ExportOptions {
  format: 'premiere' | 'finalcut' | 'resolve';
  version?: 'legacy' | 'current' | 'compatible';
}

const validatePaths = (project: EditingProject): boolean => {
  return project.clips.every(clip => {
    const hasValidFile = clip.file && clip.file.name;
    if (!hasValidFile) {
      logger.error(`Invalid file path found in clip: ${JSON.stringify(clip)}`);
      return false;
    }
    return true;
  });
};

const generatePremiereXMLLegacy = (project: EditingProject): string => {
  const timebase = 30; // NTSC timebase
  const mediaStart = 0;
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xmeml>
<xmeml version="4">
  <sequence>
    <name>Wedding Highlights</name>
    <duration>${project.duration.max * timebase * 60}</duration>
    <rate>
      <timebase>${timebase}</timebase>
      <ntsc>TRUE</ntsc>
    </rate>
    <media>
      <video>
        ${project.clips.map((clip, index) => `
          <track>
            <clipitem id="clipitem-${index + 1}">
              <name>${clip.file.name}</name>
              <duration>${clip.endTime - clip.startTime}</duration>
              <rate>
                <timebase>${timebase}</timebase>
                <ntsc>TRUE</ntsc>
              </rate>
              <start>${mediaStart}</start>
              <end>${clip.endTime - clip.startTime}</end>
              <file id="file-${index + 1}">
                <name>${clip.file.name}</name>
                <pathurl>${clip.file.name}</pathurl>
                <media>
                  <video>
                    <samplecharacteristics>
                      <rate>
                        <timebase>${timebase}</timebase>
                        <ntsc>TRUE</ntsc>
                      </rate>
                    </samplecharacteristics>
                  </video>
                </media>
              </file>
            </clipitem>
          </track>
        `).join('')}
      </video>
      <audio>
        ${project.music ? `
          <track>
            <clipitem>
              <name>${project.music.file.name}</name>
              <duration>${project.duration.max * timebase * 60}</duration>
              <file id="audio-1">
                <name>${project.music.file.name}</name>
                <pathurl>${project.music.file.name}</pathurl>
              </file>
            </clipitem>
          </track>
        ` : ''}
      </audio>
    </media>
  </sequence>
</xmeml>`;
};

const generatePremiereXMLCurrent = (project: EditingProject): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<premiere-project version="7">
  <project>
    <sequences>
      <sequence id="sequence-1">
        <duration>${project.duration.max * 60}</duration>
        <videoTracks>
          ${project.clips.map((clip, index) => `
            <track id="${index + 1}">
              <clip>
                <name>${clip.file.name}</name>
                <pathurl>${clip.file.name}</pathurl>
                <duration>${clip.endTime - clip.startTime}</duration>
                <start>0</start>
                <end>${clip.endTime - clip.startTime}</end>
              </clip>
            </track>
          `).join('')}
        </videoTracks>
        <audioTracks>
          ${project.music ? `
            <track id="audio-1">
              <clip>
                <name>${project.music.file.name}</name>
                <pathurl>${project.music.file.name}</pathurl>
                <duration>${project.duration.max * 60}</duration>
              </clip>
            </track>
          ` : ''}
        </audioTracks>
      </sequence>
    </sequences>
  </project>
</premiere-project>`;
};

const generatePremiereXMLCompatible = (project: EditingProject): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<premieredata version="1">
  <sequence>
    <name>Wedding Highlights</name>
    <duration>${project.duration.max * 60}</duration>
    <timebase>30</timebase>
    <media>
      <video>
        ${project.clips.map((clip, index) => `
          <track>
            <clipitem>
              <masterclip>${clip.file.name}</masterclip>
              <name>${clip.file.name}</name>
              <enabled>TRUE</enabled>
              <duration>${clip.endTime - clip.startTime}</duration>
              <start>0</start>
              <end>${clip.endTime - clip.startTime}</end>
              <in>0</in>
              <out>${clip.endTime - clip.startTime}</out>
              <file>
                <name>${clip.file.name}</name>
                <pathurl>${clip.file.name}</pathurl>
              </file>
            </clipitem>
          </track>
        `).join('')}
      </video>
      <audio>
        ${project.music ? `
          <track>
            <clipitem>
              <name>${project.music.file.name}</name>
              <enabled>TRUE</enabled>
              <duration>${project.duration.max * 60}</duration>
              <file>
                <name>${project.music.file.name}</name>
                <pathurl>${project.music.file.name}</pathurl>
              </file>
            </clipitem>
          </track>
        ` : ''}
      </audio>
    </media>
  </sequence>
</premieredata>`;
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
  if (!validatePaths(project)) {
    throw new Error('Invalid file paths detected in project');
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

  // Validate XML structure
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(exportData, 'application/xml');
    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) {
      throw new Error('Generated XML is invalid');
    }
  } catch (error) {
    logger.error('XML validation failed:', error);
    throw new Error('Failed to generate valid sequence file');
  }

  return new Blob([exportData], { 
    type: 'application/xml',
    endings: 'native'  // Use native line endings
  });
};