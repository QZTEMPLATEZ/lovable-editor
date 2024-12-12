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
          'bridal accessories',
          'makeup application',
          'hair styling',
          'beauty salon',
          'dressing room',
          'bridal suite',
          'wedding preparation',
          'bride portrait',
          'wedding jewelry'
        ],
        confidence: 0.4, // Lower threshold for better detection
        requiredCues: ['bride', 'female', 'face'], // At least one of these must be present
        environmentalCues: ['room', 'mirror', 'indoor', 'window'], // Supporting environmental context
        motionThresholds: {
          maxMotion: 0.6, // Limit for detecting stable, intimate scenes
          minStability: 0.4 // Minimum stability requirement
        }
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
          'tuxedo',
          'men formal wear',
          'cufflinks',
          'men suit',
          'men getting ready',
          'formal male attire',
          'men dressing room'
        ],
        confidence: 0.4, // Lower threshold for better detection
        requiredCues: ['male', 'formal', 'suit'], // At least one of these must be present
        environmentalCues: ['room', 'mirror', 'indoor'], // Supporting environmental context
        motionThresholds: {
          maxMotion: 0.6, // Limit for detecting stable, intimate scenes
          minStability: 0.4 // Minimum stability requirement
        }
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
          'bride entrance',
          'rows of chairs',
          'wedding arch',
          'celebrant',
          'wedding program',
          'formal attire',
          'aisle runner',
          'unity candle',
          'wedding ritual'
        ],
        confidence: 0.70,
        requiredCues: ['ceremony', 'wedding', 'altar', 'aisle'],
        environmentalCues: ['chairs', 'benches', 'church', 'outdoor'],
        motionThresholds: {
          maxMotion: 0.7, // Allow for walking down aisle
          minStability: 0.3 // Lower threshold for ceremony movement
        }
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
    frameExtractionCount: 20, // Increased for better analysis
    frameQuality: 0.8,
    confidenceThreshold: 0.4 // Adjusted threshold
  }
};
