import { render, screen, fireEvent } from '@testing-library/react';
import VideoStyleSelector from './VideoStyleSelector';
import { VIDEO_STYLES } from '../../constants/videoStyles';
import { VideoStyle } from '@/types/video';

describe('VideoStyleSelector', () => {
  const mockOnSelect = jest.fn();
  const mockOnCustomVideoUpload = jest.fn();
  
  beforeEach(() => {
    mockOnSelect.mockClear();
    mockOnCustomVideoUpload.mockClear();
  });

  it('renders all video styles', () => {
    render(
      <VideoStyleSelector 
        selectedStyle={null} 
        onStyleSelect={mockOnSelect}
        onCustomVideoUpload={mockOnCustomVideoUpload}
      />
    );
    
    VIDEO_STYLES.forEach(style => {
      expect(screen.getByText(style.title)).toBeInTheDocument();
    });
  });

  it('calls onSelect when a style is clicked', () => {
    render(
      <VideoStyleSelector 
        selectedStyle={null} 
        onStyleSelect={mockOnSelect}
        onCustomVideoUpload={mockOnCustomVideoUpload}
      />
    );
    
    const firstStyle = VIDEO_STYLES[0];
    fireEvent.click(screen.getByText(firstStyle.title));
    
    const expectedVideoStyle: VideoStyle = {
      id: firstStyle.id,
      name: firstStyle.title,
      description: firstStyle.description,
      thumbnail: firstStyle.previewVideo,
      videoUrl: firstStyle.previewVideo
    };
    
    expect(mockOnSelect).toHaveBeenCalledWith(expectedVideoStyle);
  });

  it('highlights selected style', () => {
    const selectedStyle: VideoStyle = {
      id: VIDEO_STYLES[0].id,
      name: VIDEO_STYLES[0].title,
      description: VIDEO_STYLES[0].description,
      thumbnail: VIDEO_STYLES[0].previewVideo,
      videoUrl: VIDEO_STYLES[0].previewVideo
    };

    render(
      <VideoStyleSelector 
        selectedStyle={selectedStyle} 
        onStyleSelect={mockOnSelect}
        onCustomVideoUpload={mockOnCustomVideoUpload}
      />
    );
    
    const selectedElement = screen.getByText(selectedStyle.name).closest('div');
    expect(selectedElement).toHaveClass('border-purple-500');
  });
});