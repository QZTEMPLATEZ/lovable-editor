import { logger } from './logger';

interface StyleProcessingMetrics {
  startTime: number;
  endTime?: number;
  memoryUsage?: number;
  processingDuration?: number;
}

const metrics: Map<string, StyleProcessingMetrics> = new Map();

declare global {
  interface Performance {
    memory?: {
      usedJSHeapSize: number;
      totalJSHeapSize: number;
      jsHeapSizeLimit: number;
    };
  }
}

export const startStyleProcessing = (styleId: string) => {
  const startTime = performance.now();
  const memoryUsage = performance.memory?.usedJSHeapSize;
  
  metrics.set(styleId, {
    startTime,
    memoryUsage
  });
  
  logger.info(`Starting style processing for ${styleId}`, {
    timestamp: startTime,
    memoryUsage
  });
};

export const endStyleProcessing = (styleId: string) => {
  const metric = metrics.get(styleId);
  if (!metric) {
    logger.error(`No start metric found for style ${styleId}`);
    return;
  }

  const endTime = performance.now();
  const processingDuration = endTime - metric.startTime;
  const currentMemoryUsage = performance.memory?.usedJSHeapSize;
  const memoryDelta = currentMemoryUsage && metric.memoryUsage 
    ? currentMemoryUsage - metric.memoryUsage 
    : undefined;

  logger.info(`Completed style processing for ${styleId}`, {
    duration: processingDuration,
    memoryDelta
  });

  return {
    duration: processingDuration,
    memoryDelta
  };
};