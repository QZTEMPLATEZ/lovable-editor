
import { EditingSequence, ClipInfo } from '../../core/types';

export class PremiereSequenceAdapter {
  constructor(private activeSequence: any) {}

  async applySequence(editingSequence: EditingSequence): Promise<void> {
    try {
      console.log('Aplicando sequência à timeline do Premiere:', editingSequence);
      
      // Limpar timeline atual
      await this.clearTimeline();
      
      // Adicionar clips na ordem
      for (const clip of editingSequence.clips) {
        await this.addClipToTimeline(clip);
      }
      
      // Aplicar transições
      await this.applyTransitions(editingSequence.clips);
      
      console.log('Sequência aplicada com sucesso');
    } catch (error) {
      console.error('Erro ao aplicar sequência:', error);
      throw error;
    }
  }

  private async clearTimeline(): Promise<void> {
    // Limpar tracks existentes
    const tracks = this.activeSequence.videoTracks;
    for (let i = 0; i < tracks.numTracks; i++) {
      const track = tracks[i];
      const clips = track.clips;
      for (let j = 0; j < clips.numItems; j++) {
        clips[0].remove(); // Remove sempre o primeiro até limpar
      }
    }
  }

  private async addClipToTimeline(clipInfo: ClipInfo): Promise<void> {
    try {
      const { timePoint, duration, transition } = clipInfo;
      
      // Adicionar clip na timeline
      const track = this.activeSequence.videoTracks[0];
      const newClip = track.insertClip(clipInfo.sourceClip, timePoint);
      
      // Ajustar duração
      newClip.duration = duration;
      
      console.log(`Clip adicionado em ${timePoint}s com duração ${duration}s`);
    } catch (error) {
      console.error('Erro ao adicionar clip:', error);
      throw error;
    }
  }

  private async applyTransitions(clips: ClipInfo[]): Promise<void> {
    for (let i = 0; i < clips.length - 1; i++) {
      const currentClip = clips[i];
      const nextClip = clips[i + 1];
      
      if (currentClip.transition) {
        await this.addTransition(currentClip, nextClip);
      }
    }
  }

  private async addTransition(currentClip: ClipInfo, nextClip: ClipInfo): Promise<void> {
    try {
      const track = this.activeSequence.videoTracks[0];
      
      // Adicionar transição entre clips
      const transitionDuration = 1.0; // 1 segundo padrão
      track.addTransition(
        currentClip.timePoint + currentClip.duration - transitionDuration/2,
        transitionDuration,
        currentClip.transition
      );
      
      console.log(`Transição ${currentClip.transition} adicionada entre clips`);
    } catch (error) {
      console.error('Erro ao adicionar transição:', error);
      throw error;
    }
  }
}
