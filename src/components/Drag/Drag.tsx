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
}

export function Drag({ reset, editMode, children }: DragProps) {
  const [selectedPosition, setSelectedPosition] = useState({ x: 0.0, y: 0.0 });
  const draggingIndex = useRef<number | null>(null);
  const [positions, setPositions] = useState<{ [key: number]: Position }>({});

  const w = window.innerWidth;
  const X_BOUNDARY = 0.5 * w;
  const Y_BOUNDARY = 0.3 * w;

  const QUAD_ONE_X = 0.1 * w;
  const QUAD_ONE_Y = 0.1 * w;
  const QUAD_TWO_X = 0.7 * w;
  const QUAD_TWO_Y = 0.15 * w;
  const QUAD_THREE_X = 0.15 * w;
  const QUAD_THREE_Y = 0.5 * w;
  const QUAD_FOUR_X = 0.7 * w;
  const QUAD_FOUR_Y = 0.5 * w;

  const handleSetPositions = (index: number, x: number, y: number) => {
    setPositions((prev) => ({
      ...prev,
      [index]: { x, y },
    }));
  };

  const getScreenSector = (pos: { x: number; y: number }, index: number) => {
    let quadrant: Quads;
    if (pos.x < X_BOUNDARY && pos.y < Y_BOUNDARY) {
      quadrant = Quads.quadOne;
    } else if (pos.x > X_BOUNDARY && pos.y < Y_BOUNDARY) {
      quadrant = Quads.quadTwo;
    } else if (pos.x < X_BOUNDARY && pos.y > Y_BOUNDARY) {
      quadrant = Quads.quadThree;
    } else {
      quadrant = Quads.quadFour;
    }
    selectQuadrant(quadrant, index);
  };

  function selectQuadrant(quad: Quads, index: number) {
    switch (quad) {
      case Quads.quadOne:
        return handleSetPositions(index, QUAD_ONE_X, QUAD_ONE_Y);
      case Quads.quadTwo:
        return handleSetPositions(index, QUAD_TWO_X, QUAD_TWO_Y);
      case Quads.quadThree:
        return handleSetPositions(index, QUAD_THREE_X, QUAD_THREE_Y);
      case Quads.quadFour:
        return handleSetPositions(index, QUAD_FOUR_X, QUAD_FOUR_Y);
    }
  }

  // this is used for the snap to logic
  const positionsRef = useRef(positions);
  useEffect(() => {
    positionsRef.current = positions;
  }, [positions]);

  useEffect(() => {
    setPositions(Object.keys(positions).map(() => ({ x: 0.0, y: 0.0 })));
    draggingIndex.current = null;
  }, [reset]);

  //TODO: I think I can make it so this uses an id/ref from the components themselves instead of passing it like I am below
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
          >
            {child}
          </DraggableComponent>
        );
      })}
    </div>
  );
}
