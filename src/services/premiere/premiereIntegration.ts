
import { AnalysisResult } from '@/hooks/useVideoAnalysis';
import { PremiereSequence } from './types';
import { removeGapsInTimeline, addClipsToTimelineSmoothly } from './timelineOperations';
import { markSilentSections, fineTuneMusicSync } from './audioAnalysis';
import { verifyAndApplyTransitions } from './transitionHandler';

const createFallbackSequence = async (
  name: string,
  resolution: string,
  fps: string
): Promise<PremiereSequence> => {
  console.warn('Attempting to create fallback sequence...');
  
  try {
    const sequence = window.premiere.project.createSequence(
      `${name}_fallback`,
      "1280x720",
      "24"
    );
    console.log('Fallback sequence created successfully');
    return sequence;
  } catch (error) {
    console.error('Failed to create fallback sequence:', error);
    throw error;
  }
};

const createSafeSequence = async (
  name: string,
  resolution: string = "1920x1080",
  fps: string = "25"
): Promise<PremiereSequence> => {
  try {
    const existingSequence = window.premiere.project.getSequenceByName(name);
    if (existingSequence) {
      console.log(`Using existing sequence: ${name}`);
      return existingSequence;
    }
    
    console.log(`Creating new sequence: ${name}`);
    return window.premiere.project.createSequence(name, resolution, fps);
  } catch (error) {
    console.error('Error creating sequence, attempting fallback:', error);
    return createFallbackSequence(name, resolution, fps);
  }
};

const getWeddingFootage = async (): Promise<any[]> => {
  try {
    return window.premiere.project.getMediaInBin("Wedding");
  } catch (error) {
    console.error('Error getting wedding footage:', error);
    throw new Error('Failed to get wedding footage from bin');
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
