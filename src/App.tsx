import { useState } from "react";
import "./App.css";
import SpaceBackground from "./components/background";
import Hero from "./components/Hero";
import ModeSwitcher from "./components/ModeSwitcher";
import About from "./components/About";
import Skills from "./components/Skills";
import OtherSkills from "./components/OtherSkills";
import Projects from "./components/Projects";

function App() {
  const [mode, setMode] = useState<"day" | "night">("day");
  const [showOtherSkils, setShowOtherSkils] = useState(false);

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <SpaceBackground mode={mode} />
      <Hero mode={mode} />
      <ModeSwitcher mode={mode} setMode={setMode} />
      <About mode={mode} />
      <Skills mode={mode} setShowOtherSkils={setShowOtherSkils} />
      {showOtherSkils && <OtherSkills mode={mode} />}
      <Projects />
    </div>
  );
}

export default App;
