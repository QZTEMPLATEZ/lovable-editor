import { logger } from '../logger';

export const validateXMLStructure = (xmlString: string): boolean => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
    const parseError = xmlDoc.querySelector('parsererror');
    
    if (parseError) {
      logger.error('XML validation failed:', parseError.textContent);
      return false;
    }

    logger.info('XML validation passed');
    return true;
  } catch (error) {
    logger.error('XML validation error:', error);
    return false;
  }
};

export const validatePaths = (xmlString: string): boolean => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
    const pathUrls = xmlDoc.querySelectorAll('pathurl');
    
    for (const pathUrl of pathUrls) {
      if (!pathUrl.textContent || pathUrl.textContent.trim() === '') {
        logger.error('Invalid path found:', pathUrl);
        return false;
      }
    }

    logger.info('Path validation passed');
    return true;
  } catch (error) {
    logger.error('Path validation error:', error);
    return false;
  }
};