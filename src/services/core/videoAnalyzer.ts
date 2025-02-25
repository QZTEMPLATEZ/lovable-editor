
import { FrameAnalysis, AudioAnalysis } from './types';
import { calculateFrameDifference, determineSceneType, extractFrameData } from './frameAnalysis';
import { detectBeats, calculateEnergy, estimateTempo } from './audioAnalysis';
import { selectBestTakes, generateEditingSequence } from './editingRules';

export class VideoAnalyzer {
  private framePoints: number[] = [];
  private analyses: FrameAnalysis[] = [];
  private audioAnalysis: AudioAnalysis | null = null;

  constructor(private targetDuration: number = 180) {} // 3 minutos por padrão

  async analyzeVideo(videoFile: File): Promise<FrameAnalysis[]> {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(videoFile);
    
    await new Promise<void>((resolve) => {
      video.addEventListener('loadeddata', () => resolve());
    });

    this.framePoints = this.generateFramePoints(video.duration);
    
    for (const timePoint of this.framePoints) {
      const frameData = await extractFrameData(video, timePoint);
      
      if (frameData) {
        const motionScore = this.analyses.length > 0
          ? calculateFrameDifference(this.analyses[this.analyses.length - 1].frameData, frameData)
          : 0;

        this.analyses.push({
          timePoint,
          motionScore,
          sceneType: determineSceneType(motionScore),
          hasFaces: false, // Implementar detecção de faces se necessário
          frameData
        });
      }
    }

    URL.revokeObjectURL(video.src);
    return this.analyses;
  }

  async analyzeAudio(audioFile: File): Promise<AudioAnalysis> {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const arrayBuffer = await audioFile.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const beats = detectBeats(audioBuffer);
    const energy = calculateEnergy(audioBuffer);
    const tempo = estimateTempo(beats);

    this.audioAnalysis = { beats, energy, tempo };
    return this.audioAnalysis;
  }

  generateSequence(): { timePoint: number; duration: number; transition: string }[] {
    if (!this.analyses.length) {
      throw new Error('No video analysis available');
    }

    const selectedTakes = selectBestTakes(this.analyses, this.targetDuration);
    
    if (this.audioAnalysis) {
      return generateEditingSequence(selectedTakes, this.audioAnalysis.beats, this.targetDuration);
    }

    // Se não houver análise de áudio, retorna sequência básica
    return selectedTakes.map(take => ({
      timePoint: take.timePoint,
      duration: 3, // Duração padrão
      transition: 'crossDissolve'
    }));
  }

  private generateFramePoints(duration: number): number[] {
    const points: number[] = [];
    const interval = duration / 10; // Analisa 10 pontos ao longo do vídeo
    
    for (let i = 0; i < 10; i++) {
      points.push(i * interval);
    }
    
    return points;
  }
}
