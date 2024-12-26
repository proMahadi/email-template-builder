// "use client";

// import { useDrop } from "react-dnd";
// import { useState, forwardRef } from "react";
// import { ReactNode } from "react";
// import { Section } from "@react-email/components";

// interface DroppedComponent {
//   id: string;
//   element: ReactNode;
//   // position: { x: number; y: number };
// }

// const Canvas = forwardRef<HTMLDivElement, {}>((props, ref) => {
//   const [droppedComponents, setDroppedComponents] = useState<
//     DroppedComponent[]
//   >([]);

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: "component",
//     drop: (item: DroppedComponent, monitor) => {
//       // const clientOffset = monitor.getClientOffset();
//       // if (clientOffset) {
//       //   const newComponent = {
//       //     ...item,
//       //     // position: { x: clientOffset.x, y: clientOffset.y },
//       //   };
//       setDroppedComponents((prev) => [
//         ...prev,
//         item,
//         //  newComponent
//       ]);
//       // }
//     },
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//     }),
//   }));

//   return (
//     <div
//       ref={(node) => {
//         drop(node); // Pass the node to `drop`
//         if (ref && typeof ref === "function")
//           ref(node); // Handle callback ref
//         else if (ref && typeof ref === "object" && ref !== null)
//           ref.current = node; // Handle object ref
//       }}
//       className={`h-full w-full border border-slate-600 p-4 ${isOver ? "bg-gray-100" : "bg-gray-200"}`}
//     >
//       {droppedComponents.map((comp, index) => (
//         // <div
//         //   key={`${comp.id}-${index}`}
//         // >
//         //   {comp.element}
//         // </div>
//         <Section key={`${comp.id}-${index}`}>{comp.element}</Section>
//       ))}
//       {!droppedComponents.length && (
//         <p className="text-slate-500">Drop components here</p>
//       )}
//     </div>
//   );
// });

// Canvas.displayName = "Canvas"; // For better debugging in React DevTools

// export default Canvas;

"use client"
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { selectComponent, addComponent, DroppedComponent } from "@/redux/app/component/componentSlice";
import { ReactNode } from "react";
import { Section } from "@react-email/components";

const Canvas = () => {
  const dispatch = useDispatch();
  const droppedComponents = useSelector(
    (state: any) => state.components.droppedComponents
  );
  const selectedComponentId = useSelector(
    (state: any) => state.components.selectedComponentId
  );

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "component",
    drop: (item: { id: string; element: ReactNode }) => {
      dispatch(addComponent(item)); // Dispatch action to add component to the canvas
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleSelectComponent = (id: string) => {
    dispatch(selectComponent(id)); // Dispatch action to select component
  };

  return (
    <div
    ref={(node) => {
      drop(node); // Pass the node to `drop`
    }}
    className={`h-full w-full border border-slate-600 p-4 ${
      isOver ? "bg-gray-100" : "bg-gray-200"
    }`}
    >
{droppedComponents.map((comp: DroppedComponent, index: number) => (
  <Section
    key={`${comp.id}-${index}`}
    onClick={() => handleSelectComponent(comp.id)}
    className={`${
      selectedComponentId === comp.id ? "border-2 border-blue-500" : ""
    }`}
  >
    {comp.element}
  </Section>
))}

      {!droppedComponents.length && (
        <p className="text-slate-500">Drop components here</p>
      )}
    </div>
  );
};

export default Canvas;
