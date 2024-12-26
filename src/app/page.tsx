"use client";
import Canvas from "@/components/Canvas";
import Sidebar from "@/components/Sidebar";
import Toolbar from "@/components/Toolbar";
import { store } from "@/redux/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <main className="container flex">
          <aside>
            <Sidebar />
          </aside>
          <div className="p-6 w-full">
            <Canvas />
          </div>
          <div>
            <Toolbar />
          </div>
        </main>
      </DndProvider>
    </Provider>
  );
}
