
import { createEditingSequence, synchronizeWithMusic } from '../premiereIntegration';
import { AnalysisResult } from '@/hooks/useVideoAnalysis';

// Mock do objeto window.premiere
const mockPremiereProject = {
  createSequence: jest.fn(),
  getSequenceByName: jest.fn(),
  getMediaInBin: jest.fn()
};

const mockSequence = {
  addClip: jest.fn(),
  addMarker: jest.fn(),
  addTransition: jest.fn(),
  getAllClips: jest.fn(),
  clips: []
};

describe('Premiere Integration', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Setup window.premiere mock
    (global as any).window = {
      premiere: {
        project: mockPremiereProject
      }
    };
    
    // Setup default mock returns
    mockPremiereProject.createSequence.mockResolvedValue(mockSequence);
    mockPremiereProject.getMediaInBin.mockResolvedValue([]);
    mockSequence.getAllClips.mockReturnValue([]);
  });

  describe('createEditingSequence', () => {
    it('should create a new sequence with the correct settings', async () => {
      const analysisResults: AnalysisResult[] = [{
        timePoint: 0,
        motionScore: 30,
        sceneType: 'default',
        hasFaces: false
      }];

      await createEditingSequence(analysisResults, 'Test Project');

      expect(mockPremiereProject.createSequence).toHaveBeenCalledWith(
        'Test Project',
        '1920x1080',
        '25'
      );
    });

    it('should handle errors gracefully', async () => {
      mockPremiereProject.createSequence.mockRejectedValue(new Error('Test error'));

      await expect(createEditingSequence([], 'Test')).rejects.toThrow('Failed to create sequence');
    });
  });

  describe('synchronizeWithMusic', () => {
    it('should add markers at music transitions', async () => {
      const mockAudioTrack = {
        clips: [
          { startTime: 0, energy: 0.5 },
          { startTime: 1, energy: 0.8 },
          { startTime: 2, energy: 0.3 }
        ]
      };

      await synchronizeWithMusic(mockSequence, mockAudioTrack);

      expect(mockSequence.addMarker).toHaveBeenCalled();
    });

    it('should handle empty audio tracks', async () => {
      const mockAudioTrack = { clips: [] };

      await synchronizeWithMusic(mockSequence, mockAudioTrack);

      expect(mockSequence.addMarker).not.toHaveBeenCalled();
    });
  });
});
