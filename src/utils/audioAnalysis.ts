
import { CloudLink } from '@/components/editor/types';

interface BeatInfo {
  timestamp: number;
  intensity: number;
}

interface AudioAnalysisResult {
  bpm: number;
  beats: BeatInfo[];
  energyPoints: number[];
  waveformData: number[];
}

export const analyzeAudio = async (audioLink: CloudLink): Promise<AudioAnalysisResult> => {
  // Criar um contexto de áudio
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  try {
    // Carregar o arquivo de áudio
    const response = await fetch(audioLink.url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    // Configurar analisadores
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    
    // Processar dados do áudio
    const channelData = audioBuffer.getChannelData(0);
    const sampleRate = audioBuffer.sampleRate;
    
    // Detectar batidas
    const beats = detectBeats(channelData, sampleRate);
    
    // Calcular BPM
    const bpm = calculateBPM(beats);
    
    // Analisar energia do áudio
    const energyPoints = analyzeEnergy(channelData);
    
    // Gerar dados da forma de onda
    const waveformData = generateWaveform(channelData);
    
    return {
      bpm,
      beats,
      energyPoints,
      waveformData
    };
  } catch (error) {
    console.error('Erro na análise de áudio:', error);
    throw error;
  } finally {
    audioContext.close();
  }
};

const detectBeats = (channelData: Float32Array, sampleRate: number): BeatInfo[] => {
  const beats: BeatInfo[] = [];
  const threshold = 0.15; // Ajustável para sensibilidade
  const minInterval = sampleRate * 0.2; // Mínimo 200ms entre batidas
  
  let lastBeat = 0;
  
  for (let i = 0; i < channelData.length; i++) {
    const amplitude = Math.abs(channelData[i]);
    
    if (amplitude > threshold && (i - lastBeat) > minInterval) {
      beats.push({
        timestamp: i / sampleRate,
        intensity: amplitude
      });
      lastBeat = i;
    }
  }
  
  return beats;
};

const calculateBPM = (beats: BeatInfo[]): number => {
  if (beats.length < 2) return 0;
  
  const intervals: number[] = [];
  
  for (let i = 1; i < beats.length; i++) {
    intervals.push(beats[i].timestamp - beats[i-1].timestamp);
  }
  
  const averageInterval = intervals.reduce((a, b) => a + b) / intervals.length;
  return Math.round(60 / averageInterval);
};

const analyzeEnergy = (channelData: Float32Array): number[] => {
  const energyPoints: number[] = [];
  const windowSize = 1024;
  
  for (let i = 0; i < channelData.length; i += windowSize) {
    let sum = 0;
    for (let j = 0; j < windowSize && (i + j) < channelData.length; j++) {
      sum += channelData[i + j] * channelData[i + j];
    }
    energyPoints.push(sum / windowSize);
  }
  
  return energyPoints;
};

const generateWaveform = (channelData: Float32Array): number[] => {
  const points = 1000; // Número de pontos na forma de onda
  const samplesPerPoint = Math.floor(channelData.length / points);
  const waveform: number[] = [];
  
  for (let i = 0; i < points; i++) {
    const start = i * samplesPerPoint;
    let max = 0;
    
    for (let j = 0; j < samplesPerPoint && (start + j) < channelData.length; j++) {
      const amplitude = Math.abs(channelData[start + j]);
      if (amplitude > max) max = amplitude;
    }
    
    waveform.push(max);
  }
  
  return waveform;
};
