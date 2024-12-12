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
      MakingOf: {
        visualCues: [
          'makeup application',
          'hair styling',
          'dressing room',
          'getting ready',
          'bride preparation',
          'groom preparation',
          'mirror reflection',
          'cosmetics',
          'wedding dress hanging',
          'suit preparation'
        ],
        confidence: 0.65
      },
      Ceremony: {
        visualCues: [
          'wedding altar',
          'church interior',
          'wedding ceremony',
          'bride and groom standing',
          'exchange rings',
          'wedding vows',
          'priest',
          'wedding arch',
          'aisle walking',
          'wedding guests seated'
        ],
        confidence: 0.70
      },
      Reception: {
        visualCues: [
          'dance floor',
          'wedding party',
          'dinner tables',
          'wedding cake',
          'toast glasses',
          'party celebration',
          'dancing couples',
          'wedding reception',
          'table decorations',
          'wedding entertainment'
        ],
        confidence: 0.65
      },
      Details: {
        visualCues: [
          'wedding rings',
          'flower bouquet',
          'wedding dress',
          'wedding shoes',
          'decorations',
          'close up objects',
          'wedding invitations',
          'wedding bands',
          'table settings',
          'wedding accessories'
        ],
        confidence: 0.75
      }
    }
  },
  processing: {
    maxConcurrent: 3,
    chunkSize: 10 * 1024 * 1024,
    timeout: 300000,
    frameExtractionCount: 8, // Number of frames to extract per video
    frameQuality: 0.8, // JPEG quality for extracted frames
    confidenceThreshold: 0.6 // Minimum confidence score for classification
  }
};