
import React, { useEffect, useRef, useState } from 'react';

interface WaveformAnimationProps {
  audioFile: File;
  isPlaying: boolean;
  onCutPointAdd?: (time: number) => void;
  cutPoints?: number[];
}

const WaveformAnimation = ({ audioFile, isPlaying, onCutPointAdd, cutPoints = [] }: WaveformAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [hoveredTime, setHoveredTime] = useState<number | null>(null);

  useEffect(() => {
    const initializeAudio = async () => {
      if (!canvasRef.current) return;

      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      try {
        const arrayBuffer = await audioFile.arrayBuffer();
        const buffer = await audioContext.decodeAudioData(arrayBuffer);
        setAudioBuffer(buffer);
        drawWaveform(buffer);
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    };

    initializeAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [audioFile]);

  const drawWaveform = (buffer: AudioBuffer) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const data = buffer.getChannelData(0);
    const step = Math.ceil(data.length / width);
    
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    
    // Draw waveform
    for (let i = 0; i < width; i++) {
      const min = Math.min(...data.slice(i * step, (i + 1) * step));
      const max = Math.max(...data.slice(i * step, (i + 1) * step));
      
      const x = i;
      const yMin = ((min + 1) / 2) * height;
      const yMax = ((max + 1) / 2) * height;
      
      ctx.fillStyle = 'rgba(139, 92, 246, 0.3)'; // Purple with transparency
      ctx.fillRect(x, yMin, 1, yMax - yMin);
    }

    // Draw cut points
    cutPoints.forEach(time => {
      const x = (time / buffer.duration) * width;
      ctx.fillStyle = '#EC4899'; // Pink
      ctx.fillRect(x - 1, 0, 2, height);
    });

    // Draw hover line
    if (hoveredTime !== null) {
      const x = (hoveredTime / buffer.duration) * width;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fillRect(x - 1, 0, 2, height);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !audioBuffer || !onCutPointAdd) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const time = (x / canvasRef.current.width) * audioBuffer.duration;
    
    onCutPointAdd(time);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !audioBuffer) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const time = (x / canvasRef.current.width) * audioBuffer.duration;
    
    setHoveredTime(time);
  };

  const handleMouseLeave = () => {
    setHoveredTime(null);
  };

  useEffect(() => {
    if (audioBuffer) {
      drawWaveform(audioBuffer);
    }
  }, [cutPoints, hoveredTime, audioBuffer]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={800}
        height={200}
        className="w-full h-32 bg-black/20 rounded-lg cursor-crosshair"
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      {hoveredTime !== null && (
        <div 
          className="absolute bottom-full mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded"
          style={{ left: `${(hoveredTime / (audioBuffer?.duration || 1)) * 100}%`, transform: 'translateX(-50%)' }}
        >
          {hoveredTime.toFixed(2)}s
        </div>
      )}
    </div>
  );
};

export default WaveformAnimation;
