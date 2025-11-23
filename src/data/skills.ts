import {
  FaReact,
  FaVuejs,
  FaHtml5,
  FaCss3Alt,
  FaDatabase,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTailwindcss,
  SiTypescript,
  SiGit,
} from "react-icons/si";
import { GiSmartphone } from "react-icons/gi";

export const skills = [
  {
    name: "React",
    level: 95,
    icon: FaReact,
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Vue.js",
    level: 90,
    icon: FaVuejs,
    color: "from-green-500 to-teal-500",
  },
  {
    name: "HTML",
    level: 100,
    icon: FaHtml5,
    color: "from-orange-500 to-red-500",
  },
  {
    name: "CSS3",
    level: 100,
    icon: FaCss3Alt,
    color: "from-blue-400 to-blue-600",
  },
  {
    name: "JavaScript",
    level: 95,
    icon: SiJavascript,
    color: "from-yellow-500 to-orange-500",
  },

  {
    name: "TypeScript",
    level: 88,
    icon: SiTypescript,
    color: "from-indigo-500 to-purple-500",
  },
  {
    name: "Tailwind",
    level: 90,
    icon: SiTailwindcss,
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Git",
    level: 90,
    icon: SiGit,
    color: "from-orange-400 to-red-600",
  },

  {
    name: "APIs & Backend",
    level: 80,
    icon: FaDatabase,
    color: "from-blue-500 to-indigo-500",
  },
  {
    name: "Responsive Design",
    level: 95,
    icon: GiSmartphone,
    color: "from-green-500 to-emerald-500",
  },
];
