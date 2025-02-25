
import { FrameData } from '../../core/types';

export class PremiereFrameAdapter {
  async extractFrame(qeClip: any, timePoint: number): Promise<FrameData | null> {
    try {
      console.log(`Extraindo frame em ${timePoint}s do clip`, qeClip);
      
      // Usar API do Premiere para extrair frame
      const frame = await qe.project.activeSequence.getFrameAtTime(timePoint);
      
      // Converter frame do Premiere para nosso formato
      const frameData = this.convertPremiereFrame(frame);
      
      return frameData;
    } catch (error) {
      console.error('Erro ao extrair frame:', error);
      return null;
    }
  }

  private convertPremiereFrame(premiereFrame: any): FrameData {
    // Converter formato do Premiere para nosso formato interno
    const width = premiereFrame.width;
    const height = premiereFrame.height;
    const data = new Uint8ClampedArray(width * height * 4);
    
    // TODO: Implementar conversão real dos dados do frame do Premiere
    // Isso dependerá do formato exato que o Premiere retorna
    
    return {
      width,
      height,
      data
    };
  }
}
