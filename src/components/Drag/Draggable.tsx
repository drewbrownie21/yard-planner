type DragableProps = {
  position: { x: number; y: number };
  index: number;
  onMouseDown: (e: React.MouseEvent, index: number) => void;
  children: React.ReactNode;
};
export function DraggableComponent({
  position,
  index,
  onMouseDown,
  children,
}: DragableProps) {
  return (
    <div
      onMouseDown={(e) => onMouseDown(e, index)}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: "grab",
      }}
    >
      {children}
    </div>
  );
}
