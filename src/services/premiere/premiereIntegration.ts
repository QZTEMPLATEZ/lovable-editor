import { AnalysisResult } from '@/hooks/useVideoAnalysis';

interface PremiereClip {
  id: string;
  name: string;
  duration: number;
  startTime?: number;
  energy?: number;
  moveTo?: (time: number) => void;
}

interface PremiereSequence {
  id: string;
  name: string;
  clips: PremiereClip[];
  addClip: (clipId: string, startTime: number) => void;
  addMarker: (time: number, comment: string, color: string) => void;
  addTransition: (type: string, startTime: number, duration: number) => void;
  getAllClips: () => PremiereClip[];
  getAllAudioTracks: () => any[];
  hasTransition: (clip1: PremiereClip, clip2: PremiereClip) => boolean;
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

// Função para remover espaços vazios na timeline
const removeGapsInTimeline = async (sequence: PremiereSequence): Promise<void> => {
  try {
    const clips = sequence.getAllClips();
    for (let i = 1; i < clips.length; i++) {
      const currentClip = clips[i];
      const previousClip = clips[i - 1];
      const gap = (currentClip.startTime || 0) - ((previousClip.startTime || 0) + previousClip.duration);
      
      if (gap > 0 && currentClip.moveTo) {
        currentClip.moveTo((currentClip.startTime || 0) - gap);
      }
    }
  } catch (error) {
    console.error('Error removing gaps:', error);
    throw new Error('Failed to remove gaps in timeline');
  }
};

// Função para detectar silêncio no áudio
const detectSilence = (audioTrack: any): Array<{start: number, duration: number}> => {
  const silentSegments: Array<{start: number, duration: number}> = [];
  const clips = audioTrack.clips || [];
  
  let currentTime = 0;
  clips.forEach((clip: any) => {
    const audioData = clip.audioData || {};
    const rms = audioData.rms || 0;
    
    if (rms < 0.01) { // Threshold para silêncio
      silentSegments.push({
        start: currentTime,
        duration: clip.duration
      });
    }
    currentTime += clip.duration;
  });
  
  return silentSegments;
};

// Função para marcar seções silenciosas
const markSilentSections = async (sequence: PremiereSequence): Promise<void> => {
  try {
    const audioTracks = sequence.getAllAudioTracks();
    
    audioTracks.forEach(track => {
      const silenceSegments = detectSilence(track);
      silenceSegments.forEach(segment => {
        sequence.addMarker(segment.start, "Silêncio Detectado", "red");
      });
    });
  } catch (error) {
    console.error('Error marking silent sections:', error);
    throw new Error('Failed to mark silent sections');
  }
};

// Função para sincronização fina com a música
const fineTuneMusicSync = async (
  sequence: PremiereSequence,
  beats: number[]
): Promise<void> => {
  try {
    sequence.getAllClips().forEach(clip => {
      if (!clip.startTime || !clip.moveTo) return;
      
      const closestBeat = beats.reduce((prev, curr) => {
        return Math.abs(curr - clip.startTime!) < Math.abs(prev - clip.startTime!)
          ? curr
          : prev;
      });
      
      clip.moveTo(closestBeat);
    });
  } catch (error) {
    console.error('Error fine-tuning music sync:', error);
    throw new Error('Failed to fine-tune music synchronization');
  }
};

// Função para verificar e aplicar transições
const verifyAndApplyTransitions = async (
  sequence: PremiereSequence,
  defaultTransition: string = "Cross Dissolve",
  duration: number = 1.0
): Promise<void> => {
  try {
    const clips = sequence.getAllClips();
    for (let i = 0; i < clips.length - 1; i++) {
      if (!sequence.hasTransition(clips[i], clips[i + 1])) {
        sequence.addTransition(
          defaultTransition,
          (clips[i].startTime || 0) + clips[i].duration,
          duration
        );
      }
    }
  } catch (error) {
    console.error('Error verifying transitions:', error);
    throw new Error('Failed to verify and apply transitions');
  }
};

// Função principal de verificação final
export const performFinalCheck = async (
  sequence: PremiereSequence,
  beats: number[],
  onProgress?: (step: string, progress: number) => void
): Promise<void> => {
  try {
    // Remover espaços vazios
    onProgress?.('Removendo espaços vazios', 20);
    await removeGapsInTimeline(sequence);
    
    // Marcar seções silenciosas
    onProgress?.('Verificando áudio', 40);
    await markSilentSections(sequence);
    
    // Sincronizar com a música
    onProgress?.('Ajustando sincronização', 60);
    await fineTuneMusicSync(sequence, beats);
    
    // Verificar transições
    onProgress?.('Verificando transições', 80);
    await verifyAndApplyTransitions(sequence);
    
    onProgress?.('Verificação concluída', 100);
    console.log('Final check completed successfully');
    
  } catch (error) {
    console.error('Error during final check:', error);
    throw new Error('Failed to complete final check');
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
