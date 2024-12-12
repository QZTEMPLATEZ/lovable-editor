import { logger } from '../logger';
import { OrganizationResult } from '../../types/organizer';
import { validatePremiereSequence } from './sequenceValidation';

export interface SequenceOptions {
  version: 'legacy' | 'current' | 'compatible';
  projectName?: string;
}

const generateBinStructure = (
  bins: Array<{name: string, files: File[]}>,
  options: SequenceOptions
) => {
  return bins.map(bin => `
    <bin>
      <name>${bin.name}</name>
      ${bin.files.map((file, index) => `
        <clip id="clip-${index}">
          <name>${file.name}</name>
          <pathurl>${file.name}</pathurl>
          <duration>300</duration>
          <rate>
            <timebase>30</timebase>
            <ntsc>TRUE</ntsc>
          </rate>
        </clip>
      `).join('')}
    </bin>
  `).join('');
};

export const buildPremiereSequence = async (
  organizationResult: OrganizationResult,
  options: SequenceOptions
): Promise<string> => {
  logger.info('Starting Premiere sequence generation', options);

  // Add processing delay to ensure proper generation
  await new Promise(resolve => setTimeout(resolve, 2000));

  const bins = Array.from(organizationResult.categorizedFiles.entries())
    .map(([category, files]) => ({
      name: category,
      files: files
    }));

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xmeml>
<xmeml version="4">
  <sequence>
    <name>${options.projectName || 'Wedding Project'}</name>
    <media>
      ${generateBinStructure(bins, options)}
    </media>
  </sequence>
</xmeml>`;

  // Validate the generated sequence
  const validation = validatePremiereSequence(xmlContent);
  if (!validation.isValid) {
    logger.error('Generated sequence validation failed:', validation.errors);
    throw new Error(`Invalid sequence generated: ${validation.errors.join(', ')}`);
  }

  logger.info('Premiere sequence generated successfully');
  return xmlContent;
};