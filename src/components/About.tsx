import { useEffect, useRef, useState } from "react";
import type { ModeProps } from "../types/pages.types";

export default function About({ mode = "night" }: ModeProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState<string[]>(["", "", ""]);

  const textLines = [
    " Hello! I'm a frontend developer who loves turning ideas into interactive web experiences. I enjoy blending design and code to create interfaces that are both beautiful and functional.",
    "My focus is on building fast, responsive, and accessible websites using modern technologies. Every project I work on is an opportunity to push the boundaries of creativity and performance.",
    "Outside of coding, I explore new web technologies, experiment with creative UI effects, and share insights with the developer community to keep learning and growing.",
  ];

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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let currentLine = 0;
    let currentChar = 0;
    const typeNextChar = () => {
      if (
        currentLine >= textLines.length - 1 &&
        currentChar >= textLines[textLines.length - 1].length - 1
      ) {
        return;
      }
      setDisplayedText((prev) => {
        const newText = [...prev];
        newText[currentLine] += textLines[currentLine][currentChar];
        return newText;
      });

      currentChar++;

      if (currentChar < textLines[currentLine].length) {
        setTimeout(typeNextChar, 30);
      } else {
        currentLine++;
        currentChar = 0;
        if (currentLine < textLines.length) {
          setTimeout(typeNextChar, 200);
        }
      }
    };

    typeNextChar();
  }, [isVisible]);

  const colors = {
    headingGradient:
      mode === "day"
        ? "bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400"
        : "bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500",
    text: mode === "day" ? "text-black" : "text-white",
    hoverShadow:
      mode === "day" ? "hover:shadow-black" : "hover:shadow-white/30",
    border: mode === "day" ? "border-black" : "border-white/10",
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            <span
              className={`${colors.headingGradient} bg-clip-text text-transparent`}
            >
              About Me
            </span>
          </h2>

          <div
            className={`relative bg-transparent ${colors.border} border rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-500 ${colors.hoverShadow} hover:backdrop-blur-lg`}
          >
            <div className="absolute inset-0 bg-transparent rounded-3xl" />

            <div className="relative z-10 space-y-6">
              {displayedText.map((line, i) => (
                <p
                  key={i}
                  className={`text-lg md:text-xl leading-relaxed ${colors.text}`}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
