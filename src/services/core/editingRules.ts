
import { SceneType, EditingPreset, FrameAnalysis } from './types';

const DEFAULT_EDITING_PRESET: EditingPreset = {
  emotional: {
    minDuration: 3,
    maxDuration: 6,
    preferredTransition: 'crossDissolve',
    energyThreshold: 20
  },
  action: {
    minDuration: 1.5,
    maxDuration: 3,
    preferredTransition: 'cut',
    energyThreshold: 40
  },
  default: {
    minDuration: 2,
    maxDuration: 4,
    preferredTransition: 'crossDissolve',
    energyThreshold: 30
  }
};

export const selectBestTakes = (
  analyses: FrameAnalysis[],
  targetDuration: number,
  preset: EditingPreset = DEFAULT_EDITING_PRESET
): FrameAnalysis[] => {
  // Organiza os takes por tipo de cena
  const organizedTakes = analyses.reduce((acc, analysis) => {
    if (!acc[analysis.sceneType]) {
      acc[analysis.sceneType] = [];
    }
    acc[analysis.sceneType].push(analysis);
    return acc;
  }, {} as Record<SceneType, FrameAnalysis[]>);

  // Seleciona os melhores takes de cada categoria
  const selectedTakes: FrameAnalysis[] = [];
  let currentDuration = 0;

  ['emotional', 'default', 'action'].forEach(sceneType => {
    const takes = organizedTakes[sceneType as SceneType] || [];
    const rules = preset[sceneType as SceneType];

    takes.sort((a, b) => {
      // Prioriza takes com movimento adequado para o tipo de cena
      const aScore = Math.abs(a.motionScore - rules.energyThreshold);
      const bScore = Math.abs(b.motionScore - rules.energyThreshold);
      return aScore - bScore;
    });

    for (const take of takes) {
      if (currentDuration >= targetDuration) break;

      const duration = Math.min(
        rules.maxDuration,
        Math.max(rules.minDuration, targetDuration - currentDuration)
      );

      selectedTakes.push({
        ...take,
        averageMotion: take.averageMotion || take.motionScore
      });

      currentDuration += duration;
    }
  });

  return selectedTakes;
};

export const generateEditingSequence = (
  selectedTakes: FrameAnalysis[],
  beats: number[],
  targetDuration: number
): { timePoint: number; duration: number; transition: string }[] => {
  return selectedTakes.map((take, index) => {
    const rules = DEFAULT_EDITING_PRESET[take.sceneType];
    
    // Encontra o beat mais próximo para sincronizar o corte
    const nearestBeat = beats.reduce((prev, curr) => {
      return Math.abs(curr - take.timePoint) < Math.abs(prev - take.timePoint) 
        ? curr 
        : prev;
    }, beats[0]);

    return {
      timePoint: nearestBeat,
      duration: rules.maxDuration,
      transition: rules.preferredTransition
    };
  });
};
