
import { LogLevel, LogMessage, Logger } from '../types/logger';

class UXPLogger implements Logger {
  private static instance: UXPLogger;
  private logs: LogMessage[] = [];

  private constructor() {}

  static getInstance(): UXPLogger {
    if (!UXPLogger.instance) {
      UXPLogger.instance = new UXPLogger();
    }
    return UXPLogger.instance;
  }

  private log(level: LogLevel, message: string, category: string = 'general', details?: any) {
    const logMessage: LogMessage = {
      level,
      message,
      timestamp: new Date(),
      category,
      details
    };

    this.logs.push(logMessage);
    
    // Formatar a mensagem para o console do UXP
    const formattedMessage = `[${level.toUpperCase()}] ${category}: ${message}`;
    
    switch (level) {
      case 'info':
        console.log(formattedMessage, details || '');
        break;
      case 'warning':
        console.warn(formattedMessage, details || '');
        break;
      case 'error':
        console.error(formattedMessage, details || '');
        break;
      case 'debug':
        console.debug(formattedMessage, details || '');
        break;
    }
  }

  info(message: string, details?: any) {
    this.log('info', message, 'WeddingAI', details);
  }

  warning(message: string, details?: any) {
    this.log('warning', message, 'WeddingAI', details);
  }

  error(message: string, details?: any) {
    this.log('error', message, 'WeddingAI', details);
  }

  debug(message: string, details?: any) {
    this.log('debug', message, 'WeddingAI', details);
  }

  getLogs(): LogMessage[] {
    return this.logs;
  }

  clearLogs(): void {
    this.logs = [];
  }
}

export const logger = UXPLogger.getInstance();
