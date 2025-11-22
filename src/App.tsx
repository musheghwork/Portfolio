import { useState } from "react";

import "./App.css";
import SpaceBackground from "./components/background";

function App() {
  const [isDay, setIsDay] = useState(true);
  console.log(isDay);
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-black ">
      <SpaceBackground mode={isDay ? "day" : "night"} />
      <div className="absolute top-15 left-20 flex gap-2">
        <button
          className={`px-4 py-2 ${
            isDay ? "bg-yellow-400 text-black" : "bg-white text-black"
          }`}
          onClick={() => setIsDay(true)}
        >
          Day
        </button>
        <button
          className={`px-4 py-2 ${
            !isDay ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
          onClick={() => setIsDay(false)}
        >
          Night
        </button>
      </div>
    </div>
  );
}

export default App;
