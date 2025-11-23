import { useState } from "react";
import "./App.css";
import SpaceBackground from "./components/background";
import Hero from "./components/Hero";
import ModeSwitcher from "./components/ModeSwitcher";
import About from "./components/About";
import Skills from "./components/Skills";

function App() {
  const [mode, setMode] = useState<"day" | "night">("day");

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <SpaceBackground mode={mode} />
      <Hero mode={mode} />
      <ModeSwitcher mode={mode} setMode={setMode} />
      <About mode={mode} />
      <Skills mode={mode} />
    </div>
  );
}

export default App;
