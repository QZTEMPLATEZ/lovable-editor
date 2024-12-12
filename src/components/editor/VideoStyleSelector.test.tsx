import { render, screen, fireEvent } from '@testing-library/react';
import VideoStyleSelector from './VideoStyleSelector';
import { VIDEO_STYLES } from '../../constants/videoStyles';

describe('VideoStyleSelector', () => {
  const mockOnSelect = jest.fn();
  
  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it('renders all video styles', () => {
    render(<VideoStyleSelector selectedStyle={null} onStyleSelect={mockOnSelect} />);
    
    VIDEO_STYLES.forEach(style => {
      expect(screen.getByText(style.name)).toBeInTheDocument();
    });
  });

  it('calls onSelect when a style is clicked', () => {
    render(<VideoStyleSelector selectedStyle={null} onStyleSelect={mockOnSelect} />);
    
    const firstStyle = VIDEO_STYLES[0];
    fireEvent.click(screen.getByText(firstStyle.name));
    
    expect(mockOnSelect).toHaveBeenCalledWith(firstStyle);
  });

  it('highlights selected style', () => {
    const selectedStyle = VIDEO_STYLES[0];
    render(<VideoStyleSelector selectedStyle={selectedStyle} onStyleSelect={mockOnSelect} />);
    
    const selectedElement = screen.getByText(selectedStyle.name).closest('div');
    expect(selectedElement).toHaveClass('border-purple-500');
  });
});