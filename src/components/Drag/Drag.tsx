import { useState, useRef, useEffect } from "react";
import { DraggableComponent } from "./Draggable";
import React from "react";

type DragProps = {
  reset: Boolean;
  editMode: Boolean;
  children: React.ReactNode;
};

type Position = {
  x: number;
  y: number;
};

enum Quads {
  quadOne,
  quadTwo,
  quadThree,
  quadFour,
  quadFive,
  quadSix,
}

const STARTING_X = 100;
const STARTING_Y = 100;
const X_OFFSET_ONE = STARTING_X + 320;
const X_OFFSET_TWO = STARTING_X + 640;
const Y_OFFSET_ONE = STARTING_Y + 220;

const sectors = [
  { x: STARTING_X, y: STARTING_Y },
  { x: X_OFFSET_ONE, y: STARTING_Y },
  { x: X_OFFSET_TWO, y: STARTING_Y },
  { x: STARTING_X, y: Y_OFFSET_ONE },
  { x: X_OFFSET_ONE, y: Y_OFFSET_ONE },
  { x: X_OFFSET_TWO, y: Y_OFFSET_ONE },
];

const STARTING_POSITIONS: Position[] = [
  { x: STARTING_X, y: STARTING_Y }, // 0
  { x: STARTING_X + 320, y: STARTING_Y }, // 1
  { x: STARTING_X + 640, y: STARTING_Y }, // 2
  { x: STARTING_X, y: STARTING_Y + 220 }, // 3
  { x: STARTING_X + 320, y: STARTING_Y + 220 }, // 4
  { x: STARTING_X + 640, y: STARTING_Y + 220 }, // 5 ← missing
];

const X_BOUNDARY_ONE = STARTING_X + 160; // halfway col 1 and 2
const X_BOUNDARY_TWO = STARTING_X + 480; // halfway col 2 and 3
const Y_BOUNDARY_ONE = STARTING_Y + 110; // halfway row 1 & 2 (50 + 220/2)

