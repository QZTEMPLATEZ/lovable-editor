import { LogLevel, LogEntry } from '../types/logger';

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(level: LogLevel, message: string, details?: unknown) {
    const entry: LogEntry = {
      timestamp: new Date(),
      level,
      message,
      details,
    };

    this.logs.push(entry);
    console[level](message, details);

    // Keep logs under max size
    if (this.logs.length > 1000) {
      this.logs = this.logs.slice(-1000);
    }
  }

  error(message: string, details?: unknown) {
    this.log('error', message, details);
  }

  warn(message: string, details?: unknown) {
    this.log('warn', message, details);
  }

  info(message: string, details?: unknown) {
    this.log('info', message, details);
  }

  debug(message: string, details?: unknown) {
    this.log('debug', message, details);
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }
}

export const logger = Logger.getInstance();
