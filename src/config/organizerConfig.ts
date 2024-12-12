export const ORGANIZER_CONFIG = {
  analysis: {
    supportedFileTypes: [
      'video/mp4',
      'video/quicktime',
      'video/x-matroska',
      'image/jpeg',
      'image/png'
    ],
    maxFileSize: 2 * 1024 * 1024 * 1024, // 2GB
    minDuration: 1,
    maxDuration: 3600,
    categories: {
      BridePrep: {
        visualCues: [
          'bride makeup',
          'bridal preparation',
          'wedding dress',
          'bride getting ready',
          'bridal makeup',
          'bridal hair',
          'bride mirror',
          'bride room',
          'bride preparation',
          'bride makeup artist'
        ],
        confidence: 0.60
      },
      GroomPrep: {
        visualCues: [
          'groom preparation',
          'groom suit',
          'groom getting ready',
          'groom tie',
          'groom shoes',
          'groom mirror',
          'groom room',
          'groomsmen',
          'groom preparation',
          'groom details'
        ],
        confidence: 0.60
      },
      Ceremony: {
        visualCues: [
          'wedding ceremony',
          'altar',
          'wedding vows',
          'ring exchange',
          'bride and groom altar',
          'wedding officiant',
          'wedding guests seated',
          'wedding aisle',
          'church ceremony',
          'outdoor ceremony'
        ],
        confidence: 0.70
      },
      Decor: {
        visualCues: [
          'wedding decoration',
          'floral arrangement',
          'wedding centerpiece',
          'table setting',
          'wedding arch',
          'venue decoration',
          'wedding flowers',
          'reception decor',
          'wedding lighting',
          'wedding ambiance'
        ],
        confidence: 0.65
      },
      Reception: {
        visualCues: [
          'wedding reception',
          'first dance',
          'wedding party',
          'wedding cake',
          'reception venue',
          'wedding toast',
          'wedding dinner',
          'dance floor',
          'wedding entertainment',
          'wedding celebration'
        ],
        confidence: 0.65
      }
    }
  },
  processing: {
    maxConcurrent: 3,
    chunkSize: 10 * 1024 * 1024,
    timeout: 300000,
    frameExtractionCount: 12, // Increased from 8 to 12 for better analysis
    frameQuality: 0.85, // Increased from 0.8 to 0.85 for better quality
    confidenceThreshold: 0.55 // Lowered from 0.6 to 0.55 for better categorization
  }
};