import { AnalysisResult } from '@/hooks/useVideoAnalysis';

interface PremiereClip {
  id: string;
  name: string;
  duration: number;
  startTime?: number;
  energy?: number;
}

interface PremiereSequence {
  id: string;
  name: string;
  clips: PremiereClip[];
  addClip: (clipId: string, startTime: number) => void;
  addMarker: (time: number, comment: string, color: string) => void;
  addTransition: (type: string, startTime: number, duration: number) => void;
  getAllClips: () => PremiereClip[];
}

interface PremiereProject {
  id: string;
  name: string;
  sequences: PremiereSequence[];
  createSequence: (name: string, resolution: string, fps: string) => PremiereSequence;
  getSequenceByName: (name: string) => PremiereSequence | null;
  getMediaInBin: (binName: string) => PremiereClip[];
}

declare global {
  interface Window {
    premiere: {
      project: PremiereProject;
    };
  }
}

// Função de fallback para quando a criação da sequência falha
const createFallbackSequence = async (
  name: string,
  resolution: string,
  fps: string
): Promise<PremiereSequence> => {
  console.warn('Attempting to create fallback sequence...');
  
  try {
    // Tentar criar sequência com configurações mínimas
    const sequence = window.premiere.project.createSequence(
      `${name}_fallback`,
      "1280x720", // resolução menor
      "24" // fps padrão
    );

    console.log('Fallback sequence created successfully');
    return sequence;
  } catch (error) {
    console.error('Failed to create fallback sequence:', error);
    throw error;
  }
};

// Função para obter os clipes do projeto de forma segura
const getWeddingFootage = async (): Promise<PremiereClip[]> => {
  try {
    return window.premiere.project.getMediaInBin("Wedding");
  } catch (error) {
    console.error('Error getting wedding footage:', error);
    throw new Error('Failed to get wedding footage from bin');
  }
};

// Função atualizada para criar sequência com fallback
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

// Função para adicionar clipes na timeline de forma suave
const addClipsToTimelineSmoothly = async (
  sequence: PremiereSequence,
  clips: PremiereClip[]
): Promise<void> => {
  try {
    for (let i = 0; i < clips.length; i++) {
      const clip = clips[i];
      await sequence.addClip(clip.id, i * clip.duration);
      // Pequena pausa para evitar sobrecarga
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  } catch (error) {
    console.error('Error adding clips smoothly:', error);
    throw new Error('Failed to add clips to timeline');
  }
};

// Função para analisar transições musicais
const analyzeMusicTransitions = async (audioTrack: any): Promise<Array<{time: number, type: string}>> => {
  try {
    const transitions: Array<{time: number, type: string}> = [];
    const clips = audioTrack.clips || [];
    
    for (let i = 1; i < clips.length; i++) {
      const currentClip = clips[i];
      const previousClip = clips[i - 1];
      
      if (Math.abs(currentClip.energy - previousClip.energy) > 0.2) {
        transitions.push({
          time: currentClip.startTime,
          type: "Music Transition"
        });
      }
    }
    
    return transitions;
  } catch (error) {
    console.error('Error analyzing music transitions:', error);
    throw new Error('Failed to analyze music transitions');
  }
};

// Função para marcar melhores takes na timeline
const markBestTakes = async (
  sequence: PremiereSequence,
  bestTakes: AnalysisResult[]
): Promise<void> => {
  try {
    bestTakes.forEach(take => {
      sequence.addMarker(
        take.timePoint,
        `Best Take - Motion: ${take.motionScore}`,
        take.motionScore > 40 ? 'green' : 'yellow'
      );
    });
  } catch (error) {
    console.error('Error marking best takes:', error);
    throw new Error('Failed to mark best takes');
  }
};

// Função atualizada para incluir notificações de progresso
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
    let currentTime = 0;
    
    onProgress?.('Montando timeline', 60);
    for (const sceneType of editingOrder) {
      const clips = organizedClips[sceneType] || [];
      await addClipsToTimelineSmoothly(sequence, clips.map(clip => ({
        id: clip.timePoint.toString(),
        name: `${sceneType}_${clip.timePoint}`,
        duration: 3
      })));
      
      await markBestTakes(sequence, clips);
      currentTime += clips.length * 3;
    }

    onProgress?.('Finalizando', 100);
    console.log('Sequence created successfully in Premiere Pro');

  } catch (error) {
    console.error('Error creating sequence in Premiere Pro:', error);
    throw new Error('Failed to create sequence in Premiere Pro');
  }
};

export const synchronizeWithMusic = async (
  sequence: PremiereSequence,
  audioTrack: any
): Promise<void> => {
  try {
    // Analisar transições musicais
    const transitions = await analyzeMusicTransitions(audioTrack);
    
    // Ajustar clips para sincronizar com as transições
    const clips = sequence.getAllClips();
    let currentClip = 0;
    
    transitions.forEach((transition, index) => {
      if (currentClip < clips.length) {
        // Adicionar marcador na transição
        sequence.addMarker(
          transition.time,
          'Music Transition',
          'blue'
        );

        // Ajustar duração do clip atual até a próxima transição
        const nextTransition = transitions[index + 1];
        if (nextTransition) {
          const duration = nextTransition.time - transition.time;
          clips[currentClip].duration = duration;
        }

        currentClip++;
      }
    });

    console.log('Music synchronization completed');

  } catch (error) {
    console.error('Error synchronizing with music:', error);
    throw new Error('Failed to synchronize with music');
  }
};
