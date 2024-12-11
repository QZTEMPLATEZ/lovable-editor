export const APP_CONFIG = {
  analysis: {
    confidenceThreshold: 0.3,
    maxFileSize: 100 * 1024 * 1024, // 100MB
    supportedFileTypes: ['image/jpeg', 'image/png', 'video/mp4', 'video/quicktime'],
  },
  music: {
    maxTracks: 10,
    supportedFormats: ['.wav', '.mp3'],
    maxDuration: 600, // 10 minutes
  },
  organization: {
    defaultCategories: ['B-Roll', 'Main Content', 'Transitions', 'Effects'],
    uncategorizedLabel: 'Extras',
  },
  ui: {
    toastDuration: 5000,
    animationDuration: 300,
  },
};

export const ERROR_MESSAGES = {
  fileSize: 'File size exceeds the maximum limit',
  fileType: 'Unsupported file type',
  processing: 'Error processing file',
  upload: 'Error uploading file',
  organization: 'Error organizing files',
};