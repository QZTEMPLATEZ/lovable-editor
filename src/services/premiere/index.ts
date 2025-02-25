
export * from './adapters/frameAdapter';
export * from './adapters/sequenceAdapter';
export * from './adapters/audioAdapter';

import { PremiereFrameAdapter } from './adapters/frameAdapter';
import { PremiereSequenceAdapter } from './adapters/sequenceAdapter';
import { PremiereAudioAdapter } from './adapters/audioAdapter';

export class PremiereIntegration {
  private frameAdapter: PremiereFrameAdapter;
  private sequenceAdapter: PremiereSequenceAdapter;
  private audioAdapter: PremiereAudioAdapter;

  constructor(activeSequence: any) {
    this.frameAdapter = new PremiereFrameAdapter();
    this.sequenceAdapter = new PremiereSequenceAdapter(activeSequence);
    this.audioAdapter = new PremiereAudioAdapter();
  }

  getAdapters() {
    return {
      frame: this.frameAdapter,
      sequence: this.sequenceAdapter,
      audio: this.audioAdapter
    };
  }
}
