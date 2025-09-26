import React from "react";
type DraggableProps = {
  position: { x: number; y: number };
  index: number;
  onMouseDown: (e: React.MouseEvent, index: number) => void;
  children: React.ReactNode;
  editMode: Boolean;
  isDragging: boolean;
};

export const DraggableComponent = React.memo(
  ({
    position,
    index,
    onMouseDown,
    children,
    editMode,
    isDragging,
  }: DraggableProps) => {
    return (
      <div
        onMouseDown={(e) => onMouseDown(e, index)}
        style={{
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: editMode ? "grab" : "default", // "mousepointer" is invalid
          zIndex: isDragging ? 9999 : 1,
        }}
      >
        {children}
      </div>
    );
  }
);
