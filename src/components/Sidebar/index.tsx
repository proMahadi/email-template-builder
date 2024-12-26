"use client";

import { cn } from "@/lib/utils";
import { Text, Img, Button,Section } from "@react-email/components";
import { forwardRef, ReactNode } from "react";
import { useDrag } from "react-dnd";

export interface ComponentListType {
  id: string;
  name: string;
  component: ReactNode;
}

const componentsList: ComponentListType[] = [
  { id: "text", name: "Text", component: <Text>Sample Text</Text> },
  { id: "button", name: "Button", component: <Button>Click Me</Button> },
  { id: "image", name: "Image", component: <Img src="" alt="Placeholder Image" /> },
  // { id: "section", name: "section", component: <Section className={cn("p-6 bg-white h-[400px] w-[200px]")}></Section> },
];

interface DraggableComponentProps {
  id: string;
  name: string;
  element: ReactNode;
}

const DraggableComponent = forwardRef<HTMLLIElement, DraggableComponentProps>(({ id, name, element }, ref) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "component",
      item: { id, element },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));
  
    return (
      <li
        ref={(node) => {
          drag(node); // Pass the node to `drag`
          if (ref && typeof ref === "function") ref(node); // Handle callback ref
          else if (ref && typeof ref === "object" && ref !== null) ref.current = node; // Handle object ref
        }}
        className={`text-slate-300 hover:bg-slate-600/40 hover:text-white py-2 px-3 capitalize rounded-lg duration-200 cursor-grab ${
          isDragging ? "opacity-50" : ""
        }`}
      >
        {name}
      </li>
    );
  });

const Sidebar: React.FC = () => {
  return (
    <div className="w-[250px] h-screen bg-black p-6">
      <h2 className="capitalize text-white text-3xl font-bold">Build Emails</h2>
      <div className="mt-10">
        <h4 className="text-slate-500 capitalize font-semibold text-xl ml-3">Components</h4>
        <ul className="mt-7 flex flex-col gap-2">
          {componentsList.map((component) => (
            <DraggableComponent
              key={component.id}
              id={component.id}
              name={component.name}
              element={component.component}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
