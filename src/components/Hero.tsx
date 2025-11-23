import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ModeProps } from "../types/pages.types";

export default function Hero({ mode = "night" }: ModeProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const colors = {
    subtitle: mode === "day" ? "text-blue-600" : "text-cyan-400",
    description: mode === "day" ? "text-gray-800" : "text-purple-300",
    buttonFrom: mode === "day" ? "from-yellow-400" : "from-cyan-500",
    buttonTo: mode === "day" ? "to-orange-500" : "to-purple-600",
    chevron: mode === "day" ? "text-red-600" : "text-cyan-400",
    headingGradient:
      mode === "day"
        ? "bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400"
        : "bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500",
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 overflow-hidden">
      <div className="relative z-10 text-center max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-6xl mx-auto px-4 -translate-y-70">
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-6 sm:mb-8 inline-block">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto">
              <div
                className={`absolute inset-0 rounded-full blur-2xl opacity-50 animate-pulse ${
                  mode === "day"
                    ? "bg-gradient-to-br from-yellow-300 to-orange-400"
                    : "bg-gradient-to-br from-cyan-500 to-purple-600"
                }`}
              />
              <div className="flex items-center justify-center min-h-screen">
                <div className="flex items-center justify-center min-h-screen">
                  <div
                    className={`
                      relative w-40 h-40 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full 
                      flex items-center justify-center 
                      text-3xl sm:text-5xl md:text-7xl font-bold 
                      shadow-2xl ring-4 ring-white/20
                      overflow-hidden
                      transition-all duration-700 ease-in-out
                      bg-[length:200%_200%]
                      ${
                        mode === "day"
                          ? "bg-gradient-to-br from-yellow-200 via-yellow-300 to-orange-400 animate-gradient-x"
                          : "bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 animate-gradient-x"
                      } 
                    `}
                  >
                    <img
                      src="myImg.jpg"
                      alt="Avatar"
                      className="w-full h-full object-cover rounded-full shadow-inner"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h1
            className={`text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 lg:mb-8 bg-clip-text text-transparent leading-tight ${colors.headingGradient}`}
          >
            Hi, I'm Mushegh
          </h1>

          <p
            className={`text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4 ${colors.subtitle}`}
          >
            Frontend Developer
          </p>

          <p
            className={`text-base sm:text-lg md:text-xl max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed ${colors.description}`}
          >
            Crafting beautiful, interactive web experiences with modern
            technologies
          </p>

          <button
            onClick={scrollToAbout}
            className={`group relative rounded-full text-white font-semibold text-base sm:text-lg md:text-xl overflow-hidden transition-all duration-300 
            hover:scale-105
            ${
              mode === "night"
                ? "hover:shadow-2xl hover:shadow-cyan-500/50"
                : "hover:shadow-2xl hover:shadow-yellow-400/50"
            }
            bg-gradient-to-r ${colors.buttonFrom} ${colors.buttonTo} 
            py-2 sm:py-4 md:py-6
            px-4 sm:px-8 md:px-12
            text-center`}
          >
            <span className="relative z-10">{`Explore My Work`}</span>
            <div
              className={`absolute inset-0 transition-all duration-300 ${
                mode === "night"
                  ? "bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100"
                  : "bg-gradient-to-r from-red-600 to-orange-500 opacity-0 group-hover:opacity-100"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className={`w-6 sm:w-8 h-6 sm:h-8 ${colors.chevron}`} />
      </div>
    </section>
  );
}
