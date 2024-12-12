import { logger } from '../logger';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateXMLStructure = (xmlString: string): ValidationResult => {
  const errors: string[] = [];
  
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
    const parseError = xmlDoc.querySelector('parsererror');
    
    if (parseError) {
      logger.error('XML validation failed:', parseError.textContent);
      errors.push(`XML parsing error: ${parseError.textContent}`);
      return { isValid: false, errors };
    }

    // Check for basic structure
    const sequence = xmlDoc.querySelector('sequence');
    if (!sequence) {
      errors.push('Missing required <sequence> element');
    }

    // Validate media references
    const mediaRefs = xmlDoc.querySelectorAll('pathurl');
    mediaRefs.forEach(ref => {
      if (!ref.textContent || ref.textContent.trim() === '') {
        errors.push(`Invalid media path found: ${ref.textContent}`);
      }
    });

    logger.info('XML validation completed', { 
      errorCount: errors.length,
      isValid: errors.length === 0 
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  } catch (error) {
    logger.error('XML validation error:', error);
    errors.push(`Validation error: ${error.message}`);
    return { isValid: false, errors };
  }
};

export const validatePaths = (xmlString: string): ValidationResult => {
  const errors: string[] = [];
  
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
    const pathUrls = xmlDoc.querySelectorAll('pathurl');
    
    pathUrls.forEach((pathUrl, index) => {
      if (!pathUrl.textContent || pathUrl.textContent.trim() === '') {
        errors.push(`Empty path found at index ${index}`);
      }
      // Check for invalid characters in paths
      if (pathUrl.textContent?.includes('\\')) {
        errors.push(`Invalid path separator found in: ${pathUrl.textContent}`);
      }
    });

    logger.info('Path validation completed', {
      pathCount: pathUrls.length,
      errorCount: errors.length
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  } catch (error) {
    logger.error('Path validation error:', error);
    errors.push(`Path validation error: ${error.message}`);
    return { isValid: false, errors };
  }
};

export const validateEncoding = (xmlString: string): ValidationResult => {
  const errors: string[] = [];
  
  try {
    // Check for UTF-8 BOM
    if (xmlString.charCodeAt(0) === 0xFEFF) {
      errors.push('File contains UTF-8 BOM marker which may cause issues');
    }
    
    // Check for invalid XML characters
    const invalidChars = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g;
    if (invalidChars.test(xmlString)) {
      errors.push('File contains invalid XML characters');
    }

    logger.info('Encoding validation completed', {
      length: xmlString.length,
      errorCount: errors.length
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  } catch (error) {
    logger.error('Encoding validation error:', error);
    errors.push(`Encoding validation error: ${error.message}`);
    return { isValid: false, errors };
  }
};