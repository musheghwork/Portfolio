import { useState, useRef, useEffect } from "react";
import { socialLinks } from "../data/contacs";
import type { ModeProps } from "../types/pages.types";

export default function Contacts({ mode = "night" }: ModeProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const headingGradientDay =
    "bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400";
  const headingGradientNight =
    "bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500";

  const colors = {
    text: mode === "day" ? "text-gray-900" : "text-gray-200",
    border: mode === "day" ? "border-gray-900" : "border-white/50",
    tooltipBg:
      mode === "day" ? "bg-gray-800 text-white" : "bg-black text-white",
    headingGradient: mode === "day" ? headingGradientDay : headingGradientNight,
  };

  return (
    <section ref={sectionRef} className="relative py-24 px-6 md:px-12">
      <div
        className={`transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <div className="flex flex-col items-center p-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            <span
              className={`${colors.headingGradient} bg-clip-text text-transparent`}
            >
              Contact
            </span>
          </h2>

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:flex-wrap sm:justify-center">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              const isHovered = hoveredIndex === index;

              return (
                <div
                  key={social.label}
                  className="relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <span
                    className={`absolute -top-6 left-1/2 -translate-x-1/2
                  ${colors.tooltipBg} text-xs px-2 py-1 rounded
                  pointer-events-none transition-all duration-300
                  ${
                    isHovered && copiedIndex !== index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2"
                  }
                `}
                  >
                    {social.tooltip}
                  </span>

                  <span
                    className={`absolute -top-6 left-1/2 -translate-x-1/2
                  bg-green-500 text-white text-xs px-2 py-1 rounded
                  pointer-events-none transition-all duration-300
                  ${
                    copiedIndex === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2"
                  }
                `}
                  >
                    Copied!
                  </span>

                  <button
                    onClick={() => handleCopy(social.value, index)}
                    className={`
                  relative flex items-center
                  p-4 rounded-full border ${colors.border} 
                  transition-all duration-300

                  ${
                    isHovered
                      ? `bg-gradient-to-br ${social.gradient} scale-110 shadow-lg`
                      : "bg-transparent"
                  }
                `}
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full">
                      <Icon
                        className={`w-6 h-6 transition-colors duration-300 ${
                          isHovered ? "text-white" : colors.text
                        }`}
                      />
                    </div>

                    <div
                      className={`
                    overflow-hidden transition-[max-width] duration-500 ease-in-out
                    ${isHovered ? "max-w-xs ml-4" : "max-w-0 ml-0"}
                  `}
                    >
                      <span
                        className={`
                      ${colors.text} font-medium select-all whitespace-nowrap
                      ${
                        isHovered ? "text-white" : colors.text
                      } // Динамический цвет текста
                    `}
                      >
                        {social.value}
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
