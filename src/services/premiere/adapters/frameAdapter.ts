
import { FrameData } from '../../core/types';

export class PremiereFrameAdapter {
  async extractFrame(premiereClip: any, timePoint: number): Promise<FrameData | null> {
    try {
      console.log(`Extraindo frame em ${timePoint}s do clip`, premiereClip);
      
      // Usar API do Premiere para extrair frame
      const app = typeof window !== 'undefined' ? (window as any).app : null;
      if (!app || !app.project || !app.project.activeSequence) {
        console.error('Ambiente Premiere não detectado');
        return null;
      }
      
      const frame = await app.project.activeSequence.getFrameAtTime(timePoint);
      const frameData = this.convertPremiereFrame(frame);
      
      return frameData;
    } catch (error) {
      console.error('Erro ao extrair frame:', error);
      return null;
    }
  }

  private convertPremiereFrame(premiereFrame: any): FrameData {
    const width = premiereFrame.width;
    const height = premiereFrame.height;
    const data = new Uint8ClampedArray(width * height * 4);
    
    // TODO: Implementar conversão real dos dados do frame do Premiere
    
    return {
      width,
      height,
      data,
      colorSpace: 'srgb' // Valor padrão para compatibilidade com ImageData
    };
  }
}
