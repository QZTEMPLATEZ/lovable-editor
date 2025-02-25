
import { SceneType, EditingPreset, FrameAnalysis } from './types';

const DEFAULT_EDITING_PRESET: EditingPreset = {
  emotional: {
    minDuration: 3.5,    // Cenas emocionais um pouco mais longas
    maxDuration: 7,
    preferredTransition: 'crossDissolve',
    energyThreshold: 15
  },
  action: {
    minDuration: 1.5,    // Cenas de ação mais curtas e dinâmicas
    maxDuration: 3.5,
    preferredTransition: 'cut',
    energyThreshold: 35
  },
  default: {
    minDuration: 2.5,
    maxDuration: 5,
    preferredTransition: 'crossDissolve',
    energyThreshold: 25
  }
};

export const selectBestTakes = (
  analyses: FrameAnalysis[],
  targetDuration: number,
  preset: EditingPreset = DEFAULT_EDITING_PRESET
): FrameAnalysis[] => {
  const sceneTypeGroups = analyses.reduce((acc, analysis) => {
    if (!acc[analysis.sceneType]) {
      acc[analysis.sceneType] = [];
    }
    acc[analysis.sceneType].push(analysis);
    return acc;
  }, {} as Record<SceneType, FrameAnalysis[]>);

  // Distribuição do tempo por tipo de cena
  const timeDistribution = {
    emotional: 0.4,  // 40% para cenas emocionais
    default: 0.35,   // 35% para cenas padrão
    action: 0.25     // 25% para cenas de ação
  };

  const selectedTakes: FrameAnalysis[] = [];
  let remainingDuration = targetDuration;

  Object.entries(timeDistribution).forEach(([sceneType, ratio]) => {
    const takes = sceneTypeGroups[sceneType as SceneType] || [];
    const targetTimeForType = targetDuration * ratio;
    let usedTime = 0;

    takes.sort((a, b) => {
      const rules = preset[sceneType as SceneType];
      const aScore = Math.abs(a.motionScore - rules.energyThreshold);
      const bScore = Math.abs(b.motionScore - rules.energyThreshold);
      return aScore - bScore;
    });

    for (const take of takes) {
      if (usedTime >= targetTimeForType || remainingDuration <= 0) break;

      const rules = preset[sceneType as SceneType];
      const duration = Math.min(
        rules.maxDuration,
        Math.max(rules.minDuration, remainingDuration)
      );

      selectedTakes.push(take);
      usedTime += duration;
      remainingDuration -= duration;
    }
  });

  return selectedTakes;
};

export const generateEditingSequence = (
  selectedTakes: FrameAnalysis[],
  beats: number[],
  targetDuration: number
): { timePoint: number; duration: number; transition: string }[] => {
  const sequence = selectedTakes.map((take, index) => {
    const rules = DEFAULT_EDITING_PRESET[take.sceneType];
    
    // Encontra o beat mais próximo para sincronização
    const nearestBeat = beats.reduce((prev, curr) => {
      return Math.abs(curr - take.timePoint) < Math.abs(prev - take.timePoint) 
        ? curr 
        : prev;
    }, beats[0]);

    // Ajusta a duração baseado no contexto
    const isLastTake = index === selectedTakes.length - 1;
    const nextTake = !isLastTake ? selectedTakes[index + 1] : null;
    
    let duration = rules.maxDuration;
    
    if (nextTake) {
      // Ajusta a duração baseado no contexto da próxima cena
      const contextualDuration = Math.min(
        rules.maxDuration,
        Math.max(rules.minDuration, Math.abs(nextTake.timePoint - take.timePoint))
      );
      duration = contextualDuration;
    }

    // Determina a transição baseado no contexto
    let transition = rules.preferredTransition;
    if (nextTake && take.sceneType === 'action' && nextTake.sceneType === 'action') {
      transition = 'cut'; // Cortes secos entre cenas de ação
    }

    return {
      timePoint: nearestBeat,
      duration,
      transition
    };
  });

  return sequence;
};
