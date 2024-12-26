"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React, { ReactNode, ReactElement } from "react";

// Define the interface for the dropped component
export interface DroppedComponent {
  id: string;
  element: ReactNode;  // element can be any ReactNode (string, ReactElement, etc.)
}

interface ComponentState {
  droppedComponents: DroppedComponent[];
  selectedComponentId: string | null;
}

// Define the initial state of the component slice
const initialState: ComponentState = {
  droppedComponents: [],
  selectedComponentId: null,
};

// Create the component slice using Redux Toolkit
const componentSlice = createSlice({
  name: "components",
  initialState,
  reducers: {
    // Action to add a component to the droppedComponents array
    addComponent: (state, action: PayloadAction<DroppedComponent>) => {
      state.droppedComponents.push(action.payload);
    },

    // Action to select a component by id
    selectComponent: (state, action: PayloadAction<string | null>) => {
      state.selectedComponentId = action.payload;
    },

    // Action to update the text of a component
    updateComponentText: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const component = state.droppedComponents.find(
        (comp) => comp.id === action.payload.id
      );

      if (component && React.isValidElement(component.element)) {
        // Safely check if it's a ReactElement and its type is "Text"
        const reactElement = component.element as ReactElement;
        // if (reactElement.type === "Text") {
        //   // Modify the element's children (text) if it's a "Text" component
        //   component.element = React.cloneElement(reactElement, {
        //     children: action.payload.text,
        //   });
        // }
      }
    },
  },
});

// Export the actions for use in other parts of the application
export const { addComponent, selectComponent, updateComponentText } = componentSlice.actions;

// Export the reducer to be used in the Redux store
export default componentSlice.reducer;
