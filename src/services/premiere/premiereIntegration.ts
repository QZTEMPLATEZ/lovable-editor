
import { AnalysisResult } from '@/hooks/useVideoAnalysis';

interface PremiereSequence {
  id: string;
  name: string;
  clips: any[];
  addClip: (clipId: string, startTime: number) => void;
  addMarker: (time: number, comment: string, color: string) => void;
  addTransition: (type: string, startTime: number, duration: number) => void;
}

interface PremiereProject {
  id: string;
  name: string;
  sequences: PremiereSequence[];
  createSequence: (name: string, resolution: string, fps: string) => PremiereSequence;
}

declare global {
  interface Window {
    premiere: {
      project: PremiereProject;
    };
  }
}

export const createEditingSequence = async (
  analysisResults: AnalysisResult[],
  projectName: string
): Promise<void> => {
  try {
    const sequence = window.premiere.project.createSequence(
      projectName,
      "1920x1080",
      "25"
    );

    // Organizar clips por tipo de cena
    const organizedClips = analysisResults.reduce((acc, result) => {
      if (!acc[result.sceneType]) {
        acc[result.sceneType] = [];
      }
      acc[result.sceneType].push(result);
      return acc;
    }, {} as Record<string, AnalysisResult[]>);

    // Ordem de edição: emotional -> default -> action
    const editingOrder = ['emotional', 'default', 'action'];
    
    let currentTime = 0;
    
    // Adicionar clips na timeline seguindo a ordem definida
    for (const sceneType of editingOrder) {
      const clips = organizedClips[sceneType] || [];
      
      for (const clip of clips) {
        // Adicionar o clip na timeline
        sequence.addClip(clip.timePoint.toString(), currentTime);
        
        // Adicionar marcador indicando o tipo de cena
        sequence.addMarker(
          currentTime,
          `${sceneType.toUpperCase()} - Motion: ${clip.motionScore}`,
          sceneType === 'action' ? 'red' : 
          sceneType === 'emotional' ? 'blue' : 
          'yellow'
        );

        // Adicionar transição suave entre clips
        if (currentTime > 0) {
          sequence.addTransition(
            'Cross Dissolve',
            currentTime,
            0.5 // meio segundo de transição
          );
        }

        // Atualizar o tempo atual (assumindo duração média de 3 segundos por clip)
        currentTime += 3;
      }
    }

    console.log('Sequence created successfully in Premiere Pro');

  } catch (error) {
    console.error('Error creating sequence in Premiere Pro:', error);
    throw new Error('Failed to create sequence in Premiere Pro');
  }
};

export const synchronizeWithMusic = async (
  sequence: PremiereSequence,
  beats: number[]
): Promise<void> => {
  try {
    let currentClip = 0;
    
    // Ajustar os pontos de corte para coincidir com as batidas
    for (let i = 0; i < beats.length - 1; i++) {
      const clipDuration = beats[i + 1] - beats[i];
      
      // Adicionar marcador na batida
      sequence.addMarker(
        beats[i],
        'Beat',
        'green'
      );

      // Ajustar duração do clip atual
      if (sequence.clips[currentClip]) {
        sequence.clips[currentClip].duration = clipDuration;
        currentClip++;
      }
    }

    console.log('Music synchronization completed');

  } catch (error) {
    console.error('Error synchronizing with music:', error);
    throw new Error('Failed to synchronize with music');
  }
};