export function Drag({ reset, editMode, children }: DragProps) {
  const [selectedPosition, setSelectedPosition] = useState({ x: 0.0, y: 0.0 });
  const draggingIndex = useRef<number | null>(null);
  const [positions, setPositions] = useState<{ [key: number]: Position }>({});
  const oldIndexRef = useRef<number | null>(null);

  /*
  Returns the slot index
  */
  const handleSetPositions = (quad: Quads, index: number) => {
    const { x, y } = sectors[quad];

    // Find which slot this x,y belongs to
    const slotIndex = findPositionArrayIndex({ x, y });

    setPositions((prev) => ({
      ...prev,
      [index]: { x, y },
    }));

    return slotIndex;
  };

  // Find what area of the screen we are in based off cords
  const getScreenSector = (pos: { x: number; y: number }, index: number) => {
    if (pos.x < X_BOUNDARY_ONE && pos.y < Y_BOUNDARY_ONE) {
      return handleSetPositions(Quads.quadOne, index);
    } else if (
      pos.x >= X_BOUNDARY_ONE &&
      pos.x < X_BOUNDARY_TWO &&
      pos.y < Y_BOUNDARY_ONE
    ) {
      return handleSetPositions(Quads.quadTwo, index);
    } else if (pos.x >= X_BOUNDARY_TWO && pos.y < Y_BOUNDARY_ONE) {
      return handleSetPositions(Quads.quadThree, index);
    } else if (pos.x < X_BOUNDARY_ONE && pos.y >= Y_BOUNDARY_ONE) {
      return handleSetPositions(Quads.quadFour, index);
    } else if (
      pos.x >= X_BOUNDARY_ONE &&
      pos.x < X_BOUNDARY_TWO &&
      pos.y >= Y_BOUNDARY_ONE
    ) {
      return handleSetPositions(Quads.quadFive, index);
    } else if (pos.x >= X_BOUNDARY_TWO && pos.y >= Y_BOUNDARY_ONE) {
      return handleSetPositions(Quads.quadSix, index);
    }
    return undefined;
  };

  // this is used for the snap to logic
  const positionsRef = useRef(positions);
  useEffect(() => {
    positionsRef.current = positions;
  }, [positions]);

  useEffect(() => {
    const initialPositions: { [key: number]: { x: number; y: number } } = {};
    STARTING_POSITIONS.forEach((pos, i) => {
      initialPositions[i] = { x: pos.x, y: pos.y };
    });
    setPositions(initialPositions);
  }, [reset]);

  function findPositionArrayIndex(target: Position): number {
    return STARTING_POSITIONS.findIndex(
      (pos) => pos.x === target.x && pos.y === target.y,
    );
  }

  const handleOnMouseDown = (e: React.MouseEvent, index: number) => {
    draggingIndex.current = editMode ? index : null;

    // compute the current slot index of this element and store that as "old"
    const currentIndex = findPositionArrayIndex(positions[index]);
    oldIndexRef.current = currentIndex; // <-- store slot index (was index before)

    // Setting up the offset between your mouse and the top-left corner of the element
    // getBoundingClientRect() is a built-in JavaScript method that gives you the position and size of a DOM element relative to the viewport.
    const rect = e.currentTarget.getBoundingClientRect();
    setSelectedPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    // Adds a listener to the entire window for when the user pushes mouseDown and mouseUp
    // I tried tying the mouse up and down to the element but ran into issues.
    window.addEventListener("mousemove", handleMouseMove as any);
    window.addEventListener("mouseup", handleOnMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const index = draggingIndex.current;
    if (index === null) return;

    // Track position of box on screen
    let newPosX = e.clientX - selectedPosition.x;
    let newPosY = e.clientY - selectedPosition.y;

    setPositions((prev) => ({
      ...prev,
      [index]: {
        x: newPosX,
        y: newPosY,
      },
    }));
  };

  const swapTiles = (newIndex: number, oldIndex: number) => {
    if (newIndex === oldIndex) return;

    setPositions((prev) => {
      const updated = { ...prev };

      // 1. Where tile A was
      const posA = STARTING_POSITIONS[oldIndex];
      // 2. Where tile B was
      const posB = STARTING_POSITIONS[newIndex];
      // 3. Replace  tile A info with tile B info
      const tileAKey = Object.keys(updated).find(
        (key) =>
          updated[Number(key)].x === posA.x &&
          updated[Number(key)].y === posA.y,
      );

      if (tileAKey !== undefined) {
        updated[Number(tileAKey)] = { ...posB };
      }

      // 4. Replace tile B info with tile A info
      const tileBKey = Object.keys(updated).find(
        (key) =>
          updated[Number(key)].x === posB.x &&
          updated[Number(key)].y === posB.y,
      );

      if (tileBKey !== undefined) {
        updated[Number(tileBKey)] = { ...posA };
      }

      return updated;
    });
  };

  const handleOnMouseUp = () => {
    const index = draggingIndex.current;
    if (index === null) return;

    const pos = positionsRef.current[index];

    // getScreenSector now RETURNS a slot index
    const slotIndex = getScreenSector(pos, index);
    const oldSlot = oldIndexRef.current;

    if (oldSlot !== null && slotIndex !== undefined) {
      swapTiles(slotIndex, oldSlot);
    }

    // Unselect shape
    draggingIndex.current = null;
    // Remove listeners now that element is not clicked
    window.removeEventListener("mousemove", handleMouseMove as any);
    window.removeEventListener("mouseup", handleOnMouseUp);
  };

  return (
    <div>
      {React.Children.map(children, (child, index) => {
        return (
          <DraggableComponent
            key={index}
            position={positions[index] || { x: 200, y: 200 }}
            index={index}
            onMouseDown={handleOnMouseDown}
            editMode={editMode}
          >
            {child}
          </DraggableComponent>
        );
      })}
    </div>
  );
}
