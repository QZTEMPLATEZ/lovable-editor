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
  },
  categories: {
    defaultCategory: 'Extras',
    minConfidence: 0.3
  },
  processing: {
    maxConcurrent: 3,
    chunkSize: 10 * 1024 * 1024, // 10MB chunks for large files
    timeout: 300000 // 5 minutes
  }
};