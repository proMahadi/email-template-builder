

// const Toolbar = () => {
//   return (
//     <div className="h-screen w-[300px] bg-black p-6">
//       <input type="text" placeholder="edit text" className="w-full p-2 capitalize"/>
//     </div>
//   )
// }

// export default Toolbar

"use client"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DroppedComponent, updateComponentText } from "@/redux/app/component/componentSlice";

const Toolbar = () => {
  const dispatch = useDispatch();
  const selectedComponentId = useSelector(
    (state: any) => state.components.selectedComponentId
  );
  const droppedComponents = useSelector(
    (state: any) => state.components.droppedComponents
  );

  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (selectedComponentId) {
      const selectedComponent = droppedComponents.find(
        (comp: DroppedComponent) => comp.id === selectedComponentId
      );
      if (selectedComponent && selectedComponent.element.type === "Text") {
        setInputText(selectedComponent.element.props.children); // Set the input text if it is a "Text" component
      }
    }
  }, [selectedComponentId, droppedComponents]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    // Dispatch the action to update the selected component's text
    if (selectedComponentId) {
      dispatch(updateComponentText({ id: selectedComponentId, text: e.target.value }));
    }
  };
  

  return (
    <div className="h-screen w-[300px] bg-black p-6">
      {selectedComponentId ? (
        <>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Edit text"
            className="w-full p-2 capitalize"
          />
        </>
      ) : (
        <p className="text-slate-500">Select a component to edit</p>
      )}
    </div>
  );
};

export default Toolbar;
