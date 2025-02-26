
import { AnalysisResult } from '@/hooks/useVideoAnalysis';
import { PremiereSequence, PremiereClip } from './types';
import { removeGapsInTimeline, addClipsToTimelineSmoothly } from './timelineOperations';
import { markSilentSections, fineTuneMusicSync } from './audioAnalysis';
import { verifyAndApplyTransitions } from './transitionHandler';
import { logger } from '@/utils/logger';

const createFallbackSequence = async (
  name: string,
  resolution: string,
  fps: string
): Promise<PremiereSequence> => {
  logger.warning('Attempting to create fallback sequence...', { name, resolution, fps });
  
  try {
    const sequence = app.ppro.project.createSequence(
      `${name}_fallback`,
      "1280x720",
      "24"
    );
    logger.info('Fallback sequence created successfully', { sequenceId: sequence.id });
    return sequence;
  } catch (error) {
    logger.error('Failed to create fallback sequence', { error });
    throw error;
  }
};

const createSafeSequence = async (
  name: string,
  resolution: string = "1920x1080",
  fps: string = "25"
): Promise<PremiereSequence> => {
  try {
    const existingSequence = app.ppro.project.getSequenceByName(name);
    if (existingSequence) {
      logger.info(`Using existing sequence: ${name}`, { sequenceId: existingSequence.id });
      return existingSequence;
    }
    
    logger.info(`Creating new sequence: ${name}`, { resolution, fps });
    return app.ppro.project.createSequence(name, resolution, fps);
  } catch (error) {
    logger.error('Error creating sequence, attempting fallback', { error });
    return createFallbackSequence(name, resolution, fps);
  }
};

const getWeddingFootage = async (): Promise<any[]> => {
  try {
    const footage = app.ppro.project.getMediaInBin("Wedding");
    logger.info('Retrieved wedding footage', { clipCount: footage.length });
    return footage;
  } catch (error) {
    logger.error('Error getting wedding footage', { error });
    throw new Error('Failed to get wedding footage from bin');
  }
};

export const initializePlugin = async () => {
  if (!app.ppro) {
    logger.error('Premiere Pro host not available');
    throw new Error('Premiere Pro host not available');
  }
  
  logger.info('Plugin initialized', { version: app.ppro.version });
  
  app.ppro.onDocumentOpened(() => {
    logger.info('Document opened in Premiere Pro');
  });
  
  app.ppro.onDocumentClosed(() => {
    logger.info('Document closed in Premiere Pro');
  });
};

export const synchronizeWithMusic = async (
  sequence: PremiereSequence,
  audioTrack: any
): Promise<void> => {
  try {
    if (!audioTrack.clips || audioTrack.clips.length === 0) {
      console.log('No audio clips to synchronize with');
      return;
    }

    // Adiciona marcadores nas transições de energia da música
    audioTrack.clips.forEach((clip: any) => {
      if (clip.energy && clip.energy > 0.7) { // Alto nível de energia
        sequence.addMarker(clip.startTime, "High Energy Point", "yellow");
      }
    });
  } catch (error) {
    console.error('Error synchronizing with music:', error);
    throw new Error('Failed to synchronize with music');
  }
};

export const performFinalCheck = async (
  sequence: PremiereSequence,
  beats: number[],
  onProgress?: (step: string, progress: number) => void
): Promise<void> => {
  try {
    onProgress?.('Removendo espaços vazios', 20);
    await removeGapsInTimeline(sequence);
    
    onProgress?.('Verificando áudio', 40);
    await markSilentSections(sequence);
    
    onProgress?.('Ajustando sincronização', 60);
    await fineTuneMusicSync(sequence, beats);
    
    onProgress?.('Verificando transições', 80);
    await verifyAndApplyTransitions(sequence);
    
    onProgress?.('Verificação concluída', 100);
    console.log('Final check completed successfully');
    
  } catch (error) {
    console.error('Error during final check:', error);
    throw new Error('Failed to complete final check');
  }
};

export const createEditingSequence = async (
  analysisResults: AnalysisResult[],
  projectName: string,
  onProgress?: (step: string, progress: number) => void
): Promise<void> => {
  try {
    onProgress?.('Criando sequência', 0);
    const sequence = await createSafeSequence(projectName);
    
    onProgress?.('Obtendo footage', 20);
    const weddingFootage = await getWeddingFootage();
    
    onProgress?.('Organizando clips', 40);
    const organizedClips = analysisResults.reduce((acc, result) => {
      if (!acc[result.sceneType]) {
        acc[result.sceneType] = [];
      }
      acc[result.sceneType].push(result);
      return acc;
    }, {} as Record<string, AnalysisResult[]>);

    const editingOrder = ['emotional', 'default', 'action'];
    
    onProgress?.('Montando timeline', 60);
    for (const sceneType of editingOrder) {
      const clips = organizedClips[sceneType] || [];
      await addClipsToTimelineSmoothly(sequence, clips.map(clip => ({
        id: clip.timePoint.toString(),
        name: `${sceneType}_${clip.timePoint}`,
        duration: 3
      })));
    }

    onProgress?.('Finalizando', 100);
    console.log('Sequence created successfully in Premiere Pro');

  } catch (error) {
    console.error('Error creating sequence in Premiere Pro:', error);
    throw new Error('Failed to create sequence in Premiere Pro');
  }
};
