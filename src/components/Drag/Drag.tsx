import { useState, useRef, useEffect } from "react";
import { DraggableComponent } from "./Draggable";
import React from "react";

type DragProps = {
  reset: Boolean;
  editMode: Boolean;
  children: React.ReactNode;
};

type Position = { x: number; y: number };

const STARTING_X = 100;
const STARTING_Y = 100;

const STARTING_POSITIONS: Position[] = [
  { x: STARTING_X, y: STARTING_Y }, // slot 0
  { x: STARTING_X + 320, y: STARTING_Y }, // slot 1
  { x: STARTING_X + 640, y: STARTING_Y }, // slot 2
  { x: STARTING_X, y: STARTING_Y + 220 }, // slot 3
  { x: STARTING_X + 320, y: STARTING_Y + 220 }, // slot 4
  { x: STARTING_X + 640, y: STARTING_Y + 220 }, // slot 5
];

const X_BOUNDARY_ONE = STARTING_X + 160;
const X_BOUNDARY_TWO = STARTING_X + 480;
const Y_BOUNDARY_ONE = STARTING_Y + 110;

export function Drag({ reset, editMode, children }: DragProps) {
  const [positions, setPositions] = useState<{ [tileIndex: number]: Position }>({});
  const [slots, setSlots] = useState<{ [tileIndex: number]: number }>({}); // maps tile → slot index
  const positionsRef = useRef(positions);
  const slotsRef = useRef(slots);
  const selectedOffset = useRef({ x: 0, y: 0 });
  const draggingIndex = useRef<number | null>(null);

  useEffect(() => {
    positionsRef.current = positions;
    slotsRef.current = slots;
  }, [positions, slots]);

  // Reset positions & slot mapping
  useEffect(() => {
    const initialPositions: { [key: number]: Position } = {};
    const initialSlots: { [key: number]: number } = {};
    STARTING_POSITIONS.forEach((pos, i) => {
      initialPositions[i] = { ...pos };
      initialSlots[i] = i;
    });
    setPositions(initialPositions);
    setSlots(initialSlots);
  }, [reset]);

  const getSectorIndexFromPos = (pos: Position) => {
    if (pos.x < X_BOUNDARY_ONE && pos.y < Y_BOUNDARY_ONE) return 0;
    if (pos.x >= X_BOUNDARY_ONE && pos.x < X_BOUNDARY_TWO && pos.y < Y_BOUNDARY_ONE) return 1;
    if (pos.x >= X_BOUNDARY_TWO && pos.y < Y_BOUNDARY_ONE) return 2;
    if (pos.x < X_BOUNDARY_ONE && pos.y >= Y_BOUNDARY_ONE) return 3;
    if (pos.x >= X_BOUNDARY_ONE && pos.x < X_BOUNDARY_TWO && pos.y >= Y_BOUNDARY_ONE) return 4;
    if (pos.x >= X_BOUNDARY_TWO && pos.y >= Y_BOUNDARY_ONE) return 5;
    return 0;
  };

  const handleOnMouseDown = (e: React.MouseEvent, index: number) => {
    if (!editMode) return;
    draggingIndex.current = index;

    const rect = e.currentTarget.getBoundingClientRect();
    selectedOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

    window.addEventListener("mousemove", handleMouseMove as any);
    window.addEventListener("mouseup", handleOnMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const index = draggingIndex.current;
    if (index === null) return;

    let newPosX = e.clientX - selectedOffset.current.x;
    let newPosY = e.clientY - selectedOffset.current.y;

    setPositions((prev) => ({
      ...prev,
      [index]: { x: newPosX, y: newPosY },
    }));
  };

  const handleOnMouseUp = () => {
    const draggedTile = draggingIndex.current;
    if (draggedTile === null) return;

    const draggedPos = positionsRef.current[draggedTile];
    const targetSlot = getSectorIndexFromPos(draggedPos);

    setPositions((prev) => {
      const updated = { ...prev };
      const updatedSlots = { ...slotsRef.current };

      // Tile currently occupying the target slot
      const occupyingTile = Object.keys(updatedSlots).find(
        (tile) => updatedSlots[Number(tile)] === targetSlot
      );

      // Move dragged tile into target slot
      updated[draggedTile] = { ...STARTING_POSITIONS[targetSlot] };
      updatedSlots[draggedTile] = targetSlot;

      // If there’s a tile there, move it to the dragged tile's old slot
      if (occupyingTile !== undefined) {
        const oldSlot = slotsRef.current[draggedTile];
        updated[Number(occupyingTile)] = { ...STARTING_POSITIONS[oldSlot] };
        updatedSlots[Number(occupyingTile)] = oldSlot;
      }

      setSlots(updatedSlots);
      return updated;
    });

    draggingIndex.current = null;
    window.removeEventListener("mousemove", handleMouseMove as any);
    window.removeEventListener("mouseup", handleOnMouseUp);
  };

  return (
    <div>
      {React.Children.map(children, (child, index) => (
        <DraggableComponent
          key={index}
          position={positions[index] || { x: 200, y: 200 }}
          index={index}
          onMouseDown={handleOnMouseDown}
          editMode={editMode}
        >
          {child}
        </DraggableComponent>
      ))}
    </div>
  );
}
