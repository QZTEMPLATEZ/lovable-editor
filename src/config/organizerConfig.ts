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
    minDuration: 1, // 1 second
    maxDuration: 3600, // 1 hour
    categories: {
      MakingOf: {
        visualCues: [
          'makeup application',
          'hair styling',
          'dressing room',
          'getting ready',
          'bride preparation',
          'groom preparation'
        ],
        confidence: 0.7
      },
      Ceremony: {
        visualCues: [
          'wedding altar',
          'church interior',
          'wedding ceremony',
          'bride and groom standing',
          'exchange rings',
          'wedding vows'
        ],
        confidence: 0.75
      },
      Reception: {
        visualCues: [
          'dance floor',
          'wedding party',
          'dinner tables',
          'wedding cake',
          'toast glasses',
          'party celebration'
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
          'close up objects'
        ],
        confidence: 0.8
      }
    }
  },
  processing: {
    maxConcurrent: 3,
    chunkSize: 10 * 1024 * 1024, // 10MB chunks for large files
    timeout: 300000 // 5 minutes
  }
};