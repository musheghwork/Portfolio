import { useState } from "react";
import "./App.css";
import SpaceBackground from "./components/background";
import Hero from "./components/Hero";
import ModeSwitcher from "./components/ModeSwitcher";
import About from "./components/About";
import Skills from "./components/Skills";
import OtherSkills from "./components/OtherSkills";
import Projects from "./components/Projects";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";

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
      <Projects mode={mode} />
      <Contacts mode={mode} />
      <Footer />
    </div>
  );
}

export default App;
