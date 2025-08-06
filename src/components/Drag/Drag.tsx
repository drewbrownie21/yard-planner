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

export function Drag({ reset, editMode, children }: DragProps) {
  const [selectedPosition, setSelectedPosition] = useState({ x: 0.0, y: 0.0 });
  const draggingIndex = useRef<number | null>(null);
  const [positions, setPositions] = useState<{ [key: number]: Position }>({});

  const STARTING_X = 100;
  const STARTING_Y = 100;

  const STARTING_POSITIONS = [
    { x: STARTING_X, y: STARTING_Y }, // 0
    { x: STARTING_X + 320, y: STARTING_Y }, // 1
    { x: STARTING_X + 640, y: STARTING_Y }, // 2
    { x: STARTING_X, y: STARTING_Y + 220 }, // 3
    { x: STARTING_X + 320, y: STARTING_Y + 220 }, // 4
    { x: STARTING_X + 640, y: STARTING_Y + 220 }, // 5 ← missing
  ];

  const handleSetPositions = (
    index: number,
    x: number,
    y: number,
    spotIndex: number,
  ) => {
    setPositions((prev) => ({
      ...prev,
      [index]: { x, y },
    }));
    console.log("Spot index: " + spotIndex);
    console.log("Index: " + index);
    console.log(index);
  };

  function selectQuadrant(quad: Quads, index: number) {
    switch (quad) {
      case Quads.quadOne:
        return handleSetPositions(index, STARTING_X, STARTING_Y, 0);
      case Quads.quadTwo:
        return handleSetPositions(index, STARTING_X + 320, STARTING_Y, 1);
      case Quads.quadThree:
        return handleSetPositions(index, STARTING_X + 640, STARTING_Y, 2);
      case Quads.quadFour:
        return handleSetPositions(index, STARTING_X, STARTING_Y + 220, 3);
      case Quads.quadFive:
        return handleSetPositions(index, STARTING_X + 320, STARTING_Y + 220, 4);
      case Quads.quadSix:
        return handleSetPositions(index, STARTING_X + 640, STARTING_Y + 220, 5);
    }
  }

  const X_BOUNDARY_ONE = STARTING_X + 160; // halfway col 1 and 2
  const X_BOUNDARY_TWO = STARTING_X + 480; // halfway col 2 and 3
  const Y_BOUNDARY_ONE = STARTING_Y + 110; // halfway row 1 & 2 (50 + 220/2)
  const Y_BOUNDARY_TWO = STARTING_Y + 330; // halfway row 2 & 3 (50 + 220 + 220/2)

  const getScreenSector = (pos: { x: number; y: number }, index: number) => {
    if (pos.x < X_BOUNDARY_ONE && pos.y < Y_BOUNDARY_ONE) {
      return selectQuadrant(Quads.quadOne, index);
    } else if (
      pos.x >= X_BOUNDARY_ONE &&
      pos.x < X_BOUNDARY_TWO &&
      pos.y < Y_BOUNDARY_ONE
    ) {
      return selectQuadrant(Quads.quadTwo, index);
    } else if (pos.x >= X_BOUNDARY_TWO && pos.y < Y_BOUNDARY_ONE) {
      return selectQuadrant(Quads.quadThree, index);
    } else if (pos.x < X_BOUNDARY_ONE && pos.y >= Y_BOUNDARY_ONE) {
      return selectQuadrant(Quads.quadFour, index);
    } else if (
      pos.x >= X_BOUNDARY_ONE &&
      pos.x < X_BOUNDARY_TWO &&
      pos.y >= Y_BOUNDARY_ONE
    ) {
      return selectQuadrant(Quads.quadFive, index);
    } else if (pos.x >= X_BOUNDARY_TWO && pos.y >= Y_BOUNDARY_ONE) {
      return selectQuadrant(Quads.quadSix, index);
    }
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

  const handleOnMouseDown = (e: React.MouseEvent, index: number) => {
    // Need to set the ref to true here when the user clicks the element
    draggingIndex.current = editMode ? index : null;

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

  const handleOnMouseUp = () => {
    const index = draggingIndex.current;
    if (index === null) return;

    const pos = positionsRef.current[index];

    getScreenSector(pos, index);

    // Unselect shape, otherwise you can't let go
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
