import React, { useState, useEffect } from 'react';
import { VideoStyle } from '../../types/video';
import { createImageUrlFromBase64, cleanupImageUrl } from '../../utils/imageUtils';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../ui/use-toast';

interface VideoStyleSelectorProps {
  selectedStyle: VideoStyle | null;
  onStyleSelect: (style: VideoStyle) => void;
  onCustomVideoUpload: (file: File) => void;
}

const VideoStyleSelector = ({ selectedStyle, onStyleSelect, onCustomVideoUpload }: VideoStyleSelectorProps) => {
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Create object URLs for all base64 images
    const urls: { [key: string]: string } = {};
    
    // Process your images here
    // Example:
    // urls.image1 = createImageUrlFromBase64(base64String1);
    // urls.image2 = createImageUrlFromBase64(base64String2);
    
    setImageUrls(urls);

    // Cleanup function
    return () => {
      Object.values(urls).forEach(url => cleanupImageUrl(url));
    };
  }, []);

  const handleStyleSelect = (style: VideoStyle) => {
    onStyleSelect(style);
    toast({
      title: "Style Selected",
      description: `Selected ${style.name} style`,
    });
    navigate('/music');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onCustomVideoUpload(file);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Choose Your Style</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Your style options rendering here */}
      </div>
      
      <div className="mt-8">
        <input
          type="file"
          accept="video/*"
          onChange={handleFileUpload}
          className="hidden"
          id="video-upload"
        />
        <label htmlFor="video-upload">
          <Button
            variant="outline"
            className="w-full text-white border-purple-500 hover:bg-purple-500/20"
            asChild
          >
            <span>Upload Custom Video</span>
          </Button>
        </label>
      </div>
    </div>
  );
};

export default VideoStyleSelector;