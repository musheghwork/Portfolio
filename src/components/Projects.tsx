import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "../data/projects";
import type { ModeProps } from "../types/pages.types";

export default function Projects({ mode = "night" }: ModeProps) {
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
      { threshold: 0.1 }
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
    text: mode == "day" ? "text-black" : "text-white",
    headingGradient:
      mode === "day"
        ? "bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400"
        : "bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500",
  };

  return (
    <section ref={sectionRef} className="relative py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            <span
              className={`${colors.headingGradient} bg-clip-text text-transparent`}
            >
              Featured Projects
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className={`group transition-all duration-700 delay-${
                  index * 150
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 hover:scale-[1.02]">
                  <div className="relative h-64 overflow-hidden">
                    <div
                      className={`absolute inset-0  ${colors.headingGradient} opacity-20`}
                    />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60" />
                  </div>

                  <div className="p-6">
                    <h3
                      className={`text-2xl font-bold mb-3 ${colors.headingGradient} bg-clip-text text-transparent`}
                    >
                      {project.title}
                    </h3>
                    <p className={`${colors.text} mb-4 leading-relaxed`}>
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`${colors.text} px-3 py-1 text-sm bg-white/10 border border-white/20 rounded-full`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <button
                        className={`${colors.headingGradient} ${colors.text} flex items-center gap-2 px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-cyan-500/50`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Live
                      </button>
                      <button
                        className={`${colors.text} flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300`}
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </button>
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-bl-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
