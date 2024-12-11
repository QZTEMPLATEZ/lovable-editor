export const ORGANIZER_CONFIG = {
  analysis: {
    confidenceThreshold: 0.7,
    maxConcurrentProcessing: 3,
    supportedFileTypes: ['image/jpeg', 'image/png', 'video/mp4', 'video/quicktime'],
    maxFileSize: 100 * 1024 * 1024, // 100MB
  },
  ui: {
    gridColumns: {
      sm: 1,
      md: 2,
      lg: 3,
    },
    previewSize: {
      width: 320,
      height: 180,
    },
  },
  categories: {
    minConfidence: 0.5,
    defaultCategory: 'Uncategorized',
    maxItemsPerCategory: 100,
  },
  logging: {
    enabled: true,
    levels: ['error', 'warn', 'info', 'debug'],
    maxLogSize: 1000,
  }
};

export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

export interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  message: string;
  details?: unknown;
}