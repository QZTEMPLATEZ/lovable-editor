interface SequenceConfig {
  name: string;
  duration: number; // in seconds
  frameRate: number;
  width: number;
  height: number;
}

export const createPremiereSequence = async (config: SequenceConfig): Promise<void> => {
  try {
    // This is a mock implementation. In the real Adobe CEP/UXP extension,
    // this would use the Premiere Pro API to create a new sequence
    const csInterface = (window as any).CSInterface;
    
    if (!csInterface) {
      throw new Error('Adobe CEP interface not found');
    }

    const jsx = `
      (function() {
        var seqName = "${config.name}";
        var projItem = app.project.createNewSequence(seqName, seqName);
        
        var seqSettings = projItem.getSettings();
        seqSettings.videoFrameRate = new Time(1, ${config.frameRate});
        seqSettings.videoFrameWidth = ${config.width};
        seqSettings.videoFrameHeight = ${config.height};
        
        projItem.setSettings(seqSettings);
        
        return "Sequence created successfully";
      })();
    `;

    return new Promise((resolve, reject) => {
      csInterface.evalScript(jsx, (result: string) => {
        if (result === 'Sequence created successfully') {
          resolve();
        } else {
          reject(new Error('Failed to create sequence'));
        }
      });
    });
  } catch (error) {
    console.error('Error in createPremiereSequence:', error);
    throw error;
  }
};