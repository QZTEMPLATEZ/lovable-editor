import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import VideoThumbnail from '../VideoThumbnail';

interface VideoGridProps {
  files: File[];
}

const VideoGrid = ({ files }: VideoGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {files.map((file, index) => (
        <Draggable
          key={file.name}
          draggableId={file.name}
          index={index}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <VideoThumbnail
                file={file}
                isSelected={snapshot.isDragging}
              />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default VideoGrid;