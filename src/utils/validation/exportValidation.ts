import { OrganizationResult } from '@/types/organizer';
import { logger } from '../logger';

export interface ExportValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateExportParameters = (
  organizationResult: OrganizationResult,
  format: 'premiere' | 'finalcut' | 'resolve'
): ExportValidationResult => {
  const errors: string[] = [];

  // Check if organization result exists and has valid structure
  if (!organizationResult) {
    errors.push('Missing organization result');
    return { isValid: false, errors };
  }

  // Validate stats
  if (!organizationResult.stats) {
    errors.push('Missing organization stats');
  } else {
    if (organizationResult.stats.totalFiles === 0) {
      errors.push('No files to export');
    }
    if (organizationResult.stats.categorizedCount === 0) {
      errors.push('No categorized files to export');
    }
  }

  // Validate categorized files
  if (!organizationResult.categorizedFiles || organizationResult.categorizedFiles.size === 0) {
    errors.push('No categorized files map found');
  }

  // Validate format
  const validFormats = ['premiere', 'finalcut', 'resolve'];
  if (!validFormats.includes(format)) {
    errors.push(`Invalid export format: ${format}`);
  }

  logger.info('Export validation result:', { errors });

  return {
    isValid: errors.length === 0,
    errors
  };
};