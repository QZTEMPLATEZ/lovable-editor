export const createImageUrlFromBase64 = (base64String: string): string => {
  try {
    // Remove the data URL prefix if present
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
    
    // Decode base64 string to binary
    const binaryString = window.atob(base64Data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    // Create blob from binary data
    const blob = new Blob([bytes], { type: 'image/jpeg' });
    
    // Create and return object URL
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error creating image URL:', error);
    return '';
  }
};

export const cleanupImageUrl = (url: string) => {
  URL.revokeObjectURL(url);
};