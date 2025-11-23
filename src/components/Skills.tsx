import { useEffect, useRef, useState } from "react";
import { skills } from "../data/skills";
interface Skills {
  mode?: "day" | "night";
}

export default function Skills({ mode = "night" }: Skills) {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const colors = {
    headingGradient:
      mode === "day"
        ? "bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400"
        : "bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500",
  };

  return (
    <section ref={sectionRef} className="relative py-24 px-6 md:px-12">
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
              Skills & Expertise
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={skill.name}
                  className={`transition-all duration-700 delay-${index * 100}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-[1.03]">
                    <div className="flex items-center mb-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${skill.color} mr-4`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {skill.name}
                        </h3>
                        <span className="text-gray-400 text-sm">
                          {skill.level}%
                        </span>
                      </div>
                    </div>

                    <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{
                          width: isVisible ? `${skill.level}%` : "0%",
                        }}
                      >
                        <div className="absolute inset-0 bg-white/30 animate-pulse" />
                      </div>
                    </div>
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
