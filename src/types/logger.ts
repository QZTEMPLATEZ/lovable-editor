
export type LogLevel = 'info' | 'warning' | 'error' | 'debug';

export interface LogMessage {
  level: LogLevel;
  message: string;
  timestamp: Date;
  category: string;
  details?: any;
}

export interface Logger {
  info: (message: string, details?: any) => void;
  warning: (message: string, details?: any) => void;
  error: (message: string, details?: any) => void;
  debug: (message: string, details?: any) => void;
}
