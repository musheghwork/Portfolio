import { useEffect, useRef, useState } from "react";
import { otherSkills } from "../data/skills";
import type { ModeProps } from "../types/pages.types";

export default function OtherSkills({ mode = "night" }: ModeProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const colors = {
    headingGradient:
      mode === "day"
        ? "bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400"
        : "bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500",
    cardShadow:
      mode === "day"
        ? "hover:shadow-2xl hover:shadow-yellow-400/20"
        : "hover:shadow-2xl hover:shadow-white/20",
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 md:px-12"
      id="otherSkills"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            <span
              className={`${colors.headingGradient} bg-clip-text text-transparent`}
            >
              Other Technologies Worked With
            </span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {otherSkills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={skill.name}
                  className={`transition-all duration-700 bg-gradient-to-r ${skill.color} max-w-50 rounded-lg`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`relative flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl ${colors.cardShadow} hover:scale-[1.03] transition-all duration-500`}
                  >
                    {Icon && <Icon className="w-8 h-8 text-white mb-2" />}
                    <span className="text-white text-center font-medium">
                      {skill.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
