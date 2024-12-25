"use client";

import { useDrop } from "react-dnd";
import { useState, forwardRef } from "react";
import { ReactNode } from "react";

interface DroppedComponent {
  id: string;
  element: ReactNode;
  position: { x: number; y: number };
}

const Canvas = forwardRef<HTMLDivElement, {}>((props, ref) => {
  const [droppedComponents, setDroppedComponents] = useState<DroppedComponent[]>([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "component",
    drop: (item: DroppedComponent, monitor) => {
      const clientOffset = monitor.getClientOffset();
      if (clientOffset) {
        const newComponent = {
          ...item,
          position: { x: clientOffset.x, y: clientOffset.y },
        };
        setDroppedComponents((prev) => [...prev, newComponent]);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={(node) => {
        drop(node); // Pass the node to `drop`
        if (ref && typeof ref === "function") ref(node); // Handle callback ref
        else if (ref && typeof ref === "object" && ref !== null) ref.current = node; // Handle object ref
      }}
      className={`h-full w-full border border-slate-600 p-4 ${isOver ? "bg-gray-100" : "bg-gray-200"}`}
    >
      {droppedComponents.map((comp, index) => (
        <div
          key={`${comp.id}-${index}`}
          style={{
            position: "absolute",
            left: comp.position.x,
            top: comp.position.y,
          }}
        >
          {comp.element}
        </div>
      ))}
      {!droppedComponents.length && <p className="text-slate-500">Drop components here</p>}
    </div>
  );
});

Canvas.displayName = "Canvas"; // For better debugging in React DevTools

export default Canvas;
