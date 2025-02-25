
import { FrameAnalysis, AudioAnalysis } from './types';
import { calculateFrameDifference, determineSceneType, extractFrameData } from './frameAnalysis';
import { detectBeats, calculateEnergy, estimateTempo } from './audioAnalysis';
import { selectBestTakes, generateEditingSequence } from './editingRules';

export class VideoAnalyzer {
  private framePoints: number[] = [];
  private analyses: FrameAnalysis[] = [];
  private audioAnalysis: AudioAnalysis | null = null;

  constructor(private targetDuration: number = 180) {}

  async analyzeVideo(videoFile: File): Promise<FrameAnalysis[]> {
    console.log('Iniciando análise do vídeo:', videoFile.name);
    const video = document.createElement('video');
    video.src = URL.createObjectURL(videoFile);
    
    await new Promise<void>((resolve, reject) => {
      video.addEventListener('loadeddata', () => resolve());
      video.addEventListener('error', (e) => reject(new Error(`Erro ao carregar vídeo: ${e.message}`)));
    });

    this.framePoints = this.generateFramePoints(video.duration);
    console.log(`Video duration: ${video.duration}s, Analyzing ${this.framePoints.length} points`);
    
    for (const timePoint of this.framePoints) {
      try {
        const frameData = await extractFrameData(video, timePoint);
        
        if (frameData) {
          const motionScore = this.analyses.length > 0 && this.analyses[this.analyses.length - 1].frameData
            ? calculateFrameDifference(this.analyses[this.analyses.length - 1].frameData, frameData)
            : 0;

          console.log(`Frame at ${timePoint}s - Motion Score: ${motionScore}`);

          this.analyses.push({
            timePoint,
            motionScore,
            sceneType: determineSceneType(motionScore),
            hasFaces: false,
            frameData
          });
        }
      } catch (error) {
        console.error(`Error analyzing frame at ${timePoint}s:`, error);
      }
    }

    URL.revokeObjectURL(video.src);
    
    console.log('Análise de vídeo concluída:', {
      totalFrames: this.analyses.length,
      sceneTypes: this.analyses.reduce((acc, analysis) => {
        acc[analysis.sceneType] = (acc[analysis.sceneType] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    });

    return this.analyses;
  }

  async analyzeAudio(audioFile: File): Promise<AudioAnalysis> {
    console.log('Iniciando análise do áudio:', audioFile.name);
    
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const audioContext = new AudioContextClass();
    const arrayBuffer = await audioFile.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const beats = detectBeats(audioBuffer);
    const energy = calculateEnergy(audioBuffer);
    const tempo = estimateTempo(beats);

    this.audioAnalysis = { beats, energy, tempo };
    
    console.log('Análise de áudio concluída:', {
      beats: beats.length,
      energy,
      tempo
    });

    return this.audioAnalysis;
  }

  generateSequence(): { timePoint: number; duration: number; transition: string }[] {
    if (!this.analyses.length) {
      throw new Error('No video analysis available');
    }

    console.log('Gerando sequência de edição');
    const selectedTakes = selectBestTakes(this.analyses, this.targetDuration);
    
    const sequence = this.audioAnalysis
      ? generateEditingSequence(selectedTakes, this.audioAnalysis.beats, this.targetDuration)
      : selectedTakes.map(take => ({
          timePoint: take.timePoint,
          duration: 3,
          transition: 'crossDissolve'
        }));

    console.log('Sequência gerada:', {
      totalClips: sequence.length,
      totalDuration: sequence.reduce((acc, clip) => acc + clip.duration, 0)
    });

    return sequence;
  }

  private generateFramePoints(duration: number): number[] {
    // Análise mais frequente para vídeos curtos
    const minPoints = 10;
    const maxPoints = 30;
    const pointsPerMinute = 5;
    
    const minutes = duration / 60;
    const suggestedPoints = Math.ceil(minutes * pointsPerMinute);
    const numPoints = Math.min(maxPoints, Math.max(minPoints, suggestedPoints));
    
    const interval = duration / numPoints;
    return Array.from({ length: numPoints }, (_, i) => i * interval);
  }
}
