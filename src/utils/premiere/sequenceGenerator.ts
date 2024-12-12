import { logger } from '../logger';
import { OrganizationResult } from '../../types/organizer';

interface SequenceOptions {
  version: 'legacy' | 'current' | 'compatible';
  projectName?: string;
}

export const generatePremiereSequence = async (
  organizationResult: OrganizationResult,
  options: SequenceOptions
): Promise<string> => {
  // Add processing delay to ensure proper generation
  await new Promise(resolve => setTimeout(resolve, 1000));

  logger.info('Generating Premiere sequence with options:', options);
  logger.info('Organization structure:', {
    categories: Array.from(organizationResult.categorizedFiles.keys()),
    totalFiles: organizationResult.stats.totalFiles
  });

  const bins = Array.from(organizationResult.categorizedFiles.entries())
    .map(([category, files]) => ({
      name: category,
      files: files
    }));

  // Generate appropriate XML based on version
  switch (options.version) {
    case 'legacy':
      return generateLegacyXML(bins, options.projectName);
    case 'compatible':
      return generateCompatibleXML(bins, options.projectName);
    default:
      return generateCurrentXML(bins, options.projectName);
  }
};

const generateLegacyXML = (bins: Array<{name: string, files: File[]}>, projectName = 'Wedding Project') => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xmeml>
<xmeml version="4">
  <sequence>
    <name>${projectName}</name>
    <media>
      ${bins.map(bin => `
        <bin>
          <name>${bin.name}</name>
          ${bin.files.map((file, index) => `
            <clip id="clip-${index}">
              <name>${file.name}</name>
              <file>
                <name>${file.name}</name>
                <pathurl>${file.name}</pathurl>
                <media>
                  <video>
                    <samplecharacteristics>
                      <rate>
                        <timebase>30</timebase>
                        <ntsc>TRUE</ntsc>
                      </rate>
                    </samplecharacteristics>
                  </video>
                </media>
              </file>
            </clip>
          `).join('')}
        </bin>
      `).join('')}
    </media>
  </sequence>
</xmeml>`;
};

const generateCurrentXML = (bins: Array<{name: string, files: File[]}>, projectName = 'Wedding Project') => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<premiere-project version="7">
  <project>
    <name>${projectName}</name>
    <bins>
      ${bins.map(bin => `
        <bin>
          <name>${bin.name}</name>
          ${bin.files.map((file, index) => `
            <clip>
              <name>${file.name}</name>
              <pathurl>${file.name}</pathurl>
              <media>
                <video>
                  <timebase>30</timebase>
                </video>
              </media>
            </clip>
          `).join('')}
        </bin>
      `).join('')}
    </bins>
  </project>
</premiere-project>`;
};

const generateCompatibleXML = (bins: Array<{name: string, files: File[]}>, projectName = 'Wedding Project') => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<premieredata version="1">
  <project>
    <name>${projectName}</name>
    <bins>
      ${bins.map(bin => `
        <bin>
          <name>${bin.name}</name>
          ${bin.files.map((file, index) => `
            <clip>
              <masterclip>${file.name}</masterclip>
              <name>${file.name}</name>
              <pathurl>${file.name}</pathurl>
              <duration>300</duration>
            </clip>
          `).join('')}
        </bin>
      `).join('')}
    </bins>
  </project>
</premieredata>`;
};