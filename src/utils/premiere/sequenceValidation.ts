import { logger } from '../logger';
import { XMLValidator } from 'fast-xml-parser';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validatePremiereSequence = (xmlContent: string): ValidationResult => {
  const errors: string[] = [];
  
  try {
    // Validate XML structure
    const result = XMLValidator.validate(xmlContent, {
      allowBooleanAttributes: true
    });
    
    if (result !== true) {
      errors.push(`Invalid XML structure: ${result.err.msg}`);
    }

    // Check for required Premiere elements
    const requiredElements = ['sequence', 'bin', 'clip'];
    requiredElements.forEach(element => {
      if (!xmlContent.includes(`<${element}`)) {
        errors.push(`Missing required element: ${element}`);
      }
    });

    // Validate file paths
    const pathRegex = /<pathurl>(.*?)<\/pathurl>/g;
    const paths = [...xmlContent.matchAll(pathRegex)].map(match => match[1]);
    
    paths.forEach(path => {
      if (path.includes('\\')) {
        errors.push(`Invalid path separator in: ${path}`);
      }
      if (!path.trim()) {
        errors.push('Empty file path detected');
      }
    });

    logger.info('Premiere sequence validation completed', {
      errorCount: errors.length,
      isValid: errors.length === 0
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  } catch (error) {
    logger.error('Validation error:', error);
    errors.push(`Validation error: ${error.message}`);
    return { isValid: false, errors };
  }
};