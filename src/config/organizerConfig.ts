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
          'bride makeup artist',
          'wedding gown',
          'bridal accessories'
        ],
        confidence: 0.65
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
          'groom details',
          'bow tie',
          'tuxedo'
        ],
        confidence: 0.65
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
          'outdoor ceremony',
          'wedding rings',
          'bride entrance'
        ],
        confidence: 0.70
      },
      Decoration: {
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
          'wedding ambiance',
          'venue setup',
          'wedding venue'
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
          'wedding celebration',
          'party lights',
          'wedding guests dancing'
        ],
        confidence: 0.65
      },
      DroneFootage: {
        visualCues: [
          'aerial view',
          'drone shot',
          'bird eye view',
          'aerial photography',
          'landscape view',
          'aerial footage',
          'venue aerial',
          'drone footage',
          'aerial ceremony',
          'aerial reception'
        ],
        confidence: 0.70
      }
    }
  },
  processing: {
    maxConcurrent: 3,
    chunkSize: 10 * 1024 * 1024,
    timeout: 300000,
    frameExtractionCount: 15,
    frameQuality: 0.90,
    confidenceThreshold: 0.20 // Lowered threshold to catch more videos
  }
};